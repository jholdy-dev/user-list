import { faker } from "@faker-js/faker";

const users = Array.from({ length: 100 }, () => ({
  name: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  city: faker.location.city(),
  country: faker.location.country(),
  birthDate: faker.date.birthdate().toISOString().split("T")[0],
}));

export default users;
