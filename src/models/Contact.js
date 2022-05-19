import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { TypeContact } from './TypeContact';
export const Contact = sequelize.define(
	'contact',
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
		lastName: {
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
		dui: {
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

TypeContact.hasOne(Contact, {
	sourceKey: 'id',
	foreingKey: 'typecontactId',
});

Contact.belongsTo(TypeContact, {
	targetKey: 'id',
	foreingKey: 'typecontactId',
});
