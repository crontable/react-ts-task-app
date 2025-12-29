import { useState } from 'react';
import { LOCALSTORAGE_KEYS, ROUTE_PATHS } from '../Constant';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../api/user.api';
import type { IUser } from '../Types';
import { authAPI } from '../api/auth.api';

function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState('');

  const requestSignIn = async (event: React.FormEvent) => {
    setError('');

    try {
      event.preventDefault();
      const data = await authAPI.signIn({
        email: 'test@test.com',
        password: 'password123'
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

  return (
    <div>
      <form onSubmit={requestSignIn}>
        <input type="text" placeholder="id" />
        <input type="password" placeholder="password" />
        <button type="submit">Log In</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LogIn;
