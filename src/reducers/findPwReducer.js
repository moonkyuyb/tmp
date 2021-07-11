import { API_URL } from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";
import { encryptWithSHA256 } from '../utils/common';
import { handleError, setCentralState } from "./centralReducer";
import axios from "axios";

import qs from 'qs';

export const INIT_FINDPW_STATE 		= 'findPW/INIT_FINDPW_STATE';
export const SET_FINDPW_STATE 		= 'findPW/SET_FINDPW_STATE';
export const CLEAR_FINDPW_STATE 	= 'findPW/CLEAR_FINDPW_STATE';
export const FIND_PW 				= "findPW/FIND_PW";
export const HANDLE_POP 			= "findPW/HANDLE_POP";

export const ALL_FINDPW_ACTIONS = [
    FIND_PW,
    HANDLE_POP,
	INIT_FINDPW_STATE, 
	SET_FINDPW_STATE,
	CLEAR_FINDPW_STATE,
]

export const findPW =  (payload) =>{return(async(dispatch, getState) => {

	//QUERY, PARAMS, JSON BODY & VALIDATE

	const url = `${API_URL}/member/findPW`
	console.log(url);
	//CALL RESPONSE
	const options = {
		headers: { 
			'Accept': 'application/json',
			'Content-Type': 'application/json' },
		data: qs.stringify(payload),
		url,
	};
	const response = await axios.post(url, options)
		.catch(error=>{
		if(!error.response){
			return dispatch(handleError({error: new Error('Network Error'), from:'FindPWReducer'}));
		}else if(error.response.status==404){
			return dispatch(handleError({error: error, from:'FindPWReducer', alertMsg:'찾을 수 없는 정보 입니다'}));
		}else if(error.response.status!=200){
			return dispatch(handleError({error: error, from:'FindPWReducer'}));
		}
	});
	if(!response || !response.data) return;

	//MAKE PAYLOAD
	const findPW = response.data.results
	const newPayload = { response: findPW }
	dispatch({type:FIND_PW, payload: newPayload})
	dispatch(setCentralState({loading: false}))
})


	/*
	
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
	*/
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



