import * as actions  from "../reducers/searchFilterReducer";
import { connect } from "react-redux";
import ZipFilter from "../screen/SalesList/zipFilter";

const salesFilterStateToProps = (state) => {

	return(
		//AUTH REDUCER
        state.searchFilterReducer
		//priceList:state.searchFilterReducer.priceList,
        //priceListSelected: state.searchFilterReducer.priceListSelected,
        //saleTypeList: state.searchFilterReducer.saleTypeList,
    )
}

const salesFilterDispatchToProps = (dispatch) => {
	return{
		//SALES REDUCER
        // getdata
        handleGetPriceList:    () =>{dispatch(actions.getPriceTypeList())},
        handleGetSaleTypeList: () =>{dispatch(actions.getSaleTypeList()) },
        handleGetLivingList:         () => {dispatch(actions.getLivingList())},
        handleGetHeatingList:        () => {dispatch(actions.getHeatingList())},
        handleGetSecurityList:        () => {dispatch(actions.getSecurityList())},
        handleGetEtcList:        () => {dispatch(actions.getEtcList())},
        handleGetTagsList:        () => {dispatch(actions.getTagsList())},


        // on item select
        handleOnPriceListClick: (code) =>{dispatch(actions.onPriceClicked(code))},
        handleOnSaleTypeClick: (code) =>{ dispatch(actions.onSaleTypeClicked(code)); },
        handleOnLivingItemClick: (code) => {  dispatch(actions.onLivingItemClicked(code)) },
        handleOnHeatingItemClick: (code) => {  dispatch(actions.onHeatingItemClicked(code)) },
        handleOnSecurityItemClick: (code) => {  dispatch(actions.onSecurityItemClicked(code)) },
        handleOnEtcItemClick: (code) => {  dispatch(actions.onEtcItemClicked(code)) },
        handleOnTagItemClick: (stID) =>{dispatch(actions.onTagItemClicked(stID))},
		
        handleOnRoomCntClick: (cnt) =>{ dispatch(actions.onRoomCntClicked(cnt)) },
        handleOnBathCntClick: (cnt) =>{ dispatch(actions.onBathCntClicked(cnt)) },
        handleOnParkingCntClick: (cnt) =>{ dispatch(actions.onParkingCntClicked(cnt)) },
        handleOnBuiltYearClick: (cnt) =>{ dispatch(actions.onBuiltYearClicked(cnt)) },

        handleOnFilterCompleteClick: () => {dispatch(actions.onFilterComplete())},

        handleOnBarChange:(type, rag) =>{dispatch(actions.onBarChange(type,rag))},

        handleSaveFilter:(data) => {dispatch(actions.saveFilter(data))},

        handleInitFilter:(data=null)         => {dispatch(actions.initFilter(data)) },

		//showAlertMessage: 	(payload) => {dispatch(showAlertMessage(payload))},

	}
}
export const SalesFilterContainer = connect(salesFilterStateToProps, salesFilterDispatchToProps)(ZipFilter);
//export const SalesListContainer = connect(salesFilterStateToProps, salesFilterDispatchToProps)(SalesListScreen);

