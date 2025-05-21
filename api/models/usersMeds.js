import mongoose from 'mongoose';

const usersMedsSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	amount: {
		type: String,
	},
	time: {
		type: String,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
});

const usersMeds = mongoose.model('usersMeds', usersMedsSchema);
export default usersMeds;
