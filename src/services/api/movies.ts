import { TMovie, TMoviesResponse } from '@/types/movie';

type TMovieRequestParams = {
  minYear?: number;
  maxYear?: number;
  selection?: number;
  cursor?: string;
  genres?: number;
};

const config = useRuntimeConfig();
const baseURL = `${config.public.apiURL}/movies`;

export const movieById = async (id: number) => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TMovie>(`/${id}`, {
    method: 'GET',
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};
