import { TGenre } from '@/types/genre';
import { allGenres } from '@/services/api/genres';

export const useGenresStore = defineStore('genresStore', () => {
  const type = 'genres';
  const data = ref<Record<number, TGenre>>({});
  const isInited = ref(false);
  const nextCursor = ref<string | null>(null);
  const isFinished = computed(
    () => isInited.value && nextCursor.value === null
  );

  const getNewGenres = async () => {
    const newGenres: number[] = [];
    const params: Record<string, string | null> = {};

    if (isFinished.value) return newGenres;
    if (isInited.value) params.cursor = nextCursor.value;

    const { data: genresResp } =
      (await allGenres(isInited.value ? { cursor: nextCursor.value } : {})) ??
      {};

    if (!isInited.value) isInited.value = true;
    if (!genresResp || !genresResp.value) return newGenres;

    const { data: genresData, next_cursor } = genresResp.value;
    nextCursor.value = next_cursor;
    genresData.forEach((genre) => {
      data.value[genre.id] = genre;
      newGenres.push(genre.id);
    });

    return newGenres;
  };

  const getGenre = (id: number) => {
    if (!data.value.hasOwnProperty(id)) return null;
    return {
      id,
      type,
      name: data.value[id].name,
    };
  };

  return { data, isFinished, nextCursor, getGenre, getNewGenres };
});
