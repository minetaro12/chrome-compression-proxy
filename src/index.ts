import express from 'express';
const app = express();
const port = process.env.PORT || 8000;

import getProcess from './get';
app.use('/', getProcess);

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});