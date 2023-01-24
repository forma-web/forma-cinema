import { TSelection, TSelectionResponse } from '@/types/selection';
import { TMoviesResponse } from '@/types/movie';
import { TCollectionRequestParams } from '@/types/collection';

const selectionsFetch = useApiFetch('/selections');

export const allSelections = async (params: TCollectionRequestParams = {}) =>
  selectionsFetch<TSelectionResponse>('/', {
    method: 'GET',
    params,
  });

export const selectionById = async (id: number) =>
  selectionsFetch<TSelection>(`/${id}`, {
    method: 'GET',
  });

export const selectionMovies = async (
  id: number,
  params: TCollectionRequestParams = {}
) =>
  selectionsFetch<TMoviesResponse>(`/${id}/movies`, {
    method: 'GET',
    params,
  });
