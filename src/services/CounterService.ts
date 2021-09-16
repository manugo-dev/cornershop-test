import api from 'config/api';
import { Counter } from 'types/Counter';

export const getCounters = (search?: string) => api.get<Counter[], string>('/counter', { search });
export const addCounter = (title: string) => api.post<Counter>('/counter', { title });
export const incrementCounter = (id: string) => api.post<Counter>('/counter/inc', { id });
export const decrementCounter = (id: string) => api.post<Counter>('/counter/dec', { id });
export const deleteCounter = (id: string) => api.delete<string>('/counter', undefined, { data: { id } });
