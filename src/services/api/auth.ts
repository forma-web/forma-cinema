import { TAuth, TAuthError } from '@/types/auth';
import { getJWTData, setJWTToken } from '@/helpers/jwt';
import { TAuthMeta } from '@/types/token';

const config = useRuntimeConfig();
const baseURL = config.public.apiURL;

export const login = (body: TLogin) =>
  useFetch<TAuth, TAuthError>('/auth/login', {
    method: 'POST',
    body,
    baseURL,
  });

export const register = (body: TRegister) =>
  useFetch<TAuth, TAuthError>('/auth/register', {
    method: 'POST',
    body,
    baseURL,
  });

export const refresh = () =>
  useFetch<TAuthMeta, TAuthError>('/auth/refresh', {
    method: 'POST',
    baseURL,

    onRequest({ options }) {
      options.headers = (options.headers as Record<string, string>) || {};
      options.headers.authorization = String(getJWTData()?.jwt);
    },

    onResponse({ response }) {
      if (response._data?.meta) setJWTToken(response._data.meta);
    },

    onResponseError() {
      setJWTToken(null);
    },
  });
