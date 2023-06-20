import Cookies from 'js-cookie';

export function isAuthenticated() {
  const token = Cookies.get('token');
  return !!token;
}

export function getUserInfo() {
  const email = Cookies.get('email');
  return email ? { email } : null;
}