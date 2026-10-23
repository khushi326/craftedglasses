import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(() => {
    try {
      const stored = localStorage.getItem('craftedglasses_customer');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [customerToken, setCustomerToken] = useState(() => {
    return localStorage.getItem('craftedglasses_customer_token') || null;
  });

  const loginCustomer = (token, customerData) => {
    setCustomerToken(token);
    setCustomer(customerData);
    localStorage.setItem('craftedglasses_customer_token', token);
    localStorage.setItem('craftedglasses_customer', JSON.stringify(customerData));
  };

  const logoutCustomer = () => {
    setCustomerToken(null);
    setCustomer(null);
    localStorage.removeItem('craftedglasses_customer_token');
    localStorage.removeItem('craftedglasses_customer');
  };

  const updateCustomerProfile = (updatedData) => {
    setCustomer((prev) => {
      const merged = { ...prev, ...updatedData };
      localStorage.setItem('craftedglasses_customer', JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        customerToken,
        isAuthenticated: !!customerToken,
        loginCustomer,
        logoutCustomer,
        updateCustomerProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
