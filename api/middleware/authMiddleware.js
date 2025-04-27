import verifyJWT from './verifyJWT.js';
import Users from '../models/users.js';
import { ObjectId } from 'mongodb';
import refreshJwt from './refreshJwt.js';
import jwt from 'jsonwebtoken';
import handleLogout from '../controllers/logoutController.js';
const authMiddleware = async (req, res, next) => {
	try {
		console.log('authMiddleware');
		const refreshToken = req.cookies.jwt;
		let decodedToken;
		try {
			decodedToken = jwt.decode(refreshToken);
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		} catch (decodeError) {
			await handleLogout(req, res, true);
			return res.status(403).json({
				message: 'Invalid refresh token',
				authFailure: true,
			});
		}

		const userIdFromToken = decodedToken.userId;
		const foundUser = await Users.findOne({
			_id: new ObjectId(userIdFromToken),
		});
		console.log('foundUser', foundUser);

		if (!foundUser) {
			await handleLogout(req, res, true);

			return res.status(404).json({
				message: 'User not found',
				authFailure: true,
			});
		}

		// 	// Create a mock response object to capture verifyJWT's response
		const verifyJwtMockResponse = {
			status: function (code) {
				this.statusCode = code;
				return this;
			},
			json: function (data) {
				this.responseData = data;
				return this;
			},
		};

		// 	// Call verifyJWT with req and mock response
		const authHeader = req.headers['authorization'];
		if (!authHeader) {
			console.log('authHeader is missing');
			return res.status(401).json({ message: 'Token is missing or invalid' });
		}
		const accessToken = authHeader.split(' ')[1];
		req.accessToken = accessToken;

		console.log('gonna verify');
		await verifyJWT(req, verifyJwtMockResponse);
		console.log('verifyJwtMockResponse', verifyJwtMockResponse);
		// Check the response from verifyJWT
		if (verifyJwtMockResponse.statusCode === 200) {
			console.log('userIdFromToken', userIdFromToken);
			req.userId = userIdFromToken;
			req.isAuthenticated = true;
			return next();
		}

		// If verification failed, try refresh
		const refreshMockRes = {
			status: function (code) {
				this.statusCode = code;
				return this;
			},
			json: function (data) {
				this.responseData = data;
				return this;
			},
		};

		console.log('gonna refresh');

		await refreshJwt(req, refreshMockRes);

		if (refreshMockRes.statusCode === 200) {
			console.log('refreshMockRes', refreshMockRes);

			res.header('x-refreshed-token', 'true');
			req.isAuthenticated = true;
			req.accessToken = refreshMockRes.responseData.newAccessToken;
			req.userId = userIdFromToken;
			return next();
		}

		if (refreshMockRes.statusCode === 403) {
			const errorMsg = refreshMockRes.responseData.message;
			return res.status(403).json({ message: errorMsg });
		}

		req.isAuthenticated = false;
		req.accessToken = null;
		req.userId = null;
		return next();
	} catch (error) {
		console.log('error at authMiddleware', error);
		await handleLogout(req, res, true);
		return res.status(500).json({ message: 'internal server error' });
	}
};

export default authMiddleware;
