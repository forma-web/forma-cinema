import { TMovie } from '@/types/movie';

const moviesFetch = useApiFetch('/movies');

export const movieById = async (id: number) =>
  moviesFetch<TMovie>(`/${id}`, {
    method: 'GET',
  });
