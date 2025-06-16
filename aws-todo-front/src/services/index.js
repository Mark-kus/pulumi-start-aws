// Si no está definida (entorno Docker), usa /api y se apoya en el proxy para redirigir
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

export const getTodos = async () => {
  const res = await fetch(`${baseURL}/todos/`);
  return await res.json();
};

export const createTodo = async (todo) => {
  const res = await fetch(`${baseURL}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

export const toggleTodo = async (todo_id) => {
  const res = await fetch(`${baseURL}/todos/${todo_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const deleteTodo = async (todo_id) => {
  const res = await fetch(`${baseURL}/todos/${todo_id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
  return await res.json();
};
