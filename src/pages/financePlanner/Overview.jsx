import React, { useEffect, useState } from 'react';
import {
  ArrowUp,
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
import Header from '@/components/core/finance-planner/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { endpoints } from '@/services/api.config';
import { toast } from 'sonner';

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

  const updateTotalIncome = async (salary, sideIncomes = []) => {
    const sideIncomeTotal = sideIncomes.reduce(
      (sum, income) => sum + parseFloat(income.amount || 0),
      0
    );
    const total = parseFloat(salary) + sideIncomeTotal;
    try {
      const response = await endpoints.FinancePLanner.UpdateSalary(total);
      const data = response.data.monthlySalary;
      setTotalIncome(data);
      toast.success('Salary Got Updated');
    } catch (error) {
      console.log(error);
      toast.error('Failed to Update the Salary');
    }
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

  const GetAllDAta = async () => {
    try {
      const res = await endpoints.FinancePLanner.Overview();
      const { data } = res;
      console.log(data);
      setExpenses(data.totalExpenses);
      setLoans(data.totalLoans);
      setMonthlySalary(data.monthlySalary);

      calculateExpenseStats(data.totalExpenses);
      calculateLoanStats(data.totalLoans);
      updateTotalIncome(data.monthlySalary, data.sideIncomes);
      updateRecentTransactions(data.totalExpenses, data.totalLoans);
    } catch (error) {
      console.log(error);
      toast.error('Failed to Fetch Details of User');
    }
  };
  useEffect(() => {
    GetAllDAta();
  });

  const handleSideIncomeUpdate = sideIncomes => {
    updateTotalIncome(monthlySalary, sideIncomes);
  };

  const handleSalarySubmit = async () => {
    const newSalary = parseFloat(tempSalary);
    if (!isNaN(newSalary) && newSalary >= 0) {
      try {
        const response = await endpoints.FinancePLanner.UpdateSalary(newSalary);
        const data = response.data.monthlySalary;
        setMonthlySalary(data);
        setIsEditingSalary(false);
        updateTotalIncome(data);
        toast.success('Salary Got Updated');
      } catch (error) {
        console.log(error);
        toast.error('Failed to Update the Salary');
      }
    }
  };
  return (
    <>
      <div className="p-2">
        <Header
          title={'Financial Overview'}
          text={'Track your finances and plan your future'}
          children={<LayoutDashboardIcon className={`w-8 h-8 ${theme.text}`} />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Monthly Income" value={`₹${totalIncome}`}>
            <div className="mt-2">
              {isEditingSalary ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={tempSalary}
                    onChange={e => setTempSalary(e.target.value)}
                    className={`w-full border ${theme.border} shadow-sm  sm:text-sm`}
                    placeholder="Enter salary"
                  />
                  <Button
                    onClick={handleSalarySubmit}
                    className={` ${theme.text} text-xs ${theme.button}`}
                  >
                    Save
                  </Button>
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
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
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
          />
          <StatCard
            title="Total Loans"
            value={`₹${totalLoans}`}
            children={<IndianRupeeIcon className={`w-6 h-6 text-yellow-600`} />}
            color="bg-red-200"
          />
          <StatCard
            title="Savings Rate"
            value={`${totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0}%`}
            children={<ArrowUp className={`w-6 h-6 text-blue-600 `} />}
            color="bg-blue-200"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SideIncomeCard onUpdate={handleSideIncomeUpdate} />
          <div className={`bg-gradient-to-bl ${theme.primary} rounded-xl shadow-sm p-6`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme.highlight} `}>Expense Categories</h2>
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

        <div className={`bg-gradient-to-bl ${theme.primary} rounded-xl shadow-sm p-6`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme.highlight}`}>Recent Transactions</h2>
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
