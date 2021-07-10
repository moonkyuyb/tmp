//COMMON
import { connect } from 'react-redux';

//SCREEN & COMPONETS
import ModalPopupComponents from "../components/common/ModalPopup";

//COMMON REDUCER
import { initCommonState, setCommonState, clearCommonState, showAlertMessage } from "../reducers/commonReducer";

const commonStateToProps = (state) => {
	return{
		//AUTH REDUCER
		token				: state.authReducer.token,
		verifiedToken		: state.authReducer.verifiedToken,

		//COMMON REDUCER
		alertMessage		: state.commonReducer.alertMessage,
	}
}

const commonDispatchToProps = (dispatch) => {
	return{
		//COMMON REDUCER
		initCommonState	: (payload) => {dispatch(initCommonState(payload))},
		setCommonState	: (payload) => {dispatch(setCommonState(payload))},
		clearCommonState: (payload) => {dispatch(clearCommonState(payload))},
		showAlertMessage: (payload) => {dispatch(showAlertMessage(payload))},
	}
}

export const ModalPopup = connect(commonStateToProps, commonDispatchToProps)(ModalPopupComponents)