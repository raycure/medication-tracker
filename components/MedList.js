import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import MedItem from './MedItem';
import { colors, primaryTitle } from './constants/constantStyles';
import AddMedButton from './UI/AddMedButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, saveUserMeds, selectUserMeds } from '../redux/authSlice';

function MedList() {
	const [personalMedsData, setPersonalMedsData] = useState();

	const initFetchUserMeds = async () => {
		try {
			const response = await dispatch(
				fetchData({
					url: '/fetchUsersMeds',
					method: 'GET',
				})
			);
			const resData = response.payload.data.userMedications;
			const userMeds = resData.map((item) => {
				dispatch(
					saveUserMeds({
						name: item.name,
						amount: item.amount,
						time: item.time,
					})
				);
				return item.name;
			});

			const personalMedsData = ['button_item', ...userMeds];
			setPersonalMedsData(personalMedsData);
		} catch (error) {
			console.log('er', err);
		}
	};
	const dispatch = useDispatch();
	useEffect(() => {
		initFetchUserMeds();
	}, []);
	function test() {
		initFetchUserMeds();
	}

	return (
		<View style={styles.listContainer}>
			<Button onPress={test} title='guncelle'></Button>
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
		minWidth: 300,
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
