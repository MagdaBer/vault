import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch(`/api/credentials/`, {
        headers: { Authorization: 'supersecretkey' },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials;
  }, []);

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Your personal password vault</p>
      <Link to="password/Magda">Magda</Link>
      <input className={styles.input} type="text" placeholder="Search..." />
      {credentials &&
        credentials.forEach((credential) => console.log(credential))}
    </main>
  );
}
