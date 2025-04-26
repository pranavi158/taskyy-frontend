import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;



function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous errors

    // Validate input before sending request
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Authentication failed.');

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="auth-form" className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="email"
        required
        autoFocus
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label="password"
        required
      />

      {error && <div className="error-message">{error}</div>}

      <button type="submit" aria-label="submit-button">
        {isLogin ? 'Login' : 'Register'}
      </button>

      <button type="button" onClick={() => setIsLogin(!isLogin)} aria-label="toggle-auth">
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </form>
  );
}

export default Auth;

