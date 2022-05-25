import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

export const TypeContact = sequelize.define(
	'typecontact',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
	},
	{
		timestamps: false,
	}
);
