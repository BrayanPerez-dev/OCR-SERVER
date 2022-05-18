import { Log } from '../models/Log';

export async function createLog(req, res) {
	try {
		const newLog = await Log.create({ ...req.body });
		await newLog.save();
		res.status(200).json({ newLog });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function getLog(req, res) {
	const { id } = req.params;
	try {
		const log = await Log.findOne({ where: { id } });
		res.status(200).json({ log });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function getLogs(req, res) {
	const { id } = req.params;
	try {
		const log = await Log.findAll({ where: { userId: id } });
		res.status(200).json({ log });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function deleteLog(req, res) {
	const { id } = req.params;
	try {
		await Log.destroy({ where: { id } });
		res.status(200).json({ message: 'deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}
