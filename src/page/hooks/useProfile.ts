import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { IUser } from '../../Types';
import { userAPI } from '../../api/user.api';
import { ROUTE_PATHS } from '../../Constant';
import { handleAxiosError } from '../../utils/errorHandler';

export default function useProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userAPI.getUser();
        setUser(user);
        setIsLoading(false);
      } catch (error) {
        handleAxiosError(error, {
          setError,
          onUnauthorized: () => navigate(ROUTE_PATHS.LOGIN)
        });
        console.log(error);
      }
    };

    fetchUser();
  }, [navigate]);

  return {
    state: { user, error, isLoading }
  };
}
