const LOAN_STORAGE_KEY = 'finance_planner_loans';
const BILL_STORAGE_KEY = 'finance_planner_bills';

export const getLoanData = () => {
  try {
    const storedData = localStorage.getItem(LOAN_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveLoanData = loans => {
  try {
    localStorage.setItem(LOAN_STORAGE_KEY, JSON.stringify(loans));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getBillData = () => {
  try {
    const storedData = localStorage.getItem(BILL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error reading bills from localStorage:', error);
    return [];
  }
};

export const saveBillData = bills => {
  try {
    localStorage.setItem(BILL_STORAGE_KEY, JSON.stringify(bills));
  } catch (error) {
    console.error('Error saving bills to localStorage:', error);
  }
};
