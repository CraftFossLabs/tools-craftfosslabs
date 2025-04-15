import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { v4 as uuidv4 } from 'uuid';
import { CalendarIcon, DockIcon, IndianRupeeIcon } from 'lucide-react';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoanForm = ({ loans, editingLoan, setEditingLoan, onLoanUpdate, showSuccessMessage }) => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    amount: '',
    startDate: '',
    minimumPayment: '',
  });

  useEffect(() => {
    if (editingLoan) {
      setFormData({ ...editingLoan });
    }
  }, [editingLoan]);

  const resetForm = () => {
    setFormData({ id: '', name: '', amount: '', startDate: '', minimumPayment: '' });
    setEditingLoan(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    let updatedLoans;
    if (editingLoan) {
      updatedLoans = loans.map(loan =>
        loan.id === editingLoan.id ? { ...formData, id: loan.id } : loan
      );
      showSuccessMessage('Loan updated successfully!');
    } else {
      const newLoan = { ...formData, id: uuidv4(), createdAt: new Date().toISOString() };
      updatedLoans = [...loans, newLoan];
      showSuccessMessage('Loan added successfully!');
    }

    onLoanUpdate(updatedLoans);
    resetForm();
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-tl ${theme.primary} rounded-2xl hover:shadow-lg p-6 border-l-4 ${theme.border}`}
    >
      <h2 className={`${theme.highlight} text-xl font-semibold mb-6 flex items-center`}>
        {editingLoan ? '✏️ Edit Loan' : '💰 Add New Loan'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Loan Name</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DockIcon className={`h-5 w-5 ${theme.highlight}`} />
            </div>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Car Loan"
              required
              className={`pl-10 pr-3 border ${theme.border}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-700">Loan Amount</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupeeIcon className={`h-5 w-5 ${theme.highlight}`} />
            </div>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              min="0"
              required
              className={`pl-10 pr-3 border ${theme.border}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-700">Start Date</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className={`h-5 w-5 ${theme.highlight}`} />
            </div>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className={`pl-10 pr-3 border ${theme.border}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-700">Monthly Payment</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupeeIcon className={`h-5 w-5 ${theme.highlight}`} />
            </div>
            <Input
              type="number"
              name="minimumPayment"
              value={formData.minimumPayment}
              onChange={handleInputChange}
              placeholder="Enter monthly payment"
              min="0"
              required
              className={`pl-10 pr-3 border ${theme.border}`}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          {editingLoan && (
            <Button variant={'destructive'} type="button" onClick={resetForm}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`${theme.button}  flex items-center space-x-2`}
          >
            {isSubmitting ? (
              <>
                <Arrow className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>{editingLoan ? 'Update' : 'Add'} Loan</>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default LoanForm;
