import { TGenresResponse } from '@/types/genre';

type TGenresRequestParams = {
  cursor?: string | null;
};

const config = useRuntimeConfig();
const baseURL = `${config.public.apiURL}/genres`;

export const allGenres = async (params: TGenresRequestParams = {}) => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TGenresResponse>('/', {
    method: 'GET',
    params,
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};
