import { useEffect, useState } from 'react';
import { taskAPI } from '../../api/task.api';
import type { ITaskResponse } from '../../Types';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../../Constant';
import { handleAxiosError } from '../../utils/errorHandler';

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
        handleAxiosError(error, {
          setError,
          onUnauthorized: () => navigate(ROUTE_PATHS.LOGIN)
        });
      }
    };

    fetchTasks();
  }, [navigate]);

  return {
    state: { tasks, error },
    action: { goToDashboard, goToTaskDetail }
  };
}
