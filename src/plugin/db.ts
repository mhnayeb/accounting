import Dexie, { Table } from 'dexie';
import { Person } from '../interface/interface';

export enum ScoreType {
  Valid,
  InValid,
  Falsy
}

export class Database extends Dexie {
    listPerson!: Table<Person>; 
    constructor() {
      super('db');
      this.version(1).stores({
        listPerson: 'name , count , paid , debt , paidList' 
      });
    }
  }
  
export const db = new Database();