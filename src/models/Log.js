import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import { BlinkId } from './BlinkId';

export const Log = sequelize.define(
	'log',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			notEmpty: true,
		},
		send: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notEmpty: true,
		},
		receive: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notEmpty: true,
		},
		transfer: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notEmpty: true,
		},
	},
	{ timestamps: false }
);

Log.hasMany(BlinkId, { sourceKey: 'id', foreingKey: 'logId' });

BlinkId.belongsTo(Log, { targetKey: 'id', foreingKey: 'logId' });
