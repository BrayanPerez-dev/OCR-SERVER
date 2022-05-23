import Joi from 'joi';
import { BranchOffice } from '../models/BranchOffice';

const validateSchemaBranchOffices = Joi.object({
	name: Joi.string().required(),
	address: Joi.string().required(),
	telephone: Joi.string().required(),
	email: Joi.string().email().required(),
	companyId: Joi.number().integer(),
	available: Joi.boolean(),
});
export async function createBranchOffice(req, res) {
	try {
		const { error } = validateSchemaBranchOffices.validate({ ...req.body });
		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const newBranchOffices = await BranchOffice.create({ ...req.body });
		await newBranchOffices.save();
		res.status(200).json(newBranchOffices);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getBranchOffice(req, res) {
	const { id } = req.params;
	try {
		const branchoffice = await BranchOffice.findOne({
			where: { id },
		});
		res.status(200).json({ branchoffice });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getALLBranchOffices(req, res) {
	const { id } = req.params;

	try {
		const branchoffices = await BranchOffice.findAll({
			where: { companyId: id },
		});
		res.status(200).json({ branchoffices });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function updateBranchOffice(req, res) {
	const { id } = req.params;
	try {
		await BranchOffice.update({ ...req.body }, { where: { id } });
		res.status(200).json({ message: 'updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function enableBranch(req, res) {
	const { id } = req.params;
	const { available } = req.body;
	try {
		await BranchOffice.update({ available }, { where: { id } });
		res.status(200).json({ message: 'updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
