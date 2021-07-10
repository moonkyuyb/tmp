import { API_URL } from "@env";
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';
import { SHOW_ALERT_MESSAGE } from "../reducers/commonReducer";

const INIT_REGISTER = "register/INIT_REGISTER";
const REQUEST_REGI  = "register/REQUEST_REGI";


export const ALL_REGISTER_ACTIONS = [
    INIT_REGISTER,
]


export const showAlertMessage = (payload) =>{
	console.log("alert msg");
	return(dispatch=>{
		dispatch({
			type:SHOW_ALERT_MESSAGE,
			payload:payload
		})
	})
	
}

export const initRegister = (payload) =>{

	const getMyData = () => {
		const promisedFetch = new Promise((resolve, reject) => {

			fetch(API_URL + '/member/myPage/' + payload.mID,
				{
					headers:{
						"AUTHORIZATION":'Bearer '+payload.token
					},
					method: 'GET',
				}
			)
				.then(response => {
					response.json().then((result) => {
						if (response.ok && result.results) resolve(result)
						else reject(new Error(result.msg))
					})
				})
				.catch(err => {

				})
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}
	return (dispatch => {
		getMyData()
			.then(result => { 
                dispatch({ type: INIT_REGISTER, payload: result }) 
            })
			.catch((err) => { console.log("== ❌ INIT_REGISTER ACTION ERROR\n" + err) })
	})
}

export const requestRegist = (payload) =>{
    console.log(JSON.stringify( payload ));
    const requestRegist = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/sales/sales/add', { 
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify( payload )
				
			})
			.then(response=>{
				//console.log(response);
				
				response.json()
				.then((result)=>{
					if(response.ok && result.results) resolve(result)
					else reject(new Error(result.msg))
				})
				.catch((err)=>{

				})
				
			})
			.catch((err)=>{
				console.log(err)
			})
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}
	return (dispatch => {
		requestRegist()
			.then(result => { 
                dispatch({ type: REQUEST_REGI, payload: result }) 
            })
			.catch((err) => { console.log("== ❌ REQUEST_REGI ACTION ERROR\n" + err) })
	})
}

const initialState = {
    myData: {
		m_name: "",
		m_username: "",
		m_mail: "",
		m_phone: "",
    }
}

const RegisteReducer = (state=initialState, action) =>{
    switch(action.type) {
        case INIT_REGISTER:
            return Object.assign({}, state,{
				myData: action.payload.results[0]
			})

        default:
            return Object.assign({},state, {});

    }

}

export default RegisteReducer


