import { User } from "../entities/User";

export interface UserRepository {
  getUserByToken: (token: string) => User | undefined;
  getUserByUsernameAndPassword: (params: {
    username: string;
    password: string;
  }) => User | undefined;
  setTokenForUser: (params: { token: string; username: string }) => void;
}
