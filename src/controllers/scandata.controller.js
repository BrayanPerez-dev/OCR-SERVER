import { ScanData } from '../models/ScanData';
import Joi from 'Joi';

const validatedschemaScanData = Joi.object({
	scanData: Joi.object().required(),
	logId: Joi.number().integer().required(),
});
export async function createScanData(req, res) {
	try {
		const { error } = validatedschemaScanData.validate({ ...req.body });

		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const newBlinkIdData = await ScanData.create({ ...req.body });
		await newBlinkIdData.save();
		res.status(200).json({ newBlinkIdData });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function getScanData(req, res) {
	const { id } = req.params;
	try {
		const blinkid = await ScanData.findOne({ where: { id } });
		res.status(200).json({ blinkid });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function getAllScanData(req, res) {
	const { id } = req.params;
	try {
		const blinkid = await ScanData.findAll({ where: { logId: id } });
		res.status(200).json({ blinkid });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function deleteScanData(req, res) {
	const { id } = req.params;
	try {
		await ScanData.destroy({ where: { id } });
		res.status(200).json({ message: 'deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}
