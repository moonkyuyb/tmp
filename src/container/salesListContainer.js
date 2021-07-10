import SalesListScreen from "../screen/SalesList/SalesListScreen";

import { getSalesList, getPriceTypeList, setSearchFilter,  setFilterComplete, setSearchKeyword, likeClicked, likeDanjiClicked,initMain } from "../reducers/salesListReducer";

// 필터 리듀서
import * as filterActions  from "../reducers/searchFilterReducer";

import { connect } from "react-redux";
import ZipFilter from "../screen/SalesList/zipFilter";
import MainScreen from "../screen/Main/MainScreen";

const salesListStateToProps = (state) => {
	return{
		//AUTH REDUCER
		token:			state.authReducer.token,
		verifiedToken:	state.authReducer.verifiedToken,

		//SALES REDUCER
		salesList:		state.salesListReducer.salesList,
		danjiList:		state.salesListReducer.danjiList,
        searchOpt:      state.salesListReducer.searchOpt,
		isFilter :      state.salesListReducer.isFilter,
		searchKeyword: 	state.salesListReducer.searchKeyword,
		myContract:		state.salesListReducer.myContract,
		isSigned:		state.salesListReducer.isSigned,
		filter:{
			priceList:		state.searchFilterReducer.priceList,
    		saleTypeList:	state.searchFilterReducer.saleTypeList,
    		livingList:		state.searchFilterReducer.livingList,
    		heatingList:	state.searchFilterReducer.heatingList,
    		securityList:	state.searchFilterReducer.securityList,
    		etcOptList:		state.searchFilterReducer.etcOptList,
    		tagsList:		state.searchFilterReducer.tagsList,


			priceListSelected:		state.searchFilterReducer.priceListSelected,
    		saleTypeSelected:		state.searchFilterReducer.saleTypeSelected,
    		livingItemSelected:		state.searchFilterReducer.livingItemSelected,
    		heatingItemSelected:	state.searchFilterReducer.heatingItemSelected,
    		securityItemSelected:	state.searchFilterReducer.securityItemSelected,
    		etcItemSelected:		state.searchFilterReducer.etcItemSelected,
    		tagsItemSelected:		state.searchFilterReducer.tagsItemSelected,
    		roomCnt:				state.searchFilterReducer.roomCnt,
    		bathCnt:				state.searchFilterReducer.bathCnt,
    		builtYear:				state.searchFilterReducer.builtYear,
    		parkingCnt:				state.searchFilterReducer.parkingCnt,
    		depositAmtRange:		state.searchFilterReducer.depositAmtRange,
    		monthAmtRange:			state.searchFilterReducer.monthAmtRange,
    		saleAmtRange:			state.searchFilterReducer.saleAmtRange,
    		areaSizeRange:			state.searchFilterReducer.areaSizeRange,
    		maintenanceAmtRange:	state.searchFilterReducer.maintenanceAmtRange,
    		floorRange:				state.searchFilterReducer.floorRange,	
			filterComplete:         state.searchFilterReducer.filterComplete,	
			currentFilter:			state.searchFilterReducer.currentFilter,	
			geoLocation:			state.searchFilterReducer.geoLocation,
		},
    }
}

const salesListDispatchToProps = (dispatch) => {
	return{
		//SALES REDUCER

		getSalesList: 		(filter) => { dispatch(getSalesList(filter))},
		
		//COMMON REDUCER
		showAlertMessage: 	(payload) => {dispatch(showAlertMessage(payload))},

        handleGetPriceType: () =>{dispatch(getPriceTypeList());},
		setFilterComplete: (yn)=>{dispatch(setFilterComplete(yn))},
		handleSetSearchKeyword:(keyword) =>{setSearchKeyword(keyword); },

        handleSetGeolocation: (geolocation) => {dispatch(filterActions.setSearchLocation(geolocation))},

		handleLikeClicked:(payload)			=> dispatch(likeClicked(payload)),
		handleLikeDanjiClicked:(payload)			=> dispatch(likeDanjiClicked(payload)),


		handleInitMain:(payload)			=> {dispatch(initMain(payload));},

		// filters
		filterHandler: {
			handleGetPriceList:    () =>{dispatch(filterActions.getPriceTypeList())},
        	handleGetSaleTypeList: () =>{dispatch(filterActions.getSaleTypeList()) },
        	handleGetLivingList:         () => {dispatch(filterActions.getLivingList())},
        	handleGetHeatingList:        () => {dispatch(filterActions.getHeatingList())},
        	handleGetSecurityList:        () => {dispatch(filterActions.getSecurityList())},
        	handleGetEtcList:        () => {dispatch(filterActions.getEtcList())},
        	handleGetTagsList:        () => {dispatch(filterActions.getTagsList())},
			handleGetAllFilter:         () =>{dispatch(filterActions.getFilterAll() )},

		 	// on item select
		 	handleOnPriceListClick: (code) =>{dispatch(filterActions.onPriceClicked(code))},
		 	handleOnSaleTypeClick: (code) =>{ dispatch(filterActions.onSaleTypeClicked(code)); },
		 	handleOnLivingItemClick: (code) => {  dispatch(filterActions.onLivingItemClicked(code)) },
		 	handleOnHeatingItemClick: (code) => {  dispatch(filterActions.onHeatingItemClicked(code)) },
		 	handleOnSecurityItemClick: (code) => {  dispatch(filterActions.onSecurityItemClicked(code)) },
		 	handleOnEtcItemClick: (code) => {  dispatch(filterActions.onEtcItemClicked(code)) },
		 	handleOnTagItemClick: (stID) =>{dispatch(filterActions.onTagItemClicked(stID))},
			
		 	handleOnRoomCntClick: (cnt) =>{ dispatch(filterActions.onRoomCntClicked(cnt)) },
		 	handleOnBathCntClick: (cnt) =>{ dispatch(filterActions.onBathCntClicked(cnt)) },
		 	handleOnParkingCntClick: (cnt) =>{ dispatch(filterActions.onParkingCntClicked(cnt)) },
		 	handleOnBuiltYearClick: (cnt) =>{ dispatch(filterActions.onBuiltYearClicked(cnt)) },
			
		 	handleOnFilterCompleteClick: () => {dispatch(filterActions.onFilterComplete())},
			
		 	handleOnBarChange:(type, rag) =>{dispatch(filterActions.onBarChange(type,rag))},

			handleSetCurrentFilter:(filter) =>{dispatch(filterActions.setCurrentFilter(filter))},
			handleInitFilter:()				=>{dispatch(filterActions.initFilter()); },
			
		}
	}
}
export const SalesListContainer = connect(salesListStateToProps, salesListDispatchToProps)(SalesListScreen);
export const MainContainer = connect(salesListStateToProps, salesListDispatchToProps)(MainScreen);

