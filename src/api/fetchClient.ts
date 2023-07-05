const BASE_URL = 'https://mate.academy/students-api';

enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Patch = 'PATCH',
}

const request = <R, P = null>(
  endpoint: string,
  method: RequestMethod = RequestMethod.Get,
  payload?: P,
): Promise<R> => {
  const options: RequestInit = { method };
  const requestUrl = `${BASE_URL}${endpoint}`;

  if (payload) {
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
    options.body = JSON.stringify(payload);
  }

  return fetch(requestUrl, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    });
};

export const fetchClient = {
  get: <R>(endpoint: string) => request<R>(endpoint),
  post: <R, P>(endpoint: string, payload: P) => request<R, P>(endpoint, RequestMethod.Post, payload),
  patch: <R, P>(endpoint: string, payload: P) => request<R, P>(endpoint, RequestMethod.Patch, payload),
  delete: <R>(endpoint: string) => request<R>(endpoint, RequestMethod.Delete),
};
