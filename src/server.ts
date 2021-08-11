import express from 'express';
import { getCredential, readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_reqest, response) => {
  try {
    response.status(200).json(await readCredentials());
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error! Please try again later.');
  }
});

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  try {
    const credential = await getCredential(service);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not find service: ${service}`);
  }
});

app.get('/', (_request, response) => {
  response.send('Hello Server!');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
