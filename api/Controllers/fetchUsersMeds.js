import mongoose from 'mongoose';
import usersMeds from '../models/usersMeds.js';

const fetchUsersMeds = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			return res.status(401).json({ message: 'no auth' });
		}
		const userId = req.userId;
		const userMedications = await usersMeds.find({
			userId: userId, // Look for documents with userId field that matches
		});
		console.log('userMedications', userMedications);

		return res.status(200).json({
			userMedications,
			message: 'successfully fetched the users Meds a new med entry',
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('err', error);
		return res.status(500).json({ message: 'internal server error' });
	}
};

export default fetchUsersMeds;
