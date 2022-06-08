import app from './app';
import { sequelize } from './db/index';
import './models/Company';
import './models/Profile';
import './models/TypeContact';

async function main() {
	await sequelize.sync({ force: true });
	app.listen(app.get('port'));
	console.log('Server on port 4000');
}
main();
