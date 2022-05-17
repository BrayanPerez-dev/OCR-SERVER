import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models/User';
export const verifyToken = async (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) res.status(403).json({ message: 'token was not provide' });
	try {
		const decoded = jwt.verify(token, config.SECRET);
		const email = decoded.user.email;
		console.log(req.email);
		req.email = email;
		const user = await User.findOne({ where: { email } });
		if (!user) res.status(404).json({ message: 'user not found' });
		next();
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};
