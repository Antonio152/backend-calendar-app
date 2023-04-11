export interface INewUser {
  name: string;
  email: string;
  password: string;
}
export interface ILogguedUser extends INewUser{
  uid: string;
}
export type ILoginUser = Omit<INewUser,"name">