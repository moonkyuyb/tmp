import { connect } from "react-redux";
import MyAccount from "../screen/Mypage/Account";
import NameAccount from "../screen/Mypage/NameAccount";
import {getMyData, uploadToServer, putImgData, updateName, initUpdateName, updateContactTime, showConfirm, logout, showAlert, getMainData} from "../reducers/accountReducer";
import Mypage from "../screen/Mypage/Mypage";
import ContactTelTime from "../screen/Mypage/ContactTelTime";
import { PrivateValueStore } from "@react-navigation/core";
import { DrawerContent } from "@react-navigation/drawer";

const accountMapStateToProps=(state)=>{
    return {
        myData:     state.accountReducer.myData,
        profileImg: state.accountReducer.myData.mf_original_nm,
        alertMsg:   state.accountReducer.alertMsg,
        confirmMsg: state.accountReducer.confirmMsg,
        mainData: state.accountReducer.mainData,
    }
}

const accountMapDispatchToProps=(dispatch) =>{
    return({
        handleMainInit: (payload) =>{dispatch(getMainData(payload)); },
        handleGetMyData: (payload)=>{ dispatch(getMyData(payload)); },
        handleFileUpload: (payload)=>{ 
            uploadToServer(payload)
            .then((response)=>{
                const fileName = response.data.fileNames[0];
                dispatch( putImgData({m_id:payload.mID, file_name:fileName}) );
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        handleUpdateName: (payload) =>{
            dispatch(updateName(payload))
        },
        handleInitUpdateName: ()=>{
            dispatch(initUpdateName())
        },
        handleSubmitContactTime: (payload) => {
            dispatch(updateContactTime(payload));
        },
        handleConfirmLogout: (payload) =>{
            dispatch(showConfirm(payload));
        },
        handleLogOut:  (payload) =>{
            dispatch(logout(payload))
        },
        handleAlert: (payload) => {
            dispatch(showAlert(payload))
        }
    })
}

export const AccountContainer = connect(accountMapStateToProps, accountMapDispatchToProps)(MyAccount);
export const NameAccountContainer = connect(accountMapStateToProps, accountMapDispatchToProps)(NameAccount);
export const MyPageContainer = connect(accountMapStateToProps, accountMapDispatchToProps)(Mypage);
export const ContactTelContainer = connect(accountMapStateToProps, accountMapDispatchToProps)(ContactTelTime);




