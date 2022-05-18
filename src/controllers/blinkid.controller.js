import { BlinkId } from '../models/BlinkId';

export async function createBlinkId(req, res) {
	console.log(req.body);
	try {
		const newBlinkIdData = await BlinkId.create({ ...req.body });
		await newBlinkIdData.save();
		res.status(200).json({ newBlinkIdData });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function getBlinkId(req, res) {
	const { id } = req.params;
	try {
		const blinkid = await BlinkId.findOne({ where: { id } });
		res.status(200).json({ blinkid });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function getBlinkIds(req, res) {
	const { id } = req.params;
	try {
		const blinkid = await BlinkId.findAll({ where: { logId: id } });
		res.status(200).json({ blinkid });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}

export async function deleteBlinkId(req, res) {
	const { id } = req.params;
	try {
		await BlinkId.destroy({ where: { id } });
		res.status(200).json({ message: 'deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: error });
	}
}
