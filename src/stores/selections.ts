import { TSelection } from '@/types/selection';
import {
  allSelections,
  selectionById,
  selectionMovies,
} from '@/services/api/selections';
import { useMoviesStore } from './movies';

type TSelectionStore = TSelection & {
  isInited: boolean;
  nextCursor: string | null;
  movieIDs: number[];
};

const moviesStore = useMoviesStore();

export const useSelectionStore = defineStore('selectionStore', () => {
  const type = 'selections';
  const data = ref<Record<number, TSelectionStore>>({});
  const isInited = ref(false);
  const nextCursor = ref<string | null>(null);

  const isFinished = computed(
    () => isInited.value && nextCursor.value === null
  );

  const selectionIDs = computed(() =>
    Object.keys(data.value).map(Number).sort()
  );

  const setSelection = (selection: TSelection | null) => {
    if (!selection || data.value[selection.id]) return null;
    data.value[selection.id] = {
      ...selection,
      isInited: false,
      nextCursor: null,
      movieIDs: [],
    };
    return data.value[selection.id];
  };

  const getNewSelections = async () => {
    if (isFinished.value) return null;
    isInited.value = true;

    const newSelectionIDs: number[] = [];
    const { data: newSelections } =
      (await allSelections({
        cursor: nextCursor.value,
      })) ?? {};
    nextCursor.value = newSelections?.value?.next_cursor ?? null;

    if (!newSelections || !newSelections.value) return null;

    newSelections.value.data.forEach((selection) => {
      if (setSelection(selection)) newSelectionIDs.push(selection.id);
    });

    return newSelectionIDs.sort();
  };

  const getSelection = async (id: number) => {
    if (data.value[id]) return data.value[id];

    const { data: selection } = (await selectionById(id)) ?? {};
    if (!selection || !selection.value) return null;

    setSelection(selection.value);

    return data.value[id];
  };

  const getSelectionMovieIDs = async (id: number) => {
    if (data.value[id]) return data.value[id].movieIDs;

    const selection = await getSelection(id);
    return selection?.movieIDs.sort() ?? null;
  };

  const getNewSelectionMovieIDs = async (id: number) => {
    const selection = data.value[id];
    const newMovieIDs: number[] = [];

    if (!selection) return getSelectionMovieIDs(id);
    if (selection.isInited && selection.nextCursor === null) return null;
    selection.isInited = true;

    const { data: newMovies } =
      (await selectionMovies(id, {
        cursor: selection.nextCursor,
      })) ?? {};
    data.value[id].nextCursor = newMovies?.value?.next_cursor ?? null;

    if (!newMovies || !newMovies.value) return null;

    newMovies.value.data.forEach((movie) => {
      moviesStore.setMovie(movie);
      newMovieIDs.push(movie.id);
    });

    data.value[id].movieIDs = [...data.value[id].movieIDs, ...newMovieIDs];

    return newMovieIDs.sort();
  };

  return {
    type,
    data,
    isFinished,
    nextCursor,
    selectionIDs,
    getNewSelections,
    getSelection,
    getSelectionMovieIDs,
    getNewSelectionMovieIDs,
  };
});
