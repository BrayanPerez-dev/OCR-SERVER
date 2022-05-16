import { TypeContact } from '../models/TypeContact';

export async function getAllTypeContact(req, res) {
	try {
		const contacts = await TypeContact.findAll();
		res.status(200).json({ contacts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
