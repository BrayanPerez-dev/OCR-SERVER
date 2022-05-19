import { TypeContact } from '../models/TypeContact';

export async function createTypeContacts() {
	const contactFound = await TypeContact.findAll();
	if (!contactFound.lenght) {
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
	}
	console.log(contactFound);
}
