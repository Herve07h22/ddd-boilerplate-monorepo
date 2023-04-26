import { App, makeApp } from "../App";
import { MemoryUserRepository } from "../authentication/tests/MemoryUserRepository";
import { MemoryScheduleRepository } from "../schedule/tests/MemoryScheduleRepository";
import { FakeEmailService } from "../services/email/FakeEmailService";

export function makeTestApp(): App {
  const sheduleNotebook = new MemoryScheduleRepository();
  const userRepository = new MemoryUserRepository();
  const emailService = new FakeEmailService();
  return makeApp({ sheduleNotebook, userRepository, emailService });
}
