import { Profile } from '../models/Profile';
import Joi from 'Joi';

const profileSchema = Joi.object({
	description: Joi.string().required(),
	action: Joi.array().items(Joi.string().required()).required(),
	level: Joi.number().integer().required(),
});
export async function createProfile(req, res) {
	try {
		const { error } = profileSchema.validate({ ...req.body });
		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const newProfile = await Profile.create({ ...req.body });
		newProfile.save();
		res.status(200).json({ newProfile });
	} catch (error) {
		res.status(200).json({ message: error.message });
	}
}
export async function getAllProfiles(req, res) {
	try {
		const profiles = await Profile.findAll();
		res.status(200).json({ profiles });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getProfile(req, res) {
	const { id } = req.params;
	try {
		const profiles = await Profile.findOne({ where: { id } });
		res.status(200).json({ profiles });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function updateProfile(req, res) {
	const { id } = req.params;
	try {
		const profiles = await Profile.update({ ...req.body }, { where: { id } });
		res.status(200).json({ profiles });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
