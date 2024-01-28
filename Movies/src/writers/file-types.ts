import { Movie, MovieDocument } from "src/movie/movie.schema";
import { User, UserDocument } from "src/user/user.schema";

export enum EnumFileTypes {
    JSON = 'json',
    CSV = 'csv'
}

export type FilesType = EnumFileTypes.CSV | EnumFileTypes.JSON;
export type DataTypes = Movie[] | User[];
