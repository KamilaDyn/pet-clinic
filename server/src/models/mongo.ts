import mongoose from 'mongoose';
if (!process.env.MONGO_DB) {
  console.log('add mongo db url');
  process.exit(1);
}

const url = process.env.MONGO_DB;

mongoose.set('strictQuery', false);

mongoose.connect(url);
