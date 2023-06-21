'use client';

import { useEffect, useState } from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import client from '../lib/api';
import Cookie from 'js-cookie';
import { useCookie } from '../lib/auth';
import { useRouter } from 'next/navigation';

// since I use this component in the layout, I need to make sure it doesn't render on the server
export default function UserSection() {
  const [shouldRender, setShouldRender] = useState(false);
  const [token, storeToken, clearToken] = useCookie('token');
  const [email, storeEmail, clearEmail] = useCookie('email');

  const login = async (email: string, password: string) => {
    const res = await client.post<{ token: string; user: { email: string } }>(
      '/login',
      { email, password }
    );
    storeToken(res.token);
    storeEmail(res.user.email);
  };

  const logout = () => {
    clearToken();
    clearEmail();
  };

  useEffect(() => {
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return token ? <LoggedIn onLogout={logout} /> : <Login onLogin={login} />;
}

function Login({
  onLogin,
}: {
  onLogin: (email: string, password: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Button onClick={() => onLogin(email, password)}>Login</Button>
      </div>
    </div>
  );
}

function LoggedIn({ onLogout }: { onLogout: () => void }) {
  const router = useRouter();
  const [email] = useCookie('email');

  return (
    <div className="flex items-center md:ml-6 gap-3">
      <p className="text-white">Welcome {email}</p>
      <Button onClick={() => router.push('/share')}>Share a movie</Button>
      <Button onClick={() => onLogout()}>Logout</Button>
    </div>
  );
}
