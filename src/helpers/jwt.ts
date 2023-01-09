import { TAuthMeta, TJWTToken } from '@/types/token';

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

export const getJWTToken = () => {
  const { jwt, expiration } = JSON.parse(
    localStorage.getItem('token') || '{}'
  ) as TJWTToken;
  if (!jwt) {
    localStorage.removeItem('token');
    return null;
  } else {
    return jwt;
  }
};
