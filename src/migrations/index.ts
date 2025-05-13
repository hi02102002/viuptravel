import * as migration_20250511_093132 from './20250511_093132';
import * as migration_20250512_171038 from './20250512_171038';
import * as migration_20250512_172405 from './20250512_172405';
import * as migration_20250513_173455 from './20250513_173455';
import * as migration_20250513_173935 from './20250513_173935';

export const migrations = [
  {
    up: migration_20250511_093132.up,
    down: migration_20250511_093132.down,
    name: '20250511_093132',
  },
  {
    up: migration_20250512_171038.up,
    down: migration_20250512_171038.down,
    name: '20250512_171038',
  },
  {
    up: migration_20250512_172405.up,
    down: migration_20250512_172405.down,
    name: '20250512_172405',
  },
  {
    up: migration_20250513_173455.up,
    down: migration_20250513_173455.down,
    name: '20250513_173455',
  },
  {
    up: migration_20250513_173935.up,
    down: migration_20250513_173935.down,
    name: '20250513_173935'
  },
];
