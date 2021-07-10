
import { API_URL, API_URL_KYU, ADMIN_URL} from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";

export const GET_DANJI_LIST = 'filter/GET_DANJI_LIST';

export const GET_SALES_LIST = 'filter/GET_SALES_LIST';

// 거래 유형 리스트 받기
export const GET_PRICE_TYPE = 'filter/GET_PRICE_TYPE';
// 매물유형 리스트 받기
export const GET_BLDG_TYPE = 'filter/GET_BLDG_TYPE'
// 방 내부시설 리스트 받기
export const GET_LIVINGS = "filter/GET_LIVINGS";
// 냉/난방 방식 리스트 받기
export const GET_HEATING = "filter/GET_HEATING";
// 보안시설 리스트 받기
export const GET_SECURITY = "filter/GET_SECURITY";
// 많이 입력된 상위 10개 태그 리스트 받기
export const GET_TAGS = "filter/GET_TAGS";


//필터 적용
export const IS_FILTER = "filter/IS_FILTER";
export const SET_FILTER_COMPLETE = 'filter/SET_FILTER_COMPLETE';

// 검색
export const SET_SEARCH_LOCATION = "filter/SET_SEARCH_LOCATION";

//검색 키워드
export const SEARCH_KEYWORD = "list/SEARCH_KEYWORD";

// 좋아요
export const LIKE_CLICKED 	= "list/LIKE_CLICKED";
export const LIKE_DANJI_CLICKED 	= "list/LIKE_DANJI_CLICKED";

// 메인
export const INIT_MAIN = "main/INIT_MAIN";
export const IS_SIGNED_IN = "main/IS_SIGNED_IN";

export const ALL_SALES_LIST_ACTIONS = [
    	GET_SALES_LIST,
        GET_PRICE_TYPE,
        GET_BLDG_TYPE,
        GET_LIVINGS,
        GET_HEATING,
        GET_SECURITY,
        GET_TAGS,
		IS_FILTER,
		SET_FILTER_COMPLETE,
		LIKE_CLICKED,
		GET_DANJI_LIST,
		LIKE_DANJI_CLICKED,
		INIT_MAIN,
		IS_SIGNED_IN
    ];


export const getSalesList = (payload) => {
	//console.log("request sales data ================================================");
	//console.log(API_URL);
	//console.log(payload)
	const fetchSalesList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/sales', 
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(payload)
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
		fetchSalesList()
		.then(result=>{dispatch({ type:GET_SALES_LIST, payload:result })})
		.catch((err) => {console.log("== ❌ SALES ACTION ERROR\n" + err)})
	})
}

export const getPriceTypeList = () =>{
    console.log("getg price lsit");
    const fetchSalesList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/codes', { method: 'GET' })
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
		fetchSalesList()
		.then(result=>{dispatch({ type:GET_SALES_LIST, payload:result })})
		.catch((err) => {console.log("== ❌ SALES ACTION ERROR\n" + err)})
	})
}

export const likeDanjiClicked  = (payload) =>{
	
	const fetchLikeCLick = () =>{
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/sales/likeDanji', { 
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
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
		fetchLikeCLick()
		.then(result=>{dispatch({ type:LIKE_DANJI_CLICKED, payload:result })})
		.catch((err) => {console.log("== ❌ SALES LIKE ERROR\n" + err)})
	})

}


export const likeClicked = (payload) =>{
	
	const fetchLikeCLick = () =>{
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/sales/like', { 
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
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
		fetchLikeCLick()
		.then(result=>{dispatch({ type:LIKE_CLICKED, payload:result })})
		.catch((err) => {console.log("== ❌ SALES LIKE ERROR\n" + err)})
	})

}

export const setFilterComplete = (isComplete) =>{
    return({
        type:SET_FILTER_COMPLETE,
        payload: isComplete
    })
}

export const setSearchKeyword =(keyword) =>{
	return({
		type:SEARCH_KEYWORD,
		payload:keyword
	})
}

export const initMain = (payload) =>{
	
	const fetchMyContract = () =>{
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/member/myContract/'+payload.m_id, { 
				method: 'GET',
				headers:{
					"Cache-control": "no-cache, no-stor, must-reavalidate",
					"Pragma":"no-cache",
					"Expires":0
				},
			})
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
		fetchMyContract()
		.then(result=>{dispatch({ type:INIT_MAIN, payload:result })})
		.catch((err) => {console.log("== ❌ INIT_MAIN ERROR\n" + err)})
	})
}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	salesList:[],
	danjiList:[],
    searchPriceList:{},
    searchFilter:{},
	isFilter:false,
	searchKeyword:"",
	myContract:[],
	isSigned:[],
}


// ✔ REDUCER /////////////////////////////////////////////////////////////////
const SalesListReducer = (state=initialState, action)=>{
	const searchKeyword = action.payload;
	switch (action.type) {
		case GET_SALES_LIST:
			//console.log(action.payload.results)
			return Object.assign({}, state, {salesList: action.payload.results});
		case GET_DANJI_LIST:
			return Object.assign({}, state, {danjiList: action.payload.results});
		case INIT_MAIN:
			return Object.assign({}, state, {myContract:action.payload.results})
		case IS_FILTER:
			return Object.assign({}, state, {isFilter: action.payload});
		case SEARCH_KEYWORD:
			return Object.assign({}, state, {searchKeyword: searchKeyword});
		case IS_SIGNED_IN:
			return Object.assign({}, state, {isSigned: [!state.isSigned[0]]});

		default:
			return Object.assign({}, state)
	}
}
export default SalesListReducer;

