import { TMovie } from '@/types/movie';

const config = useRuntimeConfig();
const baseURL = `${config.public.apiURL}/movies`;

export const getMoviesById = async (id: string) => {
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
