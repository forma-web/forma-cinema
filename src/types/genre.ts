import { TPaginationResponse } from './pagination';

export type TGenre = {
  id: number;
  name: string;
};

export type TGenresResponse = TPaginationResponse<TGenre>;
