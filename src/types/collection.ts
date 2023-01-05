export type TMovie = {
  id: number;
  name: string;
  isSerial: boolean;
  year?: number;
  country?: string;
  age_restriction?: number;
  duration?: number;
  logline?: string;
  description?: string;
  poster?: string;
  trailer?: string;
  genres?: string[];
  kinopoisk_rating?: number;
};
