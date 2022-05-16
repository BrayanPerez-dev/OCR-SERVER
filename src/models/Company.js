import { sequelize } from '../db/index';
import { DataTypes } from 'sequelize';
import { dateFormat } from '../utils/dates';
import { BranchOffice } from './BranchOffice';
import { Contact } from './Contact';
export const Company = sequelize.define(
	'company',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nrc: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		turn: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nit: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contractedImages: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		monthlyAmount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		available: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		paymentDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			get: function () {
				return dateFormat(this.getDataValue('paymentDate'));
			},
		},
		license: {
			type: DataTypes.INTEGER,
			unique: true,
		},
		logo: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		colorOne: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		colorTwo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		colorThree: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

Company.hasMany(BranchOffice, {
	foreignKey: 'companyId',
	sourceKey: 'id',
});

BranchOffice.belongsTo(Company, { foreignKey: 'companyId', targetId: 'id' });

Company.hasMany(Contact, {
	foreignKey: 'companyId',
	sourceKey: 'id',
});

Contact.belongsTo(Company, { foreignKey: 'companyId', targetId: 'id' });
