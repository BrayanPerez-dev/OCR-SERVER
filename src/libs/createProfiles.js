import { Profile } from '../models/Profile';

export async function createProfiles() {
	const profile = await Profile.findAll();

	if (profile.length)
		return 'the profiles have already been  created successfully';
	const adminMain = await Profile.create({
		description: 'administrador de todo el sistema',
		action: 'reed,write,execute',
		level: 1,
	});
	const adminCompany = await Profile.create({
		description: 'administrador de la empresa',
		action: 'reed,write,execute',
		level: 2,
	});
	const managerbranch = await Profile.create({
		description: 'gerente de la sucursal',
		action: 'reed,write',
		level: 3,
	});
	const employee = await Profile.create({
		description: 'empleado de la sucursal',
		action: 'reed,write',
		level: 4,
	});

	await adminMain.save();
	await adminCompany.save();
	await managerbranch.save();
	await employee.save();

	return 'the contacts were created successfully';
}
