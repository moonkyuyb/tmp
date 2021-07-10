/* ENVIRONMENTS */
import { API_URL } from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const GET_CODES = 'code/GET_CODES'
export const ALL_CODE_ACTIONS = [ GET_CODES ]

export const getCodes = (payload) => {
    // console.log(API_URL+'/code/'+payload);
	const fetchGetCodes = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/code/'+payload, { method: 'GET' })
			.then(response=>{
				// console.log(response);
				response.json().then((result)=>{
					if(response.ok && result.results) resolve(result)
					else reject(new Error(result.msg))
				})
			})
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}
	return(dispatch=>{
		fetchGetCodes()
		.then(result=>{
            result['division'] = payload;
            dispatch({ type:GET_CODES, payload:result })
        })
		.catch(err=>{console.log(err)})
	})
}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	codes: {}, //results: [banks: [{label:'foo', value:'bar'}, ... ], *division: [{label:'foo', value:'bar'}, ... ]]
}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const codeReducer = (state=initialState, action)=>{
	switch(action.type){
		case GET_CODES:
        var newCodes = Object.assign({},state.codes)
        newCodes[action.payload.division] = action.payload.results
		return Object.assign({},state,{
			codes: newCodes
		})

		default:
		return Object.assign({}, state)
	}
}

export default codeReducer