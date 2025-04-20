import { Pressable, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../constants/constantStyles';
import { useNavigation } from '@react-navigation/native';
function AddMedButton() {
	const navigation = useNavigation();
	return (
		<Pressable
			onPress={() => navigation.navigate('İlaç Ekle')}
			style={({ pressed }) => [
				styles.buttonOuterCon,
				pressed && styles.pressed,
			]}
		>
			<Feather
				name='plus-square'
				size={36}
				color={colors.gray800}
				style={{ opacity: 0.7 }}
			/>
		</Pressable>
	);
}
export default AddMedButton;
const styles = StyleSheet.create({
	buttonOuterCon: {
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	pressed: { opacity: 0.7 },
});
