import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {
  addCredential,
  deletCredential,
  getCredential,
  readCredentials,
  updateCredential,
} from './utils/credentials';
import type { Credential } from './types';
import { validateMasterpassword } from './utils/validation';
import { connectDatabase } from './utils/database';

if (!process.env.MONGODB_URL) {
  throw new Error('No MONGODB_URL dotenv variable');
}

const app = express();
const port = 3000;
app.use(express.json());

app.get('/api/credentials', async (_reqest, response) => {
  try {
    response.status(200).json(await readCredentials());
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error! Please try again later.');
  }
});

app.post('/api/credentials', async (request, response) => {
  const credential: Credential = request.body;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  await addCredential(credential, masterPassword);
  response.status(200).send(credential);
});

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }

  try {
    const credential = await getCredential(service, masterPassword);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not find service: ${service}`);
  }
});

app.put('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const credential: Credential = request.body;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  try {
    await updateCredential(service, credential, masterPassword);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not find service: ${service}`);
  }
});

app.delete('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  await deleteCredential(service);
  response.status(200).send();
});

app.get('/', (_request, response) => {
  response.send('Hello Credentials!');
});

connectDatabase(process.env.MONGODB_URL).then(() => {
  app.listen(port, () => {
    console.log('Server is listening!');
  });
});
