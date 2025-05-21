import mongoose from 'mongoose';

const medicationSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
	},
	quantity: {
		type: String,
	},
	expireDate: {
		type: String,
	},
	sideEffect: {
		type: Array,
	},
	toConsider: {
		type: Array,
	},
});

const Meds = mongoose.model('Meds', medicationSchema);
export default Meds;
