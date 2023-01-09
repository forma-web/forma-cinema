const config = useRuntimeConfig();

export const login = (body: TLogin) =>
  useFetch('/auth/login', {
    method: 'POST',
    body,
    baseURL: config.public.apiURL,
  });
