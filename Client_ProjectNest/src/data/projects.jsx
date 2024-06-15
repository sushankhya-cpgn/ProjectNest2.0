// ESM
import { faker } from "@faker-js/faker";

export function createRandomUser() {
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

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 30,
});
