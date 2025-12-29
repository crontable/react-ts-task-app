import { http, HttpResponse } from 'msw';
import { API_END_POINTS } from '../../Constant';
import { mockUsers } from '../database';
import { createTokens } from '../utils/auth';

export const authHandlers = [
  // 로그인: JWT 토큰 발급
  http.post(API_END_POINTS.SIGN_IN, async ({ request }) => {
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
  })
];
