import {
  CommandHandler,
  makeCommandResponse,
  NamedAuthenticatedCommand,
} from "../../common/command/Command";
import { IUserRepository } from "../interfaces/UserRepository";
import { buildUniqueToken } from "../services/buildUniqueToken";
import { z } from "zod";

export const loginPayloadSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginCommand = NamedAuthenticatedCommand<
  "Login",
  z.infer<typeof loginPayloadSchema>,
  { username: string; token: string }
>;

export const login: CommandHandler<
  LoginCommand,
  { userRepository: IUserRepository }
> = (dependencies) => (command) => {
  const user = dependencies.userRepository.getUserByUsernameAndPassword(
    command.payload
  );

  if (user) {
    const token = buildUniqueToken();
    dependencies.userRepository.setTokenForUser({
      token,
      username: user.name,
    });
    return makeCommandResponse(command).withValue({
      token,
      username: user.name,
    });
  }

  return makeCommandResponse(command).withError("Unknown user");
};
