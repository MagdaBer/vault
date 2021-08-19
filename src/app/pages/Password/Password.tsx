import React from 'react';
import { useParams } from 'react-router';

export default function Password(): JSX.Element {
  const { service } = useParams<{ service: string }>();
  return <p>Password is {service}</p>;
}
