import { useAuth } from '../../context/AuthContext';
import { LOCALSTORAGE_KEYS, ROUTE_PATHS } from '../../Constant';
import { userAPI } from '../../api/user.api';
import type { IUser } from '../../Types';
import { authAPI } from '../../api/auth.api';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function useSignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('test@test.com'); // TODO: 개발편의
  const [password, setPassword] = useState('password123'); // TODO: 개발편의

  const [error, setError] = useState('');

  const requestSignIn = async (event: React.FormEvent) => {
    setError('');

    try {
      event.preventDefault();
      const data = await authAPI.signIn({
        email,
        password
      });

      localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);

      const userInfo = (await userAPI.getUser()) as IUser;
      login(userInfo, { accessToken: data.accessToken, refreshToken: data.refreshToken });

      navigate(ROUTE_PATHS.DASHBOARD);
      console.log('Sign-in successful:', data);
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('Sign-in failed.');
    }
  };

  return {
    form: {
      email,
      setEmail,
      password,
      setPassword
    },
    state: {
      error
    },
    action: {
      requestSignIn
    }
  };
}
