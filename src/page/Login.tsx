import { useState } from 'react';
import axios from 'axios';
import { API_END_POINTS, LOCALSTORAGE_KEYS, ROUTE_PATHS } from '../Constant';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState('');

  const fetchUser = async (accessToken: string) => {
    try {
      const response = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('MSW Response:', response.data);

      return { name: response.data?.name, memo: response.data?.memo };
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to fetch user data.');
    }
  };

  const requestSignIn = async (event: React.FormEvent) => {
    setError('');

    try {
      event.preventDefault();
      const response = await axios.post(API_END_POINTS.SIGN_IN, {
        email: 'test@test.com',
        password: 'password123'
      });

      localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
      localStorage.setItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);

      const userInfo = await fetchUser(response.data.accessToken);

      login(
        { name: userInfo?.name, memo: userInfo?.memo },
        { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }
      );

      navigate(ROUTE_PATHS.DASHBOARD);
      console.log('Sign-in successful:', response.data);
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
