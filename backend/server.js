import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const { PORT, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT);
    console.log('');
    console.log(`App listening on port ${PORT}`);
  })
  .catch(() => console.log('Mongo don`t connect'));
