import React, { useState, useEffect } from 'react';

function TodoList() {
  const [items, setItems] = useState([]);

  // Fetch items from the backend
  useEffect(() => {
    fetch('/todoItems')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.text} - {item.completed ? 'Done' : 'Pending'}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
