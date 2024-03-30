const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const todoItemsRouter = require('./routes/todoItems');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', todoItemsRouter);


app.use(express.json()); // for parsing application/json

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
