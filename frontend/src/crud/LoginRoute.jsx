import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../crud/Auth';

const LoginLink = ({ children }) => {
  const user = Auth.getCurrentUser();

  if (user) {
    return <Navigate to="/client" replace />;
  }

  return children;
};

export default LoginLink;
