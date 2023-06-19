'use client';

import { useState } from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex items-center md:ml-6 gap-3">
      <TextInput type='email' name='email' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
      <TextInput type='password' name='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />

      <div className="relative">
        <div>
          <Button onClick={() => console.log(email, password)}>Login</Button>
        </div>
      </div>
    </div>
  )
}