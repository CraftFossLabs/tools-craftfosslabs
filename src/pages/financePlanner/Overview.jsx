import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  BadgeIndianRupeeIcon,
  IndianRupeeIcon,
  LayoutDashboardIcon,
  PencilIcon,
  Wallet2Icon,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import StatCard from '@/components/core/finance-planner/StatCard';
import SideIncomeCard from '@/components/core/finance-planner/SideIncomeCard';
import CategoryCard from '@/components/core/finance-planner/CategoryCard';
import RecentTransactionCard from '@/components/core/finance-planner/RecentTransactionCard';

const Overview = () => {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [loans, setLoans] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [expensesByCategory, setExpensesByCategory] = useState({});
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [tempSalary, setTempSalary] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const updateTotalIncome = (salary, sideIncomes = []) => {
    const sideIncomeTotal = sideIncomes.reduce(
      (sum, income) => sum + parseFloat(income.amount || 0),
      0
    );
    const total = parseFloat(salary) + sideIncomeTotal;
    setTotalIncome(total);
    localStorage.setItem('totalIncome', total.toString());
  };

  const calculateExpenseStats = expenseData => {
    const total = expenseData.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    setTotalExpenses(total);

    const categoryTotals = expenseData.reduce((acc, expense) => {
      const category = expense.category || 'Other';
      acc[category] = (acc[category] || 0) + parseFloat(expense.amount || 0);
      return acc;
    }, {});
    setExpensesByCategory(categoryTotals);
  };

  const calculateLoanStats = loanData => {
    const total = loanData.reduce((sum, loan) => sum + parseFloat(loan.amount || 0), 0);
    setTotalLoans(total);
  };

  const updateRecentTransactions = (expenses = [], loans = []) => {
    const allTransactions = [
      ...expenses.map(exp => ({ ...exp, type: 'expense' })),
      ...loans.map(loan => ({ ...loan, type: 'loan' })),
    ]
      .sort((a, b) => new Date(b.date || b.startDate) - new Date(a.date || a.startDate))
      .slice(0, 5);

    setRecentTransactions(allTransactions);
  };

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    const storedLoans = localStorage.getItem('loans');
    const storedSalary = localStorage.getItem('monthlySalary');
    const storedSideIncomes = localStorage.getItem('sideIncomes');

    const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    const parsedLoans = storedLoans ? JSON.parse(storedLoans) : [];
    const parsedSalary = storedSalary ? parseFloat(storedSalary) : 0;
    const parsedSideIncomes = storedSideIncomes ? JSON.parse(storedSideIncomes) : [];

    setExpenses(parsedExpenses);
    setLoans(parsedLoans);
    setMonthlySalary(parsedSalary);

    calculateExpenseStats(parsedExpenses);
    calculateLoanStats(parsedLoans);
    updateTotalIncome(parsedSalary, parsedSideIncomes);
    updateRecentTransactions(parsedExpenses, parsedLoans);
  }, []);

  const handleSideIncomeUpdate = sideIncomes => {
    updateTotalIncome(monthlySalary, sideIncomes);
  };

  const handleSalarySubmit = () => {
    const newSalary = parseFloat(tempSalary);
    if (!isNaN(newSalary) && newSalary >= 0) {
      setMonthlySalary(newSalary);
      localStorage.setItem('monthlySalary', newSalary.toString());
      setIsEditingSalary(false);
      updateTotalIncome(newSalary);
    }
  };
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center space-x-4"
        >
          <div className={`p-3 rounded-full bg-gradient-to-r ${theme.primary} bg-opacity-10`}>
            <LayoutDashboardIcon className={`w-8 h-8 text-white`} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
            <p className="text-lg text-gray-600">Track your finances and plan your future</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Monthly Income"
            value={`₹${totalIncome}`}
            borderColor="border-purple-400"
          >
            <div className="mt-2">
              {isEditingSalary ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={tempSalary}
                    onChange={e => setTempSalary(e.target.value)}
                    className="block w-full p-1 appearance-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter salary"
                  />
                  <button
                    onClick={handleSalarySubmit}
                    className={`px-2 py-1 rounded text-black text-sm bg-gradient-to-r ${theme.primary}`}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 text-nowrap">
                    Salary: ₹{monthlySalary}
                  </span>
                  <button
                    onClick={() => {
                      setTempSalary(monthlySalary.toString());
                      setIsEditingSalary(true);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </StatCard>
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses}`}
            children={<Wallet2Icon className={`w-6 h-6 text-green-600`} />}
            color="bg-green-200"
            borderColor="border-green-400"
          />
          <StatCard
            title="Total Loans"
            value={`₹${totalLoans}`}
            children={<IndianRupeeIcon className={`w-6 h-6 text-yellow-600`} />}
            color="bg-red-200"
            borderColor="border-red-400"
          />
          <StatCard
            title="Savings Rate"
            value={`${totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0}%`}
            children={<ArrowUp className={`w-6 h-6 text-blue-600 `} />}
            color="bg-blue-200"
            borderColor="border-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SideIncomeCard onUpdate={handleSideIncomeUpdate} />
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Expense Categories</h2>
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <CategoryCard
                key={category}
                category={category}
                amount={amount}
                total={totalExpenses}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <RecentTransactionCard
                key={transaction.id || index}
                item={transaction}
                type={transaction.type}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
