import Users from '../models/users.js';
import { ObjectId } from 'mongodb';
const fetchUserInfo = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			console.log('no is authenticated ');
			return res.status(401).json({ message: 'no Authorization' });
		}
		const userId = req.userId;
		const foundUser = await Users.findOne({
			_id: new ObjectId(userId),
		});

		return res.status(200).json({
			message: 'User found',
			foundUser,
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			message: 'internal server error',
			error: error,
		});
	}
};

export default fetchUserInfo;
