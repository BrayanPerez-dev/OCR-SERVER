import { Company } from '../models/Company';
import Joi from 'joi';

const validatedSchemaCompany = Joi.object({
	name: Joi.string().required(),
	address: Joi.string().required(),
	telephone: Joi.string().required(),
	nrc: Joi.string().required(),
	order: Joi.string().required(),
	nit: Joi.string().required(),
	email: Joi.string().required(),
	contractedImages: Joi.number().required(),
	monthlyAmount: Joi.number().required(),
	available: Joi.number().required(),
	paymentDate: Joi.required(),
	license: Joi.number().integer().required(),
	logo: Joi.string().required(),
	colorOne: Joi.string().required(),
	colorTwo: Joi.string().required(),
	colorThree: Joi.string().required(),
});

export async function createCompany(req, res) {
	const { body } = req;
	try {
		const { error } = validatedSchemaCompany.validate(body);
		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const newCompany = await Company.create(body);
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
	const { name } = req.params;
	try {
		const companys = await Company.findOne({ where: { name } });
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

export async function updatedCompany(req, res) {
	const { id } = req.params;
	const {
		name,
		address,
		telephone,
		nrc,
		order,
		nit,
		email,
		contractedImages,
		monthlyAmount,
		available,
		paymentDate,
		license,
		logo,
		colorOne,
		colorTwo,
		colorThree,
	} = req.body;

	try {
		await Company.update(
			{
				name,
				address,
				telephone,
				nrc,
				order,
				nit,
				email,
				contractedImages,
				monthlyAmount,
				available,
				paymentDate,
				license,
				logo,
				colorOne,
				colorTwo,
				colorThree,
			},
			{ where: { id } }
		);
		res.status(200).json({ message: 'updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
