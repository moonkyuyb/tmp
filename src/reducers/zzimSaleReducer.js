import { API_URL, API_URL_KYU, ADMIN_URL} from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";

const GET_ZZIM_LIST = "zzim/GET_ZZIM_LIST";
const GET_ZZIM_DANJI_LIST = "zzim/GET_ZZIM_DANJI_LIST";
const INIT_ZZIM_LIST = "zzim/INIT_ZZIM_LIST";
const LIKE_CLICK = "zzim/LIKE_CLICK";
const UNLIKE_CLICK = "zzim/UNLIKE_CLICK";
const TOTAL_ZZIM_CNT = "zzim/TOTAL_ZZIM_CNT";
const ON_CHECK_ITEM = "zzim/ON_CHECK_ITEM";
const ON_CHECK_DANJI = "zzim/ON_CHECK_DANJI";
const ON_DELETE_DANJI = "zzim/ON_DELETE_DANJI";

export const ALL_ZZIM_SALES_ACTION =[
    GET_ZZIM_LIST,
    TOTAL_ZZIM_CNT,
    LIKE_CLICK,
    UNLIKE_CLICK,
    ON_CHECK_ITEM,
    INIT_ZZIM_LIST,
	GET_ZZIM_DANJI_LIST,
	ON_CHECK_DANJI,
	ON_DELETE_DANJI,
] 

export const getZzimCount = (payload) =>{
    const fetchZzimCnt = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/zzim/count/'+payload.mID, { method: 'GET' })
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
		fetchZzimCnt()
		.then(result=>{
            dispatch({ type:TOTAL_ZZIM_CNT, payload:result })
        })
		.catch(err=>{console.log("TOTAL_ZZIM_CNT ACTION ERROR\n" + err)})
	})
}


export const initZimList = (payload) =>{
    //console.log("zzim list!!!");
    //console.log(payload);
    return(
        { type:INIT_ZZIM_LIST }
    )
    /*
    const fetchZzimSale = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/zzim/'+payload.cat+"/"+payload.mID+"/"+payload.page, { method: 'GET' })
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
		fetchZzimSale()
		.then(result=>{
            dispatch({ type:INIT_ZZIM_LIST, payload:result })
        })
		.catch(err=>{
            console.log("INIT ZZIM LIST ACTION ERROR\n" + err)
        })
	})
    */

}



export const getZimList = (payload) =>{
    console.log("zzim list!!!");
    console.log(API_URL+'/sales/zzim/'+payload.cat+"/"+payload.mID+"/"+payload.page+(payload.dCode?"/"+payload.dCode:"") );
    const fetchZzimSale = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/zzim/'+payload.cat+"/"+payload.mID+"/"+payload.page+(payload.dCode?"/"+payload.dCode:""), { method: 'GET' })
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
		fetchZzimSale()
		.then(result=>{
            dispatch({ type:GET_ZZIM_LIST, payload:result })
        })
		.catch(err=>{console.log("ZZIM LIST ACTION ERROR\n" + err)})
	})

}

export const likeClicked=(payload, index)=>{

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
		.then(result=>{
            result.results['index']=index;
            dispatch({ type:LIKE_CLICK, payload:result.results 
            })
        })
		.catch((err) => {console.log("== ❌ MY SALE LIKE ERROR\n" + err)})
	})

}

export const unlikeClicked=(payload, index)=>{
    const fetchMySale = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/like/', {
                method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(payload)
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
		fetchMySale()
		.then(result=>{
			result.results['index']=index;
            dispatch({ type:UNLIKE_CLICK, payload:result.results })
        })
		.catch(err=>{console.log("UNLIKE ACTION ERROR\n" + err)})
	})
}

export const onCheckItem=(payload)=>{
    return({
        type:ON_CHECK_ITEM,
        payload:payload,
    })
}

export const onCheckDanji=(payload)=>{
    return({
        type:ON_CHECK_DANJI,
        payload:payload,
    })
}

export const onDeleteDanji=(payload) =>{
	const fetchDeleteDanji = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/deleteDanji', {
                method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(payload)
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
		fetchDeleteDanji()
		.then(result=>{
            dispatch({ type:ON_DELETE_DANJI, payload:result.results })
        })
		.catch(err=>{console.log("GET_ZZIM_DANJI_LIST ACTION ERROR\n" + err)})
	})

}

export const getDanji=(payload) =>{
	const fetchLikeDanji = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/likeDanji/'+payload, {
                method: 'GET',
				
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
		fetchLikeDanji()
		.then(result=>{
            dispatch({ type:GET_ZZIM_DANJI_LIST, payload:result.results })
        })
		.catch(err=>{console.log("GET_ZZIM_DANJI_LIST ACTION ERROR\n" + err)})
	})
}

const initialState = {
    zzimList:[],
    zzimDanjiList:[],
    tab: "sales",
    current_page:1,
    next_page:0,
    total_cnt:0,
	danji_total_cnt:0,
    checked_item:[],
	checked_danji:[],
}

const ZzimSaleReducer = (state=initialState, action) =>{

    switch(action.type) {
        case INIT_ZZIM_LIST:
            return Object.assign({}, state, {
				zzimList:[],
				zzimDanjiList:[],
				tab: "sales",
				current_page:1,
				next_page:0,
				total_cnt:0,
				danji_total_cnt:0,
				checked_item:[],
				checked_danji:[],});

        case GET_ZZIM_LIST:
            var result = [];
			
            action.payload.results.forEach(el => {
                result.push(el)
            });
            return Object.assign({}, state, {zzimList:result, current_page:action.payload.current_page, next_page:action.payload.next_page });
        case LIKE_CLICK:
            state.zzimList[action.payload.index].like_cnt = 1;
            return Object.assign({},state, {zzimList: state.salesList});
        case UNLIKE_CLICK:
            //console.log(`sales list: ${state.salesList[action.payload.index]}`);
            
            if (state.zzimList[action.payload.index] != undefined) {
                state.zzimList[action.payload.index].like_cnt = 0;
            }
            
            return Object.assign({},state, { zzimList: state.zzimList });
        case TOTAL_ZZIM_CNT:
            return Object.assign({},state, { total_cnt: action.payload.results.like_cnt, danji_total_cnt:action.payload.results.like_danji_cnt });
		case GET_ZZIM_DANJI_LIST:
            return Object.assign({},state, { zzimDanjiList: action.payload });

        case ON_CHECK_ITEM:
            return Object.assign({},state, {checked_item:action.payload} );
		
		case ON_CHECK_DANJI:
            return Object.assign({},state, {checked_danji:action.payload} );
		case ON_DELETE_DANJI:
            return Object.assign({},state, {checked_danji:state.checked_danji} );


        default:
            return Object.assign({}, state, {});
    }
}

export default ZzimSaleReducer;


