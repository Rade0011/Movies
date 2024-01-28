import { writeFile } from 'fs/promises';
import { DataTypes } from './file-types';
import { Writer } from './writer';

export class JsonWriter implements Writer {
    constructor() {}
    async write(data: DataTypes) {
        const json = JSON.stringify(data);
        return await writeFile('data.json', json)
    }
}