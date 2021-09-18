import { create } from 'apisauce';

export enum StatusCodes {
  UNAUTHORIZED = 401
}

const DEFAULT_BASE_URL = '/api/v1';
export const BASE_URL =
  process.env.NODE_ENV === 'test' ? 'http://app' : process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL;

const api = create({
  baseURL: BASE_URL,
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  }
});

export default api;
