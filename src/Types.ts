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
