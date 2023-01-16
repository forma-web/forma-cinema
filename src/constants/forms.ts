import ages from './ages';

export const REGISTER_VALIDATION_SCHEMES = [
  {
    first_name: { required: true, max: 255 },
    last_name: { max: 255 },
  },
  {
    email: { required: true, email: true, max: 255 },
    password: { required: true, min: 8, max: 255 },
  },
];

export const LOGIN_VALIDATION_SCHEMES = [
  {
    email: { required: true, email: true, max: 255 },
    password: { required: true, min: 8, max: 255 },
  },
];

export const MOVIE_VALIDATION_SCHEMES = [
  {
    name: { required: true, max: 255 },
    year: { integer: true, min_value: 1895, max_value: 2050 },
    age_restriction: {
      one_of: ages,
    },
    kinopoisk_rating: { integer: true, min_value: 0, max_value: 10 },
    country: { max: 255 },
    logline: { max: 280 },
  },
];

export const FIELDS_NAMES = [
  'first_name',
  'last_name',
  'email',
  'password',
  'year',
  'age_restriction',
  'kinopoisk_rating',
  'country',
  'logline',
];
