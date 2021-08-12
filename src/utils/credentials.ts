import { readFile, writeFile } from 'fs/promises';
import { DB, Credential } from '../types';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;
  return credentials;
}

export async function getCredential(service: string): Promise<Credential> {
  const credentials = await readCredentials();
  const credential = credentials.find(
    (credential) => credential.service.toLowerCase() === service.toLowerCase()
  );
  if (!credential) {
    throw new Error(`No credential found for service: ${service}`);
  }
  return credential;
}

export async function addCredential(credential: Credential): Promise<void> {
  const credentials = await readCredentials();
  const newCredentials = [...credentials, credential];
  const newDB: DB = { credentials: newCredentials };
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}

export async function deletCredential(service: string): Promise<void> {
  const credentials = await readCredentials();
  const filteredcredentials = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );
  const newDB: DB = {
    credentials: filteredcredentials,
  };
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}

export async function updateCredential(
  service: string,
  credential: Credential
): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredentials = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );
  const newDB: DB = { credentials: [...filteredCredentials, credential] };
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}
