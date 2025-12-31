import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = 'ts-task-app-secret-key'; // TODO: 실제 환경에서 안전하게 관리 but 연구 목적으로 편의상 하드 코딩
const secret = new TextEncoder().encode(SECRET_KEY);

/**
 * JWT 토큰 검증
 * @param request - HTTP Request 객체
 * @returns 디코딩된 payload (id 포함)
 * @throws 토큰이 없거나 유효하지 않은 경우 에러
 */
export const verifyToken = async (request: Request) => {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token provided');
  }

  const { payload } = await jwtVerify(token, secret);
  return payload as { id: string };
};

/**
 * JWT 토큰 생성 (AccessToken + RefreshToken)
 * @param userId - 사용자 ID
 * @returns accessToken과 refreshToken
 */
export const createTokens = async (userId: string) => {
  const accessToken = await new SignJWT({ id: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(secret);

  const refreshToken = await new SignJWT({ id: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);

  return { accessToken, refreshToken };
};

export const refreshTokens = async (refreshToken: string) => {
  const { payload } = await jwtVerify(refreshToken, secret);
  const userId = (payload as { id: string }).id;

  return createTokens(userId);
};
