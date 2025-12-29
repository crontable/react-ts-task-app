import { API_ENDPOINTS } from '../Constant';
import type { ISignInRequest, ISignInResponse } from '../Types';
import { apiClient } from './client';

export const authAPI = {
  signIn: async ({ email, password }: ISignInRequest): Promise<ISignInResponse> => {
    const { data } = await apiClient.post<ISignInResponse>(API_ENDPOINTS.SIGN_IN, { email, password });

    return data;
  }
};
