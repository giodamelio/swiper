import app from './index';
import config from './config';

console.log(`Running at http://localhost:${config.get('port')}`);
app.listen(config.get('port'));
