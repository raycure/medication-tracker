import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import credentials from './config/credentials.js';
import corsOptions from './config/corsOptions.js';
import * as dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
// import { deleteAllUsers } from './Controllers/deleteUsers.js';
import cookieParser from 'cookie-parser';
import Users from './models/users.js';
import Meds from './models/meds.js';

dotenv.config();
const PORT = 3001;
// very important note if a controller requires authmiddleware it has to return accesstoken by accessing req.accessToken
const app = express();
app.use(credentials);
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', authRoutes);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('connected');
		app.listen(PORT, () => {
			console.log('port 3001');
		});
	})
	.catch((error) => {
		console.log('error', error);
		console.log('didnt connect');
	});
export default app;
