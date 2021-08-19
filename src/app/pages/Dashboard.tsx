import React from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Your personal password vault</p>
      <input className={styles.input} type="text" placeholder="Search..." />
    </main>
  );
}
