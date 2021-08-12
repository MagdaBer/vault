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
