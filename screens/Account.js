import React from 'react';
import { useEffect, useState } from 'react';
import ScreenContainer from '../components/UI/ScreenContainer';
import { Button, TextInput, Modal, Portal } from 'react-native-paper';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, primaryTitle } from '../components/constants/constantStyles';
import { fetchData } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
function Account() {
	const dispatch = useDispatch();
	useEffect(() => {
		initUserInfo();
	}, []);

	async function initUserInfo() {
		try {
			console.log("'initUserInfo called'");

			const response = await dispatch(
				fetchData({
					url: '/userInfo',
					method: 'GET',
				})
			);
			// todo if response's status is 403 redirect to login
			if (response.payload.status === 200) {
				const userInfo = response.payload.data.foundUser;
				setUserInfo({
					name: userInfo.name,
					yob: userInfo.yob,
					mail: userInfo.mail,
					height: userInfo.height,
					weight: userInfo.weight,
				});
			}
		} catch (error) {
			console.log('error', error);
		}
	}

	const [userInfo, setUserInfo] = useState({
		name: '',
		yob: '',
		mail: '',
		password: '',
		height: '',
		weight: '',
	});
	const onInputChange = (text, fieldName) => {
		setUserInfo((prev) => ({
			...prev,
			[fieldName]: text,
		}));
	};
	const onCancel = () => {
		initUserInfo();
	};
	async function onSave() {
		const updateData = {
			name: userInfo.name,
			yob: userInfo.yob,
			mail: userInfo.mail,
			height: userInfo.height,
			weight: userInfo.weight,
		};
		const response = await dispatch(
			fetchData({
				url: '/userInfo/update',
				method: 'PUT',
				data: { updateData },
			})
		);
		console.log('response for update', response);
	}
	const onSavePassword = () => {
		// password ayrı kaydet once
		// password gozukur kalmasın diye statini sonra bos bırak
		setUserInfo((prev) => ({
			...prev,
			password: '',
		}));
	};
	const [visible, setVisible] = React.useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	return (
		<ScreenContainer>
			<View style={styles.userFormCon}>
				<Text style={primaryTitle}>Bilgileriniz</Text>
				<TextInput
					style={{ marginBlock: 6, width: '97%', marginInline: 'auto' }}
					label='Adınız'
					placeholder='Adınız'
					placeholderTextColor={colors.gray500}
					value={userInfo.name}
					onChangeText={(text) => onInputChange(text, 'name')}
					mode='outlined'
				/>
				<TextInput
					style={{ marginBlock: 6, width: '97%', marginInline: 'auto' }}
					label='Doğum Yılı'
					placeholder='DD/MM/YYYY'
					keyboardType='numeric'
					maxLength={10}
					value={userInfo.yob}
					onChangeText={(text) => onInputChange(text, 'yob')}
					mode='outlined'
				/>
				<TextInput
					style={{ marginBlock: 6, width: '97%', marginInline: 'auto' }}
					label='E-posta'
					placeholder='E-posta'
					placeholderTextColor={colors.gray500}
					autoCapitalize='none'
					autoComplete='none'
					autoCorrect={false}
					keyboardType='email-address'
					textContentType='emailAddress'
					value={userInfo.mail}
					onChangeText={(text) => onInputChange(text, 'mail')}
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
						label='Boyunuz (cm)'
						placeholder='Boyunuz (cm)'
						placeholderTextColor={colors.gray500}
						keyboardType='numeric'
						value={userInfo.height}
						onChangeText={(text) => onInputChange(text, 'height')}
						mode='outlined'
					/>
					<TextInput
						style={{ marginBlock: 6, width: '48%', marginInline: 'auto' }}
						label='Kilonuz (kg)'
						placeholder='Kilonuz (kg)'
						placeholderTextColor={colors.gray500}
						keyboardType='numeric'
						maxLength={3}
						value={userInfo.weight}
						onChangeText={(text) => onInputChange(text, 'weight')}
						mode='outlined'
					/>
				</View>
				<Portal>
					<Modal
						visible={visible}
						onDismiss={hideModal}
						contentContainerStyle={styles.containerStyle}
					>
						<TextInput
							style={{ marginBlock: 6, width: '97%', marginInline: 'auto' }}
							label='Yeni Şifre'
							secureTextEntry={true}
							value={userInfo.password}
							onChangeText={(text) => onInputChange(text, 'password')}
							mode='outlined'
						/>
						<Button
							icon='lock'
							style={{ width: '45%', marginInline: 'auto', marginBlock: 10 }}
							mode='contained'
							onPress={onSavePassword}
						>
							Kaydet
						</Button>
					</Modal>
				</Portal>
				<Pressable onPress={showModal}>
					<Text style={{ color: colors.gray700 }}>Şifremi Unuttum</Text>
				</Pressable>
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
	containerStyle: {
		backgroundColor: 'white',
		paddingBlock: 60,
		paddingInline: 20,
		marginInline: 20,
		borderRadius: 14,
	},
});
