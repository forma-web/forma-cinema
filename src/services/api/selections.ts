import { TSelection, TSelectionResponse } from '@/types/selection';
import { TMoviesResponse } from '@/types/movie';
import { TCollectionRequestParams } from '@/types/collection';

const config = useRuntimeConfig();
const baseURL = `${config.public.apiURL}/selections`;

export const allSelections = async (params: TCollectionRequestParams = {}) => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TSelectionResponse>('/', {
    method: 'GET',
    params,
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};

export const selectionById = async (id: number) => {
  const jwt = await useToken();
  if (!jwt) return null;

  return useFetch<TSelection>(`/${id}`, {
    method: 'GET',
    baseURL,
    headers: {
      Authorization: jwt,
    },
  });
};

export const selectionMovies = async (
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
