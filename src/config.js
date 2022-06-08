import { config } from 'dotenv';

config();

export default {
	PORT: process.env.PORT || 4000,
	DB_HOST: process.env.DB_HOST,
	DB_USER: process.env.DB_USER,
	DB_PASS: process.env.DB_PASS,
	DB_NAME: process.env.DB_NAME,
	DB_PORT: process.env.DB_PORT,
	DB_URL: process.env.DB_URL,
	NODE_ENV: process.env.NODE_ENV,
	SECRET: process.env.SECRET,
	EXPIRATION: process.env.EXPIRATION,
	DIALECT: process.env.DIALECT,
	PROTOCOL: process.env.PROTOCOL,
};
