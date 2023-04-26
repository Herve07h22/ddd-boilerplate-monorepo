import {
  NamedCommand,
  CommandResponse,
  makeCommandResponse,
} from "../command/Command";
import { CommandBusMiddleware, Middleware } from "./Middleware";

export class TransactionManager
  extends Middleware
  implements CommandBusMiddleware
{
  dispatch<P extends NamedCommand>(command: P) {
    console.log("[Transaction manager] Begin session");
    if (this._next) {
      const r = this._next.dispatch(command);
      if (r.status === "error") {
        console.log("[Transaction manager] ROLLBACK");
      } else {
        console.log("[Transaction manager] COMMIT");
      }
      return r;
    }
    return makeCommandResponse(command).withNoValue();
  }
}
