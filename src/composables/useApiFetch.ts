import { FetchResult, UseFetchOptions } from 'nuxt/dist/app/composables/fetch';
import type { NitroFetchRequest } from 'nitropack';
import type { FetchError } from 'ofetch';
import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData';
import { Ref } from 'nuxt/dist/app/compat/capi';

const useApiFetch = (path: string = '/') => {
  return async <
    ResT = void,
    ErrorT = FetchError,
    ReqT extends NitroFetchRequest = NitroFetchRequest,
    _ResT = ResT extends void ? FetchResult<ReqT> : ResT,
    Transform extends (res: _ResT) => any = (res: _ResT) => _ResT,
    PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>
  >(
    request: Ref<ReqT> | ReqT | (() => ReqT),
    options: UseFetchOptions<_ResT, Transform, PickKeys> = {},
    needJWT = true
  ) => {
    const baseURL = getBaseUrl(path);
    const { headers, ...rest } = options;

    const opts: UseFetchOptions<_ResT, Transform, PickKeys> = {
      baseURL,
      headers,
      ...rest,
    };

    if (needJWT) {
      const jwt = await getJWTToken();
      if (!jwt) return null;

      opts.headers = {
        Authorization: jwt,
        ...opts.headers,
      };
    }

    return useFetch<ResT, ErrorT, ReqT, _ResT, Transform, PickKeys>(
      request,
      opts
    );
  };
};

export default useApiFetch;
