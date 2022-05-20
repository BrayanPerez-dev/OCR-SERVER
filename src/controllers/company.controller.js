import { Company } from '../models/Company';
import Joi from 'joi';
import { BranchOffice } from '../models/BranchOffice';
import { Contact } from '../models/Contact';
import { paymentDate } from '../utils/dates';
import { User } from '../models/User';
import { Profile } from '../models/Profile';
import { TypeContact } from '../models/TypeContact';
import { Log } from '../models/Log';
import { ScanData } from '../models/ScanData';

const validatedSchemaCompany = Joi.object({
	name: Joi.string().required(),
	address: Joi.string().required(),
	telephone: Joi.string().required(),
	nrc: Joi.string().required(),
	giro: Joi.string().required(),
	nit: Joi.string().required(),
	email: Joi.string().email().required(),
	contractedImages: Joi.number().integer().required(),
	contractedImagesMade: Joi.number().integer().required(),
	monthlyAmount: Joi.number().required(),
	available: Joi.boolean().required(),
	paymentDate: Joi.date().required(),
	logo: Joi.string().required(),
	colorOne: Joi.string()
		.pattern(/#([a-f0-9]{3}){1,2}\b/i)
		.required(),
	colorTwo: Joi.string()
		.pattern(/#([a-f0-9]{3}){1,2}\b/i)
		.required(),
	colorThree: Joi.string()
		.pattern(/#([a-f0-9]{3}){1,2}\b/i)
		.required(),
});

export async function createCompany(req, res) {
	const { name, nrc, nit } = req.body;

	try {
		const { error } = validatedSchemaCompany.validate({ ...req.body });
		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const findName = Company.findOne({ where: { name } });
		const findNrc = Company.findOne({ where: { nrc } });
		const findNit = Company.findOne({ where: { nit } });
		const companys = Company.findAll();
		const finders = await Promise.all([findName, findNrc, findNit, companys]);
		req.body.license = finders[3].length + 1;
		req.body.paymentDate = paymentDate(req.body.paymentDate);
		if (
			finders[0]?.dataValues ||
			finders[1]?.dataValues ||
			finders[2]?.dataValues
		) {
			console.log('Repeated values');
			return res.status(500).json({ message: 'Repeated values' });
		}

		const newCompany = await Company.create({ ...req.body });
		await newCompany.save();
		res.status(200).json(newCompany);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getAllCompanys(req, res) {
	try {
		const companies = await Company.findAll();
		res.status(200).json({ companies });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getCompany(req, res) {
	const { id } = req.params;
	try {
		const company = await Company.findOne({ where: { id } });

		res.status(200).json({ company });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function updateCompany(req, res) {
	const { id } = req.params;
	try {
		await Company.update({ ...req.body }, { where: { id } });
		res.status(200).json({ message: 'updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getCompanyAllData(req, res) {
	const { id } = req.params;
	try {
		const foundCompanyBranchOffices = await Company.findAll({
			where: { id },
			include: [
				{
					model: BranchOffice,
					include: [
						{
							model: User,
							attributes: [
								'id',
								'user',
								'name',
								'lastName',
								'telephone',
								'email',
								'dui',
								'profileId',
								'branchofficeId',
							],
							include: [
								{ model: Profile },
								{ model: Log, include: [ScanData] },
							],
						},
					],
				},
				{ model: Contact, include: [TypeContact] },
			],
		});
		res.status(200).json({ foundCompanyBranchOffices });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getCompanyContacts(req, res) {
	const { id } = req.params;
	try {
		const foundCompanyContacts = await Contact.findAll({
			where: { companyId: id },
		});
		res.status(200).json({ foundCompanyContacts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
