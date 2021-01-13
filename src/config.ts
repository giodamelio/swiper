import path from 'path';

import convict from 'convict';

const config = convict({
  env: {
    doc: 'The app environment',
    format: ['development', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port the server will run on',
    format: 'port',
    default: 3141,
    env: 'PORT',
  },
  database: {
    type: {
      doc: 'Database type',
      format: ['sqlite'],
      default: 'sqlite',
    },
    database: {
      doc: 'Path to the database',
      default: 'db.sqlite',
    },
  },
});

const env = config.get('env');
config.loadFile(path.resolve(__dirname, '../config/', `${env}.json`));

export default config;
