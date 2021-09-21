import {
  EmployeeRepository,
  fakeEmployeeRepository,
  printInformation,
} from "./options";

it("We can use a fake repository", () => {
  const employeeRepository: EmployeeRepository = fakeEmployeeRepository();
  expect(employeeRepository.getIdByName("Bob")).toEqual(1);
});

it("We print informations about a existing employee", () => {
  const value = printInformation("Alice");
  expect(value).toEqual("Alice in Sales dept makes 3000 per month.");
});

it("We print informations about a unknown employee", () => {
  const value = printInformation("Mike");
  expect(value).toEqual(
    "Mike in unknown dept dept makes unknown salary per month."
  );
});
