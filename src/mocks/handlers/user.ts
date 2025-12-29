import { http, HttpResponse } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '../../Constant';
import { mockUsers } from '../database';
import { verifyToken } from '../utils/auth';

export const userHandlers = [
  // 사용자 정보: JWT 검증 필요
  http.get(`${API_BASE_URL}${API_ENDPOINTS.USER}`, async ({ request }) => {
    try {
      // JWT 검증
      const decoded = await verifyToken(request);
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
