export const API_BASE_URL = '/api';

// API 엔드포인트 (상대 경로만, BASE_URL은 제외)
export const API_ENDPOINTS = {
  DASHBOARD: '/dashboard',
  SIGN_IN: '/sign-in',
  TASK: '/task',
  USER: '/user'
};

export const ROUTE_PATHS = {
  DASHBOARD: '/',
  LOGIN: '/sign-in',
  TASK: '/task',
  PROFILE: '/profile'
};

export const LOCALSTORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
};
