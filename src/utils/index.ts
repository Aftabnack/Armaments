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
type TroopType = 'cavalry' | 'archers' | 'infantry';
type Armament = {
  id: number; //autogenerated
  cavA?: number;
  cavD?: number;
  cavH?: number;
  cavM?: number;
  infA?: number;
  infD?: number;
  infH?: number;
  infM?: number;
  arcA?: number;
  arcD?: number;
  arcH?: number;
  arcM?: number;
  allA?: number;
  allD?: number;
  allH?: number;
  allM?: number;
  allDmg?: number;
  skillDmg?: number;
  normalDmg?: number;
  allDmgRed?: number;
  skillDmgRed?: number;
  normalDmgRed?: number;
  normalAtk?: number;
  counterAtk?: number;
  formation: Formations;
  type: ArmType;
};

type OnlyStatKeys = Exclude<keyof Armament, 'type' | 'id' | 'formation'>;

type ArmPower = Record<TroopType, { field: number }>;
type ArmsPower = Record<number, ArmPower>;

type ArmSet = {
  formation: Formations;
  troopType: TroopType;
  situation: 'field' | 'rally' | 'garrison';
  scroll: number; //id of armament
  instrument: number; //id of armament
  flag: number; //id of armament
  emblem: number; //id of armament
};

type PowerFactors = {
  health: number;
  defense: number;
  attack: number;
  marchSpeed: number;
  allDmg: number;
  skillDmg: number;
  normalDmg: number;
  allDmgRed: number;
  skillDmgRed: number;
  normalDmgRed: number;
  normalAtk: number;
  counterAtk: number;
};

//Constants
const fieldMultipliers: PowerFactors = {
  health: 20,
  defense: 12,
  attack: 4,
  marchSpeed: 2,
  allDmg: 17,
  skillDmg: 14,
  normalDmg: 8,
  allDmgRed: 16,
  skillDmgRed: 13,
  normalDmgRed: 7,
  normalAtk: 10,
  counterAtk: 9
};

export const labelMap: Record<OnlyStatKeys, string> = {
  cavA: 'Cavalry Attack',
  cavD: 'Cavalry Defense',
  cavH: 'Cavalry Health',
  cavM: 'March Speed (cavs)',
  infA: 'Infantry Attack',
  infD: 'Infantry Defense',
  infH: 'Infantry Health',
  infM: 'March Speed (inf)',
  arcA: 'Archers Attack',
  arcD: 'Archers Defense',
  arcH: 'Archers Health',
  arcM: 'March Speed (arch)',
  allA: 'All Attack',
  allD: 'All Defense',
  allH: 'All Health',
  allM: 'March Speed',
  allDmg: 'All Dmg',
  skillDmg: 'Skill Dmg',
  normalDmg: 'Normal Dmg',
  allDmgRed: 'All Dmg Reduction',
  skillDmgRed: 'Skill Dmg Reduction',
  normalDmgRed: 'Normal Dmg Reduction',
  normalAtk: 'Normal Attack',
  counterAtk: 'Counter Attack'
};

export const statGrouping: Record<string, OnlyStatKeys[]> = {
  all: [
    'allA',
    'allD',
    'allH',
    'allM',
    'allDmg',
    'skillDmg',
    'normalDmg',
    'allDmgRed',
    'skillDmgRed',
    'normalDmgRed',
    'normalAtk',
    'counterAtk'
  ],
  cav: ['cavA', 'cavD', 'cavH', 'cavM'],
  inf: ['infA', 'infD', 'infH', 'infM'],
  arc: ['arcA', 'arcD', 'arcH', 'arcM']
};

export function addFormationBuff(arm: Armament): Armament {
  const updated: Armament = { ...arm };
  switch (arm.formation) {
    case 'arch':
      updated.normalAtk = arm.normalAtk ?? 0 + 5;
      break;
    case 'wedge':
      updated.skillDmg = arm.normalAtk ?? 0 + 5;
      break;
    case 'hollow square':
      updated.allDmgRed = arm.allDmgRed ?? 0 + 2;
      break;
    case 'echelon':
      //todo
      break;
    case 'triple line':
      updated.allM = arm.allM ?? 0 + 5;
      break;
  }
  return updated;
}

function getStatsForTroopType(arm: Armament, type: TroopType): PowerFactors {
  const toReturn: PowerFactors = {
    health: arm.allH ?? 0,
    defense: arm.allD ?? 0,
    attack: arm.allA ?? 0,
    marchSpeed: arm.allM ?? 0,
    allDmg: arm.allDmg ?? 0,
    skillDmg: arm.skillDmg ?? 0,
    normalDmg: arm.normalDmg ?? 0,
    allDmgRed: arm.allDmgRed ?? 0,
    skillDmgRed: arm.skillDmgRed ?? 0,
    normalDmgRed: arm.normalDmgRed ?? 0,
    normalAtk: arm.normalAtk ?? 0,
    counterAtk: arm.counterAtk ?? 0
  };

  switch (type) {
    case 'archers':
      toReturn.health += arm.arcH ?? 0;
      toReturn.defense += arm.arcD ?? 0;
      toReturn.attack += arm.arcA ?? 0;
      toReturn.marchSpeed += arm.arcM ?? 0;
      break;
    case 'cavalry':
      toReturn.health += arm.cavH ?? 0;
      toReturn.defense += arm.cavD ?? 0;
      toReturn.attack += arm.cavA ?? 0;
      toReturn.marchSpeed += arm.cavM ?? 0;
      break;
    case 'infantry':
      toReturn.health += arm.infH ?? 0;
      toReturn.defense += arm.infD ?? 0;
      toReturn.attack += arm.infA ?? 0;
      toReturn.marchSpeed += arm.infM ?? 0;
      break;
  }

  return toReturn;
}

function finalPower(
  arm: Armament,
  troopType: TroopType,
  multipliers: PowerFactors
): number {
  const finalStats = getStatsForTroopType(arm, troopType);
  return (Object.keys(finalStats) as Array<keyof PowerFactors>).reduce((acc, curr) => {
    return acc + finalStats[curr] * multipliers[curr];
  }, 0);
}

function calculateSinglePower(arm: Armament): ArmPower {
  const armWithFormation = addFormationBuff(arm);
  const toReturn: ArmPower = {
    cavalry: { field: finalPower(armWithFormation, 'cavalry', fieldMultipliers) },
    infantry: { field: finalPower(armWithFormation, 'infantry', fieldMultipliers) },
    archers: { field: finalPower(armWithFormation, 'archers', fieldMultipliers) }
  };
  return toReturn;
}

export function calculateArmsPower(arms: Armament[]): ArmsPower {
  const toReturn: ArmsPower = {};
  arms.reduce((acc, curr) => {
    acc[curr.id] = calculateSinglePower(curr);
    return acc;
  }, toReturn);
  return toReturn;
}

export type { Armament, Formations, ArmSet, ArmType, ArmsPower };
