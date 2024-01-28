export const defaultNamePlayList = 'favorite movies';

export function defaultPlayList(title = defaultNamePlayList) {
  return {
    title,
    movie: [],
    user: '65639ea7844351de1430ea3e3',
    condition: 'PUBLIC',
  };
}