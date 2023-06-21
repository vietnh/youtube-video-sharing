import Cookies, { CookieAttributes } from 'js-cookie';
import { useEffect, useState } from 'react';

export function useCookie(
  name: string
): [string, (value: string) => void, () => void] {
  const options: CookieAttributes = {
    sameSite: 'strict',
    expires: 1 / 24,
  };

  const [cookieValue, setCookieValue] = useState<string>(() => {
    return Cookies.get(name) || '';
  });

  useEffect(() => {
    const handleCookieChange = (e: StorageEvent) => {
      console.log(e);
    };

    window.addEventListener('storage', handleCookieChange);

    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, [name]);

  const updateCookie = (value: string) => {
    Cookies.set(name, value, options);
    setCookieValue(value);
  };
  const clearCookie = () => {
    Cookies.remove(name);
    setCookieValue('');
  };

  return [cookieValue, updateCookie, clearCookie];
}
