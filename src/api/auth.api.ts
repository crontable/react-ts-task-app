import { API_ENDPOINTS } from '../Constant';
import type { ISignInRequest } from '../Types';
import { apiClient } from './client';

export const authAPI = {
  signIn: async ({ email, password }: ISignInRequest) => {
    const { data } = await apiClient.post(API_ENDPOINTS.SIGN_IN, { email, password });

    return data;
  }
};
