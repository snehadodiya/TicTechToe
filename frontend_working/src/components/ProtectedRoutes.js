// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // If no token found (i.e., the user is not logged in), redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children; // If token is found, render the children (protected route)
};

export default ProtectedRoute;