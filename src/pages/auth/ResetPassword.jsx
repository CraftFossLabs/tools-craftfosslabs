import React, { useState } from 'react';
import Loader from '../../components/common/Loader';
import { ShieldCheck } from 'lucide-react';
import { endpoints } from '../../services/api.config';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [tick, setTick] = useState({
    email: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const HandleResetPassword = async e => {
    e.preventDefault();
    setError('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setTick({ email: true });
    setIsLoading(true);
    try {
      const response = await endpoints.auth.resetPassword({ email });
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={HandleResetPassword}
        className="space-y-4 max-w-md mx-auto  text-black dark:text-white  p-6 rounded-lg"
      >
        <img src="/Logo.svg" alt="craftfosslabs tools logo" loading="lazy" className="mx-auto" />
        <h2 className="text-2xl font-bold text-center">Reset your Password</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <label htmlFor="email" className="text-sm font-medium mb-1 flex items-center gap-2">
          {tick.email && <ShieldCheck className="w-4 text-green-300" />}Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="user@craftfosslabs.com"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full transition duration-200 py-2 rounded-lg flex justify-center items-center ${isLoading ? 'cursor-not-allowed bg-transparent  focus:ring-2 focus:ring-purple-500 border border-gray-300 dark:border-gray-600' : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 '}`}
        >
          {isLoading ? (
            <>
              {' '}
              <Loader text={'Sending ...'} />{' '}
            </>
          ) : (
            'Send Mail'
          )}
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
