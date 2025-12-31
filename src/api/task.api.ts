import { API_ENDPOINTS } from '../Constant';
import type { ITaskDetailResponse, ITaskResponse } from '../Types';
import { apiClient } from './client';

export const taskAPI = {
  fetchTasks: async (page = 1): Promise<ITaskResponse[]> => {
    const { data } = await apiClient.get<ITaskResponse[]>(API_ENDPOINTS.TASK, {
      params: { page }
    });

    return data;
  },

  fetchTaskDetail: async (taskId: string): Promise<ITaskDetailResponse> => {
    const { data } = await apiClient.get<ITaskDetailResponse>(`${API_ENDPOINTS.TASK}/${taskId}`);

    return data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await apiClient.delete<void>(`${API_ENDPOINTS.TASK}/${taskId}`);
  }
};
