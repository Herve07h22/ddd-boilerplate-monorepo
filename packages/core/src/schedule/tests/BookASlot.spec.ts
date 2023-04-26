import { BookASlotCommand } from "../commands/BookASlot";
import { App } from "../../App";
import { makeTestApp } from "../../tests/makeTestApp";

var testApp: App;

beforeEach(() => {
  testApp = makeTestApp();
});

it("An unregistered user cannot book a slot", () => {
  const command: BookASlotCommand = {
    type: "Book a slot",
    payload: {
      slot: new Date("2021-01-01"),
      doctor: "Dr Frankenstein",
    },
  };
  const response = testApp.run(command);
  expect(response.status).toEqual("error");
});

it("A registered user can book a free slot with Dr Frankenstein", () => {
  const command: BookASlotCommand = {
    type: "Book a slot",
    payload: {
      slot: new Date("2021-01-01"),
      doctor: "Dr Frankenstein",
    },
    user: {
      name: "John Doe",
      role: "Patient",
    },
  };
  const response = testApp.run(command);
  expect(response.status).toEqual("ok");
});

it("The logged user is guessed with its token", () => {
  // Lets simulate that Joe is logged in
  testApp.dependencies.userRepository.setTokenForUser({
    token: "verysecrettoken",
    username: "Joe",
  });

  const command: BookASlotCommand = {
    type: "Book a slot",
    token: "verysecrettoken",
    payload: {
      slot: new Date("2021-01-01"),
      doctor: "Dr Frankenstein",
    },
  };
  const response = testApp.run(command);
  expect(response.status).toEqual("ok");
});
