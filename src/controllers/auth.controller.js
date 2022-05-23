import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { User } from '../models/User';
import { BranchOffice } from '../models/BranchOffice';
import { Company } from '../models/Company';

const validatedschemaSingup = Joi.object({
	name: Joi.string().required(),
	lastName: Joi.string().required(),
	user: Joi.string().min(2).max(30).required(),
	telephone: Joi.string().required(),
	dui: Joi.string().required(),
	branchofficeId: Joi.number().integer().required(),
	profileId: Joi.number().integer().required(),
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
	email: Joi.string().email().required(),
});
export const signUp = async (req, res) => {
	try {
		const { error } = validatedschemaSingup.validate({ ...req.body });

		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const cryptPass = bcrypt.hashSync(req.body.password, 10);
		req.body.password = cryptPass;
		const token = jwt.sign({ ...req.body }, config.SECRET, {
			expiresIn: config.EXPIRATION,
		});
		const newUser = await User.create({ ...req.body });
		await newUser.save();
		res
			.status(200)
			.json({ message: 'The user was created successfull', token });
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
		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}

		const foundUser = await User.findOne({ where: { email } });

		if (foundUser.available === false) {
			return res.status(403).json({
				message: 'User not enabled',
			});
		}
		const { branchofficeId } = foundUser;

		const foundBranch = await BranchOffice.findOne({
			where: { branchofficeId },
		});

		if (foundBranch.available === false) {
			return res.status(403).json({
				message: 'Branch not enabled',
			});
		}

		const { companyId } = foundBranch;
		const foundCompany = await Company.findOne({ where: { companyId } });

		if (foundCompany.available === false) {
			return res.status(403).json({
				message: 'Company not enabled',
			});
		}
		const passwordDatabase = foundUser.password;
		const matchPassword = bcrypt.compareSync(password, passwordDatabase);
		if (!matchPassword | !foundUser) {
			return res.status(403).json({
				token: null,
				message: 'Invalid Password or User does not exist',
			});
		}

		const token = jwt.sign({ foundUser }, config.SECRET, {
			expiresIn: config.EXPIRATION,
		});
		const user = {
			id: foundUser.id,
			user: foundUser.user,
			name: foundUser.name,
			lastName: foundUser.lastName,
			telephone: foundUser.telephone,
			email: foundUser.email,
			dui: foundUser.dui,
			profileId: foundUser.profileId,
			branchofficeId: foundUser.branchofficeId,
		};
		res.status(200).json({ user, token });
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};
