// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './component/Login';
import GalleryPage from './component/GalleryPage';
import ProductDetailsPage from './component/ProductPage';
import AdminPage from './component/AdminPage';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('userID'); // Check if user is logged in
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check if user is admin

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gallery" element={isAuthenticated ? <GalleryPage /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={isAuthenticated ? <ProductDetailsPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
