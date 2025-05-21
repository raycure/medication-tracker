import Meds from '../models/meds.js';

const getMeds = async (req, res) => {
	const meds = await Meds.find();
	return res.status(200).json({
		meds,
	});
};
export default getMeds;
