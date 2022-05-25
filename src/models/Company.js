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
		giro: {
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
		contractedImagesMade: {
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
			type: DataTypes.BOOLEAN,
			defaultValue: true,
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
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
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
			is: /#([[:xdigit:]]{3}){1,2}\b/,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		colorTwo: {
			type: DataTypes.STRING,
			is: /#([[:xdigit:]]{3}){1,2}\b/,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		colorThree: {
			type: DataTypes.STRING,
			is: /#([[:xdigit:]]{3}){1,2}\b/,
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
	foreignKey: {
		name: 'companyId',
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
	sourceKey: 'id',
});

BranchOffice.belongsTo(Company, {
	foreignKey: {
		name: 'companyId',
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
	targetId: 'id',
});

Company.hasMany(Contact, {
	foreignKey: {
		name: 'companyId',
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
	sourceKey: 'id',
});

Contact.belongsTo(Company, {
	foreignKey: {
		name: 'companyId',
		allowNull: false,
		notNull: true,
		notEmpty: true,
	},
	targetId: 'id',
});
