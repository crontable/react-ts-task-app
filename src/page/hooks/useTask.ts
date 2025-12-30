import { useEffect, useState } from 'react';
import { taskAPI } from '../../api/task.api';
import type { ITaskResponse } from '../../Types';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { ROUTE_PATHS } from '../../Constant';

export default function useTask() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<ITaskResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const goToDashboard = () => navigate(ROUTE_PATHS.DASHBOARD);
  const goToTaskDetail = (id: string) => navigate(`${ROUTE_PATHS.TASK}/${id}`);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskAPI.fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
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
      }
    };

    fetchTasks();
  }, [navigate]);

  return {
    state: { tasks, error },
    action: { goToDashboard, goToTaskDetail }
  };
}
