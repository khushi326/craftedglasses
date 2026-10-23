import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Route protection wrapper for Admin pages.
 * Ensures only authenticated administrators with an active admin role can access.
 */
export default function AdminRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('craftedglasses_admin_token');
  const adminUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('craftedglasses_admin_user') || '{}');
    } catch {
      return {};
    }
  })();

  if (!token || adminUser.role !== 'admin') {
    // Redirect unauthenticated or non-admin requests to Admin Login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
