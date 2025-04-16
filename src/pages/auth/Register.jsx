import React, { useState } from 'react';
import { endpoints } from '@/services/api.config';
import Loader from '@/components/common/Loader';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useProgress } from '@/context/ProgressContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState({
    name: { valid: false, message: '' },
    email: { valid: false, message: '' },
    password: { valid: false, message: '' },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { showProgress, hideProgress } = useProgress();
  const validateField = (field, value) => {
    const validations = {
      name: {
        valid: !!value.trim(),
        message: value.trim() ? '' : 'Please enter your name',
      },
      email: {
        valid: /^\S+@\S+\.\S+$/.test(value),
        message: /^\S+@\S+\.\S+$/.test(value) ? '' : 'Please enter a valid email address',
      },
      password: {
        valid:
          value.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/.test(value),
        message:
          value.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/.test(value)
            ? ''
            : 'Password must be at least 6 characters with uppercase, lowercase, number and special character',
      },
    };

    return validations[field];
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidation(prev => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const isFormValid = () => {
    const newValidation = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };

    setValidation(newValidation);

    return Object.values(newValidation).every(field => field.valid);
  };

  const handleRegister = async e => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }
    showProgress();
    setIsLoading(true);
    try {
      const response = await endpoints.auth.register(formData);
      toast.success('Registration successful');
      toast.success('Please Verify your email');
      console.log(response);
      hideProgress();
    } catch (err) {
      const errorData = err.response?.data?.errors;
      if (errorData && Array.isArray(errorData)) {
        const firstError = errorData[0];
        setValidation(prev => ({
          ...prev,
          [firstError.field]: { valid: false, message: firstError.message },
        }));
      } else {
        toast.error('Registration failed. Please try again.');
        hideProgress();
      }
    } finally {
      setIsLoading(false);
      hideProgress();
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <img src="/Logo.svg" alt="CraftFossLabs tools logo" className="h-10 mb-2" />
        <CardTitle className="text-2xl font-semibold text-center">Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              {validation.name.valid && <ShieldCheck className="h-4 w-4 text-green-500" />}
            </div>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className={validation.name.message ? 'border-red-500 focus:ring-red-500' : ''}
            />
            {validation.name.message && (
              <p className="text-sm text-red-500">{validation.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              {validation.email.valid && <ShieldCheck className="h-4 w-4 text-green-500" />}
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="user@craftfosslabs.com"
              className={validation.email.message ? 'border-red-500 focus:ring-red-500' : ''}
            />
            {validation.email.message && (
              <p className="text-sm text-red-500">{validation.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              {validation.password.valid && <ShieldCheck className="h-4 w-4 text-green-500" />}
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={
                  validation.password.message ? 'border-red-500 focus:ring-red-500 pr-10' : 'pr-10'
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {validation.password.message && (
              <p className="text-sm text-red-500">{validation.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant={`${isLoading ? 'outline' : 'default'}`}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <Loader text="Registering..." /> : 'Register'}
          </Button>
        </form>

        <div className="mt-4">
          <div className="relative">
            <Separator className="my-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-2 text-muted-foreground text-sm">or</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            type="button"
            onClick={() => {
              /* Google login logic */
            }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Register;
