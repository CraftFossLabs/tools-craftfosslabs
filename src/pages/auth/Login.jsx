import React, { useState } from 'react';
import { endpoints } from '../../services/api.config';
import Loader from '../../components/common/Loader';
import { Eye, EyeClosed, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [tick, setTick] = useState({
    email: false,
    password: false,
  });
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const ValidateData = () => {
    let isValid = true;
    const updatedTicks = { email: false, password: false };

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
    } else {
      updatedTicks.email = true;
    }

    if (formData.password.length < 6) {
      isValid = false;
    } else {
      updatedTicks.password = true;
    }

    setTick(updatedTicks);
    return isValid;
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    if (!ValidateData()) {
      return;
    }
    setisLoading(true);
    try {
      const response = await endpoints.auth.register(formData);
      setisLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const handleGoogleLogin = () => {};

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4 max-w-md mx-auto  text-black dark:text-white  p-6 rounded-lg"
    >
      <img src="/Logo.svg" alt="craftfosslabs tools logo" loading="lazy" className="mx-auto" />
      <h2 className="text-2xl font-bold text-center">Welcome Back </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
        <label htmlFor="email" className="text-sm font-medium mb-1 flex items-center gap-2">
          {tick.email && <ShieldCheck className="w-4 text-green-300" />}Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="user@craftfosslabs.com"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium mb-1 flex items-center gap-2">
          {tick.password && <ShieldCheck className="w-4 text-green-300" />}Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            id="password"
            name="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye className="w-5 h-5" /> : <EyeClosed className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" id="RememberMe" className="w-4 h-4" />
          <label htmlFor="RememberMe" className="text-sm font-medium">
            {' '}
            Remember Me
          </label>
        </div>
        <Link to={'/reset-password'} className="hover:underline cursor-pointer text-sm">
          Forgot Password
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full transition duration-200 py-2 rounded-lg flex justify-center items-center ${isLoading ? 'cursor-not-allowed bg-transparent  focus:ring-2 focus:ring-purple-500 border border-gray-300 dark:border-gray-600' : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 '}`}
      >
        {isLoading ? (
          <>
            {' '}
            <Loader text={'Entering to CFL-Tools ...'} />{' '}
          </>
        ) : (
          'Login'
        )}
      </button>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-500">
          Register
        </Link>
      </p>
      <div className="flex items-center justify-between my-4">
        <hr className="w-full border-gray-300 dark:border-gray-600" />
        <span className="text-sm text-gray-500 dark:text-gray-400 px-2">or</span>
        <hr className="w-full border-gray-300 dark:border-gray-600" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 dark:border-gray-600 flex justify-center items-center gap-2"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        Continue with Google
      </button>
    </form>
  );
};

export default Login;
