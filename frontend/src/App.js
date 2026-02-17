
import React, { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const loadTodos = async () => {
    const res = await API.get("/");
    setTodos(res.data);
  };

  useEffect(() => { loadTodos(); }, []);

  const addTodo = async () => {
    if(!title) return;
    await API.post("/", { title, completed:false });
    setTitle("");
    loadTodos();
  };

  const toggleTodo = async (todo) => {
    await API.put(`/${todo.id}`, {...todo, completed: !todo.completed});
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/${id}`);
    loadTodos();
  };

  return (
    <div style={{width:"400px", margin:"auto"}}>
      <h2>Todo App</h2>

      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor:"pointer"
              }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
