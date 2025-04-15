import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { BanknoteIcon } from 'lucide-react';
import LoanForm from '@/components/core/finance-planner/LoanForm';
import LoanList from '@/components/core/finance-planner/LoanList';

const Loan = () => {
  const { theme } = useTheme();
  const [loans, setLoans] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingLoan, setEditingLoan] = useState(null);

  useEffect(() => {
    const storedLoans = localStorage.getItem('loans');
    if (storedLoans) {
      setLoans(JSON.parse(storedLoans));
    }
  }, []);

  const handleLoanUpdate = updatedLoans => {
    setLoans(updatedLoans);
    localStorage.setItem('loans', JSON.stringify(updatedLoans));
  };

  const showSuccessMessage = message => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <div className="md:px-4 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center space-x-4"
        >
          <div className={`p-3 rounded-full bg-gradient-to-r ${theme.primary} bg-opacity-10`}>
            <BanknoteIcon className={`w-8 h-8 text-white`} />
          </div>
          <div>
            <h1 className="md:text-3xl font-bold text-gray-900">Loan Planner</h1>
            <p className="md:text-lg text-gray-600">Manage your loans with ease</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LoanForm
            loans={loans}
            editingLoan={editingLoan}
            setEditingLoan={setEditingLoan}
            onLoanUpdate={handleLoanUpdate}
            showSuccessMessage={showSuccessMessage}
          />
          <LoanList
            loans={loans}
            onEdit={setEditingLoan}
            onLoanUpdate={handleLoanUpdate}
            showSuccessMessage={showSuccessMessage}
          />
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Loan;
