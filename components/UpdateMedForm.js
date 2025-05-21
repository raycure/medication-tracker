import { StyleSheet, Text, View } from 'react-native';
import { colors, miniTitle } from './constants/constantStyles';
import { Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import medListData from '../store/medListData.json';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteUserMed,
	fetchData,
	selectUserMeds,
	updateUserMed,
} from '../redux/authSlice';
function UpdateMedForm({ medName }) {
	const userMeds = useSelector(selectUserMeds);
	const usersMedEntry = Object.entries(userMeds).find(
		([key]) => key === medName
	);
	const usersMedValue = usersMedEntry ? usersMedEntry[1] : null;

	const [inputData, setInputData] = useState({
		amount: '' || usersMedValue?.amount,
		time: '' || usersMedValue?.time,
	});
	const medData = medListData[medName];
	const onInputChange = (text, fieldName) => {
		setInputData((prev) => ({
			...prev,
			[fieldName]: text,
		}));
	};

	const dispatch = useDispatch();
	const onUpdateMed = async () => {
		try {
			const response = await dispatch(
				fetchData({
					url: '/updateMed',
					method: 'PUT',
					data: { ...inputData, medName },
				})
			);
			if (response.payload?.status === 200) {
				dispatch(
					updateUserMed({
						name: medName,
						...inputData,
					})
				);
			}
			console.log('res', response);
		} catch (error) {
			console.log('err in update: ', error);
		}
	};
	const onDeleteMed = async () => {
		try {
			const response = await dispatch(
				fetchData({
					url: '/deleteMed',
					method: 'DELETE',
					data: { medName },
				})
			);

			if (response.payload?.status === 200) {
				dispatch(
					deleteUserMed({
						name: medName,
						...inputData,
					})
				);
			}
		} catch (error) {
			console.log('err in update: ', error);
		}
	};
	return (
		<View style={styles.formOuterCon}>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.imageCon}>
					<Image
						source={{ uri: medData.picture }}
						resizeMode='cover'
						style={{ flex: 1 }}
					/>
				</View>
				<View style={styles.medDataCon}>
					<Text style={miniTitle}>{medName}</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15 }}>Kutu başı miktar: </Text>
						<Text style={{ fontSize: 15 }}>{medData.quantity}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15 }}>Raf ömrü: </Text>
						<Text style={{ fontSize: 15 }}>{medData.expireDate}</Text>
					</View>
				</View>
			</View>
			<View>
				<Text style={{ fontWeight: 'bold' }}>Alırken dikkat ediniz:</Text>
				{medData.toConsider.map((item, index) => (
					<Text key={index}>• {item}</Text>
				))}
				<Text style={{ fontWeight: 'bold' }}>Yan etkiler:</Text>
				{medData.sideEffect.map((item, index) => (
					<Text key={index}>• {item}</Text>
				))}
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<TextInput
					style={{ marginBlock: 6, width: '45%' }}
					label='İlaç miktarı..'
					value={inputData.amount}
					onChangeText={(text) => onInputChange(text, 'amount')}
					mode='outlined'
				/>
				<TextInput
					style={{ marginBlock: 6, width: '45%' }}
					label='İlaç Saati..'
					value={inputData.time}
					onChangeText={(text) => onInputChange(text, 'time')}
					mode='outlined'
				/>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<Button
					style={{ width: '47%', backgroundColor: colors.error500 }}
					icon='trash-can'
					mode='contained'
					onPress={onDeleteMed}
				>
					Sil
				</Button>
				<Button
					icon='refresh'
					style={{ width: '47%' }}
					mode='contained'
					onPress={onUpdateMed}
				>
					Güncelle
				</Button>
			</View>
		</View>
	);
}
export default UpdateMedForm;
const styles = StyleSheet.create({
	formOuterCon: {
		minHeight: '470',
		width: '90%',
		borderRadius: 20,
		backgroundColor: colors.primary100,
		elevation: 5,
		shadowColor: 'black',
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
		paddingHorizontal: 12,
		paddingBlock: 20,
		justifyContent: 'space-between',
		marginBlock: 'auto',
	},
	imageCon: {
		height: 140,
		width: 140,
		borderRadius: '50%',
		overflow: 'hidden',
	},
	medDataCon: { flex: 1, margin: 16 },
});
