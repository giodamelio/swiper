import { createConnection, Connection } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import config from './config';

import { Video } from './models';

export default function connectDatabase(): Promise<Connection> {
  return createConnection({
    entities: [Video],
    ...config.get('database'),
    synchronize: true,
  } as SqliteConnectionOptions);
}
