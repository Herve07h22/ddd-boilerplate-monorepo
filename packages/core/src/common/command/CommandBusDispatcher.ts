import {
  Command,
  Return,
  CommandName,
  NamedCommand,
  CommandResponse,
} from "./Command";
import { CommandBusMiddleware } from "../middlewares/Middleware";

export class CommandBusDispatcher implements CommandBusMiddleware {
  handlers: Map<string, (command: NamedCommand) => Return> = new Map();

  then(middleware: CommandBusMiddleware) {
    throw new Error("The CommandBusDispatcher should be the last middleware");
  }
  addUseCase<P>(handler: Command<P>) {
    return {
      toHandleCommand: (commandType: CommandName<P>) => {
        this.handlers.set(
          String(commandType),
          handler as unknown as (command: NamedCommand) => Return
        );
        return this;
      },
    };
  }
  dispatch<T extends NamedCommand>(command: T) {
    // find the (unique) handler for this command. 1 command => 1 handler
    const handler = this.handlers.get(command.type);
    if (!handler)
      throw new Error(
        "Cannot find any handler for this command :" + command.type
      );
    return handler(command) as Return<CommandResponse<T>>;
  }
}
