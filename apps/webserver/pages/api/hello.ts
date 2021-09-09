// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CommandResponse } from "@camilab/core/src/infra/command/Command";
import { app } from "../../app/app";
import { BookASlotCommand } from "@camilab/core/src/schedule/commands/BookASlot";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommandResponse>
) {
  // Now the system is wired. Let's test an incoming command
  const command: BookASlotCommand = {
    type: "Book a slot",
    token: "verysecrettoken",
    payload: {
      slot: new Date("2021-01-01"),
      doctor: "Dr Frankenstein",
    },
  };

  res.status(200).json(app.run(command));
}
