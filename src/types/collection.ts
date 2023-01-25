import { EMoviesMode } from '@/constants/movies';

export type TCollection = {
  id: number;
  type: string;
  name: string;
  movieIDs: number[];
};

export type TCollectionStore = {
  id: number;
  name: string;
  isInited: boolean;
  nextCursor: string | null;
  movieIDs: number[];
};

export type TCollectionRequestParams = {
  cursor?: string | null;
};

export type TMoviesRequestModeParams = {
  mode?: EMoviesMode.DRAFT | EMoviesMode.PUBLISHED;
};
