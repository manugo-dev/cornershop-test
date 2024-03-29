import { renderHook, act } from '@testing-library/react-hooks';
import { PROBLEM_CODE } from 'apisauce';

import { useRequest, useLazyRequest } from 'hooks/useRequest';

const failureResponse = {
  ok: false as const,
  problem: 'CLIENT_ERROR' as PROBLEM_CODE,
  originalError: { config: {}, isAxiosError: false, toJSON: jest.fn(), name: '', message: '' },
  data: { errorData: 'error' },
  status: 400,
  headers: {},
  config: {},
  duration: 100
};
const successResponse = {
  ok: true as const,
  problem: null,
  originalError: null,
  data: { foo: 'value' },
  status: 200,
  headers: {},
  config: {},
  duration: 100
};
const MockService = {
  fetchFoo: () => Promise.resolve(successResponse)
};
const FailureMockService = {
  fetchFoo: () => Promise.resolve(failureResponse)
};
describe('#useRequest', () => {
  describe('when request has failed', () => {
    it('has correct error', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useRequest({ request: FailureMockService.fetchFoo, payload: 1 }, [])
      );
      await waitForNextUpdate();
      const [state, loading, error] = result.current;
      expect(state).toBe(null);
      expect(loading).toBe(false);
      expect(error?.errorData).toBe(failureResponse.data);
    });
  });
  describe('when request returns an ok response', () => {
    it('has correct state', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useRequest({ request: MockService.fetchFoo, payload: 1 }, [])
      );
      await waitForNextUpdate();
      const [state, loading, error] = result.current;
      expect(state).toBe(successResponse.data);
      expect(loading).toBe(false);
      expect(error).toBe(null);
    });
  });
  describe('when request is loading', () => {
    it('is loading', () => {
      const { result, unmount } = renderHook(() =>
        useRequest({ request: MockService.fetchFoo, payload: 1 }, [])
      );
      unmount();
      const [state, loading, error] = result.current;
      expect(state).toBe(null);
      expect(loading).toBe(true);
      expect(error).toBe(null);
    });
  });
});
describe('#useLazyRequest', () => {
  describe('when request is not called', () => {
    it('is neither loading nor has state', () => {
      const { result, unmount } = renderHook(() => useLazyRequest({ request: MockService.fetchFoo }));
      unmount();
      const [state, loading, error] = result.current;
      expect(state).toBe(null);
      expect(loading).toBe(false);
      expect(error).toBe(null);
    });
  });
  describe('when request is called and it is loading', () => {
    it('it starts loading', () => {
      const { result, unmount } = renderHook(() => useLazyRequest({ request: MockService.fetchFoo }));
      const [, , , request] = result.current;
      act(() => {
        request(1);
      });
      unmount();
      const [state, loading, error] = result.current;
      expect(state).toBe(null);
      expect(loading).toBe(true);
      expect(error).toBe(null);
    });
  });
  describe('when request is called and it succeeds', () => {
    it('is has the correct state', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useLazyRequest({ request: MockService.fetchFoo })
      );
      const [, , , request] = result.current;
      act(() => {
        request(1);
      });
      await waitForNextUpdate();
      const [state, loading, error] = result.current;
      expect(state).toBe(successResponse.data);
      expect(loading).toBe(false);
      expect(error).toBe(null);
    });
  });
  describe('when request is called and it fails', () => {
    it('it sets the error', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useLazyRequest({ request: FailureMockService.fetchFoo })
      );
      const [, , , request] = result.current;
      act(() => {
        request(1);
      });
      await waitForNextUpdate();
      const [state, loading, error] = result.current;
      expect(state).toBe(null);
      expect(loading).toBe(false);
      expect(error?.errorData).toBe(failureResponse.data);
    });
  });
});
