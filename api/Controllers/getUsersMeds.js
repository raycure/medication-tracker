// import Meds from '../models/meds';

// const getUsersMeds = async (req, res) => {
// 	if (!req.isAuthenticated) {
// 		console.log('no is authenticated ');
// 		return res.status(401).json({ message: 'no Authorization' });
// 	}

// 	const userId = req.userId;
// 	const foundUser = await Meds.find({
// 		_id: new ObjectId(userId),
// 	});
// };
// export default getUsersMeds;
