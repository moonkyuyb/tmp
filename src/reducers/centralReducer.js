/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import axios from "axios";
import moment from "moment";

/* CONSTANTS */
const needToHandled = [ 'Forbidden', 'Networks' ]

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_CENTRAL_STATE = 'central/INIT_CENTRAL_STATE'
export const SET_CENTRAL_STATE = 'central/SET_CENTRAL_STATE'
export const CLEAR_CENTRAL_STATE = 'central/CLEAR_CENTRAL_STATE'
export const ALL_CENTRAL_ACTIONS = [ INIT_CENTRAL_STATE, SET_CENTRAL_STATE, CLEAR_CENTRAL_STATE ]

export const initCentralState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_CENTRAL_STATE, payload:payload})})
}
export const setCentralState = (payload) => {
	return(dispatch=>{dispatch({type:SET_CENTRAL_STATE, payload:payload})})
}
export const clearCentralState = () => {
	return(dispatch=>{dispatch({type:CLEAR_CENTRAL_STATE})})
}
export const handleError = (payload) => {
	return(dispatch=>{
		console.log(`💬[centralReducer.handleError] FROM [${payload.from}] ${payload.error}`)
		const error = payload.error
		if(error.message && error.message == 'Forbidden') {
			console.log(`💬[centralReducer.handleError] error.message, `, error.message)
			payload['alertMsg'] = '로그인이 필요합니다'; payload['needGoBack'] = 1;
		}
		if(error.response)
			console.log(`💬[centralReducer.handleError] has error.response`)
		return dispatch({type:INIT_CENTRAL_STATE, payload})
	})
}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {

	loading: null,

	toastMsg: null,
	alertMsg: null,
	alertHeader: null,

	navigateTo: null,
	needGoBack: null, //뒤로 갈 페이지 수

	error: null, //Error 객체

	// confirmPopup: null,
	// confirmMsg: null,
	// confirmAnswer: null,

}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const centralReducer = (state=initialState, action)=>{
	switch(action.type){
	case INIT_CENTRAL_STATE:
		return Object.assign({}, initialState, action.payload)
	case SET_CENTRAL_STATE:
		return Object.assign({}, state, action.payload)
	case CLEAR_CENTRAL_STATE:
		return Object.assign({}, initialState)
	default:
		return Object.assign({}, state)
	}
}

export default centralReducer