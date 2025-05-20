import Users from '../models/users.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const register = async (req, res) => {
	try {
		const { mail, weight, height, name, yob, password } = req.body;
		const existingUser = await Users.findOne({ mail });
		if (existingUser) {
			return res.status(409).json({
				success: false,
				result: null,
				message: 'user already exists',
			});
		}
		const hashedPassword = await hash(password, 10);
		req.body.password = hashedPassword;

		const newUser = await Users.create(req.body);
		const userId = new ObjectId(newUser).toHexString();
		console.log('userId in register', userId);

		const accessToken = jwt.sign(
			{
				userId: userId,
				mail: mail,
			},
			process.env.ACCESS_TOKEN_SECRET,
			// todo
			// { expiresIn: '15m' }
			{ expiresIn: '5s' }
		);
		const refreshToken = jwt.sign(
			{
				userId: userId,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '365d' }
		);
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
			sameSite: 'Lax',
			path: '/',
			secure: process.env.ENVIRONMENT !== 'development',
		});
		res.status(200).json({
			accessToken: accessToken,
			message: 'user created',
		});
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'internal server error', error: error });
	}
};

export default register;
