import type { ITask } from '../Types';

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

export const TASK_SAMPLE: ITask[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1 + '',
  title: `Sample Task Title ${index + 1}`,
  memo: `This is a sample memo for task number ${index + 1}.`,
  status: index % 2 === 0 ? 'TODO' : 'DONE',
  registerDateTime: new Date().toISOString()
}));
