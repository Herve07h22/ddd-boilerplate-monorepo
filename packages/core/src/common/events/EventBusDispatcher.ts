import {
  NamedCommand,
  CommandResponse,
  makeCommandResponse,
} from "../command/Command";
import { CommandBusMiddleware, Middleware } from "../middlewares/Middleware";
import { EventName } from "../Events";
import { BaseEvent } from "./Event";

export class EventBusDispatcher
  extends Middleware
  implements CommandBusMiddleware
{
  handlers: Array<{ event: EventName; handler: (event: any) => void }> = [];
  events: BaseEvent[] = [];

  addHandler<P extends BaseEvent>(handler: (event: P) => void) {
    return {
      toHandleEvent: (event: EventName) => {
        // dont add if the handler is already registered
        const registeredHandlersForThisEvent = this.handlers.filter(
          (h) => h.event === event
        );
        if (
          !registeredHandlersForThisEvent.find((h) => h.handler === handler)
        ) {
          this.handlers.push({ event, handler });
        }
        return this;
      },
    };
  }
  dispatch<P extends NamedCommand>(command: P) {
    if (this._next) {
      const r = this._next.dispatch(command);
      while (this.events.length) {
        const event = this.events.pop();
        if (!event) break;
        // find all the handlers for this event
        const handlers = this.handlers.filter((h) => h.event === event.type);
        // Call them (and ignore the result, since an evtn handler returns void)
        handlers.forEach((h) => h.handler(event));
      }
      return r;
    } else {
      return makeCommandResponse(command).withError(
        "The event bus dispatcher should be registered after the command bus"
      );
    }
  }

  emit<E extends BaseEvent>(event: E) {
    this.events.push(event);
  }
}
