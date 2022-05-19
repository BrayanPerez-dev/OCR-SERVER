import { TypeContact } from '../models/TypeContact';

export async function createTypeContacts() {
	const contactFound = await TypeContact.findAll();
	if (contactFound.length)
		return 'the contacts have already been  created successfully';

	const adminContact = await TypeContact.create({
		description: 'Contacto Administrativo',
	});
	const technicalContact = await TypeContact.create({
		description: 'Contacto Técnico',
	});
	const commerciaContact = await TypeContact.create({
		description: 'Contacto Comercial',
	});

	await adminContact.save();
	await technicalContact.save();
	await commerciaContact.save();
	return 'the contacts were created successfully';
}
