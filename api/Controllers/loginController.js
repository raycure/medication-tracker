import Users from '../models/users.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const login = async (req, res) => {
	try {
		const { mail, password } = req.body;
		const user = await Users.findOne({ mail });
		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}
		const isMatch = await compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const accessToken = jwt.sign(
			{
				userId: user._id,
				mail: user.mail,
			},
			process.env.ACCESS_TOKEN_SECRET,
			// todo
			// { expiresIn: '15m' }
			{ expiresIn: '5s' }
		);
		const refreshToken = jwt.sign(
			{
				userId: user._id,
				mail: user.mail,
			},
			process.env.REFRESH_TOKEN_SECRET,

			{ expiresIn: '365d' }
		);

		try {
			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 * 30,
				sameSite: 'Lax',
				path: '/',
				secure: process.env.ENVIRONMENT !== 'development',
			});
		} catch (error) {
			console.log('error setting cookie', error);
		}
		return res.status(200).json({
			message: 'Login successful',
			accessToken,
		});
	} catch (error) {
		console.error('Error logging in:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default login;
