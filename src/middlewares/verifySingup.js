import db from '../db/index.js';

export const checkDuplicateEmailorUsername = async (req, res, next) => {
	try {
		const { email, username } = req.body;

		const emailFound = await db.query('SELECT * FROM users WHERE email = $1', [
			email,
		]);

		const userNameFound = await db.query(
			'SELECT * FROM users WHERE user_name = $1',
			[username]
		);
		if (emailFound.rows[0])
			return res.status(400).json({ message: 'email already exists ' });

		if (userNameFound.rows[0])
			return res.status(400).json({ message: 'user name already exists' });

		next();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
