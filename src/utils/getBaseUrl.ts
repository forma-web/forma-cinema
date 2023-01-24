import { useRuntimeConfig } from '#app';

const getBaseUrl = (defaultPath: string = '/') => {
  const {
    public: { apiURL },
  } = useRuntimeConfig();
  return apiURL + defaultPath;
};

export default getBaseUrl;
