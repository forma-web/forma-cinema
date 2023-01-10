import { TMoviesResponse } from '@/types/movie';

type TMovieRequestParams = {
  minYear?: number;
  maxYear?: number;
  selection?: number;
  cursor?: string;
  genres?: number;
};

const config = useRuntimeConfig();
const baseURL = `${config.public.apiURL}/movies`;

export const lastesMovies = async (params: TMovieRequestParams = {}) => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TMoviesResponse>('/', {
    method: 'GET',
    params,
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};
