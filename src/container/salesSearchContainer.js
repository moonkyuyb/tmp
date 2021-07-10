import { connect } from "react-redux";

import SalesDirectScreen from "../screen/SalesDirectScreen";
import StepOneScreen from "../screen/SalesDirectScreen/stepOne";
import StepTwoScreen from "../screen/SalesDirectScreen/stepTwo";
import StepThreeScreen from "../screen/SalesDirectScreen/stepThree";
//import StepFourScreen from "../screen/SalesDirectScreen/stepFour";
//import StepFiveScreen from "../screen/SalesDirectScreen/stepFive";


import { setPage, prevPage, nextPage,
	saveStepOne,saveStepTwo,saveStepThree,saveStepFour,saveStepFive,
	resetAddressList, getAddressSi, getAddressGu, getAddressDong, setDanji,
	getCommonFeeList,getIndiFeeList, getOptionHeatList, getOptionLifeList, getOptionSecureList, getOptionEtcList, initWriting,uploadToServer, getDanJi, getSiGuDongDanJi, getBjdongCode,getPrevData,
	setImage, delImage, getSalesList, getSalesDetail, adddSales } from "../reducers/salesReducer";
import { showAlertMessage } from "../reducers/commonReducer";

const salesStateToProps = (state) => {
	return{
		//AUTH REDUCER
		token:			state.authReducer.token,
		verifiedToken:	state.authReducer.verifiedToken,

		//SALES REDUCER
		currentPage:	state.salesReducer.currentPage,
		basicInfo:		state.salesReducer.basicInfo,
		propInfo:		state.salesReducer.propInfo[0],
		dealInfo: 		state.salesReducer.dealInfo,
		detailInfo:		state.salesReducer.detailInfo,
		mediaInfo:		state.salesReducer.mediaInfo,

		addressSi:		state.salesReducer.addressSi,
		addressGu:		state.salesReducer.addressGu,
		addressDong:	state.salesReducer.addressDong,
		commonFeeList:	state.salesReducer.commonFeeList,
		indiFeeList:	state.salesReducer.indiFeeList,
		optHeat:		state.salesReducer.optHeat,
		optLife:		state.salesReducer.optLife,
		optSecure:		state.salesReducer.optSecure,
		optEtc:			state.salesReducer.optEtc,

		imgs:			state.salesReducer.imgs,

		salesList:		state.salesReducer.salesList,
		salesDetail:	state.salesReducer.salesDetail,

		danjiList:		state.salesReducer.danjiList,
		danjiListpageNo:		state.salesReducer.danjiListpageNo,
		danjitotalCount:		state.salesReducer.danjitotalCount,
		danjitotalnumOfRows: 	state.salesReducer.danjitotalnumOfRows,
	}
}

const salesDispatchToProps = (dispatch) => {
	return{
		//SALES REDUCER
		initData:			()			=> {dispatch() },
		setPage: 			(payload) 	=> {dispatch(setPage(payload))},
		prevPage: 			(payload) 	=> {dispatch(prevPage(payload))},
		nextPage: 			(payload) 	=> {dispatch(nextPage(payload))},
		saveStepOne: 		(payload) 	=> {dispatch(saveStepOne(payload))},
		saveStepTwo: 		(payload) 	=> {dispatch(saveStepTwo(payload))},
		saveStepThree:		(payload) 	=> {dispatch(saveStepThree(payload))},
		saveStepFour:		(payload) 	=> {dispatch(saveStepFour(payload))},
		saveStepFive:		(payload) 	=> {dispatch(saveStepFive(payload))},

		resetAddressList: 	(payload) 	=> {dispatch(resetAddressList(payload))},
		getAddressSi: 		(payload) 	=> {dispatch(getAddressSi(payload))},
		getAddressGu: 		(payload) 	=> {dispatch(getAddressGu(payload))},
		getAddressDong: 	(payload) 	=> {dispatch(getAddressDong(payload))},
		getCommonFeeList:	(payload) 	=> {dispatch(getCommonFeeList(payload))},
		getIndiFeeList: 	(payload) 	=> {dispatch(getIndiFeeList(payload))},
		getOptionHeatList: 	(payload) 	=> {dispatch(getOptionHeatList(payload))},
		getOptionLifeList: 	(payload) 	=> {dispatch(getOptionLifeList(payload))},
		getOptionSecureList:(payload) 	=> {dispatch(getOptionSecureList(payload))},
		getOptionEtcList: 	(payload) 	=> {dispatch(getOptionEtcList(payload))},
		setImage: 			(payload) 	=> {dispatch(setImage(payload))},
		delImage: 			(payload) 	=> {dispatch(delImage(payload))},

		getSalesList: 		(payload) 	=> {dispatch(getSalesList(payload))},
		getSalesDetail: 	(payload) 	=> {dispatch(getSalesDetail(payload))},

		requestDanji:		(payload)	=> {
			getDanJi(payload)
			.then((response)=>{
				
				dispatch(setDanji(response.data.response.body));
				
			})
			.catch((err)=>{
				console.log("== ❌ REQUEST DANJI ACTION ERROR\n" + err)
			})
		
		
		},
		requestSiGuDongDanji:(payload)  => {
			getBjdongCode(payload)
			.then((response)=>{
				console.log(response.data.results[0]);
				const bjdongCode = response.data.results[0].bjdong_cd;
				dispatch(getSiGuDongDanJi(bjdongCode)) 

			})
			.catch((err)=>{

			})
		
		},

		initWriting: 		() 			=> {dispatch(initWriting())},
		uploadToServer:		(payload, mID)			=> {
			uploadToServer(payload, mID)
			.then((response)=>{

				payload['fileNames'] = response.data.fileNames;
				dispatch(adddSales(payload));

			})
			.catch((err)=>{

			})
		
		},
		getSalesData: (payload) =>{
			dispatch(getPrevData(payload))
		},

		//COMMON REDUCER
		showAlertMessage: 	(payload) 	=> {dispatch(showAlertMessage(payload))},
	}
}

export const SalesDirectContainer = connect(salesStateToProps, salesDispatchToProps)(SalesDirectScreen)
export const StepOneContainer = connect(salesStateToProps, salesDispatchToProps)(StepOneScreen)
export const StepTwoContainer = connect(salesStateToProps, salesDispatchToProps)(StepTwoScreen)
export const StepThreeContainer = connect(salesStateToProps, salesDispatchToProps)(StepThreeScreen)
