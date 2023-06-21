import Cookies from 'js-cookie';

const LOCALHOST  = 'http://localhost:3000/api';

const getOptions = (options?: RequestInit) => {
  const token = Cookies.get('token');

  return {
    ...options,
    headers: {
      'Cache-Control': 'no-cache',
      SameSite: 'Strict',
      ...options?.headers,
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
};

const client = {
  get: async <R>(path: string) => {
    const res = await fetch(
      `${LOCALHOST}${path}`,
      getOptions()
    );
    return <R>res.json();
  },
  post: async <R>(path: string, body: unknown) => {
    const res = await fetch(
      `${LOCALHOST}${path}`,
      getOptions({
        method: 'POST',
        body: JSON.stringify(body),
      })
    );
    return <R>res.json();
  },
};

export default client;
