import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Auth from './Auth';
import './index.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Keep token in localStorage updated automatically
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <div className="app-container">
      {!token ? (
        <Auth setToken={setToken} />
      ) : (
        <div>
          <Header setToken={setToken} />
          <TaskList token={token} />
        </div>
      )}
    </div>
  );
}

// Optional Header component inside App.js for quick logout
function Header({ setToken }) {
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <header className="header">
      <h1 className="title">Task Manager</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default App;
