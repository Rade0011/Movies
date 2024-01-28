import { writeFile } from 'fs/promises';
import { Writer } from './writer';
import { DataTypes } from './file-types';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import * as fastCsv from 'fast-csv';

export class CsvWriter {
    async write(data: any[]) {
      return new Promise<void>((resolve, reject) => {
        const csvStream = fastCsv.format({ headers: true });
        const writeStream = fs.createWriteStream('data.csv');
  
        csvStream.pipe(writeStream);
  
        data.forEach((item) => {
          const csvData = {
            id: item.id,
            name: item.name,
            year: item.year,
            genre: item.genre,
            duration: item.duration,
            director: item.director,
          };
  
          csvStream.write(csvData);
        });
  
        csvStream.end();
  
        writeStream.on('finish', () => {
          resolve();
        });
  
        writeStream.on('error', (error) => {
          reject(error);
        });
      });
    }
  }