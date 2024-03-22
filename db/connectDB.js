import mongoose from 'mongoose';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

const connectDb = (url) => {
  return mongoose.connect(url);
};
export default connectDb;
