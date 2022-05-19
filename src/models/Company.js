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
			notNull: true,
			notEmpty: true,
			unique: true,
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
		nrc: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
			unique: true,
		},
		turn: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		nit: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			isEmail: true,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		contractedImages: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		monthlyAmount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		available: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		paymentDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			notNull: true,
			notEmpty: true,
			get: function () {
				return dateFormat(this.getDataValue('paymentDate'));
			},
		},
		license: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notNull: true,
			notEmpty: true,
			unique: true,
		},
		logo: {
			type: DataTypes.TEXT,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		colorOne: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		colorTwo: {
			type: DataTypes.STRING,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		colorThree: {
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
