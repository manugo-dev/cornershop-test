import { create } from 'apisauce';

export enum StatusCodes {
  UNAUTHORIZED = 401
}

const api = create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  }
});

export default api;
