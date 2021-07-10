/* ENVIRONMENTS */
import { API_URL } from "@env";

/* OTHER REDUCER ACTIONS & COMMON UTILS */
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';
import { SHOW_ALERT_MESSAGE } from "../reducers/commonReducer";



export const initMain = (payload) =>{
    const fetchMyContract = () =>{
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/member/myContract/'+payload.m_id, { 
				method: 'GET',
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
		fetchMyContract()
		.then(result=>{dispatch({ type:INIT_MAIN, payload:result })})
		.catch((err) => {console.log("== ❌ INIT_MAIN ERROR\n" + err)})
	})
}

const initialState={
    contractProcess:[]
}

export const MainReducer = (state=initialState, action) =>{
    switch(action.type) {
        default:
            return Object.assign({}, state, {});
    }
}

export default MainReducer;
