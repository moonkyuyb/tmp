/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleError, setCentralState, initCentralState, clearCentralState } from "./centralReducer";
import { clearMemberState, getMember, setMemberState } from "./memberReducer";
import { clearChatState } from "./chatReducer";
import { checkParams, encryptWithSHA256 } from "../utils/common";

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_AUTH_STATE = 'auth/INIT_AUTH_STATE'
export const SET_AUTH_STATE = 'auth/SET_AUTH_STATE'
export const CLEAR_AUTH_STATE = 'auth/CLEAR_AUTH_STATE'
export const ALL_AUTH_ACTIONS = [ INIT_AUTH_STATE, SET_AUTH_STATE, CLEAR_AUTH_STATE ]

export const initAuthState = (payload) => {
	return(dispatch=>{dispatch({type: INIT_AUTH_STATE, payload: payload})})
}
export const setAuthState = (payload) => {
	return(dispatch=>{dispatch({type: SET_AUTH_STATE, payload: payload})})
}
export const clearAuthState = () => {
	return(dispatch=>{dispatch({type: CLEAR_AUTH_STATE})})
}

export const signinMail = (payload) = (payload)=>{return(async(dispatch, getState) => {
	dispatch(setCentralState({loading: true}))

	//QUERY, PARAMS, JSON BODY & VALIDATE
	if(!checkParams(payload, ['m_username', 'm_password', 'm_auth_provider']))
		return dispatch(handleError({error: new Error('Parameter is Required')}))
	const {m_username, m_password, m_auth_provider, keepSignin} = payload
	const url = `${API_URL}/auth/signin/mail`
	const body = {
		m_username: m_username,
		m_password: encryptWithSHA256(m_password),
		m_auth_provider: m_auth_provider
	}
	console.log(`💬[authReducer.signinMail] keepSignin: `, keepSignin)

	//CALL RESPONSE
	const response = await axios.post(url, body).catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'authReducer'}))
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'authReducer'}))
		}
	})
	if(!response || !response.data) return;
	// console.log(`💬[authReducer.signinMail] response.data: `, response.data)

	//MAKE PAYLOAD
	const newToken = response.data.results
	const newPayload = { token: newToken }
	AsyncStorage.multiSet([['token', newToken], ['keepSignin', keepSignin?'true':'false']])
	dispatch({type:SET_AUTH_STATE, payload: newPayload})
	return dispatch(verifyToken({token: newToken}))
})}

export const verifyToken = (payload)=>{return(async(dispatch, getState) => {
	// console.log(`💬[authReducer.verifyToken] payload: `, payload)
	dispatch(setCentralState({loading: true}))

	//QUERY, PARAMS, JSON BODY & VALIDATE
	if(!checkParams(payload, ['token']))
		return dispatch(handleError({error: new Error('Parameter is Required')}))
	const {token} = payload
	const url = `${API_URL}/auth/token`

	//CALL RESPONSE
	const response = await axios.post(url, null, {
		headers: {'Authorization': `Bearer ${token}`}
	}).catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'authReducer'}))
		}else if(error.response.status==401){ //Token Error
			return dispatch(handleError({error: error, from:'authReducer', alertMsg:`로그인 정보가 만료되었습니다\n다시 로그인해주세요`}))
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'authReducer'}))
		}
	})
	if(!response || !response.data) return;

	//MAKE PAYLOAD
	const verifiedToken = response.data.results
	dispatch(setMemberState({...verifiedToken}))
	dispatch(getMember({m_id: verifiedToken.m_id}))
	dispatch(setCentralState({loading: false, toastMsg:'로그인되었습니다'}))
	return;
})}

export const signout = ()=>{return(async(dispatch, getState) => {
	AsyncStorage.clear()
	dispatch(clearAuthState())
	dispatch(clearMemberState())
	dispatch(clearChatState())
	dispatch(clearCentralState())
})}

// 자동로그인
export const handleAuthorization = ()=>{return(async(dispatch, getState) => {
	const {member} = getState().memberReducer
	AsyncStorage.multiGet(['token','keepSignin']).then(result=>{
		const token = result[0][1]
		const keepSignin = result[1][1]
		if(token && !member && keepSignin === 'true'){
			dispatch(verifyToken({token:token}))
		}
	}).catch(error=>{
		dispatch(handleError({error: error, from:'authReducer'}))
	})
})}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {

	token: null,

}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const authReducer = (state=initialState, action)=>{
	switch(action.type){
	case INIT_AUTH_STATE:
		return Object.assign({}, initialState, action.payload)
	case SET_AUTH_STATE:
		return Object.assign({}, state, action.payload)
	case CLEAR_AUTH_STATE:
		return Object.assign({}, initialState)
	default:
		return Object.assign({}, state)
	}
}

export default authReducer
