import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/context/ThemeContext';
import { PlusIcon, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';

const SideIncomeCard = ({ onUpdate }) => {
  const { theme } = useTheme();
  const [sideIncomes, setSideIncomes] = useState(() => {
    const stored = localStorage.getItem('sideIncomes');
    return stored ? JSON.parse(stored) : [];
  });
  const [newIncome, setNewIncome] = useState({ source: '', amount: '' });

  const handleAddIncome = () => {
    if (newIncome.source && newIncome.amount) {
      const updatedIncomes = [
        ...sideIncomes,
        {
          id: Date.now(),
          ...newIncome,
          amount: parseFloat(newIncome.amount),
        },
      ];
      setSideIncomes(updatedIncomes);
      localStorage.setItem('sideIncomes', JSON.stringify(updatedIncomes));
      setNewIncome({ source: '', amount: '' });
      onUpdate(updatedIncomes);
    }
  };

  const handleRemoveIncome = id => {
    const updatedIncomes = sideIncomes.filter(income => income.id !== id);
    setSideIncomes(updatedIncomes);
    localStorage.setItem('sideIncomes', JSON.stringify(updatedIncomes));
    onUpdate(updatedIncomes);
  };

  const totalSideIncome = sideIncomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className={`bg-gradient-to-tl ${theme.primary} rounded-xl hover:shadow-sm p-6`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme.highlight}`}>Side Income</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600">Source</label>
          <Input
            type="text"
            value={newIncome.source}
            onChange={e => setNewIncome({ ...newIncome, source: e.target.value })}
            className={`block w-full rounded-md ${theme.border} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            placeholder="Freelancing, Part-time, etc."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Monthly Amount (₹)</label>
          <Input
            type="number"
            value={newIncome.amount}
            onChange={e => setNewIncome({ ...newIncome, amount: e.target.value })}
            className={`block w-full rounded-md ${theme.border} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            placeholder="Amount"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleAddIncome}
            className={`flex items-center justify-center rounded-md shadow-sm text-sm font-medium ${theme.button} ${theme.text}`}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Income
          </Button>
        </div>
      </div>

      {sideIncomes.length > 0 && (
        <div className="space-y-4">
          <div className="border-t pt-4">
            <p className={`text-sm ${theme.text}`}>Total Side Income</p>
            <p className={`text-2xl font-bold ${theme.highlight}`}>
              ₹{totalSideIncome.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            {sideIncomes.map(income => (
              <div
                key={income.id}
                className={`flex items-center justify-between ${theme.secondary} p-3 rounded`}
              >
                <div>
                  <p className="font-medium">{income.source}</p>
                  <p className="text-sm text-gray-600">₹{income.amount.toLocaleString()}/month</p>
                </div>
                <Button onClick={() => handleRemoveIncome(income.id)} className={`${theme.button}`}>
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideIncomeCard;
