import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Armament, ArmSet } from '.';

interface ArmsDB extends DBSchema {
  arms: {
    key: number;
    value: Armament;
    // indexes: { 'by-price': number };
  };
  armset: {
    key: number;
    value: ArmSet;
  };
}
type db = { current: IDBPDatabase<ArmsDB> };

//Config
const dbConn: db = { current: null };
const dbName = 'Armaments';
const dbVersion = 1;

export async function dbInit() {
  try {
    dbConn.current = await openDB<ArmsDB>(dbName, dbVersion, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        db.createObjectStore('arms', { autoIncrement: true, keyPath: 'id' });
        db.createObjectStore('armset', { autoIncrement: true, keyPath: 'id' });
      }
    });
  } catch (err) {
    console.error('There was an error');
    return false;
  }
  return true;
}

export { dbConn };
