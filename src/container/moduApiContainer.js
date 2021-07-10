import { connect } from 'react-redux';

import ModuApiTestScreen from '../screen/ModuApiTestScreen';

//COMMON REDUCER
import { showAlertMessage } from "../reducers/commonReducer";

//MODU_API REDUCER
import { moduApiInit, moduApiCall, } from '../reducers/moduApiReducer';

const moduApiStateToProps = (state) => {
	return{
		//COMMON REDUCER
		alertMessage:state.commonReducer.alertMessage,

		//MODU_API REDUCER
		test:state.moduApiReducer.test,
	}
}

const moduApiDispatchToProps = (dispatch) => {
	return{
		//COMMON REDUCER
		showAlertMessage:(payload) => {dispatch(showAlertMessage(payload))},

		//MODU_API REDUCER
		moduApiInit:(payload)=>{dispatch(moduApiInit(payload))},
		moduApiCall:(payload)=>{dispatch(moduApiCall(payload))},
	}
}

export const ModuApiTestContainer=connect(moduApiStateToProps, moduApiDispatchToProps)(ModuApiTestScreen)