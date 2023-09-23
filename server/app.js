require('dotenv/config');
const express = require('express');
const { connectDB } = require('./db/connection');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);

app.get('/health-check', (req, res) => res.status(200).send('Hello world, all good'));

const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running at ${port}`));
});
