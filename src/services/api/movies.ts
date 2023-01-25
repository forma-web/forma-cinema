import { TMovie, TMoviesResponse } from '@/types/movie';
import {
  TCollectionRequestParams,
  TMoviesRequestModeParams,
} from '@/types/collection';

const moviesFetch = useApiFetch('/movies');

export const movieById = async (id: number) =>
  moviesFetch<TMovie>(`/${id}`, {
    method: 'GET',
  });

export const allMovies = async (
  params: TCollectionRequestParams & TMoviesRequestModeParams = {}
) =>
  moviesFetch<TMoviesResponse>(`/`, {
    method: 'GET',
    params,
  });
