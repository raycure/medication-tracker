import Users from '../models/users.js';
import { ObjectId } from 'mongodb';
import pkg from 'bcryptjs';
import { logout } from '../../redux/authSlice.js';
const { hash, compare } = pkg;
export const userInfoPutController = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			return res.status(401).json({ message: 'no auth' });
		}
		const { updateData } = req.body;
		console.log('req.body', req.body);

		const newPassword = updateData?.newPassword || '';
		const userId = req.userId;
		const foundUser = await Users.findOne({
			_id: new ObjectId(userId),
		});
		const isMatch = (await pkg.compare(newPassword, foundUser.password))
			? true
			: false;

		if (isMatch) {
			return res
				.status(422)
				.json({ message: 'eski sifre yeni sifreyle ayni olamaz' });
		}
		if (newPassword) {
			const hashedPassword = await hash(newPassword, 10);
			await Users.findByIdAndUpdate(foundUser._id, {
				password: hashedPassword,
			});
		}
		const plainUser = foundUser.toObject();
		// mongo's object are different than plain objects
		const fieldsToUpdate = {};
		console.log('updateData', updateData);
		console.log('plainUser', plainUser);

		Object.keys(updateData).forEach((key) => {
			// Handle different types of comparisons
			const currentValue = plainUser[key];
			const newValue = updateData[key];
			// Convert values to the same type for comparison
			const hasChanged = (() => {
				// Handle null/undefined cases
				if (currentValue === null || currentValue === undefined) {
					return newValue !== null && newValue !== undefined;
				}
				// Handle dates
				if (currentValue instanceof Date || newValue instanceof Date) {
					const currentDate = new Date(currentValue).getTime();
					const newDate = new Date(newValue).getTime();
					return currentDate !== newDate;
				}
				// Handle objects
				if (typeof currentValue === 'object' && typeof newValue === 'object') {
					return JSON.stringify(currentValue) !== JSON.stringify(newValue);
				}
				// Handle numbers stored as strings
				if (typeof currentValue === 'number' || typeof newValue === 'number') {
					return Number(currentValue) !== Number(newValue);
				}
				// Default string comparison
				return String(currentValue) !== String(newValue);
			})();
			if (hasChanged) {
				fieldsToUpdate[key] = newValue;
			}
		});
		// Only update if there are changes
		if (Object.keys(fieldsToUpdate).length > 0) {
			await Users.updateOne(
				{ _id: new ObjectId(userId) },
				{ $set: fieldsToUpdate }
			);
			return res.status(200).json({
				message: 'basariyla guncellendi',
			});
		}
		return res.status(200).json({
			message: 'no changes',
			updatedFields: {},
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			message: 'server error',
			error: error.message,
		});
	}
};

export default userInfoPutController;
