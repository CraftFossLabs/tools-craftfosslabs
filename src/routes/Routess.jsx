import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/common/Home';
import CommonLayout from './layout/CommonLayout';
import About from '../pages/common/About';
import Contact from '../pages/common/Contact';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ResetPassword from '../pages/auth/ResetPassword';
import Dashboard from '../pages/common/Dashboard';
import ErrorBoundary from '../helpers/ErrorBoundary';
import NotFound from '../pages/common/NotFound';
import PrivacyPolicy from '../pages/common/PrivacyPolicy';
import TermsCondition from '../pages/common/TermsCondition';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
import Overview from '@/pages/financePlanner/Overview';
import Expenses from '@/pages/financePlanner/Expenses';
import Loan from '@/pages/financePlanner/Loan';
import Reports from '@/pages/financePlanner/Reports';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/common/Preloader';
import CodeDashboard from '@/pages/vs-code/CodeDashboard';
import CodeViewer from '@/pages/vs-code/CodeViewer';
import VerifyEmail from '@/pages/auth/VerifyEmail';
import SetNewPassword from '@/pages/auth/SetNewPassword';
import PersonalManagerDashboard from '@/pages/Personal-Manager/PersonalManagerDashboard';

const Routess = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader onLoadingComplete={() => setIsLoading(false)} />
        ) : (
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

              {/* auth pges  */}
              <Route
                path="/register"
                element={<CommonLayout children={<AuthLayout children={<Register />} />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/login"
                element={<CommonLayout children={<AuthLayout children={<Login />} />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/reset-password"
                element={<CommonLayout children={<AuthLayout children={<ResetPassword />} />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/verify-email/:token"
                element={<CommonLayout children={<AuthLayout children={<VerifyEmail />} />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/reset-password/:resetToken"
                element={<CommonLayout children={<AuthLayout children={<SetNewPassword />} />} />}
                ErrorBoundary={<ErrorBoundary />}
              />

              <Route
                path="/dashboard"
                element={<DashboardLayout children={<Dashboard />} />}
                ErrorBoundary={<ErrorBoundary />}
              />

              <Route
                path="/finance-planner/overview"
                element={<DashboardLayout children={<Overview />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/finance-planner/expense"
                element={<DashboardLayout children={<Expenses />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/finance-planner/loan"
                element={<DashboardLayout children={<Loan />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/finance-planner/reports"
                element={<DashboardLayout children={<Reports />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/code-viewer/your-snippets"
                element={<DashboardLayout children={<CodeDashboard />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/code-viewer/view/:urlCode"
                element={<CodeViewer />}
                ErrorBoundary={<ErrorBoundary />}
              />

              <Route
                path="/personal-manger/overview"
                element={<DashboardLayout children={<PersonalManagerDashboard />} />}
                ErrorBoundary={<ErrorBoundary />}
              />



              <Route
                path="/privacy-policy"
                element={<CommonLayout children={<PrivacyPolicy />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route
                path="/terms-condition"
                element={<CommonLayout children={<TermsCondition />} />}
                ErrorBoundary={<ErrorBoundary />}
              />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Router>
        )}
      </AnimatePresence>
    </>
  );
};

export default Routess;
