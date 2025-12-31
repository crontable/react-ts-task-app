import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../Constant';
import type { IRefreshRequest, IRefreshResponse, ISignInRequest, ISignInResponse } from '../Types';
import { apiClient } from './client';

const refreshClient = axios.create({ baseURL: API_BASE_URL });

export const authAPI = {
  signIn: async ({ email, password }: ISignInRequest): Promise<ISignInResponse> => {
    const { data } = await apiClient.post<ISignInResponse>(API_ENDPOINTS.SIGN_IN, { email, password });

    return data;
  },

  refresh: async ({ refreshToken }: IRefreshRequest): Promise<IRefreshResponse> => {
    const { data } = await refreshClient.post<IRefreshResponse>(API_ENDPOINTS.REFRESH, { refreshToken });

    return data;
  }
};
