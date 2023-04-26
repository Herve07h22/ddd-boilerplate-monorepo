import { Return, NamedCommand, CommandResponse } from "../command/Command";

export type CommandBusMiddleware = {
  then: (next: CommandBusMiddleware) => void;
  dispatch: <T extends NamedCommand>(command: T) => Return<CommandResponse<T>>;
};

export class Middleware {
  protected _next: CommandBusMiddleware | null = null;
  then(middleware: CommandBusMiddleware) {
    this._next = middleware;
  }
}
