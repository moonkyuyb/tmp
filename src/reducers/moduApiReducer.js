/* ENVIRONMENTS */
import { MODU_API_KEY } from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";

/* CONSTANT */

// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const MODU_API_INIT = 'moduApi/MODU_API_INIT'
export const MODU_API_CALL = 'moduApi/MODU_API_CALL'

export const ALL_MODU_API_ACTIONS = [ MODU_API_INIT, MODU_API_CALL, ]

export const moduApiInit = () => { dispatch({type:MODU_API_INIT}) }

export const moduApiCall = (payload) => {
	console.log(`🔄APIKEY: ${MODU_API_KEY}`)

	console.log(`⏬ACTION PAYLOAD`);
	console.log(payload);

	const params = {
		name: payload.name,
		phone: payload.phone,
	}

	console.log(`⏬PARAMS`);
	console.log(params);

	const url = 'https://api.modusign.co.kr/documents/request-with-template';
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Api-Key': MODU_API_KEY
		},
		body: JSON.stringify({
			"document": {
				"title": "[샘플] 서명요청 체험문서 (YBN)",
				"participantMappings": [
					{
						"signingMethod":{
							"type": "KAKAO",
							"value": params.phone
						},
						"verification": {
							"password": {},
							"mobileIdentification": {"name": params.name, "phoneNumber": params.phone}
						},
						"role": "임대인",
						"name": params.name
					}
				]
			},
			"templateId": "586e16f0-c372-11eb-b093-3503b3087260"
		})
	};
	console.log(`⏬ URL, OPTIONS ===============`);
	console.log(url);
	console.log(options);

	const fetchModuApiCall = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(url,options)
			.then(responce=>{
				console.log(`✅GET RESPONCE⏬ [IS OK?: ${responce.ok}]`);
				console.log(responce);
				responce.json().then((result)=>{
					if(responce.ok) resolve(result)
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
		fetchModuApiCall()
		.then(result=>{
			console.log(`💬RESULT`);
			console.log(result);
			dispatch({type:MODU_API_CALL, payload:result})
		})
		.catch(err=>{
			console.log(`❎ACTION ERROR: ${err.message}`);
		})
	})
}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	test: 'test'
}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const moduApiReducer = (state=initialState, action)=>{
	switch(action.type){
		case MODU_API_INIT:
		return Object.assign({}, initialState)

		case MODU_API_CALL:
		console.log(`⏬REDUCER PAYLOAD: MODU_API_CALL`);
		console.log(action.payload);
		return Object.assign({}, state, {
		})

		default:
		return Object.assign({}, state)
	}
}

export default moduApiReducer