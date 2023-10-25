import mongoose from 'mongoose';
import app from './app.js';

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT);
    console.log('');
    console.log(`App listening on port ${PORT}`);
  })
  .catch(() => console.log('Mongo don`t connect'));
