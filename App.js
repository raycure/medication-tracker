import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Enroll from './screens/Enroll';
import Home from './screens/Home';
import ManageMedication from './screens/ManageMed';
import AddMedication from './screens/AddMeds';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
function StackNavigator() {
	<Stack.Navigator>
		<Stack.Screen component={Home} name='Ana Ekran' />
		<Stack.Screen component={Enroll} name='Kayıt Ol' />
		<Stack.Screen component={ManageMedication} name='İlaçlarımı Düzenle' />
	</Stack.Navigator>;
}

export default function App() {
	return (
		<View>
			<StatusBar style='auto' />
			<NavigationContainer>
				<BottomTabs.Navigator>
					<BottomTabs.Screen component={StackNavigator} name='Ana Ekran' />
					<BottomTabs.Screen component={AddMedication} name='İlaç Ekle' />
				</BottomTabs.Navigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({});
