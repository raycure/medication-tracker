import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, miniTitle } from './constants/constantStyles';
import { useState } from 'react';
import { Button, Searchbar, TextInput } from 'react-native-paper';
import * as React from 'react';
import medListData from '../store/medListData.json';
function AddMedForm() {
	const [inputData, setInputData] = useState({
		amount: '',
		searchQuery: '',
		medName: 'Famodin',
		time: '',
	});
	const onInputChange = (text, fieldName) => {
		setInputData((prev) => ({
			...prev,
			[fieldName]: text,
		}));
	};
	const medData = medListData[inputData.medName];
	const onAddMed = () => {};
	return (
		<View style={styles.formOuterCon}>
			<Searchbar
				style={styles.searchbar}
				placeholder='İlacınız..'
				onChangeText={(text) => onInputChange(text, 'searchQuery')}
				value={inputData.searchQuery}
			/>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.imageCon}>
					<Image
						source={{ uri: medData.picture }}
						resizeMode='cover'
						style={{ flex: 1 }}
					/>
				</View>
				<View style={styles.medDataCon}>
					<Text style={miniTitle}>{inputData.medName}</Text>
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
			<Button icon='alarm-plus' mode='contained' onPress={onAddMed}>
				Ekle
			</Button>
		</View>
	);
}
export default AddMedForm;
const styles = StyleSheet.create({
	formOuterCon: {
		minHeight: '560',
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
	searchbar: {
		marginBlock: 6,
		borderWidth: 1,
		borderColor: colors.primary700,
		borderRadius: 20,
		backgroundColor: 'white',
	},
	imageCon: {
		height: 140,
		width: 140,
		borderRadius: '50%',
		overflow: 'hidden',
	},
	medDataCon: { flex: 1, margin: 16 },
});
