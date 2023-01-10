import { TMovie } from '@/types/movie';
import { lastesMovies } from '@/services/api/movies';

type TCollectionMoviesProps = {
  type: 'genres' | 'selection';
  id: number;
};

export const useMoviesStore = defineStore('moviesStore', () => {
  const data = ref<Record<number, TMovie>>({});

  const getCollectionMovies = async ({ type, id }: TCollectionMoviesProps) => {
    const movieIDs: number[] = [];
    const params = { [type]: id };

    const { data: moviesResp } = (await lastesMovies(params)) ?? {};
    if (!moviesResp || !moviesResp.value) return movieIDs;

    const { data: moviesData } = moviesResp.value;

    moviesData.forEach((movie) => {
      if (!data.value.hasOwnProperty(movie.id)) data.value[movie.id] = movie;
      movieIDs.push(movie.id);
    });

    return movieIDs;
  };

  return { data, getCollectionMovies };
});
