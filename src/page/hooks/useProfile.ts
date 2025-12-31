import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { IUser } from '../../Types';
import { userAPI } from '../../api/user.api';
import { AxiosError } from 'axios';
import { ROUTE_PATHS } from '../../Constant';

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
        if (error instanceof AxiosError) {
          const statusAction: Record<number | 'default', () => void> = {
            400: () => {
              setError('유효하지 않은 요청입니다.');
            },
            401: () => {
              setError('로그인이 필요합니다');
              navigate(ROUTE_PATHS.LOGIN);
            },
            404: () => {
              setError('Task를 찾을 수 없습니다.');
            },
            default: () => {
              setError('작업을 불러오는 중 오류가 발생했습니다.');
            }
          };

          (statusAction[error.status ?? 'default'] || statusAction.default)();
        }
        console.log(error);
      }
    };

    fetchUser();
  }, [navigate]);

  return {
    state: { user, error, isLoading }
  };
}
