import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Enroll from './screens/Enroll';
import Home from './screens/Home';
import ManageMedication from './screens/ManageMed';
import AddMedication from './screens/AddMeds';
import { colors } from './components/constants/constantStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
} from 'react-native-paper';
import Account from './screens/Account';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function StackNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={({ navigation }) => ({
					//headerShown: false,
					title: 'Medify',
					headerStyle: {
						backgroundColor: colors.primary200,
					},
					headerTintColor: colors.gray800,
					headerRight: () => (
						<>
							<Pressable
								onPress={() => {
									navigation.navigate('Kayıt Ol');
								}}
							>
								<Text>enrol test</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									navigation.navigate('Hesabım');
								}}
							>
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
			<Stack.Screen
				options={{ headerShown: false }}
				component={Enroll}
				name='Kayıt Ol'
			/>
			<Stack.Screen component={Account} name='Hesabım' />
			<Stack.Screen component={ManageMedication} name='İlacı Düzenle' />
		</Stack.Navigator>
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
							<BottomTabs.Navigator
								screenOptions={({ navigation }) => ({
									// headerStyle: {
									// 	backgroundColor: colors.primary300,
									// 	height: 90,
									// },
									// headerTintColor: 'white',
									// headerRight: () => <Button>test</Button>,
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
						</NavigationContainer>
					</PaperProvider>
				</SafeAreaView>
			</PersistGate>
		</Provider>
	);
}
