/* COMMON */
import { connect } from 'react-redux';

/* SCREEN & COMPONETS */
import ChatScreen from "../screen/ChatScreen";
import ChatTestScreen from "../screen/ChatTestScreen";
import ChatContractScreen from "../screen/ChatContractScreen";
import ChatContractTestScreen from "../screen/ChatContractTestScreen";
import ChatlistScreen from "../screen/ChatlistScreen";

//CHAT REDUCER
import { initChatState, setChatState, clearChatState, getMessages, getChatrooms, getPartner, postMessage } from "../reducers/chatReducer";

const chatStateToProps = (state) => {
	return{
		//CHAT REDUCER
		chatrooms: state.chatReducer.chatrooms,
		chatroom: state.chatReducer.chatroom,
		messages: state.chatReducer.messages,
		partner: state.chatReducer.partner,
	}
}

const chatDispatchToProps = (dispatch) => {
	return{
		//CHAT REDUCER
		initChatState: (payload) => {dispatch(initChatState(payload))},
		setChatState: (payload) => {dispatch(setChatState(payload))},
		clearChatState: (payload) => {dispatch(clearChatState(payload))},
		getMessages: (payload) => {dispatch(getMessages(payload))},
		getChatrooms: (payload) => {dispatch(getChatrooms(payload))},
		getPartner: (payload) => {dispatch(getPartner(payload))},
		postMessage: (payload) => {dispatch(postMessage(payload))},
	}
}

export const ChatContainer = connect(chatStateToProps, chatDispatchToProps)(ChatScreen)
export const ChatTestContainer = connect(chatStateToProps, chatDispatchToProps)(ChatTestScreen)
export const ChatContractContainer = connect(chatStateToProps, chatDispatchToProps)(ChatContractScreen)
export const ChatContractTestContainer = connect(chatStateToProps, chatDispatchToProps)(ChatContractTestScreen)
export const ChatlistContainer = connect(chatStateToProps, chatDispatchToProps)(ChatlistScreen)
