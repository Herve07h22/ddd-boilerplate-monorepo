import { LoginCommand, LoginHandler } from "../commands/Login";
import { MemoryUserRepository } from "./MemoryUserRepository";

it("Joe can log in", () => {
  const userRepository = new MemoryUserRepository();
  const handler = LoginHandler({ userRepository });
  const command: LoginCommand = {
    type: "Login",
    payload: {
      username: "Joe",
      password: "password",
    },
  };
  const response = handler(command);
  expect(response.status).toEqual("ok");
  expect(response.value).toHaveProperty("token");
});

it("Joe cannot log in if he forgot his password", () => {
  const userRepository = new MemoryUserRepository();
  const handler = LoginHandler({ userRepository });
  const command: LoginCommand = {
    type: "Login",
    payload: {
      username: "Joe",
      password: "wrongpassword",
    },
  };
  const response = handler(command);
  expect(response.status).toEqual("error");
});
