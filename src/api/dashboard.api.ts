import { API_ENDPOINTS } from '../Constant';
import type { IDashboardResponse } from '../Types';
import { apiClient } from './client';

export const dashboardAPI = {
  fetchDashboardStats: async (): Promise<IDashboardResponse> => {
    const { data } = await apiClient.post(API_ENDPOINTS.DASHBOARD);

    return data;
  }
};
