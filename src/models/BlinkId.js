import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

export const scanData = sequelize.define(
	'scandata',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		scanData: {
			type: DataTypes.JSON(),
		},
	},
	{ timestamps: false }
);
