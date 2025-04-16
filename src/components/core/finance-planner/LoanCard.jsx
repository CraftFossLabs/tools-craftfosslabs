import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { CalendarIcon, CurrencyIcon, IndianRupeeIcon } from 'lucide-react';

const LoanCard = ({ loan, children }) => {
  const { theme } = useTheme();

  if (!loan) return null;

  const formatCurrency = amount => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = date => {
    if (!date) return 'No date';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-tl ${theme.primary} ${theme.text} w-full rounded-xl hover:shadow-sm overflow-hidden`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gradient-to-b ${theme.primary}`}>
              <IndianRupeeIcon className={`w-6 h-6 ${theme.text}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{loan.purpose || 'Loan'}</h2>
              <div className="flex items-center space-x-4 mt-1 text-sm ">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{formatDate(loan.startDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CurrencyIcon className="w-4 h-4" />
                  <span>{formatCurrency(loan.amount)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">Interest Rate</p>
            <p className="md:text-lg font-semibold">0 %</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 ">
          <div className={`p-4 rounded-lg bg-gradient-to-r ${theme.primary}`}>
            <p className={`text-sm  ${theme.text} `}>Monthly Payment</p>
            <p className={`text-xl font-bold`}>{formatCurrency(loan.monthlyPayment)}</p>
          </div>
          <div className={`p-4 rounded-lg bg-gradient-to-r ${theme.primary}`}>
            <p className={`text-sm  ${theme.text} `}>Total Amount</p>
            <p className={`text-xl font-bold`}>{formatCurrency(loan.totalAmount)}</p>
          </div>
          <div className={`p-4 rounded-lg bg-gradient-to-r ${theme.primary}`}>
            <p className={`text-sm  ${theme.text} `}>Estimated Months</p>
            <p className={`text-xl font-bold`}>
              {Math.ceil(loan.totalAmount / loan.monthlyPayment)} months
            </p>
          </div>
        </div>

        {children}
      </div>
    </motion.div>
  );
};

export default LoanCard;
