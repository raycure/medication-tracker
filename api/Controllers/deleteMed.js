import usersMeds from '../models/usersMeds.js';

const deleteMed = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			return res.status(401).json({ message: 'no auth' });
		}
		const userId = req.userId;
		const { medName } = req.body;
		await usersMeds.findOneAndDelete({
			userId: userId,
			name: medName,
		});
		return res.status(200).json({
			message: 'successfully deleted a med entry',
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('err', error);
		return res.status(500).json({ message: 'internal server error' });
	}
};
export default deleteMed;
