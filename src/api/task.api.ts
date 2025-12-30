import { API_ENDPOINTS } from '../Constant';
import type { ITaskResponse } from '../Types';
import { apiClient } from './client';

export const taskAPI = {
  fetchTasks: async (): Promise<ITaskResponse> => {
    const { data } = await apiClient.get<ITaskResponse>(API_ENDPOINTS.TASK);

    return data;
  }
};
