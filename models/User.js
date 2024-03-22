import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
  },
  phone: {
    type: String,
    required: [true, 'Please enter your email'],
  },
  gender: {
    type: String,
    required: [true, 'Please enter your email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
