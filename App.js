import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Enroll from './screens/Enroll';
import Login from './screens/Login';
import Home from './screens/Home';
import ManageMedication from './screens/ManageMed';
import AddMedication from './screens/AddMeds';
import { colors } from './components/constants/constantStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
	MD3LightTheme as DefaultTheme,
	Divider,
	Modal,
	PaperProvider,
	Portal,
} from 'react-native-paper';
import Account from './screens/Account';
import { Provider, useDispatch } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Button } from 'react-native-paper';
import axios from './axios';
import { useSelector } from 'react-redux';
import { fetchData, selectIsLoggedIn } from './redux/authSlice';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Kayıt Ol' component={Enroll} />
			<Stack.Screen name='Giriş Yap' component={Login} />
		</Stack.Navigator>
	);
}

function StackNavigator() {
	const dispatch = useDispatch();
	async function logout() {
		try {
			console.log('logout pressed');

			const response = await dispatch(
				fetchData({
					url: '/logout',
					method: 'POST',
					data: {},
				})
			);
			console.log('response', response);
		} catch (error) {
			console.error('Error logging out:', error);
		}
	}
	let isLoggedIn = useSelector(selectIsLoggedIn);
	useEffect(() => {
		console.log('isLoggedIn in App.js', isLoggedIn);
	}, [isLoggedIn]);

	async function deleteUser() {
		try {
			console.log('deleteUser pressed');
			const response = await dispatch(
				fetchData({ data: {}, method: 'DELETE', url: '/deleteAccount' })
			);
			console.log('response', response);
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	}

	const [visible, setVisible] = React.useState(false);
	const openOverlay = () => setVisible(true);
	const closeOverlay = () => setVisible(false);
	const navigation = useNavigation();
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					options={() => ({
						//headerShown: false,
						title: 'Medify',
						headerStyle: {
							backgroundColor: colors.primary200,
						},
						headerTintColor: colors.gray800,
						headerRight: () => (
							<>
								<Pressable onPress={openOverlay}>
									<Ionicons
										name='person-circle'
										size={34}
										color={colors.gray800}
									/>
								</Pressable>
							</>
						),
					})}
					component={Home}
					name='Ana Ekran'
				/>
				<Stack.Screen component={Account} name='Hesabım' />
				<Stack.Screen component={ManageMedication} name='İlacı Düzenle' />
			</Stack.Navigator>
			<Portal>
				<Modal
					visible={visible}
					onDismiss={closeOverlay}
					contentContainerStyle={styles.overlay}
				>
					<View style={{ flex: 1 }}>
						<Text
							style={{
								fontSize: 24,
								fontWeight: 'bold',
								marginBottom: '24',
								color: colors.gray800,
							}}
						>
							Hesap Aktiviteleri
						</Text>
						<Button
							labelStyle={styles.menuItemLabel}
							style={styles.menuItem}
							onPress={() => {
								navigation.navigate('İlaçlarım', {
									screen: 'Hesabım',
								});
								closeOverlay();
							}}
						>
							Hesabım
						</Button>
						<Divider />
						<Button
							labelStyle={styles.menuItemLabel}
							style={styles.menuItem}
							onPress={() => {
								logout();
								closeOverlay();
							}}
						>
							Hesabımdan Çık
						</Button>
						<Divider />
						<Button
							labelStyle={styles.menuItemLabel}
							style={styles.menuItem}
							onPress={() => {
								deleteUser();
								closeOverlay();
							}}
						>
							Hesabımı Sil
						</Button>
						<Divider />
						<Button
							labelStyle={styles.menuItemLabel}
							style={styles.menuItem}
							onPress={closeOverlay}
						>
							Menü Kapat
						</Button>
					</View>
				</Modal>
			</Portal>
		</>
	);
}
function LoginChecker() {
	let isLoggedIn = useSelector(selectIsLoggedIn);
	useEffect(() => {
		console.log('isLoggedIn in App.js', isLoggedIn);
	}, [isLoggedIn]);
	return (
		<>
			{isLoggedIn ? (
				<BottomTabs.Navigator
					screenOptions={() => ({
						headerShown: false,
						tabBarStyle: {
							backgroundColor: colors.primary300,
							height: 70,
						},
						tabBarActiveTintColor: 'white',
						tabBarInactiveTintColor: colors.primary200,
						tabBarLabelStyle: { fontWeight: 'bold', fontSize: 16 },
					})}
				>
					<BottomTabs.Screen
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name='home' size={size} color={color} />
							),
						}}
						component={StackNavigator}
						name='İlaçlarım'
					/>
					<BottomTabs.Screen
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name='add' size={size} color={color} />
							),
						}}
						component={AddMedication}
						name='İlaç Ekle'
					/>
				</BottomTabs.Navigator>
			) : (
				<AuthNavigator />
			)}
		</>
	);
}
export default function App() {
	const theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: colors.primary400,
			secondary: colors.primary100,
		},
	};

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SafeAreaView style={{ flex: 1 }}>
					<StatusBar style='auto' />
					<PaperProvider theme={theme}>
						<NavigationContainer>
							<LoginChecker />
						</NavigationContainer>
					</PaperProvider>
				</SafeAreaView>
			</PersistGate>
		</Provider>
	);
}
const styles = StyleSheet.create({
	overlay: {
		backgroundColor: colors.gray100,
		position: 'absolute',
		top: 56,
		right: 0,
		width: '70%',
		height: 'auto',
		padding: 30,
		elevation: 10,
		borderLeftWidth: 1,
		borderLeftColor: colors.gray200,
	},
	menuItem: {
		borderRadius: 0,
	},
	menuItemLabel: { fontSize: 18, padding: 16 },
});
