import usersMeds from '../models/usersMeds.js';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const updateMed = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			return res.status(401).json({ message: 'no auth' });
		}
		const userId = req.userId;
		const { medName, amount, time } = req.body;
		console.log('req.body', req.body);

		console.log('medName', medName, amount, time);

		const result = await usersMeds.findOneAndUpdate(
			{
				userId: userId,
				name: medName,
			},
			{
				$set: {
					amount,
					time,
				},
			},
			{ new: true }
		);
		console.log('result', result);

		return res.status(200).json({
			message: 'successfully deleted a med entry',
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('err', error);
		return res.status(500).json({ message: 'internal server error' });
	}
};
export default updateMed;
