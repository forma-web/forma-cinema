import { TCollection } from '@/types/collection';
import { useSelectionStore } from '@/stores/selections';
import { useGenresStore } from '@/stores/genres';
import { COLLECTION_ITEMS_PER_PAGE } from '@/constants/collection';

const useCollection = () => {
  const data = ref<TCollection[]>([]);
  const filtredData = ref<TCollection[]>([]);

  // TODO: Refactoring: make as linked list

  const { height } = useWindowSize();
  // const stores = [useSelectionStore(), useGenresStore()];
  const stores = [useSelectionStore()];
  const currentStoreIndex = ref<number>(0);
  const needCollection = ref<number>(5);
  const processedCollection = ref<number>(0);
  const isLoading = ref<boolean>(false);
  const isFinished = ref<boolean>(false);

  const addCollectionToData = ({ id, name, movieIDs }: TCollection) => {
    data.value.push({
      id,
      type: stores[currentStoreIndex.value].type,
      name,
      movieIDs,
    });
  };

  const getCollections = async (isInit = false) => {
    const store = stores[currentStoreIndex.value];

    const newCollections =
      (isInit ? store.getCollections() : await store.getNewCollections()) ?? [];

    //@ts-ignore
    newCollections.forEach(addCollectionToData);
  };

  const updateCollectionList = async () => {
    isLoading.value = true;

    if (processedCollection.value === 0) {
      await getCollections(true);
    }

    while (
      needCollection.value > filtredData.value.length &&
      !isFinished.value
    ) {
      if (processedCollection.value === data.value.length) {
        if (stores[currentStoreIndex.value].isFinished) {
          if (++currentStoreIndex.value === stores.length) {
            isFinished.value = true;
            break;
          }
          await getCollections(true);
          continue;
        } else {
          await getCollections();
          continue;
        }
      }

      const collection = data.value[processedCollection.value];
      const store = stores[currentStoreIndex.value];

      if (collection?.movieIDs.length < COLLECTION_ITEMS_PER_PAGE) {
        const movieIDs =
          (await store.getLastestCollectionMovieIDs(
            collection.id,
            COLLECTION_ITEMS_PER_PAGE
          )) ?? [];
        data.value[processedCollection.value].movieIDs = movieIDs;
      }

      if (data.value[processedCollection.value].movieIDs.length > 0)
        filtredData.value.push(data.value[processedCollection.value]);
      processedCollection.value++;
    }

    isLoading.value = false;
  };

  useInfiniteScroll(
    document,
    async () => {
      needCollection.value += 5;
      if (!isFinished.value) await updateCollectionList();
    },
    { distance: height.value / 2, preserveScrollPosition: true }
  );
  
  updateCollectionList();

  return { data: filtredData, isLoading, isFinished };
};

export default useCollection;
