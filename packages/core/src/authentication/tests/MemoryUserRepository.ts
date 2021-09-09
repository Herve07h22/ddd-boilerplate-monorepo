import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

export class MemoryUserRepository implements UserRepository {
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
}
