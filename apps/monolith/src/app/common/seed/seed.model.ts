import { seed as defaultSeed } from './seeds/default.seed';

export enum SeedType {
    DEFAULT
}

export const getSeed = (type: SeedType) => {
  switch(type) {
    case SeedType.DEFAULT:
    default:
      return defaultSeed;
  }
}
