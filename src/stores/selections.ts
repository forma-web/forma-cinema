import { TSelection } from '@/types/selection';
import {
  allSelections,
  selectionById,
  selectionMovies,
} from '@/services/api/selections';
import { TCollectionStore } from '@/types/collection';

export const useSelectionStore = defineStore(
  'selectionStore',
  createCollectionStore<TSelection>({
    type: 'selection',
    allCollectionsFetch: allSelections,
    collectionByIdFetch: selectionById,
    collectionMoviesFetch: selectionMovies,
  })
);
