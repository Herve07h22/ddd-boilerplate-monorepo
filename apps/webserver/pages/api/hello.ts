// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CommandResponse } from "@camilab/core/src/infra/command/Command";
import { MemoryUserRepository } from "@camilab/core/src/authentication/tests/MemoryUserRepository";
import { FakeEmailService } from "@camilab/core/src/services/email/FakeEmailService";
import { MemoryScheduleRepository } from "@camilab/core/src/schedule/tests/MemoryScheduleRepository";
import { App } from "@camilab/core/src/App";

import { BookASlotCommand } from "@camilab/core/src/schedule/commands/BookASlot";

const app = App({
  sheduleNotebook: new MemoryScheduleRepository(),
  userRepository: new MemoryUserRepository(),
  emailService: new FakeEmailService(),
});

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
