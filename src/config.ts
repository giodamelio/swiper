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
});

const env = config.get('env');
config.loadFile(path.resolve(__dirname, '../config/', `${env}.json`));

export default config;
