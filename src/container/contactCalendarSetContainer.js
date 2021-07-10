import { connect } from "react-redux"
import { initCalendar, selectedDay, onDateSelect, onAVSelect, onAVDelete, submitSchedule,   initCalendarSchd, submitScheduleDetail,clear, showAlert } from "../reducers/contactCalendarSetReducer"
import ProContract from "../screen/Mypage/ContactCalendarSet"


const calendarSetMapStateToProps=(state) =>{
    return ({
        appt            : state.calendarReducer.appt,
        selectedDate    : state.calendarReducer.selectedDate,
        availableDate   : state.calendarReducer.availableDate,
        selectedDateStr : state.calendarReducer.selectedDateStr,
        submitResult    : state.calendarReducer.submitResult,
        alertMsg        : state.calendarReducer.alertMsg,
    })
}

const calendarSetMapDispatchToProps=(dispatch)=>{

    return({
        handleInit:(payload)=>{ dispatch(initCalendar(payload)) },
        handleInitSchd:(payload)=>{ dispatch(initCalendarSchd(payload)) },
        handleOnDaySelect:(payload)=>{ dispatch(selectedDay(payload)) },

        handleOnDateSelect:(payload) => { dispatch(onDateSelect(payload)) },
        handleOnAVSelect:(payload) => { dispatch(onAVSelect(payload)) },
        handleSchdSubmit:(payload)             => { dispatch(submitSchedule(payload)) },
        handleSchdSubmitDetail:(payload)             => {  dispatch(submitScheduleDetail(payload)) },
        handleClear:()          => {dispatch(clear())},
        handleShowAlert:(payload)  =>(dispatch(showAlert(payload)))
    })

}

export const CalendarSetContainer = connect(calendarSetMapStateToProps, calendarSetMapDispatchToProps)(ProContract);

