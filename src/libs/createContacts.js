import { TypeContact } from '../models/TypeContact';
// contacto administrativo contacto technico contacto comercial

export async function createTypeContacts() {
	const contactFound = await TypeContact.findAll();
	console.log(contactFound);
	if (contactFound.length) {
		return 'the contacts have already been  created successfully';
	}

	const adminContact = await TypeContact.create({
		description: 'Contacto Administrivo',
	});
	const tecContact = await TypeContact.create({
		description: 'Contacto Tecnico',
	});
	const comContact = await TypeContact.create({
		description: 'Contacto Comercial',
	});

	await adminContact.save();
	await tecContact.save();
	await comContact.save();
	return 'the contacts were created successfully';
}
