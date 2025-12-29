import { API_ENDPOINTS } from '../Constant';
import type { IUser } from '../Types';
import { apiClient } from './client';

export const userAPI = {
  getUser: async (): Promise<IUser> => {
    const { data } = await apiClient.get(API_ENDPOINTS.USER);

    return { name: data?.name, memo: data?.memo };
  }
};
