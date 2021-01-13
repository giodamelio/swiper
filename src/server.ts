import createApp from './index';
import config from './config';

async function main() {
  const app = await createApp();

  console.log(`Running at http://localhost:${config.get('port')}`);
  app.listen(config.get('port'));
}

main().catch((error) => {
  console.log(error);
});
