import db from '../db/index';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const validatedschemaSingup = Joi.object({
	username: Joi.string().min(2).max(30).required(),

	password: Joi.string()
		.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,12})/)
		.required(),

	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		})
		.required(),
});

const validatedschemaSinging = Joi.object({
	password: Joi.string()
		.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,12})/)
		.required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		})
		.required(),
});
export const signUp = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const { error } = validatedschemaSingup.validate({
			username,
			password,
			email,
		});
		if (!error) {
			const cryptPass = bcrypt.hashSync(password, 10);
			await db.query(
				`INSERT INTO users(user_name,password,email)
       VALUES($1,$2,$3)`,
				[username, cryptPass, email]
			);
			const userToToken = {
				username,
				email,
			};
			const token = jwt.sign({ userToToken }, config.SECRET, {
				expiresIn: config.EXPIRATION,
			});

			res
				.status(200)
				.json({ message: 'The user was created successfull', token });
		} else {
			const message = error.details[0].message;
			res.status(400).json({ error: message });
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

export const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { error } = validatedschemaSinging.validate({
			password,
			email,
		});
		if (!error) {
			const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [
				email,
			]);
			const passwordDatabase = rows[0].password;
			const matchPassword = bcrypt.compareSync(password, passwordDatabase);
			if (!matchPassword) {
				res.status(401).json({ token: null, message: 'Invalid Password' });
			}
			const row = rows[0];

			const user = {
				id: row.id_user,
				user_name: row.user_name,
				email: row.email,
			};

			console.log(user, rows[0]);
			const token = jwt.sign({ user }, config.SECRET, {
				expiresIn: config.EXPIRATION,
			});

			res.status(200).json({ user, token });
		} else {
			const message = error.details[0].message;
			res.status(400).json({ error: message });
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};
