import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function encryptedCredential(
  credential: Credential,
  key: string
): Credential {
  const encryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    key
  ).toString();
  const partiallyEncryptedCredential = {
    ...credential,
    password: encryptedPassword,
  };
  return partiallyEncryptedCredential;
}

export function decryptCredential(
  credential: Credential,
  key: string
): Credential {
  const decryptedPassword = CryptoJS.TripleDES.decrypt(
    credential.password,
    key
  ).toString(CryptoJS.enc.Utf8);
  const decryptedCredential = { ...credential, password: decryptedPassword };

  return decryptedCredential;
}
