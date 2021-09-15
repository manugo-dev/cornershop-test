import api from 'config/api';
import { Counter } from 'types/Counter';

export const getCounters = () => api.get<Counter[]>('/counter');
export const addCounter = (title: string) => api.post<Counter>('/counter', { title });
export const incrementCounter = (id: string) => api.post<Counter>('/counter/inc', { id });
export const decrementCounter = (id: string) => api.post<Counter>('/counter/dec', { id });
export const deleteCounter = (id: string) => api.post<string>('/counter', { id });
