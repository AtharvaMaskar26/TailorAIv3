import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with your actual login logic
    const userDatabase = [
      { id: '00401a367c5ac085cb9d4b77c56f3edcabf25153615db982fcc7991d182e10a9', username: 'user1', password: 'password123', isAdmin: false },
      { id: '0d6abaf72355724d85f28a0eee0800c9953c5aa89df05f988813de1e83f5033a', username: 'user2', password: 'password456', isAdmin: false },
      { id: '3', username: 'admin', password: 'admin', isAdmin: true },
    ];

    const user = userDatabase.find((user) => user.username === username && user.password === password);

    if (user) {
      // Store user ID and admin status in localStorage
      localStorage.setItem('userID', user.id);
      localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin));
      
      // Redirect based on user role
      if (user.isAdmin) {
        navigate('/admin'); // Redirect admin to the admin page
      } else {
        navigate('/gallery'); // Redirect regular user to the gallery page
      }
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors duration-200">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
