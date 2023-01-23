import { TAuth, TAuthError, TMetaResponse } from '@/types/auth';
import { getJWTData } from '@/utils/jwt';

const authFetch = useApiFetch('/auth');

export const login = (body: TLogin) =>
  authFetch<TAuth, TAuthError>(
    '/login',
    {
      method: 'POST',
      body,
    },
    false
  );

export const register = (body: TRegister) =>
  authFetch<TAuth, TAuthError>(
    '/register',
    {
      method: 'POST',
      body,
    },
    false
  );

export const refresh = () =>
  authFetch<TMetaResponse, TAuthError>(
    '/refresh',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },

      onRequest({ options }) {
        options.headers = (options.headers as Record<string, string>) || {};
        options.headers.authorization = String(getJWTData()?.jwt);
      },
    },
    false
  );

export const logout = async () =>
  authFetch<null, TAuthError>('/logout', {
    method: 'POST',
  });
