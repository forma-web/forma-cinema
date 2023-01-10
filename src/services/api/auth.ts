import { TAuth, TAuthError, TUserResponse } from '@/types/auth';
import { getJWTData, getJWTToken, setJWTToken } from '@/helpers/jwt';
import { TAuthMeta } from '@/types/token';

const config = useRuntimeConfig();
const baseURL = `${config.public.apiURL}/auth`;

export const login = (body: TLogin) =>
  useFetch<TAuth, TAuthError>('/login', {
    method: 'POST',
    body,
    baseURL,
  });

export const register = (body: TRegister) =>
  useFetch<TAuth, TAuthError>('/register', {
    method: 'POST',
    body,
    baseURL,
  });

export const refresh = () =>
  useFetch<TAuthMeta, TAuthError>('/refresh', {
    method: 'POST',
    baseURL,
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

    onResponseError() {
      setJWTToken(null);
    },
  });

export const currentUser = async () => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TUserResponse, TAuthError>('/me', {
    method: 'GET',
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};

export const logout = async () => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<null, TAuthError>('/logout', {
    method: 'POST',
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};
