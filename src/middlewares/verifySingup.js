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
