import { connect } from "react-redux"
import PwAccount from "../screen/Mypage/PwAccount"
import {showConfirm, logout, showAlert, requestPwChange} from "../reducers/pwAccountReducer";

const pwMapStateToProps=(state) =>{
    return({
        alertMsg:   state.pwReducer.alertMsg,
        confirmMsg: state.pwReducer.confirmMsg,
        resultCode: state.pwReducer.resultCode,
    })
}

const pwMapDispatchToProps=(dispatch) =>{
    return({
    handleConfirmLogout: (payload) =>{
        dispatch(showConfirm(payload));
    },
    handleLogOut:  (payload) =>{
        dispatch(logout(payload))
    },
    handleAlert: (payload) => {
        dispatch(showAlert(payload))
    },
    handleRequestPwChange: (payload) => {
        dispatch(requestPwChange(payload))
    }
    })
}


export const  PWAccountContainer=connect(pwMapStateToProps, pwMapDispatchToProps)(PwAccount);

