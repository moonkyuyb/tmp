//COMMON
import { connect } from 'react-redux';

//SCREEN & COMPONETS
import TransactionStatus from "../screen/Mypage/TransactionStatus";

//COMMON REDUCER
import { showAlertMessage } from "../reducers/commonReducer";

//TRANSACTION REDUCER
import { initTransactionState, setTransactionState, clearTransactionState, getContractList, getChatrooms } from "../reducers/transactionStatusReducer";

const transactionMapStateToProps = (state) =>{
	return({
		contractList: state.transactionStatusReducer.contractList,
		chatrooms: state.transactionStatusReducer.chatrooms,
	});
}

const transactionMapDispatchToProps = (dispatch) => {
	return({
		showAlertMessage		: (payload) => { dispatch(showAlertMessage(payload)) },

		initTransactionState	: (payload) => { dispatch(initTransactionState(payload)) },
		setTransactionState		: (payload) => { dispatch(setTransactionState(payload)) },
		clearTransactionState	: (payload) => { dispatch(clearTransactionState(payload)) },
		getContractList			: (payload) => { dispatch(getContractList(payload)) },
		getChatrooms			: (payload) => { dispatch(getChatrooms(payload)) },
	})
}

export const TransactionStatusContainer = connect(transactionMapStateToProps, transactionMapDispatchToProps)(TransactionStatus);