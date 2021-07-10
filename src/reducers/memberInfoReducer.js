/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { handleError, setCentralState } from "./centralReducer";
import { checkParams } from "../utils/common";

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_MEMBER_INFO_STATE = 'memberInfo/INIT_MEMBER_INFO_STATE'
export const SET_MEMBER_INFO_STATE = 'memberInfo/SET_MEMBER_INFO_STATE'
export const CLEAR_MEMBER_INFO_STATE = 'memberInfo/CLEAR_MEMBER_INFO_STATE'
export const ALL_MEMBER_INFO_ACTIONS = [ INIT_MEMBER_INFO_STATE, SET_MEMBER_INFO_STATE, CLEAR_MEMBER_INFO_STATE ]

export const initMemberInfoState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_MEMBER_INFO_STATE, payload:payload})})
}
export const setMemberInfoState = (payload) => {
	return(dispatch=>{dispatch({type:SET_MEMBER_INFO_STATE, payload:payload})})
}
export const clearMemberInfoState = () => {
	return(dispatch=>{dispatch({type:CLEAR_MEMBER_INFO_STATE})})
}
export const getMemberInfo = (payload)=>{return(async(dispatch, getState) => {

	console.log(`💬[memberInfoReducer.getMemberInfo] payload: `, payload) //필요하지 않을 경우 주석처리
	dispatch(setCentralState({loading: true}))

	//QUERY, PARAMS, JSON BODY & VALIDATE
	if(!checkParams(payload, ['m_id']))
		return dispatch(handleError({error: new Error('Parameter is Required')}))
	const {m_id} = payload
	const url = `${API_URL}/member/info/${m_id}`

	//CALL RESPONSE
	const response = await axios.get(url).catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'memberReducer'}))
		}else if(error.response.status==422){
			return dispatch(handleError({error: error, from:'memberReducer'}))
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'memberReducer'}))
		}
	})
	if(!response || !response.data) return;

	//MAKE PAYLOAD
	const newMemberInfo = response.data.results
	const newPayload = { memberInfo: newMemberInfo }
	dispatch({type:SET_MEMBER_INFO_STATE, payload: newPayload})
	dispatch(setCentralState({loading: false}))
})}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {

	memberInfo:null,

}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const memberInfoReducer = (state=initialState, action)=>{
	switch(action.type){
	case INIT_MEMBER_INFO_STATE:
		return Object.assign({}, initialState, action.payload)
	case CLEAR_MEMBER_INFO_STATE:
		return Object.assign({}, state, initialState)
	case SET_MEMBER_INFO_STATE:
		return Object.assign({}, state, action.payload)
	default:
		return Object.assign({}, state)
	}
}

export default memberInfoReducer