import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <p>Your personal password vault</p>
      <input className={styles.input} type="text" placeholder="Search..." />
      <Link to="/Magda">Magda</Link>
    </main>
  );
}
