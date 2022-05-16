import { Company } from '../models/Company';
import Joi from 'joi';
import { BranchOffice } from '../models/BranchOffice';
import { Contact } from '../models/Contact';

const validatedSchemaCompany = Joi.object({
	name: Joi.string().required(),
	address: Joi.string().required(),
	telephone: Joi.string().required(),
	nrc: Joi.string().required(),
	turn: Joi.string().required(),
	nit: Joi.string().required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		})
		.required(),
	contractedImages: Joi.number().integer().required(),
	monthlyAmount: Joi.number().required(),
	available: Joi.number().integer().required(),
	paymentDate: Joi.required(),
	logo: Joi.string().required(),
	colorOne: Joi.string().required(),
	colorTwo: Joi.string().required(),
	colorThree: Joi.string().required(),
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
		const companys = await Company.findAll();
		res.status(200).json({ companys });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getCompany(req, res) {
	const { id } = req.params;
	try {
		const companys = await Company.findOne({ where: { id } });
		res.status(200).json({ companys });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function deleteCompany(req, res) {
	const { id } = req.params;
	try {
		await Company.destroy({ where: { id } });
		res.status(200).json({ message: 'deleted successfully' });
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

export async function getCompanyBranchOffices(req, res) {
	const { id } = req.params;
	try {
		const foundCompanyBranchOffices = await BranchOffice.findAll({
			where: { companyId: id },
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
