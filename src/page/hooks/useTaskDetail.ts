import { useEffect, useState } from 'react';
import type { ITaskDetailResponse } from '../../Types';
import { AxiosError } from 'axios';
import { taskAPI } from '../../api/task.api';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../../Constant';

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
        if (error instanceof AxiosError) {
          const statusAction: Record<number | 'default', () => void> = {
            400: () => {
              setErrorStatus(400);
              setError('유효하지 않은 요청입니다.');
            },
            401: () => {
              setErrorStatus(401);
              setError('로그인이 필요합니다');
              navigate(ROUTE_PATHS.LOGIN);
            },
            404: () => {
              setErrorStatus(404);
              setError('Task를 찾을 수 없습니다.');
            },
            default: () => {
              setErrorStatus(error.response?.status ?? null);
              setError('작업을 불러오는 중 오류가 발생했습니다.');
            }
          };

          (statusAction[error.status ?? 'default'] || statusAction.default)();
        }
      }
    };

    fetchTaskDetail(id!);
  }, [id, navigate]);

  return {
    state: { task, error, errorStatus }
  };
}
