import { faker } from '@faker-js/faker';
import { CreateDirectorDto } from 'src/director/dto/create-director.dto';

const randomDirector = (): CreateDirectorDto => {
  return {
    name: faker.person.fullName(),
    dateOfBirth: faker.date.birthdate(),
  };
};

module.exports = {
  randomDirector,
};