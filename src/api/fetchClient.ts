const BASE_URL = 'https://mate.academy/students-api';

const errorHandler = (response: Response) => {
  if (response.ok) {
    return response.json();
  }

  throw new Error('My text');
};

const get = <R>(endpoint: string): Promise<R> => {
  const requestUrl = `${BASE_URL}${endpoint}`;

  return fetch(requestUrl)
    .then(errorHandler);
};

const post = <R, B>(endpoint: string, body: B): Promise<R> => {
  const requestUrl = `${BASE_URL}${endpoint}`;

  return fetch(requestUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then(errorHandler);
};

const patch = <R, B>(endpoint: string, body: B): Promise<R> => {
  const requestUrl = `${BASE_URL}${endpoint}`;

  return fetch(requestUrl, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then(errorHandler);
};

export const fetchClient = {
  get,
  post,
  patch,
};
