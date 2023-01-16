import { TGenre } from './genre';
import { TPaginationResponse } from './pagination';

export type TMovie = {
  id: number;
  name: string;
  year?: number;
  country?: string;
  age_restrictions?: number;
  duration?: number;
  logline?: string;
  description?: string;
  poster?: string;
  trailer?: string;
  genres?: TGenre[];
  kinopoisk_id?: number;
  kinopoisk_rating?: number;
};


export type TMovieForm = {
  name: string;
  logline?: string;
  collection: string[];
};
export type TMoviesResponse = TPaginationResponse<TMovie>;

