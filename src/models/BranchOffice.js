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
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

BranchOffice.hasMany(User, {
	sourceKey: 'id',
	foreingKey: 'branchofficeKey',
});

User.belongsTo(BranchOffice, { targetId: 'id', foreingKey: 'branchofficeKey' });
