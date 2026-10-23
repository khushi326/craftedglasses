import React from 'react';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';

import Footer from './components/Footer';

import ScrollToTop from './components/ScrollToTop';

import { AuthProvider } from './context/AuthContext';



// Customer-Facing Pages

import Home from './pages/Home';

import Shop from './pages/Shop';

import ProductDetails from './pages/ProductDetails';

import ProductCustomisation from './pages/ProductCustomisation';

import CustomGiftRequest from './pages/CustomGiftRequest';

import CustomerLogin from './pages/CustomerLogin';

import CustomerRegistration from './pages/CustomerRegistration';

import OrderForm from './pages/OrderForm';

import OrderConfirmation from './pages/OrderConfirmation';

import MyOrders from './pages/MyOrders';

import About from './pages/About';

import Contact from './pages/Contact';



// Admin Portal Pages

import AdminLogin from './pages/AdminLogin';

import AdminDashboard from './pages/AdminDashboard';

import AdminRoute from './components/AdminRoute';



function AppContent() {

  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');



  return (

    <div className={`app-shell ${isAdminRoute ? 'admin-shell' : ''}`}>

      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* Customer Storefront Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/customise/:id" element={<ProductCustomisation />} />

        <Route path="/custom-gift" element={<CustomGiftRequest />} />

        <Route path="/login" element={<CustomerLogin />} />

        <Route path="/register" element={<CustomerRegistration />} />

        <Route path="/order" element={<OrderForm />} />

        <Route path="/order/:id" element={<OrderForm />} />

        <Route path="/order-confirmation" element={<OrderConfirmation />} />



        {/* Customer Account / My Orders Routes */}

        <Route path="/orders" element={<MyOrders />} />

        <Route path="/my-orders" element={<Navigate to="/orders" replace />} />

        <Route path="/account" element={<MyOrders />} />

        <Route path="/my-account" element={<MyOrders />} />



        {/* Informational Routes */}

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />



        {/* Admin Portal Routes */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin-login" element={<Navigate to="/admin/login" replace />} />

        <Route

          path="/admin"

          element={

            <AdminRoute>

              <AdminDashboard />

            </AdminRoute>

          }

        />

        <Route

          path="/admin/dashboard"

          element={

            <AdminRoute>

              <AdminDashboard />

            </AdminRoute>

          }

        />



        {/* Fallback to Home */}

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {!isAdminRoute && <Footer />}

    </div>

  );

}



export default function App() {

  return (

    <BrowserRouter>

      <AuthProvider>

        <ScrollToTop />

        <AppContent />

      </AuthProvider>

    </BrowserRouter>

  );

}
