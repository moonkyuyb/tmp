/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { handleError, setCentralState } from "./centralReducer";
import { checkParams, encryptWithSHA256 } from "../utils/common";

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_MEMBER_STATE = 'member/INIT_MEMBER_STATE'
export const SET_MEMBER_STATE = 'member/SET_MEMBER_STATE'
export const CLEAR_MEMBER_STATE = 'member/CLEAR_MEMBER_STATE'
export const ALL_MEMBER_ACTIONS = [ INIT_MEMBER_STATE, SET_MEMBER_STATE, CLEAR_MEMBER_STATE ]

export const initMemberState = (payload) => {
	return(dispatch=>{dispatch({type: INIT_MEMBER_STATE, payload: payload})})
}
export const setMemberState = (payload) => {
	return(dispatch=>{dispatch({type: SET_MEMBER_STATE, payload: payload})})
}
export const clearMemberState = () => {
	return(dispatch=>{dispatch({type: CLEAR_MEMBER_STATE})})
}

export const getMember = (payload) => { return( async (dispatch, getState) => {

	// console.log(`💬[memberReducer.getMember] payload: `, payload)
	
	//QUERY, PARAMS, JSON BODY & VALIDATE
	if(!checkParams(payload, ['m_id']))
		return dispatch(handleError({error: new Error('Parameter is Required')}))
	const { m_id } = payload
	const url = `${API_URL}/member/${m_id}`

	//CALL RESPONSE
	const response = await axios.get(url).catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'memberReducer'}))
		}else if(error.response.status==404){
			return dispatch(handleError({error: error, from:'memberReducer'}))
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'memberReducer'}))
		}
	})
	if(!response || !response.data) return;

	//MAKE PAYLOAD
	const newMember = response.data.results
	const newPayload = { member: newMember }
	return dispatch({type:SET_MEMBER_STATE, payload: newPayload})
})}

export const signupMail = (payload) => { return( async (dispatch, getState) => {

	console.log(`💬[memberReducer.signupMail] payload: `, payload)
	dispatch(setCentralState({loading: true}))

	//QUERY, PARAMS, JSON BODY & VALIDATE
	if(!checkParams(payload, ['m_auth_provider', 'm_name', 'm_username', 'm_password', 'm_password_re', 'm_term_service', 'm_term_privacy']))
		return dispatch(handleError({error: new Error('Parameter is Required')}))
	const {m_auth_provider, m_name, m_username, m_password, m_password_re, m_term_service, m_term_privacy, m_term_commercial} = payload
	const url = `${API_URL}/member/signup/mail`
	const body = {
		m_name: m_name,
		m_username: m_username,
		m_password: encryptWithSHA256(m_password),
		m_auth_provider: m_auth_provider,
		m_term_service: m_term_service,
		m_term_privacy: m_term_privacy,
		m_term_commercial: m_term_commercial,
	}

	//CALL RESPONSE
	const response = await axios.post(url, body).catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'memberReducer'}))
		}else if(error.response.status==422){
			return dispatch(handleError({error: error, from:'memberReducer', alertMsg:'이미 등록된 아이디(이메일주소)입니다'}))
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'memberReducer'}))
		}
	})
	if(!response || !response.data) return;

	//CALL RESPONSE (2)
	const m_id = response.data.results.m_id
	const url_ = `${API_URL}/member/${m_id}`
	const response_ = await axios.get(url_).catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'memberReducer'}))
		}else if(error.response.status==404){
			return dispatch(handleError({error: error, from:'memberReducer', alertMsg:'이미 등록된 아이디(이메일주소)입니다'}))
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'memberReducer'}))
		}
	})
	if(!response_) return;

	//MAKE PAYLOAD
	const signedName = response_.data.results.m_name
	const signedUsername = response_.data.results.m_username
	const signedDatetime = moment(response_.data.results.reg_date).format('YYYY. MM. DD')

	const newPayload = { signedName: signedName, signedUsername: signedUsername, signedDatetime: signedDatetime }
	dispatch(setCentralState({navigateTo:'signupSuccess', loading: false}))
	return dispatch({type:SET_MEMBER_STATE, payload: newPayload})

})}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {

	m_id: null,
	m_auth_provider: null,
	m_identification: null,
	m_password: null,
	m_username: null,
	m_name: null,
	m_mail: null,
	m_phone: null,
	m_regist_gubn: null,
	m_regist_etc: null,
	m_term_service: null,
	m_term_privacy: null,
	m_term_commercial: null,
	m_appr_yn: null,
	m_marketing_yn: null,
	last_connect_date: null,

	member: null,
	signedName: null,
	signedUsername: null,
	signedDatetime: null,

}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const memberReducer = (state=initialState, action)=>{
	switch(action.type){
	case INIT_MEMBER_STATE:
		return Object.assign({}, initialState, action.payload)
	case SET_MEMBER_STATE:
		return Object.assign({}, state, action.payload)
	case CLEAR_MEMBER_STATE:
		return Object.assign({}, initialState)
	default:
		return Object.assign({}, state)
	}
}

export default memberReducer