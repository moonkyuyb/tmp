import { connect } from "react-redux";
import {getDanjiDetail, getSalesList, getSaleDetail,getLike, setLike,delLike,getSecurity,getSchools,getConvinience,getImages,getOptions,getAvailableTime}  from "../reducers/danjiDetailReducer";
import DanjiDetailScreen from '../screen/SalesList/DanjiDetailScreen'
import { showAlertMessage } from "../reducers/commonReducer";

const danjiStateToProps = (state) =>{
    
    return ({
        danjiData:   state.danjiDetail.danjiData,
        imgData:    state.danjiDetail.imgData,
        optData:    state.danjiDetail.optData,
        tagData:    state.danjiDetail.tagData,
        avlTimeData:    state.danjiDetail.avlTimeData,
        isLike:     state.danjiDetail.isLike,
        salesList: state.danjiDetail.salesList,
        listTab: state.danjiDetail.listTab,
		//AUTH REDUCER
		token: 			state.authReducer.token,
		verifiedToken: 	state.authReducer.verifiedToken,
    })
}

const danjiDispatchToProps = (dispatch) =>{
    return({
        showAlertMessage: 	(payload) => {dispatch(showAlertMessage(payload))},
        handleGetDanjiData: (payload) => { console.log(payload); dispatch(getDanjiDetail(payload) )},
        handleGetDanjiSales: (payload) =>{ dispatch(getSalesList(payload)) },
        
        handleGetSaleDetail:    (sID) =>{ dispatch(getSaleDetail(sID))  },
        handleGetSaleImages:    (sID) =>{ dispatch(getImages(sID)) },
        handleGetOptions:       (sID) =>{ dispatch(getOptions(sID)) },
        handleGetTags:          (sID) =>{ dispatch(getTags(sID)) },
        handleGetAvlTime:       (sID) =>{ dispatch(getAvailableTime(sID)) },
        handleGetLike:          (sID,mID) => { dispatch(getLike(sID, mID)) },
        handleSetLike:          (dCode,mID) => {dispatch(setLike(dCode, mID))},
        handleDelLike:          (sID,mID) =>{dispatch(delLike(sID, mID))},
        
        handleGetConvinience:   (sID) =>{ dispatch(getConvinience(sID)) },
        handleGetSecurity:      (sID) =>{ dispatch(getSecurity(sID)) },
        handleGetSchools:       (sID) =>{ dispatch(getSchools(sID)) },
        
    })
}
//const SaleDetailContainer = connect(mapStateToProps, mapDispatchToProps)(Sales)
//export default SaleDetailContainer
export const DanjiDetailContainer = connect(danjiStateToProps, danjiDispatchToProps)(DanjiDetailScreen)
 

