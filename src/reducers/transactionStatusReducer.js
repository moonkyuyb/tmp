/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import { pad } from "../utils/common/calculator";
import { checkParams } from "../utils/common";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";
import { SHOW_ALERT_MESSAGE } from "./commonReducer";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";


/* CONSTANTS & STRING */
const CHECK_PARAM_FAIL = '다시 시도해주세요(입력 정보 부족). 지속적으로 문제가 발생할 경우 고객센터로 문의바랍니다.'
const SUCCESS_BUT_INVALID = '다시 시도해주세요(삭제된 데이터 혹은 중복 데이터). 지속적으로 문제가 발생할 경우 고객센터로 문의 바랍니다.'

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_TRANSACTION_STATE		= 'transaction/INIT_TRANSACTION_STATE'
export const SET_TRANSACTION_STATE		= 'transaction/SET_TRANSACTION_STATE'
export const CLEAR_TRANSACTION_STATE	= 'transaction/CLEAR_TRANSACTION_STATE'
export const TRANS_INIT_ACTION			= "transaction/TRANS_INIT_ACTION";
export const GET_CHATTING_LIST			= "transaction/GET_CHATTING_LIST";
export const ALL_TRANS_ACTIONS	= [ INIT_TRANSACTION_STATE, SET_TRANSACTION_STATE, CLEAR_TRANSACTION_STATE, TRANS_INIT_ACTION, GET_CHATTING_LIST ]

export const initTransactionState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_TRANSACTION_STATE, payload:payload})})
}
export const setTransactionState = (payload) => {
	return(dispatch=>{dispatch({type:SET_TRANSACTION_STATE, payload:payload})})
}
export const clearTransactionState = () => {
	return(dispatch=>{dispatch({type:CLEAR_TRANSACTION_STATE})})
}

export const getContractList = (payload) => {
	return(dispatch=>{
		console.log(`💁‍♀️getContractList`); console.log(payload);
		if(!checkParams(payload, ['m_id'])){
			dispatch({ type: SHOW_ALERT_MESSAGE, payload: CHECK_PARAM_FAIL})
			return;
		}

		const {m_id} = payload
		const url = `${API_URL}/member/myPage/contract/${m_id}`;
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
			// console.log(`💬getContractList RESULT`); console.log(result);
			if(result){
				const newPayload = { contractList: result.results }
				dispatch({type:SET_TRANSACTION_STATE, payload: newPayload})
			}else{
				dispatch({type:SHOW_ALERT_MESSAGE, payload: SUCCESS_BUT_INVALID})
			}
		}).catch(err=>{
			console.log(`💬getContractList ERROR:`, err);
			dispatch({type:SHOW_ALERT_MESSAGE, payload: err.message.toString()})
		})
	})
}

export const getChatrooms = (payload) => {
	return(async dispatch=>{
		// console.log(`💬💬GETCHATROOMS PAYLOAD: `, payload);

		const {s_id, m_id_from} = payload

		await firestore().collection('chatrooms')
		.where('users', 'array-contains', m_id_from.toString())//String
		.where('s_id','==',s_id.toString())//String
		.get()
		.then(async result=>{
			const newChatrooms = []
			result.forEach(async item=>{
				const newChatroom = Object.assign({},item.data())
				const chatroom = item.id
				newChatroom['chatroom'] = chatroom
				newChatroom['users'] = item.data().users
				newChatroom['text'] = '전자계약 진행중입니다.'
				newChatroom['createdAt'] = moment().format('YYYY-MM-DD HH:mm:ss')
				newChatrooms.push(newChatroom)
			})
			const newPayload = { chatrooms: newChatrooms }
			dispatch({type:SET_TRANSACTION_STATE, payload: newPayload })
		})
		.catch(err=>{
			console.log(`💬💬GETCHATROOMS ERR: `, err);
		})

	})
}

const initialState = {
	contractList:[],
	chatrooms:[]
}

const TransactionStatusReducer = (state= initialState, action)  =>{
	switch(action.type) {
		case INIT_TRANSACTION_STATE:
		return Object.assign({}, initialState, action.payload)

		case CLEAR_TRANSACTION_STATE:
		return Object.assign({}, state, initialState)

		case SET_TRANSACTION_STATE:
		return Object.assign({}, state, action.payload)

		case TRANS_INIT_ACTION:
			return Object.assign({}, state, {contractList:action.payload.results})
		case GET_CHATTING_LIST:
			return Object.assign({}, state, {chatrooms:action.payload.results})
		default:
			return Object.assign({}, state, {})
	}
}


export default TransactionStatusReducer



