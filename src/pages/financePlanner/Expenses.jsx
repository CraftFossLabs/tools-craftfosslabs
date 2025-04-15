import ExpenseForm from '@/components/core/finance-planner/ExpenseForm';
import ExpenseList from '@/components/core/finance-planner/ExpenseList';
import SuccessMessage from '@/components/core/finance-planner/SuccessMessage';
import { useTheme } from '@/context/ThemeContext';
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReceiptCentIcon } from 'lucide-react';
import Header from '@/components/core/finance-planner/Header';
const Expenses = () => {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const handleExpenseUpdate = updatedExpenses => {
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
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
          title={'Expense Tracker'}
          text={'Track and manage your daily expenses'}
          children={<ReceiptCentIcon className={`w-8 h-8 ${theme.text}`} />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseForm
            expenses={expenses}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
            onExpenseUpdate={handleExpenseUpdate}
            showSuccessMessage={showSuccessMessage}
          />
          <ExpenseList
            expenses={expenses}
            onEdit={setEditingExpense}
            onExpenseUpdate={handleExpenseUpdate}
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

export default Expenses;
