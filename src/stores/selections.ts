import { TSelection } from '@/types/selection';

export const useSelectionsStore = defineStore('selectionsStore', () => {
  const data = ref<Record<number, TSelection>>({});
  const nextPage = ref<string | null>(null);

  return { data };
});
