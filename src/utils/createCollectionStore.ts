import { TCollectionRequestParams, TCollectionStore } from '@/types/collection';
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData';
import { TPaginationResponse } from '@/types/pagination';
import { useMoviesStore } from '@/stores/movies';
import { TMoviesResponse } from '@/types/movie';

type TCollectionStoreProps<T> = {
  type: string;
  allCollectionsFetch: (
    params: TCollectionRequestParams
  ) => Promise<_AsyncData<TPaginationResponse<T>, unknown> | null>;
  collectionByIdFetch: (id: number) => Promise<_AsyncData<T, unknown> | null>;
  collectionMoviesFetch: (
    id: number,
    params: TCollectionRequestParams
  ) => Promise<_AsyncData<TMoviesResponse, unknown> | null>;
};

const moviesStore = useMoviesStore();

const createCollectionStore =
  <T extends { id: number; name: string }>({
    type,
    allCollectionsFetch,
    collectionByIdFetch,
    collectionMoviesFetch,
  }: TCollectionStoreProps<T>) =>
  () => {
    const data = ref<Record<number, T & TCollectionStore>>({});
    const isInited = ref(false);
    const nextCursor = ref<string | null>(null);

    const isFinished = computed(
      () => isInited.value && nextCursor.value === null
    );

    const setCollection = (collection: T | null) => {
      if (!collection || data.value[collection.id]) return null;
      data.value[collection.id] = {
        ...collection,
        isInited: false,
        nextCursor: null,
        movieIDs: [],
      };
      return data.value[collection.id];
    };

    const getCollectionIDs = () => Object.keys(data.value).map(Number).sort();

    const getNewCollections = async () => {
      if (isFinished.value) return null;
      isInited.value = true;

      const newCollection: (T & TCollectionStore)[] = [];
      const { data: newCollectionData } =
        (await allCollectionsFetch({
          cursor: nextCursor.value,
        })) ?? {};
      nextCursor.value = newCollectionData?.value?.next_cursor ?? null;

      if (!newCollectionData || !newCollectionData.value) return null;

      newCollectionData.value.data.forEach((collection) => {
        const collectionData = setCollection(collection);
        if (collectionData) newCollection[collection.id] = collectionData;
      });

      return newCollection;
    };

    const getCollection = async (id: number) => {
      if (data.value[id]) return data.value[id];

      const { data: Collection } = (await collectionByIdFetch(id)) ?? {};
      if (!Collection || !Collection.value) return null;

      setCollection(Collection.value);

      return data.value[id];
    };

    const getCollections = () => Object.values(data.value);

    const getCollectionMovieIDs = async (id: number) => {
      if (data.value[id]) return data.value[id].movieIDs;

      const collection = await getCollection(id);
      return collection?.movieIDs.sort() ?? null;
    };

    const getNewCollectionMovieIDs = async (id: number) => {
      const collection = data.value[id];
      const newMovieIDs: number[] = [];

      if (!collection) return getCollectionMovieIDs(id);
      if (collection.isInited && collection.nextCursor === null) return null;
      collection.isInited = true;

      const { data: newMovies } =
        (await collectionMoviesFetch(id, {
          cursor: collection.nextCursor,
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

    const getLastestCollectionMovieIDs = async (id: number, amount: number) => {
      if (!data.value[id] && !(await getCollection(id))) return null;

      while (
        (data.value[id].isInited === false ||
          data.value[id].nextCursor !== null) &&
        (!amount || data.value[id].movieIDs.length < amount)
      ) {
        const newMovieIDs = await getNewCollectionMovieIDs(id);
        if (!newMovieIDs) break;
      }

      return data.value[id].movieIDs
        .sort()
        .slice(0, amount ? amount : data.value[id].movieIDs.length);
    };

    const destroy = () => (data.value = {});

    return {
      type,
      data,
      isFinished,
      isInited,
      getCollections,
      getCollectionIDs,
      setCollection,
      getNewCollections,
      getCollection,
      getCollectionMovieIDs,
      getNewCollectionMovieIDs,
      getLastestCollectionMovieIDs,
      destroy,
    };
  };

export default createCollectionStore;
