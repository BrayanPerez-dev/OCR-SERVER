import pg from 'pg';
import config from '../config';

const { Pool } = pg;

const devConfig = {
	user: config.DB_USER,
	password: config.DB_PASS,
	host: config.DB_HOST,
	database: config.DB_NAME,
	port: config.DB_PORT,
};

const proConfing = {
	connectionString: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};

const pool = new Pool(
	config.NODE_ENV === 'production' ? proConfing : devConfig
);

export default pool;
