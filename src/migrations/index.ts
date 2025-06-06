import * as migration_20250511_093132 from './20250511_093132';
import * as migration_20250512_171038 from './20250512_171038';
import * as migration_20250512_172405 from './20250512_172405';
import * as migration_20250513_173455 from './20250513_173455';
import * as migration_20250513_173935 from './20250513_173935';
import * as migration_20250515_142610 from './20250515_142610';
import * as migration_20250524_054601 from './20250524_054601';
import * as migration_20250524_124449 from './20250524_124449';

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
    name: '20250513_173935',
  },
  {
    up: migration_20250515_142610.up,
    down: migration_20250515_142610.down,
    name: '20250515_142610',
  },
  {
    up: migration_20250524_054601.up,
    down: migration_20250524_054601.down,
    name: '20250524_054601',
  },
  {
    up: migration_20250524_124449.up,
    down: migration_20250524_124449.down,
    name: '20250524_124449'
  },
];
