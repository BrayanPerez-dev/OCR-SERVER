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
			notNull: true,
			notEmpty: true,
		},
		action: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		level: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
	},
	{ timestamps: false }
);
