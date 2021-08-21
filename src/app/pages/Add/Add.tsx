import React, { useState } from 'react';
import styles from './Add.module.css';

export default function Add(): JSX.Element {
  const [service, setService] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [masterpassword, setMasterpassword] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newCredential = {
      service,
      username,
      password,
    };
    await fetch('/api/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: masterpassword,
      },
      body: JSON.stringify(newCredential),
    });
  }

  return (
    <main className={styles.container}>
      <h1>Vault</h1>

      <form
        className={styles.container}
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          type="text"
          placeholder="Service..."
          value={service}
          onChange={(event) => setService(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Masterpassword..."
          value={masterpassword}
          onChange={(event) => setMasterpassword(event.target.value)}
          required
        />
        <input type="submit" value="Send" />
      </form>
    </main>
  );
}
