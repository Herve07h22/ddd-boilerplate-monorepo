import { User } from "../../authentication/models/User";
import { IUserRepository } from "../../authentication/interfaces/UserRepository";
import { Event } from "../../common/events/Event";
import { EmailService } from "../../services/email/EmailService";

export type SlotBooked = Event<
  "Slot booked",
  {
    slot: Date;
    doctor: string;
    user: User;
  }
>;

export const SendBookingConfirmations =
  (dependencies: {
    emailService: EmailService;
    userRepository: IUserRepository;
  }) =>
  (event: SlotBooked) => {
    dependencies.emailService.sendMail(
      event.payload.user.name,
      "Your booking has been confirmed"
    );
  };
