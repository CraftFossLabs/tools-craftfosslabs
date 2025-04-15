import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { v4 as uuidv4 } from 'uuid';
import { IndianRupeeIcon } from 'lucide-react';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const EXPENSE_CATEGORIES = ['Food', 'Transportation', 'Housing', 'Utilities', 'Loans', 'Other'];

const ExpenseForm = ({
  expenses,
  editingExpense,
  setEditingExpense,
  onExpenseUpdate,
  showSuccessMessage,
}) => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    amount: '',
    category: 'Other',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({ ...editingExpense });
    }
  }, [editingExpense]);

  const resetForm = () => {
    setFormData({
      id: '',
      description: '',
      amount: '',
      category: 'Other',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setEditingExpense(null);
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

    let updatedExpenses;
    if (editingExpense) {
      updatedExpenses = expenses.map(expense =>
        expense.id === editingExpense.id ? { ...formData, id: expense.id } : expense
      );
      showSuccessMessage('Expense updated successfully!');
    } else {
      const newExpense = {
        ...formData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      updatedExpenses = [...expenses, newExpense];
      showSuccessMessage('New expense added successfully!');
    }

    onExpenseUpdate(updatedExpenses);
    resetForm();
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-tl ${theme.primary} rounded-2xl shadow-lg p-6 border-l-4 ${theme.border} ${theme.text} `}
    >
      <h2 className={`text-xl font-semibold mb-6 flex items-center ${theme.highlight} `}>
        {editingExpense ? '✏️ Edit Expense' : '💰 Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="block text-sm font-medium">Description</Label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="What did you spend on?"
            required
            className={`block w-full border ${theme.border}`}
          />
        </div>

        <div className="space-y-2">
          <Label className="block text-sm font-medium">Amount</Label>
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
              step="0.01"
              required
              className={`block w-full pl-10 border ${theme.border}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Select>
            <SelectTrigger className={`w-full border ${theme.border}`}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              >
                {EXPENSE_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Calendar
            mode="single"
            selected={formData.date}
            onSelect={date => handleInputChange({ target: { name: 'date', value: date } })}
          />
        </div>

        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-700">Notes (Optional)</Label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Add any additional notes..."
            className={` border ${theme.border}`}
          />
        </div>

        <div className="flex justify-end space-x-3">
          {editingExpense && (
            <Button
              type="button"
              variant="destructive"
              onClick={resetForm}
              className={`${theme.button}`}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="outline"
            disabled={isSubmitting}
            className={`${theme.button} flex items-center space-x-2`}
          >
            {isSubmitting ? (
              <>
                <Arrow className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>{editingExpense ? 'Update' : 'Add'} Expense</>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ExpenseForm;
