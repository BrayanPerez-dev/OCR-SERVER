import { sequelize } from '../db/index';
import { DataTypes } from 'sequelize';
import { Profile } from './Profile';
import { Log } from './Log';

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
			notNull: true,
			notEmpty: true,
			max: 2,
			min: 30,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		password: {
			type: DataTypes.STRING,
			is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,12})/,
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
		available: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		dui: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
	},
	{ timestamps: false }
);

Profile.hasMany(User, {
	sourceKey: 'id',
	foreingKey: {
		name: 'profileId',
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
});

User.belongsTo(Profile, {
	targetKey: 'id',
	foreingKey: {
		name: 'profileId',
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
});

User.hasMany(Log, {
	sourceKey: 'id',
	foreingKey: {
		name: 'userId',
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
});

Log.belongsTo(User, {
	targetKey: 'id',
	foreingKey: {
		name: 'userId',
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
});
