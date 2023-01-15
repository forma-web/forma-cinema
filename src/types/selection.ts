import { TPaginationResponse } from './pagination';

export type TSelection = {
  id: number;
  name: string;
  thumbnail?: string;
};

export type TSelectionResponse = TPaginationResponse<TSelection>;
