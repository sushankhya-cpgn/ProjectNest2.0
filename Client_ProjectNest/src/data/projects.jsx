// ESM
import { faker } from "@faker-js/faker";
import axios from "axios";

export function CreateRandomUser() {
  return {
    profile: faker.image.avatar(),
    projectId: faker.string.uuid(),
    ProjectName: faker.internet.userName(),
    ProjectDescription: faker.internet.userName(),
    Members: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    Supervisor: faker.internet.userName(),
    registered: "no",
  };
}

export const USERS = faker.helpers.multiple(CreateRandomUser, {
  count: 30,
});
console.log(USERS);
