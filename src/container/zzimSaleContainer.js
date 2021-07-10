import { connect } from "react-redux"
import ZzimSale from "../screen/Mypage/ZzimSale"
import {getZimList, unlikeClicked, getZzimCount, onCheckItem, initZimList, getDanji, onCheckDanji, onDeleteDanji} from "../reducers/zzimSaleReducer";

const zzimMapStateToProps = (state) => {
    return ({
        zzimList: state.zzimReducer.zzimList,
        current_page:  state.zzimReducer.current_page,
        next_page:  state.zzimReducer.next_page,
        total_cnt:  state.zzimReducer.total_cnt,
        danji_total_cnt: state.zzimReducer.danji_total_cnt,
        checked_item: state.zzimReducer.checked_item,
        zzimDanjiList: state.zzimReducer.zzimDanjiList,
        checked_danji: state.zzimReducer.checked_danji,
    })
}

const zzimMapDispatchToProps = (dispatch) => {
    return({
        handleInitZzim: (payload) => { dispatch(initZimList(payload)); },
        handleGetZzim: (payload) =>  { dispatch(getZimList(payload)); },
        handleGetTotalZZim: (payload) => { dispatch(getZzimCount(payload)); },   
        handleLikeClicked: (payload,index)=>{ dispatch(likeClicked(payload,index)) },
        handleDeleteLikeClicked: (payload,index)=>{ dispatch(unlikeClicked(payload,index)) },
        handleOnCheckItem:  (payload) => {  dispatch(onCheckItem(payload)) },
        handleGetLikeDanji: (payload) => {dispatch(getDanji(payload))},
        handleOnCheckDanji: (payload) => {dispatch(onCheckDanji(payload))},
        handleDeleteDanji:  (payload) => {dispatch(onDeleteDanji(payload))}
    })
}


export const ZzimContainer = connect(zzimMapStateToProps,zzimMapDispatchToProps)(ZzimSale);