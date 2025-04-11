export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  password: string;
}

export type ICreateUser = Omit<IUser, 'id'>;
