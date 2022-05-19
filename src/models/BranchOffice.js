import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import { User } from './User';

export const BranchOffice = sequelize.define(
	'branchoffice',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		email: {
			type: DataTypes.STRING,
			isEmail: true,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
	},
	{ timestamps: false }
);

BranchOffice.hasMany(User, {
	sourceKey: 'id',
	foreingKey: 'branchofficeKey',
});

User.belongsTo(BranchOffice, { targetId: 'id', foreingKey: 'branchofficeKey' });
