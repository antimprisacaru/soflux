import { seed as defaultSeed } from './seeds/default.seed';
import { seed as emptySeed } from './seeds/empty.seed';

export enum SeedType {
    DEFAULT,
    EMPTY
}

export const getSeed = (type: SeedType) => {
  switch(type) {
    case SeedType.EMPTY:
      return emptySeed;
    case SeedType.DEFAULT:
    default:
      return defaultSeed;
  }
}
