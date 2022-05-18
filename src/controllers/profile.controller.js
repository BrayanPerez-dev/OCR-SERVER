import { Profile } from '../models/Profile';

export async function getAllProfiles(req, res) {
	try {
		const profiles = await Profile.findAll();
		res.status(200).json({ profiles });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
