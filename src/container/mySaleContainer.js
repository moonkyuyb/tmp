import { connect } from "react-redux"
import { initMySale, likeClicked, unlikeClicked, mySaleTotalCnt, clearData } from "../reducers/mySaleReducer"
import MySale from "../screen/Mypage/MySale"


const mySaleMapStateToProps=(state) =>{
    return ({
        salesList:      state.mySaleReducer.salesList,
        totalCnt:       state.mySaleReducer.totalCnt,
        current_page:   state.mySaleReducer.current_page,
        next_page:      state.mySaleReducer.next_page,
    })
}

const mySaleMapDispatchToProps=(dispatch) => {
    return ({
        handleInitMySale: (mID, page)=>{ dispatch(initMySale(mID, page));  },
        handleLikeClicked: (payload,index)=>{ dispatch(likeClicked(payload,index)) },
        handleDeleteLikeClicked: (payload,index)=>{ dispatch(unlikeClicked(payload,index)) },
        handleTotalCount: (mID)=>{ dispatch(mySaleTotalCnt(mID));  },
        handleClearData: () => {dispatch(clearData())},

    })
}

export const MySaleContainer = connect(mySaleMapStateToProps, mySaleMapDispatchToProps)(MySale);



