import { App } from "../../App";
import { makeTestApp } from "../../tests/makeTestApp";
import { LoginCommand } from "../commands/Login";

var testApp: App;

beforeEach(() => {
  testApp = makeTestApp();
});

it("Joe can log in", () => {
  const command: LoginCommand = {
    type: "Login",
    payload: {
      username: "Joe",
      password: "password",
    },
  };
  const response = testApp.run(command);
  expect(response.status).toEqual("ok");
  response.status === "ok" && expect(response.value).toHaveProperty("token");
});

it("Joe cannot log in if he forgot his password", () => {
  const command: LoginCommand = {
    type: "Login",
    payload: {
      username: "Joe",
      password: "wrongpassword",
    },
  };
  const response = testApp.run(command);
  expect(response.status).toEqual("error");
});
