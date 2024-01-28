import { faker } from '@faker-js/faker';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';

const randomMovie = (): CreateMovieDto => {
  return {
    name: faker.music.songName(),
    year: faker.number.int({ min: 1950, max: 2023 }),
    duration: faker.number.int({ min: 15, max: 240 }),
  };
};

module.exports = {
  randomMovie,
};