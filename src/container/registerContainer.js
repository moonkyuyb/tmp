import { connect } from "react-redux"
import { initRegister, requestRegist, showAlertMessage } from "../reducers/registerReducer"
import RegisterScreen from "../screen/register/RegisterScreen"

const registerMapStateToProps=(state)=>{
    return ({
        myData: state.registeReducer.myData
    })
}

const registerMapDispatchToProps=(dispatch) => {
    return({
        handleInit:(payload)=>{     dispatch(initRegister(payload));  },
        handleRequest:(payload)=>{dispatch(requestRegist(payload) )},
        showAlertMessage: 	(payload) => {  dispatch(showAlertMessage(payload))},
    })
}


export const RegisterContainer=connect(registerMapStateToProps, registerMapDispatchToProps)(RegisterScreen);







