import { sequelize } from '../db/index';
import { DataTypes } from 'sequelize';
import { Profile } from './Profile';

export const User = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty: true,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty: true,
		},
		email: {
			type: DataTypes.STRING,
			isEmail: true,
			allowNull: false,
			notEmpty: true,
			notNull: true,
		},
		dui: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty: true,
		},
	},
	{ timestamps: false }
);

Profile.hasOne(User, {
	sourceKey: 'id',
	foreingKey: 'profileId',
});

User.belongsTo(Profile, { targetKey: 'id', foreingKey: 'profileId' });
