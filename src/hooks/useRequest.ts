import { ApiErrorResponse, ApiOkResponse, PROBLEM_CODE, ApiResponse, CancelToken } from 'apisauce';
import { useState, useEffect, useCallback } from 'react';

import { Nullable } from 'types/Global';

import useMounted from './useMounted';

export type CancelTokenType = typeof CancelToken;
export type CancelTokenSource = ReturnType<CancelTokenType['source']>;

export type ErrorType<E> = { problem: PROBLEM_CODE; errorData?: E };
export type RequestType<P, D, E> = (params: P, cancelToken?: CancelTokenSource) => Promise<ApiResponse<D, E>>;
type Success<D, P> = (data?: D, extra?: P) => void;
type Failure<E> = (error: ErrorType<E>) => void;
type PostFetch<T, E> = (response: T | E) => void;
type RawResponse<D, E> = (response: ApiResponse<D, E>) => void;
interface AsyncRequestHookParams<P, D, E, T> {
  request: RequestType<P, D, E>;
  withPostSuccess?: Success<T, P>;
  withPostFailure?: Failure<E>;
  withRawResponse?: RawResponse<D, E>;
  initialState?: T | null;
  withPostFetch?: PostFetch<T, E>;
  transformResponse?: (response: D | E) => T;
}
interface AsyncRequestHookParamsWithPayload<P, D, E, T> extends AsyncRequestHookParams<P, D, E, T> {
  payload: P;
}

interface AsyncRequest<P, D, E> {
  values: P;
  request: RequestType<P, D, E>;
  onPrefetch: () => void;
  onSuccess: Success<D, P>;
  onError: Failure<E>;
  onPostFetch: PostFetch<ApiOkResponse<D>, ApiErrorResponse<E>>;
  onRawResponse: RawResponse<D, E>;
  cancelToken?: CancelTokenSource;
}

const executeAsyncRequest = async <P, D, E>({
  values,
  request,
  onPrefetch,
  onSuccess,
  onError,
  onPostFetch,
  onRawResponse,
  cancelToken
}: AsyncRequest<P, D, E>) => {
  onPrefetch();
  const response = await request(values, cancelToken);
  if (response.ok) {
    onSuccess(response.data);
  } else {
    onError({ problem: response.problem, errorData: response.data });
  }
  onPostFetch(response);
  onRawResponse(response);
};
// Returns a request to execute manually at some point, and the variables that will be updated when it does
export const useLazyRequest = <P, D, E, T = D>({
  request,
  withPostSuccess,
  withPostFailure,
  initialState = null,
  withPostFetch,
  withRawResponse,
  transformResponse = (response) => response as unknown as T
}: AsyncRequestHookParams<P, D, E, T>): [
  Nullable<T>,
  boolean,
  Nullable<ErrorType<E>>,
  (params?: P) => CancelTokenSource
] => {
  const [state, setState] = useState<Nullable<T>>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Nullable<ErrorType<E>>>(null);
  const isMounted = useMounted();
  const sendRequest = useCallback(
    (values) => {
      const cancelToken = CancelToken.source();
      executeAsyncRequest({
        values,
        request,
        onPrefetch: () => {
          setLoading(true);
          setState(initialState);
          setError(null);
        },
        onSuccess: (data) => {
          if (isMounted.current) {
            setError(null);
            const successData = data as D;
            const transformedResponse = successData ? transformResponse(successData) : undefined;
            setState(transformedResponse || null);
            withPostSuccess?.(transformedResponse, values);
            setLoading(false);
          }
        },
        onError: (errorInfo) => {
          if (isMounted.current) {
            setError(() => errorInfo);
            withPostFailure?.(errorInfo);
            setLoading(false);
          }
        },
        onPostFetch: (response) => {
          if (isMounted.current) {
            if (response.data) {
              withPostFetch?.(transformResponse(response.data));
            }
          }
        },
        onRawResponse: (response) => {
          withRawResponse?.(response);
        },
        cancelToken
      });
      return cancelToken;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialState, request, withPostFailure, withPostSuccess]
  );
  return [state, loading, error, sendRequest];
};
// Executes a request each time a dependency changes and returns the values and the refetch function
// in case you want to execute it again
export const useRequest = <P, D, E, T = D>(
  {
    request,
    payload,
    withPostSuccess,
    withPostFailure,
    initialState = null,
    withPostFetch,
    transformResponse = (response) => response as unknown as T,
    withRawResponse
  }: AsyncRequestHookParamsWithPayload<P, D, E, T>,
  dependencies: any[]
): [Nullable<T>, boolean, Nullable<ErrorType<E>>, (params: P) => CancelTokenSource] => {
  const [state, loading, error, sendRequest] = useLazyRequest({
    request,
    withPostSuccess,
    withPostFailure,
    initialState,
    withPostFetch,
    transformResponse,
    withRawResponse
  });
  useEffect(
    () => {
      sendRequest(payload);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
  return [state, loading, error, sendRequest];
};
