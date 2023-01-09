import { TAuthMeta } from '@/types/token';

export const setJWTToken = (meta: TAuthMeta) => {
  const { token, token_type, expires_in } = meta;
  const expiration = new Date().getTime() + expires_in * 1000;
  const jwt = `${token_type} ${token}`;
  localStorage.setItem('token', JSON.stringify({ jwt, expiration }));
};

export const getJWTToken = () => {
  const { jwt, expiration } = JSON.parse(localStorage.getItem('token') || '{}');
  if (new Date().getTime() > expiration || !jwt) {
    localStorage.removeItem('token');
    return null;
  } else {
    return jwt;
  }
};
