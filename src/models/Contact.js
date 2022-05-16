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
		},
		lastName: {
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
		dui: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

TypeContact.hasMany(Contact, {
	sourceKey: 'id',
	foreingKey: 'typecontactId',
});

Contact.belongsTo(TypeContact, {
	targetKey: 'id',
	foreingKey: 'typecontactId',
});
