import { Company } from '../models/Company';
import Joi from 'joi';
import { dateFormat, paymentDate } from '../utils/dates';

const validatedSchemaCompany = Joi.object({
	name: Joi.string().required(),
	address: Joi.string().required(),
	telephone: Joi.string().required(),
	nrc: Joi.string().required(),
	giro: Joi.string().required(),
	nit: Joi.string().required(),
	paymentDate: Joi.date().required(),
	email: Joi.string().email().required(),
	contractedImages: Joi.number().integer().required(),
	contractedImagesMade: Joi.number().integer().required(),
	monthlyAmount: Joi.number().required(),
	available: Joi.boolean(),
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
		req.body.paymentDate = paymentDate(req.body.paymentDate);
		if (
			finders[0]?.dataValues ||
			finders[1]?.dataValues ||
			finders[2]?.dataValues
		) {
			return res.status(500).json({ message: 'Repeated values' });
		}

		const newCompany = await Company.create({ ...req.body });
		await newCompany.save();
		res.status(200).json(newCompany);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getAllCompanies(req, res) {
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
		nextPaymentDate(id);
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
export async function enableCompany(req, res) {
	const { id } = req.params;
	const { available } = req.body;
	try {
		await Company.update({ available }, { where: { id } });
		res.status(200).json({ message: 'updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function nextPaymentDate(id) {
	const company = await Company.findOne({ where: { id } });
	const paymentDateDB = dateFormat(company.dataValues.paymentDate);
	const newDate = new Date();
	const dateNow = dateFormat(newDate);

	if (paymentDateDB === dateNow) {
		const nextPaymentDate = paymentDate(newDate);
		Company.update({ paymentDate: nextPaymentDate }, { where: { id } });
	}
}
