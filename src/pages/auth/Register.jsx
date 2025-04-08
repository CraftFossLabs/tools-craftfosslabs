import React, { useState } from 'react';
import { endpoints } from '../../services/api.config';
import Loader from '../../components/common/Loader';

const Register = () => {
  const [formData , setFormData] =useState({
    name: '',
    email: '',
    password : ''
  });
  const [isLoading , setisLoading] = useState(true);

  const handleRegister = async(e) =>{
    e.preventdefault();
    setisLoading(true);
    console.log(formData);
    try{
    const response = endpoints.auth.register(formData);
    setisLoading(false);
    console.log(response);
    }catch(error){
      console.log(error);
      setisLoading(false);
    }
  }
  const handleGoogleLogin = () => {
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6 max-w-md mx-auto bg-gray-50 dark:bg-gray-800 text-black dark:text-white  p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center">Create an Account</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Your Name"
          name='name'
          id='name'
          onChange={() => setFormData.name}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name='email'
          id='email'
          onChange={() => setFormData.email}
          placeholder="user@craftfosslabs.com"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          id='password'
          name='password'
          onChange={() => setFormData.password}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
        />
      </div>

      <button
        type="submit"
        disabled = {isLoading}
        className={`w-full transition duration-200 py-2 rounded-lg ${isLoading ? 'cursor-not-allowed bg-transparent  focus:ring-2 focus:ring-purple-500 border border-gray-300 dark:border-gray-600' : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 '}`}
      >
       {isLoading ? <> <Loader text={'Registering ...'}/> </> : 'Register'} 
      </button>

      <div className="text-center text-gray-500 dark:text-gray-100">or</div>

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

export default Register;
