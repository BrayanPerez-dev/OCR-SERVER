import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

export const BlinkId = sequelize.define(
	'blinkid',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		scanData: {
			type: DataTypes.ARRAY(DataTypes.JSON),
		},
	},
	{ timestamps: false }
);
