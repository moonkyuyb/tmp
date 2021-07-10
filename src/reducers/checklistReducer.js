/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import moment from "moment";
import { checkParams } from "../utils/common";
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';
import { SHOW_ALERT_MESSAGE } from "./commonReducer"

/* CONSTANTS & STRING */
const CHECK_PARAM_FAIL = '다시 시도해주세요(입력 정보 부족). 지속적으로 문제가 발생할 경우 고객센터로 문의바랍니다.'
const SUCCESS_BUT_INVALID = '다시 시도해주세요(삭제된 데이터 혹은 중복 데이터). 지속적으로 문제가 발생할 경우 고객센터로 문의 바랍니다.'

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_CHECKLIST_STATE	= "checklist/INIT_CHECKLIST_STATE"
export const SET_CHECKLIST_STATE	= "checklist/SET_CHECKLIST_STATE"
export const CLEAR_CHECKLIST_STATE	= "checklist/CLEAR_CHECKLIST_STATE"
export const ALL_CHECKLIST_ACTIONS	= [ INIT_CHECKLIST_STATE, SET_CHECKLIST_STATE, CLEAR_CHECKLIST_STATE ]

export const initChecklistState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_CHECKLIST_STATE, payload:payload})})
}
export const setChecklistState = (payload) => {
	return(dispatch=>{dispatch({type:SET_CHECKLIST_STATE, payload:payload})})
}
export const clearChecklistState = () => {
	return(dispatch=>{dispatch({type:CLEAR_CHECKLIST_STATE})})
}
export const getChecklist = (payload) => {
	return(dispatch=>{
		// console.log(`💁‍♀️getChecklist`); console.log(payload);
		if(!checkParams(payload, ['s_id','m_id_from','m_id_to'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {s_id, m_id_from, m_id_to} = payload
		const url = `${API_URL}/checklist?s_id=${payload.s_id}&m_id_from=${payload.m_id_from}&m_id_to=${payload.m_id_to}`;
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		}
		// console.log(`💬getChecklist URL, OPTIONS`); console.log(url); console.log(options);

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok && result.msg == 'success') resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err.e)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			// console.log(`💬getChecklist RESULT`); console.log(result);
			if(result.results && result.results.length > 0){
				const newPayload = { checklist : result.results }
				dispatch({type:SET_CHECKLIST_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getChecklist ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const checkChecklist = (payload) => {
	return(dispatch=>{
		// console.log(`💁‍♀️checkChecklist`); console.log(payload);
		if(!checkParams(payload, ['s_id','m_id_from','m_id_to'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {s_id, m_id_from, m_id_to} = payload
		const url = `${API_URL}/checklist/check?s_id=${payload.s_id}&m_id_from=${payload.m_id_from}&m_id_to=${payload.m_id_to}`;
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		}
		// console.log(`💬checkChecklist URL, OPTIONS`); console.log(url); console.log(options);

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok && result.msg == 'success') resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err.e)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			// console.log(`💬checkChecklist RESULT`); console.log(result);
			if(result.results && result.results.length > 0){
				const newPayload = {hasChecklist: true}
				dispatch({type:SET_CHECKLIST_STATE, payload: newPayload})
			}else{
				const newPayload = {hasChecklist: false}
				dispatch({type:SET_CHECKLIST_STATE, payload: newPayload})
			}
		}).catch(err=>{
			console.log(`💬checkChecklist ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const postChecklist = (payload) => {
	return(dispatch=>{
		// console.log(`💁‍♀️postChecklist`); console.log(payload);
		if(!checkParams(payload, ['s_id', 'm_id_from', 'm_id_to', 'data', 'checklist'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {s_id, m_id_from, m_id_to, data, checklist} = payload
		const content = data.content
		const checkedlist = []

		for (let i = 0; i < checklist.length; i++) {
			const item = checklist[i];
			// console.log(`💬TRUE인 code만 payload에 등록: ${i}번째 checkedlist의 값 = ${data['checkedlist'][i]} / code= ${item['code']}`);
			if(data.checkedlist[i]) checkedlist.push(item.code)
		}
		const body = { 's_id': s_id, 'm_id_from': m_id_from, 'm_id_to': m_id_to, 'checkedlist': checkedlist, 'content': content }
		const url = `${API_URL}/checklist`
		const options = {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}
		console.log(`💬postChecklist URL, OPTIONS`); console.log(url); console.log(options);

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok && result.msg == 'success') resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err.e)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			// console.log(`💬postChecklist RESULT`); console.log(result);
			if(result.results){
				const newPayload = { checklistCompleted : true }
				dispatch({type:SET_CHECKLIST_STATE, payload:newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload:SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬postChecklist ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	s_id: 0,
	m_id_from: 0,
	m_id_to: 0,

	checklist: [],
	hasChecklist: false,

	checklistCompleted: false,
}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const checklistReducer = (state=initialState, action)=>{
	switch(action.type){
		case INIT_CHECKLIST_STATE:
		return Object.assign({}, initialState, action.payload)

		case SET_CHECKLIST_STATE:
		return Object.assign({}, state, action.payload)

		case CLEAR_CHECKLIST_STATE:
		return Object.assign({}, initialState)

		default:
		return Object.assign({}, state)
	}
}

export default checklistReducer