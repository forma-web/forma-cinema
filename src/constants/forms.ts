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

export const FIELDS_NAMES = ['first_name', 'last_name', 'email', 'password'];
