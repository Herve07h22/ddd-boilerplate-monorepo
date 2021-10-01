import {
  EmployeeRepository,
  fakeEmployeeRepository,
  printInformationWithoutFunctor,
  printInformationWithFunctor,
} from "./options";

it("We can use a fake repository", () => {
  const employeeRepository: EmployeeRepository = fakeEmployeeRepository();
  expect(employeeRepository.getIdByName("Bob")).toEqual(1);
});

it("We print informations about a existing employee", () => {
  const value = printInformationWithoutFunctor("Alice");
  expect(value).toEqual("Alice in Sales dept makes 3000 per month.");
  const valueSimple = printInformationWithFunctor("Alice");
  expect(valueSimple).toEqual("Alice in Sales dept makes 3000 per month.");
});

it("We print informations about a unknown employee", () => {
  const value = printInformationWithoutFunctor("Mike");
  expect(value).toEqual(
    "Mike in unknown dept dept makes unknown salary per month."
  );
  const valueSimple = printInformationWithFunctor("Mike");
  expect(valueSimple).toEqual("Mike in unknown dept makes unknown per month.");
});
