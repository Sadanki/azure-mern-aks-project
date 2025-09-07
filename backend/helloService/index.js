const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

// Routes
app.get('/', (req, res) => {
  res.send({ msg: 'Hello World' });
});

app.get('/hello', (req, res) => {
  res.send({ msg: 'Hello World' });
});

app.get('/health', (req, res) => {
  res.send({ status: 'OK' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
