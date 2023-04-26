import { procedure, router } from "../trpc";

import {
  LoginCommand,
  loginPayloadSchema,
} from "@camilab/core/src/authentication/commands/Login";
import { app } from "./app";

export const authenticationRouter = router({
  login: procedure.input(loginPayloadSchema).mutation(({ input }) => {
    const command: LoginCommand = {
      type: "Login",
      payload: input,
    };
    return app.run(command);
  }),
  listUser: procedure.query(() => app.dependencies.userRepository.listUsers()),
});
