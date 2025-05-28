import { Image, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { colors } from '../components/constants/constantStyles';
import { useState } from 'react';
import ScreenContainer from '../components/UI/ScreenContainer';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { fetchData, saveAccessToken } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';

function Login() {
	const [userInfo, setUserInfo] = useState({
		mail: '',
		password: '',
		time: '', //silincek xxxxx
	});
	const onInputChange = (text, fieldName) => {
		setUserInfo((prev) => ({
			...prev,
			[fieldName]: text,
		}));
	};
	const dispatch = useDispatch();
	const navigation = useNavigation();
	async function onSave() {
		try {
			const response = await dispatch(
				fetchData({
					url: '/login',
					data: {
						mail: userInfo.mail,
						password: userInfo.password,
					},
					method: 'POST',
				})
			);
			const accessToken = response.payload.data.accessToken;

			if (accessToken) {
				dispatch(saveAccessToken(accessToken));
			}
			navigation.navigate('Ana Ekran');
			navigation.reset({
				index: 0,
				routes: [{ name: 'Ana Ekran' }],
			});
			setUserInfo({ mail: '', password: '' });
		} catch (error) {
			console.error('Error logging in:', error);
		}
	}
	return (
		<ScreenContainer>
			<View style={styles.userFormCon}>
				<Image
					source={{
						uri: 'https://cdn-icons-png.flaticon.com/512/4661/4661334.png',
					}}
					resizeMode='cover'
					style={styles.image}
				/>
				<TextInput
					style={{ marginBlock: 6, width: '97%', marginInline: 'auto' }}
					label='Email'
					value={userInfo.mail}
					onChangeText={(text) => onInputChange(text, 'mail')}
					mode='outlined'
					autoCapitalize='none'
				/>
				<TextInput
					style={{ marginBlock: 6, width: '97%', marginInline: 'auto' }}
					label='Şifre'
					autoCapitalize='none'
					value={userInfo.password}
					onChangeText={(text) => onInputChange(text, 'password')}
					mode='outlined'
					secureTextEntry={true}
				/>
				<Button
					onPress={() => {
						navigation.navigate('Kayıt Ol');
					}}
				>
					Hesabım yok
				</Button>
				<Button
					icon='login'
					style={{ marginBlock: 12 }}
					mode='contained'
					onPress={onSave}
				>
					Giriş Yap
				</Button>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<TextInput
					style={{ marginBlock: 6 }}
					autoCapitalize='none'
					value={userInfo.time}
					onChangeText={(text) => onInputChange(text, 'time')}
				/>
				<Button style={{ marginBlock: 12 }} mode='contained' onPress={() => {}}>
					test notif
				</Button>
			</View>
		</ScreenContainer>
	);
}
export default Login;
const styles = StyleSheet.create({
	userFormCon: {
		width: '90%',
		marginBlock: 'auto',
		paddingTop: 40,
		paddingBottom: 16,
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
	image: { height: 170, width: 150, marginInline: 'auto' },
});
