import jwt from 'jsonwebtoken';
import config from '../config';
import { Profile } from '../models/Profile';
import { User } from '../models/User';

export const verifyToken = async (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) res.status(403).json({ message: 'token was not provide' });
	try {
		const decoded = jwt.verify(token, config.SECRET);
		const id = decoded.foundUser.id;

		req.userId = id;
		const user = await User.findOne({ where: { id } });
		if (!user) return res.status(404).json({ message: 'user not found' });
		next();
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};
export const isSuperAdmin = async (req, res, next) => {
	const { userId } = req;
	const foundUser = await User.findOne({ where: { id: userId } });

	const foundRoles = await Profile.findOne({
		where: { id: foundUser?.profileId },
	});

	if (foundRoles?.dataValues?.id !== 1) {
		return res
			.status(403)
			.json({ message: 'Access to this resource is prohibited' });
	}

	next();
};
export const isAdmin = async (req, res, next) => {
	const { userId } = req;
	const foundUser = await User.findOne({ where: { id: userId } });

	const foundRoles = await Profile.findOne({
		where: { id: foundUser?.profileId },
	});

	if (foundRoles?.dataValues?.id !== 2) {
		res.status(403).json({ message: 'Access to this resource is prohibited' });
		return true;
	}
	next();
};

export const isEmployee = async (req, res, next) => {
	const { userId } = req;
	const foundUser = await User.findOne({ where: { id: userId } });

	const foundRoles = await Profile.findOne({
		where: { id: foundUser?.profileId },
	});

	if (foundRoles?.dataValues?.id !== 3) {
		return res
			.status(403)
			.json({ message: 'Access to this resource is prohibited' });
	}
	next();
};
