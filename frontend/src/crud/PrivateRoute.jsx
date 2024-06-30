import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../crud/Auth';

const PrivateRoute = ({ children }) => {
  const user = Auth.getCurrentUser();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
