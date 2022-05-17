import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

export const Profile = sequelize.define(
	'profile',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty: true,
		},
		action: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty: true,
		},
		level: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notEmpty: true,
		},
	},
	{ timestamps: false }
);
