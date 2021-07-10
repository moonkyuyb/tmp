/* ENVIRONMENTS */
import { ADMIN_URL, API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import axios from "axios";
import firestore from "@react-native-firebase/firestore";
import { handleError, setCentralState, initCentralState } from "./centralReducer";
import { checkParams, numberWithCommas } from "../utils/common";
import { getPriceTag } from "../utils/common/calculator";

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_CHAT_STATE = 'chat/INIT_CHAT_STATE'
export const SET_CHAT_STATE = 'chat/SET_CHAT_STATE'
export const CLEAR_CHAT_STATE = 'chat/CLEAR_CHAT_STATE'
export const ALL_CHAT_ACTIONS = [ INIT_CHAT_STATE, SET_CHAT_STATE, CLEAR_CHAT_STATE ]

export const initChatState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_CHAT_STATE, payload:payload})})
}
export const setChatState = (payload) => {
	return(dispatch=>{dispatch({type:SET_CHAT_STATE, payload:payload})})
}
export const clearChatState = () => {
	return(dispatch=>{dispatch({type:CLEAR_CHAT_STATE})})
}

export const getChatrooms = (payload)=>{return(async(dispatch, getState) => {

	dispatch(setCentralState({loading: true}))

	//QUERY, PARAMS, JSON BODY & VALIDATE
	const member = getState().memberReducer.member
	// console.log(`💁‍♀️member`, member);
	if(!member)
		return dispatch(handleError({error: new Error('Forbidden'), from:'chatReducer'}))

	//CALL RESPONSE
	await firestore().collection('chatrooms')
	.where('users', 'array-contains', member.m_id+'')
	.get()
	.then(async result=>{
		await new Promise((resolve, reject)=>{
			const chatrooms = []
			result.forEach(async item=>{
				const chatroom = item.data()
				chatroom['id'] = item.id
				chatrooms.push(chatroom)
			})
			resolve(chatrooms)
		}).then(async chatrooms=>{
			const newChatrooms = []
			console.log(`💁‍♀️chatrooms`, chatrooms);
			for (const chatroom of chatrooms) {

				//CALL RESPONSE
				const response = await axios.get(`${API_URL}/sales/${chatroom.s_id}`).catch(error=>{
					console.log(`💬[chatReducer.getChatrooms] SKIP ERROR 404`, error);
				})
				if(!response) continue;

				const newChatroom = Object.assign({},chatroom)
				const newSale = Object.assign({},response.data.results)
				const price = getPriceTag(newSale)
				newSale['price'] = price

				if(newSale.building_type && newSale.s_floor && newSale.s_use_area_m)
					newSale['infoTit01'] = `${newSale.building_type} / ${newSale.s_floor}층 / ${newSale.s_use_area_m}m²`
				if(newSale.location1 && newSale.location2 && newSale.location3)
					newSale['infoTit02'] = `${newSale.location1} ${newSale.location2} ${newSale.location3}`
				if(newSale.sf_thumb_nm)
					newSale['thumbURI'] = `${ADMIN_URL}${newSale.sf_thumb_nm}`

				if(!_.isEmpty(response.data.results)){
					newChatroom['sale'] = newSale
					newChatrooms.push(newChatroom)
				}

			}
			// console.log(`💬[chatReducer.getChatrooms]newChatrooms: `, newChatrooms);
			const newPayload = { chatrooms: newChatrooms }
			dispatch({type:SET_CHAT_STATE, payload: newPayload})
			dispatch(setCentralState({loading: false}))
		})
	})
	.catch(error=>{
		dispatch(handleError({error:error, from: 'chatReducer'}))
	})
	
})}

export const getMessages = (payload)=>{return(async(dispatch, getState) => {

	// console.log(`💬[chatReducer.getMessages] payload: `, payload)
	dispatch(setCentralState({loading: true}))

	//QUERY, PARAMS, JSON BODY & VALIDATE
	if(!checkParams(payload, ['chatroom']))
		return dispatch(handleError({error: new Error('Parameter is Required'), from: 'chatReducer'}))
	const {chatroom} = payload

	//CALL RESPONSE & MAKE PAYLOAD
	const newPayload = {}
	await firestore().collection('messages')
	.where('chatroom','==',chatroom.id)
	.orderBy('createdAt','desc')
	.onSnapshot(snapshot=>{
		const messages = []
		snapshot.forEach(item=>{
			const data = item.data()
			messages.push({
				_id:item.id,
				chatroom: data.chatroom,
				text: data.text,
				createdAt: data.createdAt.toDate(),
				user: {
					_id: data.user._id.toString(),
				}
			})
		})
		newPayload['messages'] = messages
		newPayload['chatroom'] = chatroom
		// console.log(`💬[chatReducer.getMessages] newPayload: `, newPayload)
		dispatch({type:SET_CHAT_STATE, payload: newPayload })
		dispatch(setCentralState({loading: false}))
	})

})}

export const getPartner = (payload)=>{return(async(dispatch, getState) => {

	// console.log(`💬[chatReducer.getPartner] payload: `, payload)
	//QUERY, PARAMS, JSON BODY & VALIDATE

	const { users } = payload.chatroom
	const { member } = getState().memberReducer
	if(!member)
		return dispatch(handleError({error: new Error('Forbidden'), from:'chatReducer'}))
	// console.log(`💬[chatReducer.postMessage] member: `, member)

	// console.log(`💬users: `, users);
	const myIndex = _.findIndex(users, i=>i==member.m_id?true:false)
	const partnerID = users[users.length - myIndex - 1]
	const url = `${API_URL}/member/${partnerID}`

	const response = await axios.get(url)
	if(response.status!=200){
		console.log(`💬[chatReducer.getPartner] error: `, response.msg)
		return dispatch(setCentralState({err: response.msg, loading: false}))
	}

	const newPayload = { partner: response.data.results }
	dispatch({type:SET_CHAT_STATE, payload: newPayload})
})}

export const postMessage = (payload)=>{return(async(dispatch, getState) => {
	
	// console.log(`💬[chatReducer.postMessage] payload: `, payload)

	//QUERY, PARAMS, JSON BODY & VALIDATE
	const { text, chatroom } = payload
	const { member } = getState().memberReducer
	if(!member)
		return dispatch(setCentralState({err: 'Login is Required', loading: false}))

	//CALL RESPONSE
	const newMessage = {
		chatroom: chatroom.id,
		text: text,
		createdAt: new Date(),
		user: {
			_id: member.m_id+''
		}
	}
	// console.log(`💬[chatReducer.postMessage] newMessage: `, newMessage)
	await firestore().collection('messages').add(newMessage)

})}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {

	chatrooms: null,
	chatroom: null,
	messages: null,
	partner: null,

}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const chatReducer = (state=initialState, action)=>{
	switch(action.type){
	case INIT_CHAT_STATE:
		return Object.assign({}, initialState, action.payload)

	case SET_CHAT_STATE:
		// console.log(`💬[chatReducer.setChatState] action.payload: `, action.payload)
		return Object.assign({}, state, action.payload)

	case CLEAR_CHAT_STATE:
		return Object.assign({}, initialState)

	default:
		return Object.assign({}, state)
	}
}

export default chatReducer