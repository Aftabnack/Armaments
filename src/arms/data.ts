import { ArmsData, dbConn } from '../utils/db';

export async function getArms() {
  return await dbConn.current.getAll('arms');
}

export async function addArmament(data: ArmsData) {
  return await dbConn.current.add('arms', data);
}
