import { connect } from "react-redux";
import {initContractCalendar, onCalendarSelect} from "../reducers/contractCalendarReducer";
import ProContractCalendar from "../screen/Mypage/ContactCalendar";

const contractCalendarMapStateToProps = (state) =>{
    return({
        availableDate: state.contractCalendarReducer.availableDate,
        selectedDate : state.contractCalendarReducer.selectedDate,
        selectedList : state.contractCalendarReducer.selectedList,
    });
}


const contractCalendarMapDispatchToProps = (dispatch) =>{
    return(
        {
            handleInit:(payload) => {
                dispatch(initContractCalendar(payload))
            },
            handleOnCalendarSelect:(payload) => {
                dispatch(onCalendarSelect(payload))
            }
        }
    )
}


export const contractCalendarContainer = connect(contractCalendarMapStateToProps, contractCalendarMapDispatchToProps)(ProContractCalendar);



