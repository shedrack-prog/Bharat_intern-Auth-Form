import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import connectDb from './db/connectDB.js';
import bcrypt from 'bcrypt';
import User from './models/User.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/v1/auth/signup', async (req, res) => {
  try {
    const { name, email, password, phone, age, gender } = req.body;
    // if (!name || !email || !password || !phone || !age || !gender) {
    //   return res
    //     .status(400)
    //     .json({ message: 'Please make sure to provide all values.' });
    // }
    const userAlreadyExists = await User.findOne({
      email,
    });
    if (userAlreadyExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
    }).save();
    return res.redirect('/login_success.html');
  } catch (error) {
    console.log(error);
  }
});

// app.get('/', (req, res) => {
//   res.send('public/index.html');
// });

app.get('/', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
  });
  return res.redirect('index.html');
});
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log('App listening on port 5000!');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
