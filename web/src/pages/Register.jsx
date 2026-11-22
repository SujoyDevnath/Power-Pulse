import React from 'react';
import { Login } from './Login';

/**
 * Register Page
 * Re-uses the unified, tabbed authentication portal with 'register' mode pre-selected.
 */
export const Register = () => {
  return <Login initialMode="register" />;
};
