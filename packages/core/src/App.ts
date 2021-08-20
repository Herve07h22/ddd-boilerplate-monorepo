import { UserRepository } from "./authentication/repository/UserRepository";
import { BaseCommand } from "./infra/command/Command";
import { CommandBus } from "./infra/command/CommandBus";
import { CommandBusDispatcher } from "./infra/command/CommandBusDispatcher";
import { EventBusDispatcher } from "./infra/events/EventBusDispatcher";
import { AuthenticationMiddleware } from "./infra/middlewares/AuthenticationMiddleware";
import { LoggerMiddleware } from "./infra/middlewares/LoggerMiddleware";
import { TransactionManager } from "./infra/middlewares/TransactionManager";
import { BookASlotHandler } from "./schedule/commands/BookASlot";
import { SendBookingConfirmations } from "./schedule/events/SendBookingConfirmations";
import { SheduleRepository } from "./schedule/repository/SheduleRepository";
import { EmailService } from "./services/email/EmailService";

export function App(dependencies: {
  sheduleNotebook: SheduleRepository;
  userRepository: UserRepository;
  emailService: EmailService;
}) {
  const { sheduleNotebook, userRepository, emailService } = dependencies;

  // The command Bus dispatcher is the middleware that handles the incoming commands
  const commandBusDispatcher = new CommandBusDispatcher();
  // We just add 1 handler to the command Bus dispatcher
  commandBusDispatcher
    .addUseCase(BookASlotHandler(sheduleNotebook))
    .toHandleCommand("Book a slot");

  // The event bus dispatcher is the middleware that handles the domain events
  // generated by the command handlers
  const eventBusDispatcher = new EventBusDispatcher();
  eventBusDispatcher
    .addHandler(SendBookingConfirmations(emailService, userRepository))
    .toHandleEvent("Slot booked");

  // It's easy to add more middlewares to the bus
  const commandBus = new CommandBus()
    .addMiddleware(commandBusDispatcher)
    .addMiddleware(eventBusDispatcher)
    .addMiddleware(new LoggerMiddleware())
    .addMiddleware(new AuthenticationMiddleware(userRepository))
    .addMiddleware(new TransactionManager());

  return {
    run: (command: BaseCommand) => commandBus.execute(command),
  };
}
