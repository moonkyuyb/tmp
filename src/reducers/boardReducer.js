import { API_URL} from "@env";
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { handleError, setCentralState } from "./centralReducer";
import { checkParams } from "../utils/common";

// action
export const INIT_BOARD_STATE 	= "board/INIT_BOARD_STATE";
export const CLEAR_BOARD_STATE 	= "board/CLEAR_BOARD_STATE";
export const SET_BOARD_STATE	= "board/SET_BOARD_STATE";

export const BOARD_CNT = "board/BOARD_CNT";
export const FAQ_SELECT = "board/FAQ_SELECT";
export const EVENT_DETAIL = "board/EVENT_DETAIL";

export const ALL_BOARD_ACTIONS = [
    INIT_BOARD_STATE,
	CLEAR_BOARD_STATE,
	SET_BOARD_STATE,

    BOARD_CNT,
	FAQ_SELECT,
	EVENT_DETAIL,
]; 

export const initBoardState = () => {
	
	return(dispatch=>{dispatch({type:INIT_BOARD_STATE, payload:payload})})
}
export const clearBoardState = () => {
	return(dispatch=>{dispatch({type:CLEAR_BOARD_STATE, payload:payload})})
}
export const setBoardState = () => {
	return(dispatch=>{dispatch({type:SET_BOARD_STATE, payload:payload})})
}

export const getBoard = (payload) =>{
	return(async(dispatch, getState) => {

		//console.log(`💬[sampleReducer.getSample] payload: `, payload) //필요하지 않을 경우 주석처리
		dispatch(setCentralState({loading: true}))

		//QUERY, PARAMS, JSON BODY & VALIDATE
		//if(!checkParams(payload, ['spl_id']))
		//	return dispatch(handleError({error: new Error('Parameter is Required')}))
		//const {spl_id} = payload
		const url = `${API_URL}/board/content/${payload.division}/${payload.page}`
		console.log(url);
		//CALL RESPONSE
		const response = await axios.get(url).catch(error=>{
			if(!error.response){
				return dispatch(handleError({error: new Error('Network Error'), from:'boardReducer'}))
			}else if(error.response.status==404){
				return dispatch(handleError({error: error, from:'boardReducer', alertMsg:'게시글을 불러올 수 없습니다.'}))
			}else if(error.response.status!=200){
				return dispatch(handleError({error: error, from:'boardReducer'}))
			}
		})
		if(!response || !response.data) return;

		//MAKE PAYLOAD
		const newSample = response.data.results
		const page = response.data.page
		const nextPage = response.data.nextPage
		const newPayload = { board: newSample, page:page, nextPage:nextPage  }
		dispatch({type:SET_BOARD_STATE, payload: newPayload})
		dispatch(setCentralState({loading: false}))
	})
}


export const boardCnt = (payload) =>{
	return(async(dispatch, getState) => {

		//console.log(`💬[sampleReducer.getSample] payload: `, payload) //필요하지 않을 경우 주석처리
		dispatch(setCentralState({loading: true}))

		//QUERY, PARAMS, JSON BODY & VALIDATE
		//if(!checkParams(payload, ['spl_id']))
		//	return dispatch(handleError({error: new Error('Parameter is Required')}))
		//const {spl_id} = payload
		const url = `${API_URL}/board/count/${payload.tcb_id}`

		//CALL RESPONSE
		const response = await axios.get(url).catch(error=>{
			if(!error.response){
				return dispatch(handleError({error: new Error('Network Error'), from:'boardReducer'}))
			}else if(error.response.status==404){
				return dispatch(handleError({error: error, from:'boardReducer', alertMsg:'찾을 수 없는 게시글입니다'}))
			}else if(error.response.status!=200){
				return dispatch(handleError({error: error, from:'boardReducer'}))
			}
		})
		if(!response || !response.data) return;

		//MAKE PAYLOAD
		const newSample = response.data.results
		const newPayload = { board: newSample }
		dispatch({type:BOARD_CNT, payload: newPayload})
		dispatch(setCentralState({loading: false}))
	})
	
}

//
export const getEventDetail = (payload) =>{

	return(async(dispatch, getState) => {

		//console.log(`💬[sampleReducer.getSample] payload: `, payload) //필요하지 않을 경우 주석처리
		dispatch(setCentralState({loading: true}))

		//QUERY, PARAMS, JSON BODY & VALIDATE
		//if(!checkParams(payload, ['spl_id']))
		//	return dispatch(handleError({error: new Error('Parameter is Required')}))
		//const {spl_id} = payload
		const url = `${API_URL}/board/detail/event/${payload.id}`

		//CALL RESPONSE
		const response = await axios.get(url).catch(error=>{
			if(!error.response){
				return dispatch(handleError({error: new Error('Network Error'), from:'boardReducer'}))
			}else if(error.response.status==404){
				return dispatch(handleError({error: error, from:'boardReducer', alertMsg:'찾을 수 없는 게시글입니다'}))
			}else if(error.response.status!=200){
				return dispatch(handleError({error: error, from:'boardReducer'}))
			}
		})
		if(!response || !response.data) return;

		//MAKE PAYLOAD
		const newSample = response.data.results
		const newPayload = { board: newSample }
		dispatch({type:EVENT_DETAIL, payload: newPayload})
		dispatch(setCentralState({loading: false}))
	})

	/*
	const fetchEventDetail = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/board/detail/event/'+payload.id, 
			{
				method: 'get',
			}
			)
			.then(response=>{
				response.json().then((result)=>{
					if(response.ok && result.results) resolve(result)
					else reject(new Error(result.msg))
				})
			})
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}
	return(dispatch=>{
		fetchEventDetail()
		.then(result=>{dispatch({ type:EVENT_DETAIL, payload:result })})
		.catch((err) => {console.log("== ❌ BOARD_INIT ERROR\n" + err)})
	})
	*/
}

export const clearNotice = () =>{
	return({
		type:CLEAR_NOTICE
	})
}

export const onFaqCatSelect = () =>{
	return({
		type:FAQ_SELECT
	})
}


const initialState = {
    //noticeList:[],
	page:0,
	nextPage:1,
	eventDetail:[],
	boardList:[],
}


const boardReducer = (state=initialState, action) =>{
    
    switch(action.type) {
        case INIT_BOARD_STATE:
            return Object.assign({},state, {initialState})
		
		case CLEAR_BOARD_STATE:
            return Object.assign({},state, {initialState})
		
		case SET_BOARD_STATE:
			//console.log(action.payload.board) 
			var boardList = state.boardList;
			var newBoardList = boardList.concat(action.payload.board);

			return Object.assign({}, state, {boardList:newBoardList, page:action.payload.page, nextPage:action.payload.nextPage})

		case EVENT_DETAIL:
			console.log(action.payload);
            return Object.assign({},state, {eventDetail:action.payload.board})

        default:
            return Object.assign({},state, {})
    }

}

export default boardReducer;


