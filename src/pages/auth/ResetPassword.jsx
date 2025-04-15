import React, { useState } from 'react';
import Loader from '../../components/common/Loader';
import { ShieldCheck } from 'lucide-react';
import { endpoints } from '../../services/api.config';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [validation, setValidation] = useState({
    email: { valid: false, message: '' },
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field, value) => {
    const validations = {
      email: {
        valid: /^\S+@\S+\.\S+$/.test(value),
        message: /^\S+@\S+\.\S+$/.test(value) ? '' : 'Please enter a valid email address',
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
      email: validateField('email', formData.email),
    };

    setValidation(newValidation);

    return Object.values(newValidation).every(field => field.valid);
  };
  const HandleResetPassword = async e => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }
    setIsLoading(true);
    try {
      const email = formData.email;
      const response = await endpoints.auth.resetPassword({ email });
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <img src="/Logo.svg" alt="CraftFossLabs tools logo" className="h-10 mb-2" />
          <CardTitle className="text-2xl font-semibold text-center">Reset Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={HandleResetPassword} className="space-y-4">
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
            <Button
              type="submit"
              variant={`${isLoading ? 'outline' : 'default'}`}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? <Loader text="taking You to Your Workspace..." /> : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPassword;
