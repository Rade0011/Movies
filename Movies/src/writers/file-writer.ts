import { Writer } from './writer';
import { DataTypes, EnumFileTypes } from './file-types';
import { TypeSelector } from './type-selector';

export class FileWriter {
    fileType: EnumFileTypes;
    data: DataTypes;
    constructor(fileType: EnumFileTypes, data: DataTypes) {
        this.fileType = fileType;
        this.data = data;
    }
    async writeFile() {
        const writer: Writer = TypeSelector.selectorWriter(this.fileType);
        await writer.write(this.data)
    }
}