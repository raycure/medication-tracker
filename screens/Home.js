import ScreenContainer from '../components/UI/ScreenContainer';
import MedList from '../components/MedList';
import { Button } from 'react-native-paper';
import axios from '../axios';

function Home() {
	async function logout() {
		axios.post('/logout');
	}
	return (
		<ScreenContainer>
			<Button onPress={logout}>logout</Button>
			<MedList />
		</ScreenContainer>
	);
}
export default Home;
