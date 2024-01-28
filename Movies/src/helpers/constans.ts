  export const ERROR_MESSAGE = {
    E_MOVIE_ID: 'Фильм по этому id не найден',
    E_USER_ID: 'Пользователь по этому id не найден',
    E_DIRECTOR_ID: 'Режиссер по этому id не найден',
    E_GENRE_ID: 'Жанр по этому id не найден',
    E_GENRE_CONFLICT: 'Данный жанр уже существует',
    E_EMAIL_CONFLICT: 'Данная почта уже была зарегистрирована',
    E_USEREMAIL: 'Пользователь с указанной почтой не найден',
    E_PASSWORD: 'Неправильный пароль',
    E_PLAYLIST_ID: 'Плейлист по этому id не найден',
    E_PLAYLIST_OWNER: 'Вы не являетесь владельцом списка',
    E_PERMISSIN: 'Недостатачно прав',
    E_REVIEWS: 'Комментарий по этому id не найден'
  };
  
  export const MESSAGE = {
    USER_CREATE: 'Пользователь создан',
    MOVIE_CREATE: 'Фильм создан',
    DIRECTOR_CREATE: 'Режиссер создан',
    GENRE_CREATE: 'Жанр создан',
  };

  export enum Role {
    User = 'user',
    Admin = 'admin'
  }

  export const CONDITION = {
    PUBLIC: 'PUBLIC',
    PRIVATE: 'PRIVATE'
  }
  
