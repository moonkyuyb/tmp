/* COMMON */
import { connect } from 'react-redux';

/* SCREEN & COMPONETS */
import SigninScreen from "../screen/SigninScreen";

//AUTH REDUCER
import { initAuthState, setAuthState, clearAuthState, signinMail } from "../reducers/authReducer";

const authStateToProps = (state) => {
	return{
		//AUTH REDUCER
		token: state.authReducer.token,
		verifiedToken: state.authReducer.verifiedToken,
		isSignedin: state.authReducer.isSignedin,
	}
}

const authDispatchToProps = (dispatch) => {
	return{
		//AUTH REDUCER
		initAuthState: (payload) => {dispatch(initAuthState(payload))},
		setAuthState: (payload) => {dispatch(setAuthState(payload))},
		clearAuthState: (payload) => {dispatch(clearAuthState(payload))},
		signinMail: (payload) => {dispatch(signinMail(payload))},
		verifyToken: (payload) => {dispatch(verifyToken(payload))},
		signout: (payload) => {dispatch(signout(payload))},
	}
}

export const SigninContainer = connect(authStateToProps, authDispatchToProps)(SigninScreen)


