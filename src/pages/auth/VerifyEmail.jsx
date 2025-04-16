import { endpoints } from '@/services/api.config';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

const VerifyEmail = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await endpoints.auth.verifyEmail(token, email);
        setStatus('success');
        setMessage(response.data?.message || 'Email verified successfully!');
        toast.success(response.data?.message || 'Email verified!', {
          description: 'You can now log in to your account.',
          action: {
            label: 'Login',
            onClick: () => {
              navigate('/login');
            },
          },
        });
      } catch (error) {
        setStatus('error');
        const errMsg = error.response?.data?.message || 'Verification failed. Please try again.';
        setMessage(errMsg);
        toast.error(errMsg);
      }
    };

    if (token && email) {
      verifyEmail();
    } else {
      setStatus('error');
      const msg = 'Invalid verification URL. Token or email is missing.';
      setMessage(msg);
      toast.error(msg);
    }
  }, [token, email]);

  const statusIcon =
    status === 'loading' ? (
      <Loader2 className="animate-spin text-blue-500" size={32} />
    ) : status === 'success' ? (
      <CheckCircle className="text-green-500" size={32} />
    ) : (
      <XCircle className="text-red-500" size={32} />
    );

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card
          className={`rounded-2xl shadow-md border ${theme.border} bg-gradient-to-tl ${theme.primary} ${theme.text}`}
        >
          <CardContent className="p-6 flex flex-col justify-center items-center space-y-4">
            {statusIcon}
            <h2 className="text-xl font-semibold">
              {status === 'loading'
                ? 'Verifying your email...'
                : status === 'success'
                  ? 'Verification Successful!'
                  : 'Verification Failed'}
            </h2>
            <p>{message}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
