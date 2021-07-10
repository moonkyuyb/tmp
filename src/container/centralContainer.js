/* COMMON */
import { connect } from 'react-redux'

/* SCREEN & COMPONETS */
import AlertModalComponent from '../components/common/AlertModal';

//CENTRAL REDUCER
import { initCentralState, setCentralState, clearCentralState } from "../reducers/centralReducer"

const centralStateToProps = (state) => {
	return{
		//CENTRAL REDUCER
		loading: state.centralReducer.loading,
		toastMsg: state.centralReducer.toastMsg,
		alertMsg: state.centralReducer.alertMsg,
		alertHeader: state.centralReducer.alertHeader,
		navigateTo: state.centralReducer.navigateTo,
		needGoBack: state.centralReducer.needGoBack,
		error: state.centralReducer.error,
	}
}

const centralDispatchToProps = (dispatch) => {
	return{
		//CENTRAL REDUCER
		initCentralState: (payload) => {dispatch(initCentralState(payload))},
		setCentralState: (payload) => {dispatch(setCentralState(payload))},
		clearCentralState: (payload) => {dispatch(clearCentralState(payload))},
		handleError: (payload) => {dispatch(handleError(payload))},
	}
}

export const AlertModal = connect(centralStateToProps, centralDispatchToProps)(AlertModalComponent)
