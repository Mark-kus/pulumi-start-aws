import { useEffect, useRef, useState } from "react";
import "./App.css";

import { createTodo, deleteTodo, getTodos, toggleTodo } from "./services";

function App() {
  const [todos, setTodos] = useState([]);
  const input = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleCreateTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = input.current.value.trim();
    if (inputValue) {
      handleCreateTodo({ title: inputValue, completed: false });
      input.current.value = "";
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target;
      if (input.value.trim()) {
        handleCreateTodo({ title: input.value, completed: false });
        input.value = "";
      }
    }
  };

  const handleToggleTodo = async (todo_id) => {
    try {
      toggleTodo(todo_id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === todo_id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === todo_id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );
    }
  };

  const handleDelete = async (todo_id) => {
    try {
      deleteTodo(todo_id);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.todo_id !== todo_id)
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={input}
          type="text"
          placeholder="New Todo"
          required
          onKeyDown={handleEnterKey}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.todo_id}>
            <h2>{todo.title}</h2>
            <div className="todo-actions">
              <button onClick={() => handleToggleTodo(todo.todo_id)}>
                <span>{todo.completed ? "✔️" : "❔"}</span>
              </button>
              <button onClick={() => handleDelete(todo.todo_id)}>
                <span>🗑️</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
