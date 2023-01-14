import { TDetailConfig } from '@/types/details';
import convertDuration from '@/utils/details/convertDuration';
import convertGenre from '@/utils/details/convertGenre';

export const DETAILS_DATA: TDetailConfig[] = [
  {
    type: 'duration',
    label: 'Время',
    convert: convertDuration,
  },
  {
    type: 'genres',
    label: 'Жанры',
    convert: convertGenre,
  },
  {
    type: 'country',
    label: 'Страна',
  },
  {
    type: 'year',
    label: 'Год производства',
  },
];
