import { User } from '../models/User';

export async function createUser(req, res) {
	try {
		const newUser = await User.create({ ...req.body });
		await newUser.save();
		res.status(200).json({ newUser });
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

export async function updateUser(req, res) {
	const { id } = req.params;

	try {
		await User.update({ ...req.body }, { where: { id } });
		res.status(200).json({ message: 'updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

export async function deleteUser(req, res) {
	const { id } = req.params;
	try {
		await User.destroy({ where: { id } });
		res.status(200).json({ message: 'deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

export async function getUser(req, res) {
	const { id } = req.params;
	try {
		const foundUser = await User.findOne({ where: { id } });
		res.status(200).json({ foundUser });
	} catch (error) {
		res.status(500).json({ message: error });
	}
}
