import Joi from 'joi';
import { User } from '../models/User';

const validatedschemaUser = Joi.object({
	name: Joi.string().required(),
	lastName: Joi.string().required(),
	user: Joi.string().min(2).max(30).required(),
	telephone: Joi.string().required(),
	dui: Joi.string().required(),
	available: Joi.boolean().required(),
	branchofficeId: Joi.number().integer().required(),
	profileId: Joi.number().integer().required(),
	password: Joi.string()
		.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,12})/)
		.required(),
	email: Joi.string().email().required(),
});
export async function createUser(req, res) {
	try {
		const { error } = validatedschemaUser.validate({ ...req.body });

		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const newUser = await User.create({ ...req.body });
		await newUser.save();
		res.status(200).json({ newUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function updateUser(req, res) {
	const { id } = req.params;

	try {
		await User.update({ ...req.body }, { where: { id } });
		res.status(200).json({ message: 'updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getUser(req, res) {
	const { id } = req.params;
	try {
		const foundUser = await User.findOne({ where: { id } });
		res.status(200).json({ foundUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
