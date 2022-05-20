import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import { dateFormat } from '../utils/dates';

export const ScanData = sequelize.define(
	'scandata',
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
		scanData: {
			type: DataTypes.JSON(),
		},
	},
	{ timestamps: false }
);
