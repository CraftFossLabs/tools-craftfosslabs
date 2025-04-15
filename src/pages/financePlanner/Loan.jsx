import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { IndianRupeeIcon } from 'lucide-react';
import LoanForm from '@/components/core/finance-planner/LoanForm';
import LoanList from '@/components/core/finance-planner/LoanList';
import Header from '@/components/core/finance-planner/Header';
import SuccessMessage from '@/components/core/finance-planner/SuccessMessage';

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
      <div className="p-2">
        <Header
          title={'Loan Planner'}
          text={'Manage your loans with ease'}
          children={<IndianRupeeIcon className={`w-8 h-8 ${theme.text}`} />}
        />
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
            <SuccessMessage
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              message={successMessage}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Loan;
