import {
  CommandHandler,
  makeCommandResponse,
  NamedAuthenticatedCommand,
} from "../../common/command/Command";
import { EventBusDispatcher } from "../../common/events/EventBusDispatcher";
import { SlotBooked } from "../events/SendBookingConfirmations";
import { SheduleRepository } from "../repository/SheduleRepository";
import { z } from "zod";

export const bookASlotPayloadSchema = z.object({
  slot: z.coerce.date(),
  doctor: z.string(),
});

export type BookASlotCommand = NamedAuthenticatedCommand<
  "Book a slot",
  z.infer<typeof bookASlotPayloadSchema>
>;

export const BookASlotHandler: CommandHandler<
  BookASlotCommand,
  {
    sheduleNotebook: SheduleRepository;
    eventBus: EventBusDispatcher;
  }
> =
  (dependencies: {
    sheduleNotebook: SheduleRepository;
    eventBus: EventBusDispatcher;
  }) =>
  (command: BookASlotCommand) => {
    if (!command.user) {
      return makeCommandResponse(command).withError(
        "A user must be logged in to book a slot"
      );
    }
    // Create or obtain an aggregate
    // Call the methods of this aggregate
    // Save it
    console.log("I do the stuff");

    dependencies.eventBus.emit({
      type: "Slot booked",
      payload: {
        slot: new Date("2021-01-01"),
        doctor: "Dr Frankenstein",
        user: command.user,
      },
    });
    return makeCommandResponse(command).withValue("Job done");
  };
