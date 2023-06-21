import Cookies from 'js-cookie';

const getOptions = (options?: RequestInit) => {
  const token = Cookies.get('token');

  return {
    ...options,
    headers: {
      'Cache-Control': 'no-cache',
      ...options?.headers,
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
};

const client = {
  get: async <R>(path: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      getOptions()
    );
    return <R>res.json();
  },
  post: async <R>(path: string, body: unknown) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      getOptions({
        method: 'POST',
        body: JSON.stringify(body),
      })
    );
    return <R>res.json();
  },
};

export default client;
