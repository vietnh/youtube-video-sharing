'use client';

import { useEffect, useState } from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import client from '../lib/api';
import Cookie from 'js-cookie';
import { isAuthenticated } from '../lib/auth';
import { useRouter } from 'next/navigation';

// since I use this component in the layout, I need to make sure it doesn't render on the server
export default function UserSection() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return isAuthenticated() ? <LoggedIn /> : <Login />;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await client.post<{ token: string; user: { email: string } }>(
      '/login',
      { email, password }
    );
    Cookie.set('token', res.token, { expires: 1 });
    Cookie.set('email', res.user.email, { expires: 1 });
  };

  return (
    <div className="flex items-center md:ml-6 gap-3">
      <TextInput
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <div className="relative">
        <Button onClick={() => login()}>Login</Button>
      </div>
    </div>
  );
}

function LoggedIn() {
  const router = useRouter();
  const email = Cookie.get('email');
  const logout = () => {
    Cookie.remove('token');
    Cookie.remove('email');
  };

  return (
    <div className="flex items-center md:ml-6 gap-3">
      <p className="text-white">Welcome {email}</p>
      <Button onClick={() => router.push('/share')}>Share a movie</Button>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}
