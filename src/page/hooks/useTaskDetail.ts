import { useEffect, useState } from 'react';
import type { ITaskDetailResponse } from '../../Types';
import { taskAPI } from '../../api/task.api';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../../Constant';
import { handleAxiosError } from '../../utils/errorHandler';

export default function useTaskDetail({ id }: { id: string }) {
  const navigate = useNavigate();
  const [task, setTask] = useState<ITaskDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchTaskDetail = async (taskId: string) => {
      try {
        const taskDetail = await taskAPI.fetchTaskDetail(taskId);
        setTask(taskDetail);

        console.log('Fetching details for task ID:', taskId);
      } catch (error) {
        handleAxiosError(error, {
          setError,
          setErrorStatus,
          onUnauthorized: () => navigate(ROUTE_PATHS.LOGIN)
        });
      }
    };

    fetchTaskDetail(id!);
  }, [id, navigate]);

  return {
    state: { task, error, errorStatus }
  };
}
