import { router } from "../trpc";
import { makeApp } from "@camilab/core/src/App";
import { MemoryUserRepository } from "@camilab/core/src/authentication/tests/MemoryUserRepository";
import { MemoryScheduleRepository } from "@camilab/core/src/schedule/tests/MemoryScheduleRepository";
import { FakeEmailService } from "@camilab/core/src/services/email/FakeEmailService";
import { authenticationRouter } from "./authentication";
import { scheduleRouter } from "./schedule";

const sheduleNotebook = new MemoryScheduleRepository();
const userRepository = new MemoryUserRepository();
const emailService = new FakeEmailService();
export const app = makeApp({ sheduleNotebook, userRepository, emailService });

export const appRouter = router({
  auth: authenticationRouter, // put procedures under "auth" namespace
  schedule: scheduleRouter, // put procedures under "schedule" namespace
});

export type AppRouter = typeof appRouter;
