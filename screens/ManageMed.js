import ScreenContainer from '../components/UI/ScreenContainer';
import UpdateMedForm from '../components/UpdateMedForm';

function ManageMedication({ route }) {
	return (
		<ScreenContainer>
			<UpdateMedForm medName={route.params.medName} />
		</ScreenContainer>
	);
}
export default ManageMedication;
