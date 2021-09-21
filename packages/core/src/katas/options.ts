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

export class Option<A> {
  constructor(private value?: A, private nothing?: string) {}
  static of<A>(value?: A) {
    return new Option(value, "Nothing");
  }
  isNothing() {
    return this.value === null || this.value === undefined;
  }
  toValue() {
    return this.isNothing() ? this.nothing || "Nothing" : this.value;
  }
  ifNothing(nothing?: string) {
    this.nothing = nothing;
    return this;
  }
  map<B>(fn: (x: A) => B | undefined): Option<B> {
    if (this.isNothing()) {
      return Option.of<B>().ifNothing(this.nothing);
    } else {
      return Option.of(fn(this.value as A)).ifNothing(this.nothing);
    }
  }
}

export function printInformation(
  employeeName: string,
  employeeRepository: EmployeeRepository = fakeEmployeeRepository()
) {
  const dept = Option.of(employeeName)
    .ifNothing("unknown dept") // Add a label to undefined/null value
    .map(employeeRepository.getIdByName) // getIdByName might return undefined !
    .map(employeeRepository.getDeptById);

  const salary = Option.of(employeeName)
    .ifNothing("unknown salary")
    .map(employeeRepository.getIdByName)
    .map(employeeRepository.getSalaryById);

  return `${employeeName} in ${dept.toValue()} dept makes ${salary.toValue()} per month.`;
}
