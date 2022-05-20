import { TypeContact } from '../models/TypeContact';
import Joi from 'joi';

const typeContactSchema = Joi.object({
	description: Joi.string().required(),
});
export async function createTypeContact(req, res) {
	try {
		const { error } = typeContactSchema.validate({ ...req.body });
		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const newTypeContact = await TypeContact({ ...req.body });
		await newTypeContact.save();
		res.status(200).json({ newTypeContact });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}
export async function getAllTypeContact(req, res) {
	try {
		const contacts = await TypeContact.findAll();
		res.status(200).json({ contacts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getTypeContact(req, res) {
	const { id } = req.params;
	try {
		const contacts = await TypeContact.findOne({ where: { id } });
		res.status(200).json({ contacts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function updateTypeContact(req, res) {
	const { id } = req.params;
	try {
		const contacts = await TypeContact.update(
			{ ...req.body },
			{ where: { id } }
		);
		res.status(200).json({ contacts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
