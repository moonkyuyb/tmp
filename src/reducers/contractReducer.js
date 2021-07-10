/* ENVIRONMENTS */
import { API_URL, MODU_API_KEY } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import { checkParams } from "../utils/common";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";
import { SHOW_ALERT_MESSAGE } from "./commonReducer";

/* CONSTANTS & STRING */
const CHECK_PARAM_FAIL = '다시 시도해주세요(입력 정보 부족). 지속적으로 문제가 발생할 경우 고객센터로 문의바랍니다.'
const SUCCESS_BUT_INVALID = '다시 시도해주세요(삭제된 데이터 혹은 중복 데이터). 지속적으로 문제가 발생할 경우 고객센터로 문의 바랍니다.'

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_CONTRACT_STATE	= 'contract/INIT_CONTRACT_STATE'
export const SET_CONTRACT_STATE		= 'contract/SET_CONTRACT_STATE'
export const CLEAR_CONTRACT_STATE	= 'contract/CLEAR_CONTRACT_STATE'
export const ALL_CONTRACT_ACTIONS	= [ INIT_CONTRACT_STATE, SET_CONTRACT_STATE, CLEAR_CONTRACT_STATE ]

export const initContractState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_CONTRACT_STATE, payload:payload})})
}
export const setContractState = (payload) => {
	return(dispatch=>{dispatch({type:SET_CONTRACT_STATE, payload:payload})})
}
export const clearContractState = () => {
	return(dispatch=>{dispatch({type:CLEAR_CONTRACT_STATE})})
}
export const getContract = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️getContract`); console.log(payload);
		const {c_id, s_id, m_id_lessor, m_id_tenants} = payload
		const url = c_id ? `${API_URL}/contract?c_id=${c_id}` : `${API_URL}/contract?s_id=${s_id}&m_id_lessor=${m_id_lessor}&m_id_tenants=${m_id_tenants}`
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
			console.log(`💬getContract RESULT`); console.log(result);
			const newPayload = { contract : result.results }
			dispatch({type:SET_CONTRACT_STATE, payload: newPayload})
		}).catch(err=>{
			console.log(`💬getContract ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const postContract = (payload) => {
	return(dispatch=>{
		// console.log(`💁‍♀️postContract`); console.log(payload);

		const url = `${API_URL}/contract/`
		const body = JSON.stringify(payload)
		const options = {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: body
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok && result.msg == 'success') resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			console.log(`💬postContract RESULT`); console.log(result);
			if(!_.isEmpty(result.results)){
				const newPayload = { contractPosted:true, c_id: result?.results?.c_id }
				dispatch({type:SET_CONTRACT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬postContract ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const getModuURL = (payload) => {
	return(dispatch=>{
		// console.log(`💁‍♀️getContractModu`); console.log(payload);
		if(!checkParams(payload, ['c_modu_id'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {c_modu_id} = payload
		const url = `https://api.modusign.co.kr/documents/${c_modu_id}`;
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Api-Key': MODU_API_KEY}
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
			// console.log(`💬getContractModu RESULT`); console.log(result);
			if(result){
				const newPayload = { moduURL: result?.file?.downloadUrl }
				dispatch({type:SET_CONTRACT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getContractModu ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const getContractModu = (payload) => {
	return(dispatch=>{
		// console.log(`💁‍♀️getContractModu`); console.log(payload);
		if(!checkParams(payload, ['c_modu_id'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {c_modu_id} = payload
		const url = `https://api.modusign.co.kr/documents/${c_modu_id}`;
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Api-Key': MODU_API_KEY}
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
			// console.log(`💬getContractModu RESULT`); console.log(result);
			if(result){
				const newPayload = { contractModu: result }
				dispatch({type:SET_CONTRACT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getContractModu ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const getLessorForContract = (payload) => {
	return(dispatch=>{
		// console.log(`💁‍♀️getLessorForContract`); console.log(payload);
		if(!checkParams(payload, ['m_id_lessor'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {m_id_lessor} = payload
		const url = `${API_URL}/member/${m_id_lessor}`
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok && result.msg == 'success') resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			// console.log(`💬getLessorForContract RESULT`); console.log(result);
			if(result.results && result.results.length == 1){
				const newPayload = { lessorForContract: result.results[0] }
				dispatch({type:SET_CONTRACT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getLessorForContract ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const getTenantsForContract = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️getTenantsForContract`); console.log(payload);
		if(!checkParams(payload, ['m_id_tenants'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {m_id_tenants} = payload
		const url = `${API_URL}/member/${m_id_tenants}`
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok && result.msg == 'success') resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			console.log(`💬getTenantsForContract RESULT`); console.log(result);
			if(result.results && result.results.length == 1){
				const newPayload = { tenantsForContract: result.results[0] }
				dispatch({type:SET_CONTRACT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getTenantsForContract ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const getSalesForContract = (payload) => {
	return(dispatch=>{
		// console.log(`💁‍♀️getSalesForContract`);
		if(!checkParams(payload, ['s_id'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {s_id} = payload
		const url = `${API_URL}/sales/${s_id}`
		const options = {
			method: 'GET',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok && result.msg == 'success') resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			// console.log(`💬getSalesForContract RESULT`); console.log(result);
			if(result.results && result.results.length == 1){
				const newPayload = { salesForContract: result.results[0] }
				dispatch({type:SET_CONTRACT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getSalesForContract ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const handleContractJoint = (payload) => {
	// console.log(`⏬handleContractJoint payload`)
	// console.log(payload);
	const data = payload.data
	const activatedLessor = payload.activatedLessor

	//자체 VALIDATION, DATA 가공
	var validated = true, newContractJoint = [], errMessage = ''
	for (let i = 0; i < activatedLessor.length; i++) {
		const idx = activatedLessor[i];
			 if(!data.contractJoint[idx].cj_name)			errMessage = '이름을 입력해주세요'
		else if(!data.contractJoint[idx].cj_address)		errMessage = '주소를 입력해주세요'
		else if(!data.contractJoint[idx].cj_address_detail)	errMessage = '주소를 입력해주세요'
		else if(!data.contractJoint[idx].cj_phone)			errMessage = '전화번호를 입력해주세요'
		
		if(errMessage) { validated = false; break; }
		else newContractJoint.push(data.contractJoint[idx])
	}

	if(!validated) return(dispatch=>{dispatch({type:SHOW_ALERT_MESSAGE,payload:errMessage})})

	const newPayload = Object.assign({},data) //첫 번째 명의자를 계약서에 등록
	newPayload['c_name_lessor'] = newContractJoint[0]['cj_name']
	newPayload['c_phone_lessor'] = newContractJoint[0]['cj_phone']
	newPayload['c_address_lessor'] = newContractJoint[0]['cj_address']
	newPayload['c_address_detail_lessor'] = newContractJoint[0]['cj_address_detail']

	newContractJoint.splice(0,1) //첫 번째 명의자를 공동명의에서 제거
	newPayload['contractJoint'] = newContractJoint
	newPayload['contractJointSaved'] = true

	// console.log(`⏬NEW PAYMENT handleContractJoint`);
	// console.log(newPayload);
	return(dispatch=>{dispatch({type:SET_CONTRACT_STATE,payload:newPayload})})
}
export const handleContractJointUpdate = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️handleContractJointUpdate`);
		const {c_id, data, activatedTenants} = payload

		//자체 VALIDATION, DATA 가공
		var validated = true, newContractJoint = [], errMessage = ''
		for (let i = 0; i < activatedTenants.length; i++) {
			const idx = activatedTenants[i];
				if(!data.contractJoint[idx].cj_name)			errMessage = '이름을 입력해주세요'
			else if(!data.contractJoint[idx].cj_address)		errMessage = '주소를 입력해주세요'
			else if(!data.contractJoint[idx].cj_address_detail)	errMessage = '주소를 입력해주세요'
			else if(!data.contractJoint[idx].cj_phone)			errMessage = '전화번호를 입력해주세요'
			else if(!data.contractJoint[idx].cj_identified_num)	errMessage = '주민등록번호 혹은 사업자번호를 입력해주세요'
			
			if(errMessage) { validated = false; break; }
			else newContractJoint.push(data.contractJoint[idx])
		}

		if(!validated) return(dispatch=>{dispatch({type:SHOW_ALERT_MESSAGE,payload:errMessage})})

		const updatePayload = Object.assign({},data) //첫 번째 명의자를 계약서에 등록
		updatePayload['c_name_tenant'] = newContractJoint[0]['cj_name']
		updatePayload['c_phone_tenant'] = newContractJoint[0]['cj_phone']
		updatePayload['c_identified_num_tenant'] = newContractJoint[0]['cj_identified_num']
		updatePayload['c_address_tenant'] = newContractJoint[0]['cj_address']
		updatePayload['c_address_detail_tenant'] = newContractJoint[0]['cj_address_detail']
	
		newContractJoint.splice(0,1) //첫 번째 명의자를 공동명의에서 제거
		updatePayload['contractJoint'] = newContractJoint
		updatePayload['contractJointSaved'] = true
		updatePayload['c_id'] = c_id
		console.log(`⏬NEW PAYMENT handleContractJoint(UPDATE)`); console.log(updatePayload);

		const body = JSON.stringify(updatePayload)
		const url = `${API_URL}/contract/update/${c_id}`
		const options = {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: body
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					console.log(`💬handleContractJointUpdate responce`, response);
					response.json().then((result)=>{
						if(response.ok) resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			console.log(`💬handleContractJointUpdate RESULT`); console.log(result);
			if(result.results){
				const newPayload = {contractUpdated:true, c_id: result.results.c_id} 
				dispatch({type:SET_CONTRACT_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬handleContractJointUpdate ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}
export const handleContractAgreement = (payload) => {
	console.log(`⏬handleContractAgreement payload`);
	console.log(payload);
	const data = payload.data

	const newPayload = Object.assign({}, data)
	if(data.c_service_agreement1) newPayload['contractAgreementSaved'] = true

	console.log(`⏬NEWPAYLOAD handleContractAgreement`);
	console.log(newPayload);
	return(dispatch=>{dispatch({type:SET_CONTRACT_STATE,payload:newPayload})})
}
export const handleContractPayment = (payload) => {
	const newPayload = Object.assign({}, payload)
	newPayload['contractSaved'] = true
	
	console.log(`⏬NEW PAYLOAD FOR CONTRACT`);
	console.log(newPayload);

	return(dispatch=>{dispatch({type:SET_CONTRACT_STATE,payload:newPayload})})
}
export const postModu = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️postModu`); console.log(payload);

		const {c_id} = payload
		const url = `${API_URL}/modu/${c_id}`
		const body = JSON.stringify(payload)
		const options = {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: body
		}

		const fetchAction = (payload) => {
			const promisedFetch = new Promise((resolve, reject)=>{
				fetch(url, options).then(response=>{
					response.json().then((result)=>{
						if(response.ok && result.msg == 'success') resolve(result)
						else reject(new Error(result.msg))
					}).catch(err=>{reject(err)})
				}).catch(err=>{reject(err)})
			})
			return fetchWithTimeout(promisedFetch, 5000)
		}

		fetchAction(payload).then(result=>{
			console.log(`💬postModu RESULT`); console.log(result);
			if(!_.isEmpty(result.results)){
				const newPayload = result.results
				fetch(`${API_URL}/contract/update/${c_id}`,{
					method:'POST',
					headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
					body: JSON.stringify(newPayload)
				}).then(()=>{console.log("OK");}).catch(()=>{console.log("FAIL");})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬postModu ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})

}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	c_id: '',
	s_id: '',
	m_id_from: '',
	m_id_to: '',
	m_id_lessor: '',
	m_id_tenants: '',

	moduURL: '',

	// c_id: '',
	// s_id: '',
	// m_id_lessor: '',
	// m_id_tenants: '',
	c_zonecode_lessor: '',
	c_address_lessor: '',
	c_address_detail_lessor: '',
	c_zonecode_tenant: '',
	c_address_tenant: '',
	c_address_detail_tenant: '',
	c_contract_state: '',
	c_identified_num_lessor: '',
	c_identified_num_tenant: '',
	c_rental_business_number: '',
	c_rental_business_tel: '',
	c_trading_price: '',
	c_mortgage: '',
	c_mortgage_bank: '',
	c_deposit: '',
	c_monthly: '',
	c_downpayment: '',
	c_middlepayment: '',
	c_middlepayment2: '',
	c_balance: '',
	c_downpayment_datetime: '',
	c_middlepayment_datetime: '',
	c_middlepayment2_datetime: '',
	c_balance_datetime: '',
	c_additional_special_contract: '',
	c_account_bank: '',
	c_account_name: '',
	c_account_number: '',
	c_service_agreement1: '',
	c_service_agreement2: '',
	c_service_agreement3: '',
	c_service_agreement4: '',
	c_building_address: '',

	c_rentpart: '',
	c_monthly_payday: '',
	c_monthly_payday_type: '',

	reg_date: '',
	mod_date: '',
	status: '',

	contract: {},
	contractSaved: false,
	contractPosted: false,
	contractUpdated: false, 

	contractJoint: [],
	contractJointSaved: false,

	contractStyle:'',
	contractAgreementSaved:false,

	contractModu: {},
	lessorForContract: {},
	tenantsForContract: {},
	salesForContract: {},
}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const contractReducer = (state=initialState, action)=>{
	switch(action.type){
		case INIT_CONTRACT_STATE:
		return Object.assign({}, initialState, action.payload)

		case CLEAR_CONTRACT_STATE:
		return Object.assign({}, state, initialState)

		case SET_CONTRACT_STATE:
		return Object.assign({}, state, action.payload)

		default:
		return Object.assign({}, state)
	}
}

export default contractReducer
