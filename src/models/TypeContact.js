import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const TypeContact = sequelize.define(
	'typecontact',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: { type: DataTypes.STRING, allowNull: true },
	},
	{
		timestamps: false,
	}
);
