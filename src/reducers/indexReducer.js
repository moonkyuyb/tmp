/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import axios from "axios";
import { checkParams } from "../utils/common";

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_INDEX_STATE = 'index/INIT_INDEX_STATE'
export const SET_INDEX_STATE = 'index/SET_INDEX_STATE'
export const CLEAR_INDEX_STATE = 'index/CLEAR_INDEX_STATE'
export const ALL_INDEX_ACTIONS = [ INIT_INDEX_STATE, SET_INDEX_STATE, CLEAR_INDEX_STATE ]

export const initIndexState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_INDEX_STATE, payload:payload})})
}
export const setIndexState = (payload) => {
	return(dispatch=>{dispatch({type:SET_INDEX_STATE, payload:payload})})
}
export const clearIndexState = () => {
	return(dispatch=>{dispatch({type:CLEAR_INDEX_STATE})})
}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {

}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const indexReducer = (state=initialState, action)=>{
	switch(action.type){
	case INIT_INDEX_STATE:
		return Object.assign({}, initialState, action.payload)
	case SET_INDEX_STATE:
		return Object.assign({}, state, action.payload)
	case CLEAR_INDEX_STATE:
		return Object.assign({}, initialState)
	default:
		return Object.assign({}, state)
	}
}

export default indexReducer