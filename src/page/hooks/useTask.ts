import { useCallback, useEffect, useState } from 'react';
import { taskAPI } from '../../api/task.api';
import type { ITaskResponse } from '../../Types';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS, TASK_LIST_PAGE_SIZE } from '../../Constant';
import { handleAxiosError } from '../../utils/errorHandler';

export default function useTask() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<ITaskResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const goToDashboard = () => navigate(ROUTE_PATHS.DASHBOARD);
  const goToTaskDetail = (id: string) => navigate(`${ROUTE_PATHS.TASK}/${id}`);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const tasks = await taskAPI.fetchTasks(1);
        setTasks(tasks);
        setHasMore(tasks.length === TASK_LIST_PAGE_SIZE);
      } catch (error) {
        handleAxiosError(error, {
          setError,
          onUnauthorized: () => navigate(ROUTE_PATHS.LOGIN)
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  // 다음 페이지 로드
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const newTasks = await taskAPI.fetchTasks(nextPage);

      if (newTasks.length === 0) {
        setHasMore(false);
      } else {
        setTasks((prev) => [...prev, ...newTasks]);
        setPage(nextPage);
        setHasMore(newTasks.length === TASK_LIST_PAGE_SIZE);
      }
    } catch (error) {
      handleAxiosError(error, {
        setError,
        onUnauthorized: () => navigate(ROUTE_PATHS.LOGIN)
      });
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, page, navigate]);

  return {
    state: { tasks, error, hasMore, isLoading },
    action: { goToDashboard, goToTaskDetail, loadMore }
  };
}
