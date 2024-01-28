import { faker } from '@faker-js/faker';
import { CreateGenreDto } from 'src/genre/dto/create-genre.dto';

const randomGenre = (): CreateGenreDto => {
  return {
    genre: faker.music.genre(),
  };
};

module.exports = {
  randomGenre,
};