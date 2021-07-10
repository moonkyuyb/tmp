import { API_URL } from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";
import { encryptWithSHA256 } from '../utils/common';

export const FIND_PW = "findPW/FIND_PW";
export const HANDLE_POP = "findPW/HANDLE_POP";

export const ALL_FINDPW_ACTIONS = [
    FIND_PW,
    HANDLE_POP,
]


export const findPW = (payload) =>{

    var newPass = Math.random().toString(36).substr(2,11);
    var cryptoNewPass = encryptWithSHA256(newPass);
    
    payload['new_pass'] = newPass;
    payload['new_pass_crypto']=cryptoNewPass;
    const fetchFindPW = () =>{
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/member/findPW', { 
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
		fetchFindPW()
		.then(result=>{dispatch({ type:FIND_PW, payload:result })})
		.catch((err) => {console.log("== ❌ FIND_PW ERROR\n" + err)})
	})
}

export const handlePop = () =>{
    return({
        type:HANDLE_POP
    })
}

const initialState={
    resultMSG:[],
    resultCode:[]
}

const FindPWReducer = (state=initialState, action) =>{
    switch(action.type) {

        case FIND_PW:
            return Object.assign({}, state, {resultMSG: [action.payload.msg], resultCode:[action.payload.code]})
        case HANDLE_POP:
            var resultCode = state.resultCode[0];
            return Object.assign({}, state, {resultCode:[resultCode=="0000"?"":"0000"]})

        default:
            return Object.assign({}, state,{})
        
    }
}

export default FindPWReducer



