import { User } from "../models/User";
import { IUserRepository } from "../interfaces/UserRepository";

export class MemoryUserRepository implements IUserRepository {
  private _users: User[] = [
    { name: "Joe", password: "password", role: "patient" },
  ];

  getUserByUsernameAndPassword({
    password,
    username,
  }: {
    username: string;
    password: string;
  }) {
    return this._users.find(
      (user) => user.name === username && user.password === password
    );
  }

  getUserByToken(token: string) {
    return this._users.find((user) => user.token === token);
  }

  setTokenForUser({ token, username }: { token: string; username: string }) {
    const user = this._users.find((user) => user.name === username);
    if (user) {
      user.token = token;
    }
  }

  listUsers() {
    return this._users;
  }
}
