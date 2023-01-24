import { TAuthError, TUserResponse } from '@/types/auth';

const userFetch = useApiFetch('/user');

export const currentUser = async () =>
  userFetch<TUserResponse, TAuthError>('/', {
    method: 'GET',
  });
