import { faker } from '@faker-js/faker';

export const defaultName = 'Timur';

export function defaultUser(username = defaultName) {
  return {
    username,
    email: faker.internet.email(),
    roles: [faker.person.jobTitle()],
    password: faker.word.words(),
  };
}