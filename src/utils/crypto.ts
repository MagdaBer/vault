import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function encryptedCredential(credential: Credential): Credential {
  const encryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    'supersecretkey'
  ).toString();
  const partiallyEncryptedCredential = {
    ...credential,
    password: encryptedPassword,
  };
  return partiallyEncryptedCredential;
}

export function decryptCredential(credential: Credential): Credential {
  const decryptedPassword = CryptoJS.TripleDES.decrypt(
    credential.password,
    'supersecretkey'
  ).toString(CryptoJS.enc.Utf8);
  const decryptedCredential = { ...credential, password: decryptedPassword };

  return decryptedCredential;
}
