import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import useUserStore from '@/store/userStore';
import { endpoints } from '@/services/api.config';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import Loader from './Loader';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const setUser = useUserStore(state => state.setUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = async credentialResponse => {
    if (!credentialResponse?.credential) return;
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, picture } = decoded;
      const response = await endpoints.auth.GoogleLogin(name, email, picture);
      const { token, user } = response?.data || {};
      setLoading(false);
      if (token && user) {
        Cookies.set('auth_token', token, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
        setUser(user);
        navigate('/dashboard');
      } else {
        toast.error('data is not in correct format');
      }
    } catch (err) {
      console.error('Google login error:', err);
      toast.error('Failed to Login With Google');
    }
  };

  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_APP_Google_Client_Id}`}>
      {loading ? (
        <>
          <Button variant={'outline'} className={'w-full'}>
            <Loader text="Taking you to your Workspace..." />
          </Button>
        </>
      ) : (
        <GoogleLogin
          auto_select
          logo_alignment="center"
          size="large"
          shape="pill"
          theme="outline"
          onSuccess={handleSuccess}
          onError={() => {
            toast.error('Login Failed');
          }}
        />
      )}
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
