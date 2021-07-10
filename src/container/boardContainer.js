import { connect } from "react-redux";
import NoticeScreen from "../screen/Notice/NoticeScreen";
import FaqScreen    from "../screen/Faq/FaqScreen";
import EventListScreen from "../screen/Event/EventListScreen";
import EventViewScreen from "../screen/Event/EventViewScreen";
import { initBoardState, getBoard, boardCnt, getEventDetail, clearBoardState } from "../reducers/boardReducer";

const boardMapStateToProps=(state) => {
    return({
        boardList: state.boardReducer.boardList,
        page:       state.boardReducer.page,
        nextPage:   state.boardReducer.nextPage,
        eventDetail:state.boardReducer.eventDetail,
    });
}

const boardMapDispatchToProps=(dispatch) => {
    return({
        initBoardState:         () => {dispatch(initBoardState())},
        getBoard:               (payload) => {dispatch(getBoard(payload))},
        boardCnt:               (payload) => {dispatch(boardCnt(payload))},
        getEventDetail: (payload) => {dispatch(getEventDetail(payload))},
        clearBoard:             () => {dispatch(clearBoardState())}
        //handleInit: (payload) =>{ dispatch(initBoard(payload)); },
        //handleClearNotice: () => {dispatch(clearNotice())},
    })
}


export const NoticeContainer    = connect(boardMapStateToProps, boardMapDispatchToProps)(NoticeScreen);
export const FaqContainer       = connect(boardMapStateToProps, boardMapDispatchToProps)(FaqScreen);
export const EventListContainer = connect(boardMapStateToProps, boardMapDispatchToProps)(EventListScreen);
export const EventViewContainer = connect(boardMapStateToProps, boardMapDispatchToProps)(EventViewScreen);



