import { connect } from 'react-redux';

//SCREEN
import ChecklistTestScreen from '../screen/ChecklistTestScreen';
import ChecklistScreen from '../screen/ChecklistScreen';

//COMMON REDUCER
import { showAlertMessage } from "../reducers/commonReducer";

//CHECKLIST REDUCER
import { initChecklistState, setChecklistState, clearChecklistState, getChecklist, postChecklist, checkChecklist } from "../reducers/checklistReducer";

const checklistStateToProps = (state) => {
	return{
		//COMMON REDUCER
		alertMessage		: state.commonReducer.alertMessage,

		//CHECKLIST REDUCER
		s_id				: state.checklistReducer.s_id,
		m_id_from			: state.checklistReducer.m_id_from,
		m_id_to				: state.checklistReducer.m_id_to,
		checklist			: state.checklistReducer.checklist,
		checklistCompleted	: state.checklistReducer.checklistCompleted,
	}
}

const checklistDispatchToProps = (dispatch) => {
	return{
		//COMMON REDUCER
		showAlertMessage	: (payload) => {dispatch(showAlertMessage(payload))},

		//CHECKLIST REDUCER
		initChecklistState	: (payload) => {dispatch(initChecklistState(payload))},
		setChecklistState	: (payload) => {dispatch(setChecklistState(payload))},
		clearChecklistState	: (payload) => {dispatch(clearChecklistState(payload))},
		getChecklist		: (payload) => {dispatch(getChecklist(payload))},
		postChecklist		: (payload) => {dispatch(postChecklist(payload))},
		checkChecklist		: (payload) => {dispatch(checkChecklist(payload))},
	}
}

export const ChecklistTestContainer = connect(checklistStateToProps, checklistDispatchToProps)(ChecklistTestScreen)
export const ChecklistContainer = connect(checklistStateToProps, checklistDispatchToProps)(ChecklistScreen)
