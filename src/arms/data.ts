import { Armament } from '../utils';
import { dbConn } from '../utils/db';

export async function addArmament(data: Armament) {
  return await dbConn.current.add('arms', data);
}

export async function getArmsData() {
  const arms = await dbConn.current.getAll('arms');
  const armSets = await dbConn.current.getAll('armset');
  return { arms, armSets };
}
