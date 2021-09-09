import {
  CommandHandler,
  makeCommandResponse,
  NamedAuthenticatedCommand,
} from "../../infra/command/Command";
import { UserRepository } from "../repository/UserRepository";
import { buildUniqueToken } from "../services/buildUniqueToken";

export type LoginCommand = NamedAuthenticatedCommand<
  "Login",
  {
    username: string;
    password: string;
  }
>;

export const LoginHandler: CommandHandler<LoginCommand> =
  (dependencies: { userRepository: UserRepository }) =>
  (command: LoginCommand) => {
    const user = dependencies.userRepository.getUserByUsernameAndPassword(
      command.payload
    );

    if (user) {
      const token = buildUniqueToken();
      dependencies.userRepository.setTokenForUser({
        token,
        username: user.name,
      });
      return makeCommandResponse.withValue({ token });
    }

    return makeCommandResponse.withError("Unknown user");
  };
