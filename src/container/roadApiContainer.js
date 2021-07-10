import { connect } from 'react-redux';

import RoadApiTestScreen from "../screen/RoadApiTestScreen";

//COMMON REDUCER
import { showAlertMessage } from "../reducers/commonReducer";

//ROAD_API REDUCER
import { roadApiInit, roadApiCall, roadApiHandleSelect } from '../reducers/roadApiReducer';

const roadApiStateToProps = (state) => {
	return{
		//COMMON REDUCER
		alertMessage: state.commonReducer.alertMessage,

		//ROAD_API REDUCER
		roadApiParams:			state.roadApiReducer.roadApiParams,
		roadApiResultsCommon:	state.roadApiReducer.roadApiResultsCommon,
		roadApiResultsJuso:		state.roadApiReducer.roadApiResultsJuso,
		roadApiPagination:		state.roadApiReducer.roadApiPagination,
		roadApiIndicator:		state.roadApiReducer.roadApiIndicator,
		roadApiSelectedJuso:	state.roadApiReducer.roadApiSelectedJuso,
	}
}

const roadApiDispatchToProps = (dispatch) => {
	return{
		//COMMON REDUCER
		showAlertMessage:		(payload) => {dispatch(showAlertMessage(payload))},

		//ROAD_API REDUCER
		roadApiInit:			(payload)=>{dispatch(roadApiInit(payload))},
		roadApiCall:			(payload)=>{dispatch(roadApiCall(payload))},
		roadApiHandleSelect:	(payload)=>{dispatch(roadApiHandleSelect(payload))},
	}
}

export const RoadApiTestContainer=connect(roadApiStateToProps, roadApiDispatchToProps)(RoadApiTestScreen)