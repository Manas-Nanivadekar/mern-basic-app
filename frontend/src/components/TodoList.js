// frontend/src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import { fetchTodos, createTodo, deleteTodo } from '../services/api';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      // Check if the fetched data is not null or undefined
      if (todosFromServer) {
        setTodos(todosFromServer);
      } else {
        // Handle the case where there is no data
        console.log('No todos found');
      }
    };

    getTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (!newTodo.trim()) return; // Prevent adding empty todos
    const todo = await createTodo({ text: newTodo});
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              {todo.text}
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos found. Add a new todo above!</p>
      )}
    </div>
  );
}

export default TodoList;
