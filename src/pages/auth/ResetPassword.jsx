import React, { useState, useEffect } from 'react';
import Loader from '../../components/common/Loader';
import { ShieldCheck } from 'lucide-react';
import { endpoints } from '../../services/api.config';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/context/ProgressContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState({
    email: { valid: false, message: '' },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showProgress, hideProgress } = useProgress();

  useEffect(() => {
    if (email) {
      const result = validateField('email', email);
      setValidation(prev => ({ ...prev, email: result }));
    }
  }, [email]);

  const validateField = (field, value) => {
    const valid = /^\S+@\S+\.\S+$/.test(value);
    return {
      valid,
      message: valid ? '' : 'Please enter a valid email address',
    };
  };

  const isFormValid = () => {
    const newValidation = {
      email: validateField('email', email),
    };
    setValidation(newValidation);
    return Object.values(newValidation).every(field => field.valid);
  };

  const handleResetPassword = async e => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    showProgress();

    try {
      const response = await endpoints.auth.ResetPassword(email);
      toast.success('Password reset link sent to your email', {
        description: `Email: ${email}`,
        action: {
          label: 'Login',
          onClick: () => {
            window.location.href = '/login';
          },
        },
      });
    } catch (error) {
      toast.error('Reset Failed', {
        description: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      hideProgress();
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <img src="/Logo.svg" alt="CraftFossLabs tools logo" className="h-10 mb-2" />
        <CardTitle className="text-2xl font-semibold text-center">Reset Your Password</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              {validation.email.valid && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                </motion.div>
              )}
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@craftfosslabs.com"
              className={validation.email.message ? 'border-red-500 focus:ring-red-500' : ''}
            />
            {validation.email.message && (
              <p className="text-sm text-red-500">{validation.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            variant={isLoading ? 'outline' : 'default'}
            disabled={isLoading}
          >
            {isLoading ? <Loader text="Sending you an email..." /> : 'Reset Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
