import { FlatList, StyleSheet, Text, View } from 'react-native';
import MedItem from './MedItem';
import { colors, primaryTitle } from './constants/constantStyles';
import AddMedButton from './UI/AddMedButton';
const myMeds = [
	'Famodin',
	'Metformin',
	'Paracetamol',
	'Ibuprofen',
	'Amoxicillin',
	'Setizin',
	'Furosemid',
	'Asprin',
	'Wafarin',
	'Alendronat',
	'Amlodipin',
	'Lisinopiril',
	'Levotiroksin',
	'Bisoprolol',
	'İnsulin',
	'Duxet',
	'Perlinganit',
	'Donepezil',
	'Selectra',
	'Spironolaktan',
	'Pantopranzol',
	'Levotiron',
	'Clopidogrel',
	'Allopurinol',
	'Loratadin',
	'Tamsulosin',
	'Esomeprazol',
	'Spylacton',
	'Rivoksar',
	'Omeprozol',
	'Paxil',
	'Lansazol',
	'Diltiazem',
	'Digoksin',
	'HCTZ',
	'Provastatin',
	'Atorvastatin',
	'Losartan',
	'Nebivolol',
	'Gabapentin',
];
const personalMedsData = ['button_item', ...myMeds];
function MedList() {
	return (
		<View style={styles.listContainer}>
			<FlatList
				ListHeaderComponent={<Text style={primaryTitle}>İlaçlarınız</Text>}
				style={styles.list}
				data={personalMedsData}
				numColumns={2}
				renderItem={(med) => {
					if (med.index === 0) {
						return <AddMedButton />;
					}
					return <MedItem key={med.index} medName={med.item} />;
				}}
			/>
		</View>
	);
}
export default MedList;
const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		borderRadius: 16,
		backgroundColor: colors.primary100,
		elevation: 5,
		shadowColor: 'black',
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
	},
	list: {
		borderRadius: 16,
		flex: 1,
		paddingHorizontal: 12,
		marginBottom: 10,
	},
});
