import { TAuth, TAuthError } from '@/types/auth';
import { getJWTData, setJWTToken } from '@/utils/jwt';
import { TAuthMeta } from '@/types/token';

export const login = (body: TLogin) =>
  useFetch<TAuth, TAuthError>('/login', {
    method: 'POST',
    body,
    baseURL: getBaseUrl('/auth'),
  });

export const register = (body: TRegister) =>
  useFetch<TAuth, TAuthError>('/register', {
    method: 'POST',
    body,
    baseURL: getBaseUrl('/auth'),
  });

export const refresh = () =>
  useFetch<TAuthMeta, TAuthError>('/refresh', {
    method: 'POST',
    baseURL: getBaseUrl('/auth'),
    headers: {
      Accept: 'application/json',
    },

    onRequest({ options }) {
      options.headers = (options.headers as Record<string, string>) || {};
      options.headers.authorization = String(getJWTData()?.jwt);
    },

    onResponse({ response }) {
      if (response._data?.meta) setJWTToken(response._data.meta);
    },

    // onResponseError() {
    //   console.log('refresh error');

    //   setJWTToken(null);
    // },
  });

export const logout = async () => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<null, TAuthError>('/logout', {
    method: 'POST',
    baseURL: getBaseUrl('/auth'),
    headers: {
      Authorization: jwt,
    },
  });
};
