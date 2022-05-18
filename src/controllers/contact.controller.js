import { Contact } from '../models/Contact';
import { TypeContact } from '../models/TypeContact';

export async function createContact(req, res) {
	try {
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
	try {
		const contact = await Contact.findAll({ include: TypeContact });
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

export async function deleteContact(req, res) {
	const { id } = req.params;

	try {
		await Contact.destroy({ where: { id } });
		res.status(200).json({ message: 'deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
