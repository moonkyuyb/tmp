import { connect } from "react-redux";
import MainScreen from "../screen/Main/MainScreen";
import {initMain} from "../reducers/MainReducer";


const mainMapStateToProps=(state) =>{
    return(state);
}


const mainMapDispatchToProps=(dispatch) =>{
    return({
        handleInit:(payload)=>{dispatch(initMain(payload));}
    })
}

export const MainContainer = connect(mainMapStateToProps, mainMapDispatchToProps)(MainScreen);




