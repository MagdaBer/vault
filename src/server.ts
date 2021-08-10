import express from 'express';
import { readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_reqest, response) => {
  response.status(200).json(await readCredentials());
});

app.get('/', (_request, response) => {
  response.send('Hello Server!');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
