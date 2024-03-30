
const express = require('express');
const router = express.Router();
const TodoItem = require('../models/TodoItem');

router.post('/', async (req, res) => {
  const newItem = new TodoItem({
    text: req.body.text,
  });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await TodoItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.patch('/:id', getTodoItem, async (req, res) => {
  if (req.body.text != null) {
    res.todoItem.text = req.body.text;
  }
  if (req.body.completed != null) {
    res.todoItem.completed = req.body.completed;
  }
  try {
    const updatedItem = await res.todoItem.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', getTodoItem, async (req, res) => {
  try {
    await res.todoItem.remove();
    res.json({ message: 'Deleted Todo Item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get item by ID
async function getTodoItem(req, res, next) {
  let todoItem;
  try {
    todoItem = await TodoItem.findById(req.params.id);
    if (todoItem == null) {
      return res.status(404).json({ message: 'Cannot find item' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.todoItem = todoItem;
  next();
}

module.exports = router;
