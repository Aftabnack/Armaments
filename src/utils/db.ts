import { DBSchema, IDBPDatabase, openDB } from 'idb';

//Types
type Formations =
  | 'arch'
  | 'wedge'
  | 'echelon'
  | 'hollow square'
  | 'v'
  | 'triple line'
  | 'line';
type ArmType = 'scroll' | 'instrument' | 'flag' | 'emblem';
type ArmsData = {
  allA?: number;
  allD?: number;
  allH?: number;
  cavA?: number;
  cavD?: number;
  cavH?: number;
  infA?: number;
  infD?: number;
  infH?: number;
  arcA?: number;
  arcD?: number;
  arcH?: number;
  allDmg?: number;
  skillDmg?: number;
  normalDmg?: number;
  formation: Formations;
  type: ArmType;
};

type ArmSet = {
  formation: Formations;
  troopType: 'cavalry' | 'archers' | 'infantry';
  scroll: number; //id of armament
  instrument: number; //id of armament
  flag: number; //id of armament
  emblem: number; //id of armament
};

interface ArmsDB extends DBSchema {
  arms: {
    key: number;
    value: ArmsData;
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
export type { ArmsData, Formations, ArmSet, ArmType };
