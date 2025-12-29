export interface IUser {
  name: string;
  memo?: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}
