/* ENVIRONMENTS */
import { ROAD_API_KEY } from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";

/* OTHER REDUCER ACTIONS & COMMON UTILS */

/* CONSTANT */
const COUNT_PER_PAGINATION = 5
const COUNT_PER_PAGE = 10
const RESULT_TYPE = 'json'

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const ROAD_API_INIT = 'roadApi/ROAD_API_INIT'
export const ROAD_API_CALL = 'roadApi/ROAD_API_CALL'
export const ROAD_API_HANDLE_SELECT = 'roadApi/ROAD_API_HANDLE_SELECT'

export const ALL_ROAD_API_ACTIONS = [ ROAD_API_INIT, ROAD_API_CALL, ROAD_API_HANDLE_SELECT ]

export const roadApiInit = () => { dispatch({type:ROAD_API_INIT}) }

export const roadApiCall = (payload) => {
	// console.log(`🔄APIKEY: ${ROAD_API_KEY}`)

	// console.log(`⏬ACTION PAYLOAD`);
	// console.log(payload);

	const keyword = payload.keyword || ''
	const currentPage = payload.currentPage || 1
	// console.log(`🔄ADDR INPUT: ${keyword}`)
	// console.log(`🔄CURRENT PAGE: ${currentPage}`)

	const params = {
		keyword:		keyword,
		currentPage:	currentPage,

		confmKey:		ROAD_API_KEY,
		countPerPage:	COUNT_PER_PAGE,
		resultType:		RESULT_TYPE,
	}

	// console.log(`⏬PARAMS`);
	// console.log(params);

	const paramStr = new URLSearchParams(params).toString()
	const searchUrl = `https://www.juso.go.kr/addrlink/addrLinkApi.do?`+paramStr
	// console.log(`🔄SEARCH URL: ${searchUrl}`);

	const fetchRoadApiCall = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(searchUrl,{method:'GET'})
			.then(responce=>{
				// console.log(`✅GET RESPONCE⏬ [IS OK?: ${responce.ok}]`);
				// console.log(responce);
				responce.json().then((result)=>{
					if(responce.ok && result.results) resolve(result)
					else reject(new Error('FETCH ERROR'))
				})
			})
			.catch(err=>{
				console.log(err);
				reject(new Error('FETCH ERROR'))
			})
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}

	return(dispatch=>{
		fetchRoadApiCall()
		.then(result=>{
			if(result.results.juso === null) result.results.juso = []

			const pagination = {}

			const currentPage = result.results.common.currentPage
			const countPerPage = result.results.common.countPerPage
			const totalCount = result.results.common.totalCount
			const countPerPagination = COUNT_PER_PAGINATION

			const totalPages = Math.ceil(totalCount/countPerPage)
			const totalPaginations = Math.ceil(Math.ceil(totalCount/countPerPage)/countPerPagination)
			const currentPagination = Math.ceil(currentPage/countPerPagination)

			const pages = []
			for (let i = 0; i < countPerPagination; i++) {
				const page = (currentPagination-1)*countPerPagination + (i+1)
				if(page <= totalPages) pages.push(page)
			}

			pagination.currentPerPagination = countPerPagination
			pagination.totalPages = totalPages
			pagination.totalPaginations = totalPaginations
			pagination.currentPagination = currentPagination

			pagination.pages = pages

			pagination.hasFirstBtn = currentPagination != 1 ? true : false
			pagination.hasLastBtn = currentPagination < totalPaginations ? true : false
			pagination.hasNextBtn = pagination.hasLastBtn
			pagination.hasPrevBtn = pagination.hasFirstBtn

			pagination.firstPage = 1
			pagination.lastPage = totalPages
			pagination.nextPage = pagination.hasNextBtn ? (currentPagination * countPerPagination + 1) : totalPages
			pagination.prevPage = pagination.hasPrevBtn ? ((currentPagination-1) * countPerPagination) : 1

			result['roadApiPagination'] = Object.assign({},pagination)
			result['roadApiParams'] = params

			// console.log(`💬RESULT`);
			// console.log(result);
			dispatch({type:ROAD_API_CALL, payload:result})
		})
		.catch(err=>{
			console.log(`❎ACTION ERROR: ${err.message}`);
		})
	})
}

export const roadApiHandleSelect = (payload) => {
	// console.log(`⏬ACTION PAYLOAD`);
	// console.log(payload);
	return(dispatch=>{
		dispatch({type:ROAD_API_HANDLE_SELECT, payload:payload})
	})
}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	roadApiParams:{},

	roadApiResultsCommon:{},
	roadApiResultsJuso:[],
	roadApiPagination:{},

	roadApiIndicator:false,
	roadApiSelectedJuso:{},
}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const roadApiReducer = (state=initialState, action)=>{
	switch(action.type){
		case ROAD_API_INIT:
		return Object.assign({}, initialState)

		case ROAD_API_CALL:
		// console.log(`⏬REDUCER PAYLOAD: ROAD_API_CALL`);
		// console.log(action.payload);
		return Object.assign({}, state, {
			roadApiParams: action.payload.roadApiParams,
			roadApiResultsCommon: action.payload.results.common,
			roadApiResultsJuso: action.payload.results.juso,
			roadApiPagination: action.payload.roadApiPagination,
		})

		case ROAD_API_HANDLE_SELECT:
		// console.log(`⏬REDUCER PAYLOAD: ROAD_API_HANDLE_SELECT`);
		// console.log(action.payload);
		return Object.assign({}, state, {
			roadApiSelectedJuso: action.payload,

			roadApiParams:{},
			roadApiResultCommon:{},
			roadApiResultJuso:[],
		})

		default:
		return Object.assign({}, state)
	}
}

export default roadApiReducer