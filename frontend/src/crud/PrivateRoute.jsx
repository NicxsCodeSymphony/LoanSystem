import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../crud/Auth';

const PrivateRoute = ({ children }) => {
  const user = Auth.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
