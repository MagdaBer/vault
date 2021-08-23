import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import CredentialCard from '../../Components/Credentials/Credentials';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterpassword, setMasterpassword] = useState('');

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch(`/api/credentials/`, {
        headers: { Authorization: masterpassword },
      });

      const credentials = await response.json();
      setCredentials(credentials);
    }

    fetchCredentials();
    if (!masterpassword) {
      setCredentials([]);
    }
  }, [masterpassword]);

  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Your personal password vault</p>
      <input
        className={styles.input}
        type="password"
        value={masterpassword}
        onChange={(event) => setMasterpassword(event.target.value)}
        placeholder="Search..."
      />
      {credentials.length !== 0 &&
        credentials.map((credential) => (
          <CredentialCard credentialData={credential} />
        ))}
      <Link to="/credential/add" className={styles.addButton}>
        <img src="assets/add button.svg" />
      </Link>
      <Link to="/search" className={styles.searchButton}>
        <img src="assets/Search button.svg" />
      </Link>
    </main>
  );
}
