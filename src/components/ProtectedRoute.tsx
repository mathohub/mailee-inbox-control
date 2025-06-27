
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPaid?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiresPaid = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiresPaid && !user.isPaid) {
    return <Navigate to="/payment" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
