import { User } from "../models/User";

export interface IUserRepository {
  getUserByToken: (token: string) => User | undefined;
  getUserByUsernameAndPassword: (params: {
    username: string;
    password: string;
  }) => User | undefined;
  setTokenForUser: (params: { token: string; username: string }) => void;
  listUsers: () => User[];
}
