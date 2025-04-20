import { useState } from 'react';
import ScreenContainer from '../components/UI/ScreenContainer';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { colors, primaryTitle } from '../components/constants/constantStyles';

function Account() {
	const userInfo = {
		name: 'Merve Türk',
		yob: '2002', //yearOfBirth
		height: '170',
		weight: '65',
	};
	const [newUserInfo, setNewUserInfo] = useState({
		name: userInfo.name,
		yob: userInfo.yob,
		height: userInfo.height,
		weight: userInfo.weight,
	});
	const onInputChange = (text, fieldName) => {
		setNewUserInfo((prev) => ({
			...prev,
			[fieldName]: text,
		}));
	};
	const onCancel = () => {};
	const onSave = () => {};
	return (
		<ScreenContainer>
			<View style={styles.userFormCon}>
				<Text style={primaryTitle}>Bilgileriniz</Text>
				<TextInput
					style={{ marginBlock: 6, width: '97%', marginInline: 'auto' }}
					label={userInfo.name}
					value={newUserInfo.name}
					onChangeText={(text) => onInputChange(text, 'name')}
					mode='outlined'
				/>
				<TextInput
					style={{ marginBlock: 6, width: '97%', marginInline: 'auto' }}
					label={userInfo.yob}
					value={newUserInfo.yob}
					onChangeText={(text) => onInputChange(text, 'yob')}
					mode='outlined'
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-evenly',
					}}
				>
					<TextInput
						style={{ marginBlock: 6, width: '48%', marginInline: 'auto' }}
						label={`${userInfo.height} cm`}
						value={newUserInfo.height}
						onChangeText={(text) => onInputChange(text, 'height')}
						mode='outlined'
					/>
					<TextInput
						style={{ marginBlock: 6, width: '48%', marginInline: 'auto' }}
						label={`${userInfo.weight} kg`}
						value={newUserInfo.weight}
						onChangeText={(text) => onInputChange(text, 'weight')}
						mode='outlined'
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						marginBlock: 16,
					}}
				>
					<Button
						style={{ width: '45%', backgroundColor: colors.error500 }}
						icon='close'
						mode='contained'
						onPress={onCancel}
					>
						İptal
					</Button>
					<Button
						icon='check'
						style={{ width: '45%' }}
						mode='contained'
						onPress={onSave}
					>
						Kaydet
					</Button>
				</View>
			</View>
		</ScreenContainer>
	);
}
export default Account;
const styles = StyleSheet.create({
	userFormCon: {
		width: '90%',
		marginBlock: 'auto',
		paddingTop: 30,
		paddingBottom: 6,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: colors.gray300,
		borderRadius: 12,
		backgroundColor: colors.gray200,
		elevation: 4,
		shadowColor: 'black',
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
	},
});
