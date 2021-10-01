export interface EmployeeRepository {
  idsByName: Map<string, number>;
  getIdByName: (name: string) => number | undefined;
  getDeptById: (id: number) => string | undefined;
  getSalaryById: (id: number) => number | undefined;
}

export const fakeEmployeeRepository: () => EmployeeRepository = () => {
  const idsByName = new Map<string, number>([
    ["Bob", 1],
    ["Alice", 2],
    ["Joe", 2],
  ]);
  const depts = new Map<number, string>([
    [1, "Marketing"],
    [2, "Sales"],
    [3, "Marketing"],
  ]);
  const salaries = new Map<number, number>([
    [1, 2000],
    [2, 3000],
    [3, 2500],
  ]);
  return {
    idsByName,
    getIdByName: idsByName.get.bind(idsByName),
    getDeptById: depts.get.bind(depts),
    getSalaryById: salaries.get.bind(salaries),
  };
};

// cascading ifs
export function printInformationWithoutFunctor(
  employeeName: string,
  employeeRepository: EmployeeRepository = fakeEmployeeRepository()
) {
  const id = employeeRepository.getIdByName(employeeName);
  if (id) {
    const dept = employeeRepository.getDeptById(id);
    const salary = employeeRepository.getSalaryById(id);
    if (dept && salary) {
      return `${employeeName} in ${dept} dept makes ${salary} per month.`;
    }
  }
  return `${employeeName} in unknown dept dept makes unknown salary per month.`;
}

// Let's code it with a functor
export class SimpleOption<A> {
  constructor(public value?: A) {}
  static of<A>(value?: A) {
    return new SimpleOption(value);
  }
  isNothing() {
    return this.value === null || this.value === undefined;
  }
  flatMap<B>(fn: (x: A) => B | undefined): SimpleOption<B> {
    if (this.isNothing()) {
      return SimpleOption.of<B>();
    } else {
      return SimpleOption.of(fn(this.value as A));
    }
  }
  map<B>(fn: (x: A | undefined) => B): B {
    return fn(this.value);
  }
}

export function printInformationWithFunctor(
  employeeName: string,
  employeeRepository: EmployeeRepository = fakeEmployeeRepository()
) {
  const deptDisplay = SimpleOption.of(employeeName)
    .flatMap(employeeRepository.getIdByName) // getIdByName might return undefined !
    .flatMap(employeeRepository.getDeptById)
    .map((dept) => dept || "unknown");

  const salaryDisplay = SimpleOption.of(employeeName)
    .flatMap(employeeRepository.getIdByName)
    .flatMap(employeeRepository.getSalaryById)
    .map((salary) => salary || "unknown");

  return `${employeeName} in ${deptDisplay} dept makes ${salaryDisplay} per month.`;
}
