/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import moment from "moment";
import { checkParams } from "../utils/common";
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';
import { SHOW_ALERT_MESSAGE } from "./commonReducer"

/* CONSTANTS & STRING */
const TYPE_STRING_KEYS = [ 'downpayment', 'middlepayment', 'middlepayment2', 'balance', 'balance2' ]
const TYPE_STRING_MAPPING = { downpayment: '계약금', middlepayment: '중도금', middlepayment2: '2차 중도금', balance: '잔금', balance2: '2차 잔금' }
const CHECK_PARAM_FAIL = '다시 시도해주세요(입력 정보 부족). 지속적으로 문제가 발생할 경우 고객센터로 문의바랍니다.'
const SUCCESS_BUT_INVALID = '다시 시도해주세요(삭제된 데이터 혹은 중복 데이터). 지속적으로 문제가 발생할 경우 고객센터로 문의 바랍니다.'

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_CONTRACT_RECEIPT_STATE	= 'contractReceipt/INIT_CONTRACT_RECEIPT_STATE'
export const SET_CONTRACT_RECEIPT_STATE		= 'contractReceipt/SET_CONTRACT_RECEIPT_STATE'
export const CLEAR_CONTRACT_RECEIPT_STATE	= 'contractReceipt/CLEAR_CONTRACT_RECEIPT_STATE'
export const ALL_CONTRACT_RECEIPT_ACTIONS	= [ INIT_CONTRACT_RECEIPT_STATE, SET_CONTRACT_RECEIPT_STATE, CLEAR_CONTRACT_RECEIPT_STATE ]

export const initContractReceiptState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_CONTRACT_RECEIPT_STATE, payload:payload})})
}
export const setContractReceiptState = (payload) => {
	return(dispatch=>{dispatch({type:SET_CONTRACT_RECEIPT_STATE, payload:payload})})
}
export const clearContractReceiptState = () => {
	return(dispatch=>{dispatch({type:CLEAR_CONTRACT_RECEIPT_STATE})})
}
export const getContractReceipt = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️getContractReceipt`); console.log(payload);
		
		const {cr_id, cr_type, c_id} = payload
		if(cr_id) {
			var url = `${API_URL}/contract/receipt/?cr_id=${cr_id}`
		}else if(cr_type && c_id){
			var url = `${API_URL}/contract/receipt/?cr_type=${cr_type}&c_id=${c_id}`
		}else{
			return(dispatch=>{ dispatch({type:SHOW_ALERT_MESSAGE,payload:CHECK_PARAM_FAIL}) })
		}
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok) resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			console.log(`💬getContractReceipt RESULT`); console.log(result);
			if(result){
				const newPayload = { contractReceipt: result.results }
				dispatch({type:SET_CONTRACT_RECEIPT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getContractReceipt ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const getContractReceiptList = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️getContractReceiptList`); console.log(payload);
		if(!checkParams(payload, ['c_id'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {c_id} = payload
		const url = `${API_URL}/contract/receipt/list/${c_id}`
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok) resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			console.log(`💬getContractReceiptList RESULT`); console.log(result);
			if(result.msg == 'success'){
				const newPayload = { contractReceiptList: result.results }
				dispatch({type:SET_CONTRACT_RECEIPT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getContractReceiptList ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const updateContractReceipt = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️updateContractReceipt`); console.log(payload);

		const url = `${API_URL}/contract/receipt/update/${payload.cr_id}`
		const options = {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok) resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			console.log(`💬updateContractReceipt RESULT`); console.log(result);
			if(result.msg == 'success'){
				const newPayload = { contractReceiptPosted : true  }
				dispatch({type:SET_CONTRACT_RECEIPT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬updateContractReceipt ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const createContractReceipt = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️postContractReceipt`); console.log(payload);

		const {cr_type, c_id} = payload
		const url = `${API_URL}/contract/receipt/create/${c_id}/${cr_type}`
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok) resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			console.log(`💬postContractReceipt RESULT`); console.log(result);
			if(result.msg == 'success'){
				// const newPayload = { contractReceiptPosted : true  }
				dispatch({type:SHOW_ALERT_MESSAGE, payload: '발급되었습니다.'})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬postContractReceipt ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	s_id:null,
	m_id_to:null,
	m_id_from:null,
	m_id_lessor:null,
	m_id_tenants:null,

	cr_id:null,
	c_id:null,
	cr_type:null,
	cr_amount:null,
	cr_issue_date:null,
	cr_signing_date_lessor:null,
	cr_signing_date_tenants:null,

	isMine:null,
	contractReceipt: {},
	contractReceiptList: [],

	contractReceiptPosted: false,
}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const contractReceiptReducer = (state=initialState, action)=>{
	switch(action.type){
		case INIT_CONTRACT_RECEIPT_STATE:
		return Object.assign({}, initialState, action.payload)

		case SET_CONTRACT_RECEIPT_STATE:
		return Object.assign({}, state, action.payload)

		case CLEAR_CONTRACT_RECEIPT_STATE:
		return Object.assign({}, initialState)

		default:
		return Object.assign({}, state)
	}
}

export default contractReceiptReducer