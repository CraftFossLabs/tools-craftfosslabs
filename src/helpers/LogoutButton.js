import Cookies from 'js-cookie';
import useUserStore from '@/store/userStore';

export const logout = () => {
  Cookies.remove('auth_token');
  useUserStore.getState().clearUser();
};
