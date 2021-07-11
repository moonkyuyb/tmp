import { connect } from "react-redux"
import { findPW, handlePop } from "../reducers/findPwReducer"
import FindPW from "../screen/FindPw"

const findPWMapStateToProps=(state) =>{
    return({
        resultMSG: state.findPWReducer.resultMSG,
        resultCode: state.findPWReducer.resultCode,
    });
}

const finPWMapDispatchToProps=(dispatch) => {
    return({
        findPW: (payload) =>{ dispatch(findPW(payload)) },
        handlePopup:  ()        =>{ dispatch(handlePop()) },
    })
}

export const findPWContainer = connect(findPWMapStateToProps, finPWMapDispatchToProps)(FindPW);



