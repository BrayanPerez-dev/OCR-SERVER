import { Profile } from '../models/Profile';
import { User } from '../models/User';

export const checkDuplicateEmailorUsername = async (req, res, next) => {
	try {
		const { email, user } = req.body;

		const emailFound = await User.findOne({ where: { email } });

		const userNameFound = await User.findOne({ where: { user } });
		if (emailFound)
			return res.status(400).json({ message: 'email already exists ' });

		if (userNameFound)
			return res.status(400).json({ message: 'user name already exists' });

		next();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const verifyProfiles = async (req, res, next) => {
	const { profileId } = req.body;
	const foundProfile = await Profile.findOne({ where: { id: profileId } });
	if (!foundProfile)
		return res.status(404).json({ message: 'the role does not exist' });
	next();
};
