import { http, HttpResponse } from 'msw';
import { SignJWT, jwtVerify } from 'jose';
import { API_END_POINTS } from '../Constant';
import { mockUsers } from './database';

const SECRET_KEY = 'ts-task-app-secret-key'; // TODO: 실제 환경에서 안전하게 관리 but 연구 목적으로 편의상 하드 코딩
const secret = new TextEncoder().encode(SECRET_KEY); // jose는 Uint8Array 필요

export const handlers = [
  // 인증 & 인가 (JWT)
  http.post(API_END_POINTS.SIGN_IN, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    console.log('[MSW] Sign-in request:', body);

    const user = mockUsers.find(({ email, password }) => email === body.email && password === body.password);

    if (!user) return HttpResponse.json({ errorMessage: 'Invalid email or password' }, { status: 400 });

    // JWT 생성 (브라우저 호환)
    const accessToken = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('15m')
      .sign(secret);

    const refreshToken = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    console.log('[MSW] JWT tokens generated for user:', user.name);

    return HttpResponse.json({
      accessToken,
      refreshToken
    });
  }),

  // 사용자 정보: JWT 검증 필요
  http.get(API_END_POINTS.USER, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      console.log('[MSW] No token provided');
      return HttpResponse.json({ errorMessage: 'Authorization header is required' }, { status: 401 });
    }

    try {
      // JWT 검증: 서명 확인 + 만료 시간 확인
      const { payload } = await jwtVerify(token, secret);
      const decoded = payload as { id: string };

      console.log('[MSW] Token verified. User ID:', decoded.id);

      // DB에서 사용자 정보 조회
      const user = mockUsers.find((u) => u.id === decoded.id);

      if (!user) {
        console.log('[MSW] User not found in database');
        return HttpResponse.json({ errorMessage: 'User not found' }, { status: 401 });
      }

      return HttpResponse.json({
        name: user.name,
        memo: user.memo
      });
    } catch (error) {
      console.log('[MSW] Token verification failed:', (error as Error).message);
      return HttpResponse.json({ errorMessage: 'Invalid or expired token' }, { status: 401 });
    }
  })
];
