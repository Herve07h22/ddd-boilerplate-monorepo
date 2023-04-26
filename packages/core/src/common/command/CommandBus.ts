import {
  Return,
  NamedCommand,
  CommandResponse,
  makeCommandResponse,
} from "./Command";
import { CommandBusMiddleware } from "../middlewares/Middleware";
export class CommandBus {
  private _rootMiddleware: CommandBusMiddleware | null = null;
  addMiddleware(middleware: CommandBusMiddleware) {
    if (this._rootMiddleware) {
      middleware.then(this._rootMiddleware);
    }
    this._rootMiddleware = middleware;

    return this;
  }
  execute<T extends NamedCommand>(command: T): Return<CommandResponse<T>> {
    if (this._rootMiddleware) {
      return this._rootMiddleware.dispatch(command);
    }
    return makeCommandResponse(command).withError("Nothing to do...");
  }
}
