import * as migration_20250511_093132 from './20250511_093132';

export const migrations = [
  {
    up: migration_20250511_093132.up,
    down: migration_20250511_093132.down,
    name: '20250511_093132'
  },
];
