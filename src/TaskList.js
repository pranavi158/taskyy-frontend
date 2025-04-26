import React, { useEffect, useState } from 'react';
import './index.css';

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const fetchTasks = async () => {
    const res = await fetch("https://taskyy-backend.onrender.com/api/tasks"    , {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    const res = await fetch("https://taskyy-backend.onrender.com/api/tasks"    , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ text: task })
    });
    if (res.ok) fetchTasks();
  };
  const deleteTask = async (id) => {
    await fetch(`https://taskyy-backend.onrender.com/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchTasks();
  };
  

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div role="main" aria-label="task-list">
      <input value={task} onChange={(e) => setTask(e.target.value)} aria-label="new-task" />
      <button onClick={addTask} aria-label="add-task">Add Task</button>
      <ul>
        {tasks.map(t => (
          <li key={t._id} aria-label={`task-${t.text}`}>
            {t.text} <button onClick={() => deleteTask(t._id)} aria-label={`delete-${t.text}`}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TaskList;