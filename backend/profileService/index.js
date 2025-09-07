const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cors());

// Health check route
app.get('/health', (req, res) => {
  res.send({ status: 'OK' });
});

// Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  age: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

// Add user route
app.post('/addUser', async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ error: 'Both name and age are required.' });
    }

    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const newUser = new User({ name, age });
    await newUser.save();

    res.status(201).json({ msg: 'User added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

// Fetch all users
app.get('/fetchUser', async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ msg: "No users found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

// Profile route (same as fetchUser)
app.get('/profile', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});