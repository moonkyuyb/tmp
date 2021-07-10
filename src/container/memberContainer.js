/* COMMON */
import { connect } from 'react-redux';

/* SCREEN & COMPONETS */
import SignupScreen from "../screen/SignUpScreen";
import SignupSuccessScreen from "../screen/SignUpSuccessScreen";

//MEMBER REDUCER
import { initMemberState, setMemberState, clearMemberState, getMember, signupMail } from "../reducers/memberReducer";

const memberStateToProps = (state) => {
	return{
		//MEMBER REDUCER
		member: state.memberReducer.member,
		signedName: state.memberReducer.signedName,
		signedUsername: state.memberReducer.signedUsername,
		signedDatetime: state.memberReducer.signedDatetime,
	}
}

const memberDispatchToProps = (dispatch) => {
	return{
		//MEMBER REDUCER
		initMemberState: (payload) => {dispatch(initMemberState(payload))},
		setMemberState: (payload) => {dispatch(setMemberState(payload))},
		clearMemberState: (payload) => {dispatch(clearMemberState(payload))},
		getMember: (payload) => {dispatch(getMember(payload))},
		signupMail: (payload) => {dispatch(signupMail(payload))},
	}
}

export const SignupContainer = connect(memberStateToProps, memberDispatchToProps)(SignupScreen)
export const SignupSuccessContainer = connect(memberStateToProps, memberDispatchToProps)(SignupSuccessScreen)

