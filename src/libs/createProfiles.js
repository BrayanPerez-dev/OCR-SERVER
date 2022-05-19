import { Profile } from '../models/Profile';

export async function createProfiles() {
	const profile = await Profile.findAll();

	if (!profile) {
		const superUser = await Profile.create({
			description: 'Super Usuario',
			action: ['reed', 'write', 'execute'],
			level: 1,
		});
		const admin = await Profile.create({
			description: 'Administrador',
			action: ['reed', 'write', 'execute'],
			level: 2,
		});
		const managerbranch = await Profile.create({
			description: 'Gerente Sucursal',
			action: ['reed', 'write'],
			level: 3,
		});
		const employee = await Profile.create({
			description: 'Empleado Sucursal',
			action: ['reed', 'write'],
			level: 4,
		});

		await superUser.save();
		await admin.save();
		await managerbranch.save();
		await employee.save();
	}
}
