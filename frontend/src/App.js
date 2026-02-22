import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch(() => alert("Error fetching tasks"));
  };

  const addTask = () => {
    if (!text.trim()) return alert("Task cannot be empty!");

    axios
      .post("http://localhost:5000/add", { text })
      .then(() => {
        setText("");
        fetchTasks();
      })
      .catch(() => alert("Error adding task"));
  };

  return (
  <div className="container">
    <h1 className="title">MERN To-Do App</h1>

    <div className="input-row">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={addTask}>Add</button>
    </div>

    <ul className="task-list">
      {tasks.map((t) => (
        <li key={t._id} className="task-item">
          {t.text}
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;