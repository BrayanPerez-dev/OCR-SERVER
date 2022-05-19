import { ScanData } from '../models/ScanData';

export async function createScanData(req, res) {
	console.log(req.body);
	try {
		const newBlinkIdData = await ScanData.create({ ...req.body });
		await newBlinkIdData.save();
		res.status(200).json({ newBlinkIdData });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function getScanData(req, res) {
	const { id } = req.params;
	try {
		const blinkid = await ScanData.findOne({ where: { id } });
		res.status(200).json({ blinkid });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function getAllScanData(req, res) {
	const { id } = req.params;
	try {
		const blinkid = await ScanData.findAll({ where: { logId: id } });
		res.status(200).json({ blinkid });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function deleteScanData(req, res) {
	const { id } = req.params;
	try {
		await ScanData.destroy({ where: { id } });
		res.status(200).json({ message: 'deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}
