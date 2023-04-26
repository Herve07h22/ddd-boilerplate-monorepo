import { IUserRepository } from "../../authentication/interfaces/UserRepository";
import {
  NamedAuthenticatedCommand,
  CommandResponse,
  makeCommandResponse,
} from "../command/Command";
import { CommandBusMiddleware, Middleware } from "./Middleware";

export class AuthenticationMiddleware
  extends Middleware
  implements CommandBusMiddleware
{
  constructor(private dependencies: { userRepository: IUserRepository }) {
    super();
  }
  dispatch<P extends NamedAuthenticatedCommand>(command: P) {
    if (this._next) {
      if (command.token) {
        const token = command.token;
        const user = this.dependencies.userRepository.getUserByToken(token);
        if (user) {
          console.log(
            "[Authentication] User successfully authenticated :",
            user.name
          );
          const commandWithUser = Object.assign({}, command, { user });
          return this._next.dispatch(commandWithUser);
        } else {
          console.log("[Authentication] Invalid token :", token);
        }
      } else {
        console.log("[Authentication] Anonymous");
      }
      return this._next.dispatch(command);
    }

    return makeCommandResponse(command).withNoValue();
  }
}
