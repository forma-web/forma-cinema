import { TMovie } from '@/types/movie';
import { movieById } from '@/services/api/movies';

export const useMoviesStore = defineStore('moviesStore', () => {
  const data = ref<Record<number, TMovie>>({});
  const setMovie = (movie: TMovie) => (data.value[movie.id] = movie);

  const getMovieById = async (id: number) => {
    if (data.value[id]) return data.value[id];

    const { data: movieData } = (await movieById(id)) ?? {};
    if (!movieData || !movieData.value) return null;
    setMovie(movieData.value);

    return movieData.value;
  };

  const destroy = () => (data.value = {});

  return { data, setMovie, getMovieById, destroy };
});
