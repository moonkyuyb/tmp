/* ENVIRONMENTS */
import { ADMIN_URL, API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import { handleError, setCentralState } from "./centralReducer";
import { checkParams, numberWithCommas } from "../utils/common";
import { getPriceTag } from "../utils/common/calculator";

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_SALES_STATE = 'sales/INIT_SALES_STATE'
export const SET_SALES_STATE = 'sales/SET_SALES_STATE'
export const CLEAR_SALES_STATE = 'sales/CLEAR_SALES_STATE'
export const ALL_SALES_ACTIONS = [ INIT_SALES_STATE, SET_SALES_STATE, CLEAR_SALES_STATE ]

export const initSalesState = (payload) => {
	return(dispatch=>{dispatch({type:INIT_SALES_STATE, payload:payload})})
}
export const setSalesState = (payload) => {
	return(dispatch=>{dispatch({type:SET_SALES_STATE, payload:payload})})
}
export const clearSalesState = () => {
	return(dispatch=>{dispatch({type:CLEAR_SALES_STATE})})
}

export const getSale = (payload)=>{return(async (dispatch, getState) => {
	//QUERY, PARAMS, JSON BODY & VALIDATE
	if(!checkParams(payload, ['s_id']))
		return dispatch(handleError({error: new Error('Parameter is Required')}))
	const { s_id } = payload
	const url = `${API_URL}/sales/${s_id}`

	//CALL RESPONSE
	const response = await axios.get(url).catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'salesReducer'}))
		}else if(error.response.status==404){
			return dispatch(handleError({error: error, from:'salesReducer', alertMsg:'매물을 찾을 수 없습니다'}))
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'salesReducer'}))
		}
	})
	if(!response || !response.data) return;
	
	//MAKE PAYLOAD
	const newSale = Object.assign({},response.data.results)
	const price = getPriceTag(newSale)
	newSale['price'] = price
	
	if(newSale.building_type && newSale.s_floor && newSale.s_use_area_m)
		newSale['infoTit01'] = `${newSale.building_type} / ${newSale.s_floor}층 / ${newSale.s_use_area_m}m²`
	if(newSale.location1 && newSale.location2 && newSale.location3)
		newSale['infoTit02'] = `${newSale.location1} ${newSale.location2} ${newSale.location3}`
	if(newSale.sf_thumb_nm)
		newSale['thumbURI'] = `${ADMIN_URL}${newSale.sf_thumb_nm}`
	
	const newPayload = { sale: newSale }
	return dispatch({type:SET_SALES_STATE, payload: newPayload})
	
})}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	s_id: null,
	sale: null,
}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const salesReducer = (state=initialState, action)=>{
	switch(action.type){
	case INIT_SALES_STATE:
		return Object.assign({}, initialState, action.payload)
	case SET_SALES_STATE:
		return Object.assign({}, state, action.payload)
	case CLEAR_SALES_STATE:
		return Object.assign({}, initialState)
	default:
		return Object.assign({}, state)
	}
}

export default salesReducer