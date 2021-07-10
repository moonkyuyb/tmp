import { connect } from "react-redux";
import {getSaleDetail, getImages, getOptions, getTags, getAvailableTime, getConvinience, getSecurity, getSchools, getLike, setLike, delLike}  from "../reducers/salesDetailReducer";
import SalesDetailScreen from '../screen/SalesList/SalesDetailScreen'
import { showAlertMessage } from "../reducers/commonReducer";

const salesStateToProps = (state) =>{
    
    return ({
        saleData:   state.salesDetailReducer.saleData,
        imgData:    state.salesDetailReducer.imgData,
        optData:    state.salesDetailReducer.optData,
        tagData:    state.salesDetailReducer.tagData,
        avlTimeData:    state.salesDetailReducer.avlTimeData,
        isLike:     state.salesDetailReducer.isLike,

		//AUTH REDUCER
		token: 			state.authReducer.token,
		verifiedToken: 	state.authReducer.verifiedToken,
    })
}

const salesDispatchToProps = (dispatch) =>{
    return({
        handleGetSaleDetail:    (sID) =>{ dispatch(getSaleDetail(sID))  },
        handleGetSaleImages:    (sID) =>{ dispatch(getImages(sID)) },
        handleGetOptions:       (sID) =>{ dispatch(getOptions(sID)) },
        handleGetTags:          (sID) =>{ dispatch(getTags(sID)) },
        handleGetAvlTime:       (sID) =>{ dispatch(getAvailableTime(sID)) },
        handleGetLike:          (sID,mID) => { dispatch(getLike(sID, mID)) },
        handleSetLike:          (sID,mID) => {dispatch(setLike(sID, mID))},
        handleDelLike:          (sID,mID) =>{dispatch(delLike(sID, mID))},
        showAlertMessage: 	(payload) => {dispatch(showAlertMessage(payload))},
        /*
        handleGetConvinience:   (sID) =>{ dispatch(getConvinience(sID)) },
        handleGetSecurity:      (sID) =>{ dispatch(getSecurity(sID)) },
        handleGetSchools:       (sID) =>{ dispatch(getSchools(sID)) },
        */
    })
}
//const SaleDetailContainer = connect(mapStateToProps, mapDispatchToProps)(Sales)
//export default SaleDetailContainer
const SalesDetailContainer = connect(salesStateToProps, salesDispatchToProps)(SalesDetailScreen)
export default SalesDetailContainer;

