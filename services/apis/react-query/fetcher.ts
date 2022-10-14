import { getAccessToken, getAndSaveAccessToken, removeAccessToken } from 'next-protected-auth';

import RestAPIService from '../RestAPIService';

export const fetcher = ({
  method,
  headers,
  body,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | null;
}) => {
  return fetch(`${process.env.NEXT_PUBLIC_GQL_URL}`, {
    method,
    headers,
    body,
  });
};

export const customFetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  ignoreUnauthorized = false,
): (() => Promise<TData>) => {
  return async () => {
    const isMultipart =
      variables && typeof File !== undefined ? !!Object.values(variables).find((v) => v instanceof File) : false;

    const formData = new FormData();

    if (isMultipart) {
      // https://github.com/jaydenseric/graphql-multipart-request-spec
      const vars = Object.entries(variables)
        .map(([k, v]) => (typeof v === 'object' ? (Object.keys(v).length > 0 ? [k, v] : [k, null]) : [k, v]))
        .reduce((prev, [k, v]) => ({ ...prev, [k]: v }), {});
      formData.append(
        'operations',
        JSON.stringify({
          query: query,
          variables: vars,
        }),
      );
      const map = {};
      const files = [];

      for (const [k, v] of Object.entries(vars)) {
        if (v === null) {
          map[Object.keys(map).length] = [`variables.${k}`];
          files.push(variables[k]);
        }
      }

      formData.append('map', JSON.stringify(map));

      for (const [index, file] of files.entries()) {
        formData.append(`${index}`, file);
      }
    }

    const headers: Record<string, string> = {};

    if (getAccessToken()) {
      headers.Authorization = `Bearer ${getAccessToken()}`;
    }

    if (!isMultipart) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetcher({
      method: 'POST',
      headers: headers,
      body: isMultipart ? formData : JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || 'Error..';
      if ((message.includes('Access denied') || message.includes('Unauthorized')) && !ignoreUnauthorized) {
        //Try to renew token
        try {
          await getAndSaveAccessToken({
            renewTokenFct: async () => {
              const { accessToken: accessToken } = await RestAPIService.refresh();

              return accessToken as string;
            },
          });

          // Try again
          return customFetcher(query, variables, true)();
        } catch (error) {
          removeAccessToken();
          window.location.href = `/auth/login?redirectURL=${encodeURIComponent(location?.pathname + location?.search)}`;
          throw new Error('Unauthorized');
        }
      }

      throw new Error(message);
    }

    return json.data;
  };
};
