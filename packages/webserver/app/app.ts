import { App } from "@camilab/core/src/App";
import { MemoryUserRepository } from "@camilab/core/src/authentication/tests/MemoryUserRepository";
import { FakeEmailService } from "@camilab/core/src/services/email/FakeEmailService";
import { MemoryScheduleRepository } from "@camilab/core/src/schedule/tests/MemoryScheduleRepository";

export const app = App({
  sheduleNotebook: new MemoryScheduleRepository(),
  userRepository: new MemoryUserRepository(),
  emailService: new FakeEmailService(),
});
