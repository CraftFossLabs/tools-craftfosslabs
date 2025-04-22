import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { endpoints } from '@/services/api.config';
import Loader from '@/components/common/Loader';
import { Eye, EyeOff } from 'lucide-react';

const SetNewPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!resetToken) {
      toast.error('Invalid or missing token.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);

      const res = await endpoints.auth.setNewPassword(resetToken, password, confirmPassword);
      toast.success(res.data?.message || 'Password updated! You can now login.', {
        action: {
          label: 'Login',
          onClick: () => navigate('/login'),
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader className="text-center">
        <CardTitle>Set New Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <div
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader text="Updating..." /> : 'Reset Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SetNewPassword;
