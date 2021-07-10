import { connect } from "react-redux"
import DeleteAccount from "../screen/Mypage/DeleteAccount"
import {showConfirm, logout, showAlert, requestResign} from "../reducers/deleteAccountReducer";

const deleteMapStateToProps=(state) =>{
    return({
        alertMsg:   state.accountReducer.alertMsg,
        confirmMsg: state.accountReducer.confirmMsg,
    })
}

const deleteMapDispatchToProps=(dispatch) =>{
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
    handleRequestDelete: (payload) => {
        console.log("handleRequestDelete")
        dispatch(requestResign(payload))
    }
    })
}


export const  DeleteAccountContainer=connect(deleteMapStateToProps, deleteMapDispatchToProps)(DeleteAccount);

