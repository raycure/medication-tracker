import Users from '../models/users.js';
import { ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
import handleLogout from './logoutController.js';
dotenv.config();

const deleteUser = async (req, res) => {
	if (!req.isAuthenticated) {
		return res.status(401).json({ message: 'unauthorized' });
	}
	const userId = req.userId;

	if (!userId) {
		return res.status(401).json({ message: 'unauthorized' });
	}
	const deletedUser = await Users.findOneAndDelete({
		_id: new ObjectId(userId),
	});

	await handleLogout(req, res);
};

export default deleteUser;
