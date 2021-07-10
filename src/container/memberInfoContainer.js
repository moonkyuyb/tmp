/* COMMON */
import { connect } from 'react-redux';

/* SCREEN & COMPONENTS */
import MemberInfoScreen from "../screen/MemberInfoScreen";

//MEMBER_INFO REDUCER
import { getMemberInfo } from "../reducers/memberInfoReducer";

const memberInfoStateToProps = (state) => {
	return({
		//MEMBER_INFO REDUCER
		memberInfo: state.memberInfoReducer.memberInfo
	})
}

const memberInfoDispatchToProps = (dispatch) => {
	return({
		//MEMBER_INFO REDUCER
		getMemberInfo: (payload) => {dispatch(getMemberInfo(payload))},
	})
}

export const MemberInfoContainer = connect(memberInfoStateToProps, memberInfoDispatchToProps)(MemberInfoScreen)