// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to handle authentication check
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If the user is authenticated, render the children (the protected component)
  // Otherwise, redirect to login page
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
