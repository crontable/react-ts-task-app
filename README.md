# Task App

React와 TypeScript로 구현한 할 일 관리 애플리케이션입니다.

## 🔗 데모

**Live Demo**: [https://crontable.github.io/react-ts-task-app](https://crontable.github.io/react-ts-task-app)

> MSW를 활용한 목업 API로 동작하며, 실제 서버 없이 모든 기능을 체험할 수 있습니다.

## 🧪 테스트 계정

```
이메일: test@test.com
비밀번호: test1234
```

## 🛠 기술 스택

### Core

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **React Router 7** - 라우팅
- **Vite** - 빌드 도구

### State & Data

- **Axios** - HTTP 클라이언트
- **MSW (Mock Service Worker)** - API 모킹
- **jose** - JWT 토큰 검증

### Form & Validation

- **React Hook Form** - 폼 관리

### Styling

- **Emotion** - CSS-in-JS

### UI Components

- **React Virtuoso** - 가상 스크롤링
- **Radix UI** - 접근성 준수 컴포넌트 (Dialog)
- **React Icons** - 아이콘

## ✅ 구현 기능

### 1. 인증 (Authentication)

- [x] 로그인 (이메일 + 비밀번호 검증)
- [x] JWT 기반 토큰 인증 (Access Token + Refresh Token)
- [x] 자동 토큰 갱신 (Axios Interceptor)
- [x] 인증 상태 관리 (Context API)

### 2. 대시보드

- [x] 할 일 통계 표시
  - 전체 할 일 개수
  - 남은 할 일 개수
  - 완료한 할 일 개수

### 3. 할 일 목록

- [x] 무한 스크롤 (Infinite Scroll)
- [x] 가상 스크롤링 (Virtual Scrolling) - React Virtuoso
- [x] 페이지네이션 (20개/페이지)
- [x] 할 일 카드 UI (제목 + 메모)

### 4. 할 일 상세

- [x] 할 일 상세 정보 조회
- [x] 삭제 기능 (ID 확인 모달)
- [x] 404 에러 처리

### 5. 회원 정보

- [x] 사용자 프로필 조회 (이름 + 메모)
- [x] 로그아웃

### 6. 공통

- [x] GNB 네비게이션
- [x] 401 에러 시 로그인 페이지 리다이렉트
- [x] 에러 핸들링 (Error Boundary)
- [x] 폼 유효성 검증
  - 이메일: RFC 5322 규격
  - 비밀번호: 영문+숫자 8-24자

## 📁 프로젝트 구조

```
src/
├── api/              # API 클라이언트 및 엔드포인트
│   ├── client.ts     # Axios 인스턴스 + Interceptor
│   ├── auth.api.ts
│   ├── dashboard.api.ts
│   ├── task.api.ts
│   └── user.api.ts
├── components/       # 재사용 가능한 컴포넌트
│   ├── base/        # 기본 UI 컴포넌트 (Modal 등)
│   ├── Header.tsx
│   └── TaskCard.tsx
├── context/         # React Context (Auth)
├── mocks/           # MSW 핸들러 및 목업 데이터
│   ├── handlers/
│   ├── database.ts
│   └── utils/       # JWT 토큰 생성/검증
├── page/            # 페이지 컴포넌트
│   ├── hooks/       # 페이지별 커스텀 훅
│   ├── Dashboard.tsx
│   ├── SignIn.tsx
│   ├── Task.tsx
│   ├── TaskDetail.tsx
│   └── Profile.tsx
├── utils/           # 유틸리티 함수
├── router.ts        # 라우팅 설정
└── theme.ts         # 테마 (색상 토큰)
```

## 🎯 주요 구현 특징

### 1. **Token Refresh 자동화**

Axios Interceptor를 활용하여 401 에러 발생 시 자동으로 Refresh Token을 사용해 Access Token을 갱신합니다.

```typescript
// src/api/client.ts
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Refresh Token으로 새 Access Token 발급
      const { data } = await axios.post('/api/refresh', { refreshToken });
      // 실패했던 원본 요청 재시도
      return apiClient(originalRequest);
    }
  }
);
```

### 2. **가상 스크롤링 + 무한 스크롤**

React Virtuoso를 사용하였습니다.
가상 스크롤링과 무한 스크롤을 동시에 구현할 수 있어 해당 라이브러리를 채택하였습니다.

```typescript
<Virtuoso
  data={tasks}
  endReached={loadMore}  // 스크롤 끝 도달 시 다음 페이지 로드
  itemContent={(index, task) => <TaskCard task={task} />}
/>
```

### 3. **MSW를 활용한 API 모킹**

실제 백엔드 서버 없이 프론트엔드 개발 및 배포가 가능합니다.

- JWT 토큰 생성/검증
- 페이지네이션 구현
- 인증 미들웨어 (Higher-Order Function)

### 4. **일관된 Custom Hook 구조**

모든 페이지별 훅은 다음 구조로 설계했습니다.

```typescript
return {
  form: { ... },      // React Hook Form 관련
  state: { ... },     // 상태 변수들
  action: { ... }     // 액션 함수들
};
```

### 5. **타입 안정성**

- API 응답 타입 정의
- 컴포넌트 Props 타입 정의
- Emotion styled-components 타입 지원

### 6. **에러 핸들링 유틸리티**

중복 코드를 제거하기 위한 에러 핸들러 유틸리티:

```typescript
handleAxiosError(error, {
  setError,
  onUnauthorized: () => navigate('/sign-in')
});
```

## 🚀 실행 방법

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

## 🌐 배포

GitHub Pages를 통해 배포합니다.

- `main` 브랜치에 push 시 GitHub Actions가 자동으로 빌드 및 배포
- MSW Service Worker가 프로덕션 환경에서도 정상 동작

## 📝 요구사항 체크리스트

### 기본 요구사항

- [x] React 18/19 + TypeScript
- [x] Pretendard 폰트 사용
- [x] 색상 토큰 관리 (primary: blue, disabled: gray)

### 페이지별 요구사항

- [x] GNB/LNB 네비게이션
- [x] 대시보드 통계
- [x] 로그인 폼 유효성 검증
- [x] 할 일 목록 (가상 스크롤 + 무한 스크롤)
- [x] 할 일 상세 (삭제 기능)
- [x] 회원 정보 페이지

### API 모킹

- [x] MSW를 활용한 API 모킹
- [x] JWT 토큰 발급 및 검증
- [x] Refresh Token 구현
