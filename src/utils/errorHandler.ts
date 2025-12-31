import { AxiosError } from 'axios';

export interface ErrorHandler {
  setError: (message: string) => void;
  onUnauthorized?: () => void;
  setErrorStatus?: (status: number | null) => void;
}

export interface ErrorMessages {
  400?: string;
  401?: string;
  404?: string;
  default?: string;
}

/**
 * Axios 에러를 처리하는 공통 함수
 *
 * @param error - 처리할 에러 객체
 * @param handler - 에러 처리에 필요한 핸들러 함수들
 * @param customMessages - 상태 코드별 커스텀 에러 메시지 (선택사항)
 *
 * @example
 * ```typescript
 * handleAxiosError(error, {
 *   setError,
 *   onUnauthorized: () => navigate(ROUTE_PATHS.LOGIN),
 *   setErrorStatus
 * });
 * ```
 */
export function handleAxiosError(error: unknown, handler: ErrorHandler, customMessages?: ErrorMessages): void {
  if (!(error instanceof AxiosError)) {
    return;
  }
  console.error(error);

  const defaultMessages: Required<ErrorMessages> = {
    400: '유효하지 않은 요청입니다.',
    401: '로그인이 필요합니다',
    404: 'Task를 찾을 수 없습니다.',
    default: '작업을 불러오는 중 오류가 발생했습니다.'
  };

  const messages = { ...defaultMessages, ...customMessages };
  const status = error.status ?? 'default';

  const statusAction: Record<number | 'default', () => void> = {
    400: () => {
      handler.setErrorStatus?.(400);
      handler.setError(messages[400]);
    },
    401: () => {
      handler.setErrorStatus?.(401);
      handler.setError(messages[401]);
      handler.onUnauthorized?.();
    },
    404: () => {
      handler.setErrorStatus?.(404);
      handler.setError(messages[404]);
    },
    default: () => {
      handler.setErrorStatus?.(error.response?.status ?? null);
      handler.setError(messages.default);
    }
  };

  (statusAction[status] || statusAction.default)();
}
