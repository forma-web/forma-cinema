import { TAuth, TAuthError } from '@/types/auth';

const config = useRuntimeConfig();

export const login = (body: TLogin) =>
  useFetch<TAuth, TAuthError>('/auth/login', {
    method: 'POST',
    body,
    baseURL: config.public.apiURL,
  });

export const register = (body: TRegister) =>
  useFetch<TAuth, TAuthError>('/auth/register', {
    method: 'POST',
    body,
    baseURL: config.public.apiURL,
  });
