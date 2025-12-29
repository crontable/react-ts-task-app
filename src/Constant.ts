export const API_BASE_URL = '/api';

export const API_END_POINTS = {
  DASHBOARD: `${API_BASE_URL}/dashboard`,
  SIGN_IN: `${API_BASE_URL}/sign-in`,
  TASK: `${API_BASE_URL}/task`,
  USER: `${API_BASE_URL}/user`
};

export const ROUTE_PATHS = {
  DASHBOARD: '/',
  LOGIN: '/sign-in'
};

export const LOCALSTORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
};
