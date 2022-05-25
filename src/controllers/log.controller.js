import { Log } from '../models/Log';
import Joi from 'Joi';
import { timeFormat } from '../utils/dates';
const validatedschemaLog = Joi.object({
	date: Joi.date().required(),
	send: Joi.required(),
	receive: Joi.required(),
	userId: Joi.number().integer().required(),
});
export async function createLog(req, res) {
	try {
		req.body.send = timeFormat(req.body.send);
		req.body.receive = timeFormat(req.body.receive);
		const { error } = validatedschemaLog.validate({ ...req.body });

		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}

		const newLog = await Log.create({ ...req.body });
		await newLog.save();
		res.status(200).json({ newLog });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function getLog(req, res) {
	const { id } = req.params;
	try {
		const log = await Log.findOne({ where: { id } });
		res.status(200).json({ log });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function getLogs(req, res) {
	const { id } = req.params;
	try {
		const log = await Log.findAll({ where: { userId: id } });
		res.status(200).json({ log });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}
