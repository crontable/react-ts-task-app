import { useEffect, useState } from 'react';
import type { ITaskDetailResponse } from '../../Types';
import { AxiosError } from 'axios';
import { taskAPI } from '../../api/task.api';

export default function useTaskDetail({ id }: { id: string }) {
  const [task, setTask] = useState<ITaskDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskDetail = async (taskId: string) => {
      try {
        const taskDetail = await taskAPI.fetchTaskDetail(taskId);
        setTask(taskDetail);

        console.log('Fetching details for task ID:', taskId);
      } catch (error) {
        if (error instanceof AxiosError && error.status === 404) {
          setError('존재하지 않는 작업입니다.');
        }
      }
    };

    fetchTaskDetail(id!);
  }, [id]);

  return {
    state: { task, error }
  };
}
