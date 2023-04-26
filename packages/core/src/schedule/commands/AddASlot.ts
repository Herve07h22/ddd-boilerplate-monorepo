import { NamedAuthenticatedCommand } from "../../common/command/Command";

export type AddASlotCommand = NamedAuthenticatedCommand<
  "Add a slot",
  {
    slot: Date;
    doctor: string;
  }
>;
