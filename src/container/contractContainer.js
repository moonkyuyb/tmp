//COMMON
import { connect } from 'react-redux';

//SCREEN & COMPONETS
import ContractLessorScreen from "../screen/ContractLessorScreen";
import ContractTenantsScreen from "../screen/ContractTenantsScreen";
import ContractAgreementScreen from "../screen/ContractAgreementScreen";

import ContractLeaseScreen from "../screen/ContractLeaseScreen";
import ContractSalesScreen from "../screen/ContractSalesScreen";
import ContractBusinessScreen from "../screen/ContractBusinessScreen";


//COMMON REDUCER
import { showAlertMessage } from "../reducers/commonReducer";

//CONTRACT REDUCER
import {
	initContractState, setContractState, clearContractState, getContract, postContract,
	getSalesForContract, getLessorForContract, getTenantsForContract, handleContractJoint, handleContractAgreement, handleContractPayment, handleContractJointUpdate, postModu
} from "../reducers/contractReducer";

const contractStateToProps = (state) => {
	return{
		//COMMON REDUCER
		alertMessage		: state.commonReducer.alertMessage,

		//CONTRACT REDUCER
		c_id					: state.contractReducer.c_id,
		s_id					: state.contractReducer.s_id,
		m_id_from				: state.contractReducer.m_id_from,
		m_id_to					: state.contractReducer.m_id_to,
		m_id_lessor				: state.contractReducer.m_id_lessor,
		m_id_tenants			: state.contractReducer.m_id_tenants,
		contract				: state.contractReducer.contract,
		contractSaved			: state.contractReducer.contractSaved,
		contractPosted			: state.contractReducer.contractPosted,
		contractUpdated			: state.contractReducer.contractUpdated,
		contractJoint			: state.contractReducer.contractJoint,
		contractJointSaved		: state.contractReducer.contractJointSaved,
		contractStyle			: state.contractReducer.contractStyle,
		contractAgreementSaved	: state.contractReducer.contractAgreementSaved,
		contractModu			: state.contractReducer.contractModu,
		lessorForContract		: state.contractReducer.lessorForContract,
		tenantsForContract		: state.contractReducer.tenantsForContract,
		salesForContract		: state.contractReducer.salesForContract,
	}
}

const contractDispatchToProps = (dispatch) => {
	return{
		//COMMON REDUCER
		showAlertMessage	: (payload) => {dispatch(showAlertMessage(payload))},

		//CONTRACT REDUCER
		initContractState		: (payload) => {dispatch(initContractState(payload))},
		setContractState		: (payload) => {dispatch(setContractState(payload))},
		clearContractState		: (payload) => {dispatch(clearContractState(payload))},
		getContract				: (payload) => {dispatch(getContract(payload))},
		postContract			: (payload) => {dispatch(postContract(payload))},
		getLessorForContract	: (payload) => {dispatch(getLessorForContract(payload))},
		getTenantsForContract	: (payload) => {dispatch(getTenantsForContract(payload))},
		getSalesForContract		: (payload) => {dispatch(getSalesForContract(payload))},
		handleContractJoint		: (payload) => {dispatch(handleContractJoint(payload))},
		handleContractJointUpdate : (payload) => {dispatch(handleContractJointUpdate(payload))},
		handleContractAgreement	: (payload) => {dispatch(handleContractAgreement(payload))},
		handleContractPayment	: (payload) => {dispatch(handleContractPayment(payload))},
		postModu				: (payload) => {dispatch(postModu(payload))},
	}
}

export const ContractLessorContainer = connect(contractStateToProps, contractDispatchToProps)(ContractLessorScreen)
export const ContractAgreementContainer = connect(contractStateToProps, contractDispatchToProps)(ContractAgreementScreen)
export const ContractTenantsContainer = connect(contractStateToProps, contractDispatchToProps)(ContractTenantsScreen)

export const ContractLeaseContainer = connect(contractStateToProps, contractDispatchToProps)(ContractLeaseScreen)
export const ContractSalesContainer = connect(contractStateToProps, contractDispatchToProps)(ContractSalesScreen)
export const ContractBusinessContainer = connect(contractStateToProps, contractDispatchToProps)(ContractBusinessScreen)
