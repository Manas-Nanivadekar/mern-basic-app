// frontend/src/services/api.js

const baseUrl = process.env.REACT_APP_BASE_URL; // Assuming your server.js mounts this router at the root

export const fetchTodos = async () => {
  const response = await fetch(baseUrl);
  return response.json();
};

export const createTodo = async (text) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
