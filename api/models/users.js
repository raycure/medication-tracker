import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		yob: {
			type: String,
		},
		height: {
			type: String,
		},
		weight: {
			type: String,
		},
		mail: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Users = mongoose.model('Users', UserSchema);
export default Users;
