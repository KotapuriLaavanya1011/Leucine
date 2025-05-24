import React, { useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");
  const [showTasks, setShowTasks] = useState(false);

  const fetchTodos = async () => {
    if (!showTasks) {
      try {
        const res = await axios.get("http://localhost:8080/api/todos/getAllTodos");
        setTodos(res.data);
      } catch (err) {
        setMessage("❌ Failed to fetch todos.");
      }
    }
    setShowTasks(!showTasks);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      await axios.post("http://localhost:8080/api/todos/addToDo", {
        id: Math.floor(Math.random() * 100000),
        task,
        completed: false,
      });
      setMessage("✅ Task added successfully.");
      setTask("");
      if (showTasks) fetchTodos();
    } catch (err) {
      setMessage("❌ Failed to add task.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setMessage("🗑️ Task deleted.");
      fetchTodos();
    } catch (err) {
      setMessage("❌ Failed to delete task.");
    }
  };

  const summarizeTodos = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/todos/summarize");
      setSummary(res.data);
    } catch (err) {
      setMessage("❌ Failed to generate summary.");
    }
  };

  return (
    <div style={{
      fontFamily: "Segoe UI, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    }}>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        width: "90%",
        maxWidth: "600px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        animation: "fadeIn 0.8s ease-in-out",
      }}>
        <h1 style={{
          fontSize: "32px",
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}>📝 My ToDo List</h1>

        {message && (
          <div style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px 15px",
            borderRadius: "6px",
            marginBottom: "16px",
            fontWeight: "bold",
            animation: "popIn 0.4s ease",
          }}>
            {message}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <input
            type="text"
            value={task}
            placeholder="What do you want to do?"
            onChange={(e) => setTask(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              transition: "border-color 0.3s",
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Add
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center" }}>
          <button
            onClick={fetchTodos}
            style={{
              backgroundColor: "#343a40",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {showTasks ? "Hide Tasks" : "Show Tasks"}
          </button>
          <button
            onClick={summarizeTodos}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Generate Summary
          </button>
        </div>

        {showTasks && todos.length > 0 && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {todos.map((todo, index) => (
              <li key={todo.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                backgroundColor: index % 2 === 0 ? "#f1f1f1" : "#e0e0e0",
                marginBottom: "10px",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
              }}>
                <span style={{ fontSize: "16px" }}>{todo.task}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#cc0000"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ff4d4d"}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {summary && (
          <div style={{
            marginTop: "20px",
            padding: "14px",
            backgroundColor: "#fff3cd",
            borderLeft: "6px solid #ffeeba",
            borderRadius: "8px",
            animation: "slideIn 0.4s ease-in-out"
          }}>
            <strong>Summary:</strong>
            <p style={{ margin: 0 }}>{summary}</p>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
