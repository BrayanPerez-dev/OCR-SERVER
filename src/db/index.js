import config from '../config';
import Sequelize from 'sequelize';

const proConfing = new Sequelize(config.DB_URL, {
	dialect: config.DIALECT,
	protocol: config.PROTOCOL,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

const devConfig = new Sequelize(
	config.DB_NAME,
	config.DB_USER,
	config.DB_PASS,
	{
		host: config.DB_HOST,
		dialect: config.DIALECT,
		pool: {
			max: 5,
			min: 0,
			require: 30000,
			idle: 10000,
		},
		logging: false,
	}
);
const setUp = config.NODE_ENV === 'production' ? proConfing : devConfig;

export const sequelize = setUp;
