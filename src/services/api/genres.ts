import { TGenre, TGenresResponse } from '@/types/genre';
import { TMoviesResponse } from '@/types/movie';
import { TCollectionRequestParams } from '@/types/collection';

const genresFetch = useApiFetch('/genres');

export const allGenres = async (params: TCollectionRequestParams = {}) =>
  genresFetch<TGenresResponse>('/', {
    method: 'GET',
    params,
  });

export const genreById = async (id: number) =>
  genresFetch<TGenre>(`/${id}`, {
    method: 'GET',
  });

export const genreMovies = async (
  id: number,
  params: TCollectionRequestParams = {}
) =>
  genresFetch<TMoviesResponse>(`/${id}/movies`, {
    method: 'GET',
    params,
  });
