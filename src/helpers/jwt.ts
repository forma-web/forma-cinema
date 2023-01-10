import { TAuthMeta, TJWTToken } from '@/types/token';
import { refresh } from '@/services/api/auth';

export const setJWTToken = (meta: TAuthMeta | null) => {
  if (meta === null) {
    localStorage.removeItem('token');
    return null;
  }
  const { token, token_type, expires_in } = meta ?? {};
  const expiration = new Date().getTime() + expires_in * 1000;
  const jwt = `${token_type} ${token}`;
  localStorage.setItem('token', JSON.stringify({ jwt, expiration }));
};

export const getJWTData = (): TJWTToken | null => {
  const { jwt, expiration } = JSON.parse(
    localStorage.getItem('token') || '{}'
  ) as TJWTToken;
  if (!jwt) {
    localStorage.removeItem('token');
    return null;
  }
  return { jwt, expiration };
};

export const getJWTToken = async () => {
  const jwtData = getJWTData();
  if (!jwtData) return null;

  const { jwt, expiration } = jwtData;

  if (new Date().getTime() < expiration) return jwt;

  await refresh();
  return getJWTData()?.jwt;
};

export const deleteJWTToken = () => {
  localStorage.removeItem('token');
};


