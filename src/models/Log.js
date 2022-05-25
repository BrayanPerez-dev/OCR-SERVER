import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import { ScanData } from './ScanData';
import { dateFormat } from '../utils/dates';

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
			get: function () {
				return dateFormat(this.getDataValue('date'));
			},
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		send: {
			type: DataTypes.TIME,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		receive: {
			type: DataTypes.TIME,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		idTransaction: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
		},
	},
	{ timestamps: false }
);

Log.hasOne(ScanData, {
	sourceKey: 'id',
	foreignKey: {
		name: 'logId',
		unique: true,
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
});

ScanData.belongsTo(Log, {
	targetKey: 'id',
	foreingKey: {
		name: 'logId',
		unique: true,
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
});
