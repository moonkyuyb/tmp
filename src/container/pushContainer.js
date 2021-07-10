import { connect } from "react-redux"
import Push from "../screen/Mypage/Push"
import {pushInit, setPushSetting} from "../reducers/pushReducer"

const pushMapStateToProps=(state) => {
    return({
        pushState: state.pushReducer.pushState,
        updateState: state.pushReducer.updateState,
    })
}


const pushMapDispatchToProps=(dispatch) => {
    return({
        handleInit:     (payload) => { dispatch(pushInit(payload)); },
        handleUpdateData:  (payload) => { dispatch(setPushSetting(payload)); },
    })
}

export const PushContainer = connect(pushMapStateToProps, pushMapDispatchToProps)(Push);





