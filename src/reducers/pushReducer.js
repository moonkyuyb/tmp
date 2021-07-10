import {API_URL} from '@env';
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';

const PUSH_INIT = "push/PUSH_INIT";
const PUSH_UPDATE = "push/PUSH_UPDATE";

export const ALL_PUSH_ACTIONS = [
    PUSH_INIT,
    PUSH_UPDATE,
];


export const pushInit = (payload) => {
    const getDateData = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/member/myPage/getPush/'+payload, { 
                method: 'GET',
                headers:{
                    "Cache-control": "no-cache, no-stor, must-reavalidate",
                    "Pragma":"no-cache",
                    "Expires":0
                }
            })
			.then(response=>{      
				response.json().then((result)=>{
					if(response.ok && result.results) resolve(result)
					else reject(new Error(result.msg))
				})
			})
            .catch((err)=>{
                console.log(err);
            })
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}
	return(dispatch=>{
		getDateData()
		.then(result=>{
            dispatch({ type:PUSH_INIT, payload:result })
        })
		.catch(err=>{
            console.log("== ❌ PUSH_INIT ACTION ERROR\n" + err)
        })
	})
}


export const setPushSetting = (payload) =>{

    const getDateData = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/member/myPage/setPush', { 
                method: 'POST',
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
            .catch((err)=>{
                console.log(err);
            })
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}
	return(dispatch=>{
		getDateData()
		.then(result=>{
            dispatch({ type:PUSH_UPDATE, payload:result })
        })
		.catch(err=>{
            console.log("== ❌ PUSH_UPDATE ACTION ERROR\n" + err)
        })
	})
    
}



const initialState = {
    pushState:{},
    updateState:{}
}

const PushReducer = (state=initialState, action) =>{

    switch(action.type) {
        case PUSH_INIT:
            return Object.assign({}, state, {pushState:action.payload.results})
        case PUSH_UPDATE:
            console.log(action.payload);
            return Object.assign({}, state, {updateState:action.payload.results})
        default:
            return Object.assign({}, state, {});

    }


}

export default PushReducer;




