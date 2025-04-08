import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CommonLayout from './layout/CommonLayout';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ResetPassword from '../pages/auth/ResetPassword';
import Dashboard from '../pages/Dashboard';
import ErrorBoundary from '../helpers/ErrorBoundary';
import NotFound from '../pages/NotFound';

const Routess = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<CommonLayout children={<Home />} />}
          ErrorBoundary={<ErrorBoundary />}
        />
        <Route
          path="/about"
          element={<CommonLayout children={<About />} />}
          ErrorBoundary={<ErrorBoundary />}
        />
        <Route
          path="/contact"
          element={<CommonLayout children={<Contact />} />}
          ErrorBoundary={<ErrorBoundary />}
        />
        <Route
          path="/register"
          element={<CommonLayout children={<Register />} />}
          ErrorBoundary={<ErrorBoundary />}
        />
        <Route
          path="/login"
          element={<CommonLayout children={<Login />} />}
          ErrorBoundary={<ErrorBoundary />}
        />
        <Route
          path="/reset-password"
          element={<CommonLayout children={<ResetPassword />} />}
          ErrorBoundary={<ErrorBoundary />}
        />
        <Route
          path="/dashboard"
          element={<CommonLayout children={<Dashboard />} />}
          ErrorBoundary={<ErrorBoundary />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routess;
