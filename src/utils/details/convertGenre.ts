import { TGenre } from '@/types/genre';

const convertGenre = (gentres: TGenre[]) =>
  gentres.map((genre) => genre.name.toLowerCase()).join(', ');

export default convertGenre;
