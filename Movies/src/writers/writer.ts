import { DataTypes } from './file-types';

export interface Writer {
  write(data: DataTypes): Promise<any>;
}