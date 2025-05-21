import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import medListData from '../store/medListData.json';
import { colors, miniTitle } from './constants/constantStyles';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from '../axios';
function MedItem({ medName }) {
	const [medData, setMedData] = useState();

	useEffect(() => {
		initMedInfo();
	}, []);

	async function initMedInfo() {
		try {
			const { data } = await axios.get('/getMeds');
			const meds2 = data.meds;
			const foundMed = meds2.find((item) => item.name === medName);
			setMedData(foundMed);
		} catch (error) {
			console.log('err', error);
		}
	}

	const navigation = useNavigation();
	if (!medData) {
		return (
			<View style={styles.medOuterCon}>
				<Text>{medName}</Text>
				<Text>Böyle bir ilaç yoktur.</Text>
			</View>
		);
	}

	return (
		<Pressable
			onPress={() => navigation.navigate('İlacı Düzenle', { medName: medName })}
			style={({ pressed }) => [styles.medOuterCon, pressed && styles.pressed]}
		>
			<Image
				source={{ uri: medData.picture }}
				resizeMode='cover'
				style={{
					height: 110,
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			/>
			<Text style={[{ textAlign: 'center' }, miniTitle]}>{medName}</Text>
			<View style={styles.medBottomOuterTextCon}>
				<View style={styles.medBottomTextCon}>
					<Text>Kalan Süre:</Text>
					<Text>2:38s</Text>
				</View>
				<View style={styles.medBottomTextCon}>
					<Text>Miktar:</Text>
					<Text>{medData.quantity}</Text>
				</View>
			</View>
		</Pressable>
	);
}
export default MedItem;
const styles = StyleSheet.create({
	medOuterCon: {
		height: 200,
		width: '46%',
		borderRadius: 16,
		marginHorizontal: 'auto',
		marginBlock: 8,
		backgroundColor: colors.primary200,
		elevation: 4,
		shadowColor: 'black',
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.3,
		justifyContent: 'space-between',
		overflow: 'hidden',
	},
	pressed: {
		opacity: 0.7,
	},
	medBottomOuterTextCon: {
		padding: 8,
	},
	medBottomTextCon: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
