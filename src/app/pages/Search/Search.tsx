import React, { useState } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../Components/Credentials/Credentials';
import styles from './Search.module.css';

export default function Search(): JSX.Element {
  const [service, setService] = useState<string>('');
  const [masterPassword, setMasterPassword] = useState<string>('');
  const [credential, setCredential] = useState<Credential | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`api/credentials/${service}`, {
      headers: { Authorization: masterPassword },
    });
    if (!response.ok) {
      console.log('Credential not found');
      return;
    }
    const credential: Credential = await response.json();
    setCredential(credential);
  }

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      {credential ? (
        <CredentialCard credentialData={credential} />
      ) : (
        <form
          className={styles.container}
          onSubmit={(event) => handleSubmit(event)}
        >
          <input
            type="text"
            placeholder="Service"
            value={service}
            onChange={(event) => setService(event.target.value)}
          />
          <input
            type="text"
            placeholder="Master Password"
            value={masterPassword}
            onChange={(event) => setMasterPassword(event.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      )}
    </main>
  );
}
