import { TAuthError, TUserResponse } from '@/types/auth';

const config = useRuntimeConfig();
const baseURL = `${config.public.apiURL}/user`;

export const currentUser = async () => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TUserResponse, TAuthError>('/', {
    method: 'GET',
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};
