import app from './app';
import { sequelize } from './db/index';
import './models/Company';

async function main() {
	await sequelize.sync({ force: false });
	app.listen(app.get('port'));
	console.log('Server on port 4000');
}
main();
