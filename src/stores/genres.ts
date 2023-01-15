import { allGenres, genreById, genreMovies } from '@/services/api/genres';
import { TGenre } from '../types/genre';

export const useGenresStore = defineStore(
  'genreStore',
  createCollectionStore<TGenre>({
    type: 'genre',
    allCollectionsFetch: allGenres,
    collectionByIdFetch: genreById,
    collectionMoviesFetch: genreMovies,
  })
);
