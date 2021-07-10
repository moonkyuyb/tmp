/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { handleError, setCentralState } from "./centralReducer";
import { checkParams } from "../utils/common";

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_SAMPLE_STATE = 'sample/INIT_SAMPLE_STATE'
export const SET_SAMPLE_STATE = 'sample/SET_SAMPLE_STATE'
export const CLEAR_SAMPLE_STATE = 'sample/CLEAR_SAMPLE_STATE'
export const ALL_SAMPLE_ACTIONS = [ INIT_SAMPLE_STATE, SET_SAMPLE_STATE, CLEAR_SAMPLE_STATE ]

export const initSampleState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_SAMPLE_STATE, payload:payload})})
}
export const setSampleState = (payload) => {
	return(dispatch=>{dispatch({type:SET_SAMPLE_STATE, payload:payload})})
}
export const clearSampleState = () => {
	return(dispatch=>{dispatch({type:CLEAR_SAMPLE_STATE})})
}
export const getSample = (payload)=>{return(async(dispatch, getState) => {
	console.log(`💬[sampleReducer.getSample] payload: `, payload) //필요하지 않을 경우 주석처리
	dispatch(setCentralState({loading: true}))

	//QUERY, PARAMS, JSON BODY & VALIDATE
	if(!checkParams(payload, ['spl_id']))
		return dispatch(handleError({error: new Error('Parameter is Required')}))
	const {spl_id} = payload
	const url = `${API_URL}/sample/${spl_id}`

	//CALL RESPONSE
	const response = await axios.get(url).catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'memberReducer'}))
		}else if(error.response.status==404){
			return dispatch(handleError({error: error, from:'memberReducer', alertMsg:'찾을 수 없는 샘플입니다'}))
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'memberReducer'}))
		}
	})
	if(!response || !response.data) return;

	//MAKE PAYLOAD
	const newSample = response.data.results
	const newPayload = { sample: newSample }
	dispatch({type:SET_SAMPLE_STATE, payload: newPayload})
	dispatch(setCentralState({loading: false}))
})}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {

	sample:null,

}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const sampleReducer = (state=initialState, action)=>{
	switch(action.type){
	case INIT_SAMPLE_STATE:
		return Object.assign({}, initialState, action.payload)
	case CLEAR_SAMPLE_STATE:
		return Object.assign({}, state, initialState)
	case SET_SAMPLE_STATE:
		return Object.assign({}, state, action.payload)
	default:
		return Object.assign({}, state)
	}
}

export default sampleReducer