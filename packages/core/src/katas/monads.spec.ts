import { pipe, unit, debuggableSin, debuggableCube } from "./monads";

it("We can pipe simple number=>number functions", () => {
  const value = pipe(1, Math.sin, (x: number) => x * x * x);
  console.log(value);
  expect(Math.floor(value * 100)).toEqual(59);
});

it("We can pipe functions in the correct order", () => {
  const value = pipe(
    2,
    (x) => x + 2,
    (x: number) => x * x
  );
  console.log(value);
  expect(value).toEqual(16);
});

it("We can pipe simple debuggable functions", () => {
  const valueWithDebug = pipe(unit(1), debuggableSin, debuggableCube);
  console.log(valueWithDebug);
  expect(valueWithDebug.message).toEqual("Sin was called! Cube was called! ");
});
