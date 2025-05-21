import usersMeds from '../models/usersMeds.js';

const addMed = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			return res.status(401).json({ message: 'no auth' });
		}
		const userId = req.userId;
		const body = req.body;
		const newMed = { ...body, userId };
		await usersMeds.create(newMed);

		return res.status(200).json({
			message: 'successfully created a new med entry',
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('err', error);
		return res.status(500).json({ message: 'internal server error' });
	}
};
export default addMed;
