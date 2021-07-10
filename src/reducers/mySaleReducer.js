import { API_URL, API_URL_KYU, ADMIN_URL} from "@env";
import { ceil } from "lodash";
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';

const INIT_MYSALE = "mysale/INIT_MYSALE";
const MYSALE_TOTAL_CNT = "mysale/MYSALE_TOTAL_CNT";
const LIKE_CLICK = "mysale/LIKE_CLICK";
const UNLIKE_CLICK = "mysale/UNLIKE_CLICK";

const CLEAR_DATA = "mysale/CLEAR_DATA";

export const ALL_MYSALE_ACTIONS = [
    INIT_MYSALE,
    LIKE_CLICK,
    UNLIKE_CLICK,
    MYSALE_TOTAL_CNT,
	CLEAR_DATA,
];



export const initMySale=(mID, page)=>{

    const fetchMySale = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/mySale/'+mID+"/"+page, { method: 'GET' })
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
            dispatch({ type:INIT_MYSALE, payload:result })
        })
		.catch(err=>{console.log("INIT MYSALE ACTION ERROR\n" + err)})
	})

}

export const mySaleTotalCnt=(mID)=>{

    const fetchMySale = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/mySale/total/'+mID, { method: 'GET' })
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
            dispatch({ type:MYSALE_TOTAL_CNT, payload:result.results[0] })
        })
		.catch(err=>{console.log("INIT MYSALE ACTION ERROR\n" + err)})
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

export const clearData=() =>{
	return({
		type:CLEAR_DATA
	})
}


const initialState =({
	salesList:[],
    totalCnt: 0,
    current_page:1,
    next_page:0,
})


const MySaleReducer = (state=initialState, action) =>{
    switch(action.type) {
        case INIT_MYSALE:
            var salesList = state.salesList;
            action.payload.results.forEach(element => {
                salesList.push(element);
            });
            return Object.assign({},state, {salesList: salesList, current_page:action.payload.currentPage, next_page: action.payload.nextPage});
        case LIKE_CLICK:
            state.salesList[action.payload.index].like_cnt = 1;
            return Object.assign({},state, {salesList: state.salesList});
        case UNLIKE_CLICK:
            state.salesList[action.payload.index].like_cnt = 0;
            return Object.assign({},state, { salesList: state.salesList });
        case MYSALE_TOTAL_CNT:
            return Object.assign({},state, { totalCnt: action.payload.total_cnt });
		case CLEAR_DATA:
            return Object.assign({},state, { salesList: [], totalCnt:0, current_page:1, next_page:0 });
			
        default:
            return Object.assign({},state, {});
    }

}


export default MySaleReducer;


