// Mock Database: 실제 DB를 시뮬레이션하는 데이터

export interface User {
  id: string;
  email: string;
  password: string; // TODO: 실제로는 암호화 필요하나, 연구 목적으로 평문 저장
  name: string;
  memo: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@test.com',
    password: 'password123',
    name: 'Cron',
    memo: 'Hello, I am Cron!'
  },
  {
    id: '2',
    email: 'admin@test.com',
    password: 'admin1234',
    name: '관리자',
    memo: 'Administrator account'
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'user12345678',
    name: 'TestUser',
    memo: 'This is a test user'
  }
];

// TODO: 나중에 Task 데이터도 여기에 추가
// export interface Task { ... }
// export const mockTasks: Task[] = [ ... ];
