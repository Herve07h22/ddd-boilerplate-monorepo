import { User } from "../../authentication/models/User";

export type Return<T = unknown> =
  | {
      status: "ok";
      value: T;
    }
  | {
      status: "error";
      error?: string;
    };

export function makeCommandResponse<T>(command: T) {
  return {
    withValue: (value: CommandResponse<T>) => {
      const r: Return<CommandResponse<T>> = { status: "ok", value };
      return r;
    },
    withError: (error: string) =>
      ({ status: "error", error } as Return<CommandResponse<T>>),
    withNoValue: () => ({ status: "ok" } as Return<CommandResponse<T>>),
  };
}

export type NamedCommand<T = string, P = unknown, R = unknown> = {
  type: T;
  payload: P;
  default?: R;
};

export type NamedAuthenticatedCommand<
  T = string,
  P = unknown,
  R = unknown
> = NamedCommand<T, P, R> & {
  user?: User;
  token?: string;
};

export type CommandName<T> = T extends NamedCommand<infer N, any, any>
  ? N
  : never;

export type CommandResponse<T> = T extends NamedCommand<any, any, infer R>
  ? R
  : never;

export type Command<P> = P extends NamedCommand<any, any, infer R>
  ? (command: P) => Return<R>
  : never;

export type CommandHandler<T, U> = (dependencies: U) => Command<T>;
