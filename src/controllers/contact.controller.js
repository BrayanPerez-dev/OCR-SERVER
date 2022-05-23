import Joi from 'joi';
import { Contact } from '../models/Contact';
import { TypeContact } from '../models/TypeContact';

const validateSchemaContact = Joi.object({
	name: Joi.string().required(),
	lastName: Joi.string().required(),
	address: Joi.string().required(),
	telephone: Joi.string().required(),
	dui: Joi.string().required(),
	email: Joi.string().email().required(),
	companyId: Joi.number().integer(),
	typecontactId: Joi.number().integer(),
});

export async function createContact(req, res) {
	try {
		const { error } = validateSchemaContact.validate({ ...req.body });
		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const newContact = await Contact.create({ ...req.body });
		await newContact.save();
		res.status(200).json(newContact);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getContact(req, res) {
	const { id } = req.params;
	try {
		const contact = await Contact.findOne({
			where: { id },
			include: TypeContact,
		});
		res.status(200).json({ contact });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getContacts(req, res) {
	const { id } = req.params;
	try {
		const contact = await Contact.findAll({
			where: { companyId: id },
		});
		res.status(200).json({ contact });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function updateContact(req, res) {
	const { id } = req.params;
	try {
		await Contact.update({ ...req.body }, { where: { id } });
		res.status(200).json({ message: 'updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
