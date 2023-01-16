import { TGenre, TGenresResponse } from '@/types/genre';
import { TMoviesResponse } from '@/types/movie';
import { TCollectionRequestParams } from '@/types/collection';

const config = useRuntimeConfig();
const baseURL = `${config.public.apiURL}/genres`;

export const allGenres = async (params: TCollectionRequestParams = {}) => {
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

export const genreById = async (id: number) => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TGenre>(`/${id}`, {
    method: 'GET',
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};

export const genreMovies = async (
  id: number,
  params: TCollectionRequestParams = {}
) => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TMoviesResponse>(`/${id}/movies`, {
    method: 'GET',
    params,
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};
