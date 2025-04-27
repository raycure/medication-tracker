import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const handleLogout = async (req, res, sentFromAuthHandle = false) => {
	const cookies = req.cookies;
	const refreshToken = cookies?.jwt;
	console.log('refreshToken', refreshToken);

	if (!refreshToken && !sentFromAuthHandle) {
		return res.status(200).json({
			message: 'logoutResponses.success',
			notify: true,
		});
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: 'Lax',
		path: '/',
		secure: process.env.ENVIRONMENT !== 'development',
	});

	if (req.isFromDeleteAccount) {
		return res.json({
			message: res.__('userInfoResponses.accountDeleted'),
			notify: true,
		});
	} else if (sentFromAuthHandle) {
		return null;
	} else {
		return res.json({
			message: res.__('logoutResponses.success'),
			notify: true,
		});
	}
};

export default handleLogout;
