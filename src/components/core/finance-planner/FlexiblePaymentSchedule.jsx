import { ArrowDown, ChartBarIcon, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

const FlexiblePaymentSchedule = ({ loan, onSave }) => {
  const [schedules, setSchedules] = useState(loan.flexibleSchedule || []);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const { theme } = useTheme();

  const formatCurrency = amount => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddSchedule = () => {
    const newSchedule = {
      startMonth: 1,
      endMonth: 3,
      monthlyPayment: loan.minimumPayment,
    };
    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);
    onSave(updatedSchedules);
  };

  // Calculate estimated months based on minimum payment
  const estimatedMonths = Math.ceil(loan.totalAmount / loan.monthlyPayment);

  if (!loan || !loan.schedule) return null;

  return (
    <div className="mt-4 space-y-4">
      <div className={`bg-gradient-to-bl ${theme.primary} ${theme.text} rounded-lg md:p-4`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Payment Schedule</h3>
          <Button
            onClick={handleAddSchedule}
            className={`rounded-full bg-gradient-to-tl ${theme.primary} ${theme.text}`}
          >
            <PlusIcon className="w-5 h-5" />
          </Button>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4  w-full ${theme.text} `}>
          <div className={`p-4 rounded-lg ${theme.secondary}`}>
            <p className={` ${theme.text} text-sm`}>Monthly Payment</p>
            <p className={`md:text-xl font-bold ${theme.text} `}>
              {formatCurrency(loan.monthlyPayment)}
            </p>
          </div>
          <div className={`p-4 rounded-lg bg-gradient-to-b ${theme.secondary}`}>
            <p className={` ${theme.text} text-sm`}>Total Amount</p>
            <p className={`md:text-xl font-bold ${theme.text} `}>
              {formatCurrency(loan.totalAmount)}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${theme.secondary}`}>
            <p className={` ${theme.text} text-sm`}>Estimated Months</p>
            <p className={`md:text-xl font-bold ${theme.text} `}>{estimatedMonths} months</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${theme.secondary} ${theme.text} `}>
            <tr>
              <th className="md:px-6 md:py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Month
              </th>
              <th className="md:px-6 md:py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Payment
              </th>
              <th className="md:px-6 md:py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Remaining
              </th>
              <th className="md:px-6 md:py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Progress
              </th>
            </tr>
          </thead>
          <tbody
            className={`bg-gradient-to-tr ${theme.primary} ${theme.text} divide-y divide-gray-200`}
          >
            {loan.schedule.map((payment, index) => (
              <motion.tr
                key={payment.month}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${selectedMonth === index ? <>{`${theme.secondary}`}</> : ''} cursor-pointer`}
                onClick={() => setSelectedMonth(index)}
              >
                <td className="md:px-6 md:py-4 whitespace-nowrap text-sm">{payment.month}</td>
                <td className="md:px-6 md:py-4 whitespace-nowrap text-sm">
                  {formatCurrency(payment.payment)}
                </td>
                <td className="md:px-6 md:py-4 whitespace-nowrap text-sm">
                  {formatCurrency(payment.remainingAmount)}
                </td>
                <td className="md:px-6 md:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${theme.accent} rounded-full h-2`}
                        style={{ width: `${payment.percentage}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm">{payment.percentage.toFixed(1)}%</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMonth !== null && loan.schedule[selectedMonth] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${theme.accent} rounded-lg p-4 mt-4`}
        >
          <h4 className="text-lg font-semibold mb-2">
            Payment Details - {loan.schedule[selectedMonth].month}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`bg-gradient-to-tl ${theme.primary} p-4 rounded-lg hover:shadow-sm`}>
              <div className="flex items-center space-x-2">
                <ChartBarIcon className={`w-5 h-5 ${theme.highlight}`} />
                <p className="text-sm">Monthly Payment</p>
              </div>
              <p className="text-lg font-semibold mt-1">
                {formatCurrency(loan.schedule[selectedMonth].payment)}
              </p>
            </div>
            <div className={`bg-gradient-to-tl ${theme.primary} p-4 rounded-lg hover:shadow-sm`}>
              <div className="flex items-center space-x-2">
                <ArrowDown className={`w-5 h-5 ${theme.highlight}`} />
                <p className="text-sm">Remaining Amount</p>
              </div>
              <p className="text-lg font-semibold mt-1">
                {formatCurrency(loan.schedule[selectedMonth].remainingAmount)}
              </p>
            </div>
            <div className={`bg-gradient-to-tl ${theme.primary} p-4 rounded-lg hover:shadow-sm`}>
              <div className="flex items-center space-x-2">
                <ChartBarIcon className={`w-5 h-5 ${theme.highlight}`} />
                <p className="text-sm">Progress</p>
              </div>
              <p className="text-lg font-semibold mt-1">
                {loan.schedule[selectedMonth].percentage.toFixed(1)}% Paid
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FlexiblePaymentSchedule;
