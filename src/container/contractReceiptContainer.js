import { connect } from 'react-redux';

//SCREEN
import ContractReceiptScreen from '../screen/ContractReceiptScreen';
import ContractReceiptTestScreen from '../screen/ContractReceiptTestScreen';

//COMMON REDUCER
import { showAlertMessage } from "../reducers/commonReducer";

//CONTRACT_RECEIPT REDUCER
import { initContractReceiptState, setContractReceiptState, clearContractReceiptState, getContractReceipt, getContractReceiptList, updateContractReceipt } from "../reducers/contractReceiptReducer";

const contractReceiptStateToProps = (state) => {
	return{
		//CONTRACT_RECEIPT REDUCER
		s_id					: state.contractReceiptReducer.s_id,
		m_id_to					: state.contractReceiptReducer.m_id_to,
		m_id_from				: state.contractReceiptReducer.m_id_from,
		m_id_lessor				: state.contractReceiptReducer.m_id_lessor,
		m_id_tenants			: state.contractReceiptReducer.m_id_tenants,
		cr_id					: state.contractReceiptReducer.cr_id,
		c_id					: state.contractReceiptReducer.c_id,
		cr_type					: state.contractReceiptReducer.cr_type,
		cr_amount				: state.contractReceiptReducer.cr_amount,
		cr_issue_date			: state.contractReceiptReducer.cr_issue_date,
		cr_signing_date_lessor	: state.contractReceiptReducer.cr_signing_date_lessor,
		cr_signing_date_tenants	: state.contractReceiptReducer.cr_signing_date_tenants,
		isMine					: state.contractReceiptReducer.isMine,
		contractReceipt			: state.contractReceiptReducer.contractReceipt,
		contractReceiptList		: state.contractReceiptReducer.contractReceiptList,
		contractReceiptPosted	: state.contractReceiptReducer.contractReceiptPosted,
	}
}

const contractReceiptDispatchToProps = (dispatch) => {
	return{
		//COMMON REDUCER
		showAlertMessage			: (payload) => {dispatch(showAlertMessage(payload))},

		//CONTRACT_RECEIPT REDUCER
		initContractReceiptState	: (payload) => {dispatch(initContractReceiptState(payload))},
		setContractReceiptState		: (payload) => {dispatch(setContractReceiptState(payload))},
		clearContractReceiptState	: (payload) => {dispatch(clearContractReceiptState(payload))},
		getContractReceipt			: (payload) => {dispatch(getContractReceipt(payload))},
		getContractReceiptList		: (payload) => {dispatch(getContractReceiptList(payload))},
		updateContractReceipt		: (payload) => {dispatch(updateContractReceipt(payload))},
	}
}

export const ContractReceiptContainer = connect(contractReceiptStateToProps, contractReceiptDispatchToProps)(ContractReceiptScreen)
export const ContractReceiptTestContainer = connect(contractReceiptStateToProps, contractReceiptDispatchToProps)(ContractReceiptTestScreen)

