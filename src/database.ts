import { createConnection, Connection } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import config from './config';

import { Video, Channel } from './models';

export default function connectDatabase(): Promise<Connection> {
  return createConnection({
    entities: [Video, Channel],
    ...config.get('database'),
    synchronize: true,
  } as SqliteConnectionOptions);
}
