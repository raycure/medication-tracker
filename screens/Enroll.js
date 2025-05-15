import { useState } from 'react';
import ScreenContainer from '../components/UI/ScreenContainer';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { miniTitle } from '../components/constants/constantStyles';
import { useDispatch } from 'react-redux';
import { fetchData, saveAccessToken } from '../redux/authSlice';

function Enroll() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState({
		name: '',
		mail: '',
		password: '',
		yob: '',
		height: '',
		weight: '',
	});

	const data = {
		name: {
			title: 'Size ne şekilde hitap etmeliyiz?',
			picture: 'https://cdn-icons-png.flaticon.com/512/2544/2544119.png',
			label: 'Adınız',
		},
		mail: {
			title: 'E-posta adresiniz nedir?',
			picture: 'https://cdn-icons-png.flaticon.com/512/6778/6778700.png',
			label: 'E-posta',
		},
		password: {
			title: 'Şifrenizi oluşturun',
			picture: 'https://cdn-icons-png.flaticon.com/512/388/388458.png',
			label: 'Şifre',
		},
		yob: {
			title: 'Doğum yılınız nedir?',
			picture: 'https://cdn-icons-png.flaticon.com/512/4530/4530670.png',
			label: 'Doğum Yılı',
		},
		height: {
			title: 'Boyunuz kaç santimetre?',
			picture: 'https://cdn-icons-png.flaticon.com/512/1589/1589247.png',
			label: 'Boy (cm)',
		},
		weight: {
			title: 'Kaç kilosunuz?',
			picture: 'https://cdn-icons-png.flaticon.com/512/8035/8035049.png',
			label: 'Kilo (kg)',
		},
	};

	const [activeElement, setActiveElement] = useState('name');

	const loadNextItem = async () => {
		const elements = Object.keys(data);
		const currentIndex = elements.indexOf(activeElement);
		if (currentIndex < elements.length - 1) {
			setActiveElement(elements[currentIndex + 1]);
		} else {
			const response = await dispatch(
				fetchData({
					data: userInfo,
					url: '/register',
					method: 'POST',
				})
			);
			if (response.payload.status === 200) {
				const accessToken = response.payload.data.accessToken;
				if (accessToken) {
					console.log('accessToken after register', accessToken);
					dispatch(saveAccessToken(accessToken));
				}
			}
		}
	};

	const onInputChange = (text, fieldName) => {
		setUserInfo((prev) => ({
			...prev,
			[fieldName]: text,
		}));
	};

	return (
		<ScreenContainer>
			<View style={styles.container}>
				<Image
					source={{ uri: data[activeElement].picture }}
					resizeMode='center'
					style={styles.image}
				/>
				<Text style={miniTitle}>{data[activeElement].title}</Text>
				<TextInput
					style={styles.input}
					label={data[activeElement].label}
					value={userInfo[activeElement]}
					onChangeText={(text) => onInputChange(text, activeElement)}
					mode='outlined'
					secureTextEntry={activeElement === 'password' ? true : false}
					keyboardType={
						activeElement === 'name' ||
						activeElement === 'password' ||
						activeElement === 'mail'
							? 'default'
							: 'numeric'
					}
				/>
			</View>
			<Button
				icon='arrow-right-thick'
				style={{
					width: '90%',
					paddingBlock: 4,
					borderRadius: 40,
				}}
				labelStyle={{ fontSize: 20 }}
				mode='contained'
				onPress={loadNextItem}
				contentStyle={{ flexDirection: 'row-reverse' }}
				disabled={!userInfo[activeElement]}
			>
				{activeElement === 'weight' ? 'Tamamla' : 'Sonraki'}
			</Button>
		</ScreenContainer>
	);
}
export default Enroll;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: { maxHeight: 60, width: 300, margin: 10 },
	image: { height: 150, width: 150, margin: 10 },
});
