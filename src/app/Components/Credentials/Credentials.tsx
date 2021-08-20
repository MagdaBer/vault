import React from 'react';
import { Credential } from '../../../types';

type CredentialCardProps = {
  credentialData: Credential;
};

export default function CredentialCard({
  credentialData,
}: CredentialCardProps): JSX.Element {
  return (
    <div>
      <p>{credentialData.service}</p>
      <p>{credentialData.username}</p>
      <p>{credentialData.password}</p>
    </div>
  );
}
