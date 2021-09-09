import type { NextApiResponse } from "next";
import withSession from "../../lib/session";
import { CommandResponse } from "@camilab/core/src/infra/command/Command";
import { app } from "../../app/app";
import { LoginCommand } from "@camilab/core/src/authentication/commands/Login";

export default withSession(
  async (req, res: NextApiResponse<CommandResponse>) => {
    const { username, password } = req.body;
    const command: LoginCommand = {
      type: "Login",
      payload: {
        username,
        password,
      },
    };
    const { status, error, value } = app.run(command);
    if (status === "ok") {
      req.session.set("token", value.token);
      await req.session.save();
      res.status(200).json({ status, value });
    } else {
      res.status(401).json({ status, error });
    }
  }
);
