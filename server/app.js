const express = require('express');
require('dotenv/config');
const { connectDB } = require('./db/connection');

const app = express();

app.get('/health-check', (req, res) => res.status(200).send('Hello world, all good'));

const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running at ${port}`));
});
