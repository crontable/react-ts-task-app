import { http, HttpResponse } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '../../Constant';
import { mockUsers } from '../database';
import { createTokens, refreshTokens } from '../utils/auth';

export const authHandlers = [
  // 로그인: JWT 토큰 발급
  http.post(`${API_BASE_URL}${API_ENDPOINTS.SIGN_IN}`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    console.log('[MSW] Sign-in request:', body);

    // DB에서 사용자 조회
    const user = mockUsers.find(({ email, password }) => email === body.email && password === body.password);

    if (!user) {
      return HttpResponse.json({ errorMessage: 'Invalid email or password' }, { status: 400 });
    }

    // JWT 토큰 생성
    const tokens = await createTokens(user.id);
    console.log('[MSW] JWT tokens generated for user:', user.name);

    return HttpResponse.json(tokens);
  }),

  // 리프레시: JWT 토큰 재발급
  http.post(`${API_BASE_URL}${API_ENDPOINTS.REFRESH}`, async ({ request }) => {
    const { refreshToken } = (await request.json()) as { refreshToken: string };
    console.log('[MSW] Token refresh request');

    try {
      const tokens = await refreshTokens(refreshToken);
      console.log('[MSW] New tokens issued via refresh');

      return HttpResponse.json(tokens);
    } catch {
      console.log('[MSW] Invalid refresh token');
      return HttpResponse.json({ errorMessage: 'Invalid refresh token' }, { status: 401 });
    }
  })
];
