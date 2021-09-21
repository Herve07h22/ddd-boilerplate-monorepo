// Compose a list of functions
export function pipe<A>(
  argument: A,
  firstFunction: (a: A) => A,
  ...others: Array<(a: A) => A>
): A {
  if (others.length === 0) {
    return firstFunction(argument);
  }
  return pipe(firstFunction(argument), others[0], ...others.slice(1));
}

const value = pipe(3, Math.sin, (x: number) => x * x * x);

// We add a debug message to the returned value. So a debuggable
// function is not composable, due to the asymetric structure
// of the input and the output.
export function debuggable<A>(f: (a: A) => A, message: string) {
  return (x: A) => ({
    value: f(x),
    message: message,
  });
}

// unit :: A -> (A,String)
// Turns a value into a new type
export function unit<A>(x: A) {
  return { value: x, message: "" };
}

// bind :: (A -> (A,String)) -> ((A,String) -> (A,String))
// Makes the function composable
export function bind<A>(f: (a: A) => { value: A; message: string }) {
  return function (tuple: { value: A; message: string }) {
    var x = tuple.value,
      s = tuple.message,
      fx = f(x),
      y = fx.value,
      t = fx.message;
    return { value: y, message: s + t };
  };
}

export const debuggableSin = bind(debuggable(Math.sin, "Sin was called! "));
export const debuggableCube = bind(
  debuggable((x: number) => x * x * x, "Cube was called! ")
);

const valueWithDebug = pipe(unit(3), debuggableSin, debuggableCube);
