import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const handleLogout = async (req, res, sentFromAuthHandle = false) => {
	try {
		console.log('handleLogout');

		const cookies = req.cookies;
		const refreshToken = cookies?.jwt;

		if (!refreshToken && !sentFromAuthHandle) {
			return res.status(200).json({
				message: 'No refresh token found',
				notify: true,
			});
		}

		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'Lax',
			path: '/',
			secure: process.env.ENVIRONMENT !== 'development',
		});

		if (sentFromAuthHandle === true) {
			// since express calls every controller with next, when sentFromAuthHandle isnt assigned when it is called itll have the value of next function so this check is needed
			return null;
		}
		return res.status(200).json({
			message: 'logout is successful',
			notify: true,
		});
	} catch (error) {
		console.log('error in logout:', error);
		return res.status(500).json({
			message: 'Error during logout process',
		});
	}
};
export default handleLogout;
