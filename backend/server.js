const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const todoItemsRouter = require('./routes/todoItems');

const app = express();

app.use(express.json()); // for parsing application/json

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
