import process from 'node:process';
import express from 'express';
import { createEndpoints } from './endpoints/notes.js'

const PORT = process.env.SERVER_PORT || 3000
const app = express();

app.use(express.json());

createEndpoints(app);

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});