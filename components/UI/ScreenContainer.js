import { View } from 'react-native';
import { colors } from '../constants/constantStyles';

function ScreenContainer({ children }) {
	return (
		<View
			style={{
				flex: 1,
				padding: 16,
				alignItems: 'center',
				//justifyContent: 'center',
				backgroundColor: colors.gray100,
			}}
		>
			{children}
		</View>
	);
}
export default ScreenContainer;
