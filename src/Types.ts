export interface IUser {
  name: string;
  memo?: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IDashboardResponse {
  numOfTask: number;
  numOfRestTask: number;
  numOfDoneTask: number;
}

export interface ITask {
  id: string;
  title: string;
  memo: string;
  status: 'TODO' | 'DONE';
  registerDateTime: string;
}
export type ITaskResponse = Omit<ITask, 'registerDateTime'>;
export type ITaskDetailResponse = Omit<ITask, 'status'>;
