import { API_URL, API_URL_KYU, ADMIN_URL} from "@env";
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';

const DELETE_ACCOUNT = "delete/DELETE_ACCOUNT"

export const SHOW_CONFIRM		=	"mypage/SHOW_CONFIRM";
export const SHOW_ALERT		=	"mypage/SHOW_ALERT";
export const REQUEST_RESIGN = "mypage/REQUEST_RESIGN";

const ALL_DELETE_ACCOUNT = [
    DELETE_ACCOUNT,
    SHOW_CONFIRM,
    SHOW_ALERT,
    REQUEST_RESIGN,
]


export const showConfirm = (payload) =>{
	
	return({
		type:SHOW_CONFIRM,
		payload:payload
	})
}

export const showAlert = (payload) =>{
	return({
		type:SHOW_ALERT,
		payload:payload
	})
}

export const requestResign = (payload) => {

    const updateResign = () => {
		const promisedFetch = new Promise((resolve, reject) => {

			fetch(
                API_URL + `/member/myPage/reign`,
				{
					method: 'POST',
					headers: {
						"AUTHORIZATION":'Bearer '+payload.token,
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify(payload)
				}
			)
			.then(response => {
				console.log(response);
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
		updateResign()
			.then(result => {console.log(result);  dispatch({ type: REQUEST_RESIGN, payload: result.results.msg }); dispatch({type:SHOW_ALERT, payload:result.msg}); })
			.catch((err) => { console.log("== ❌ REQUEST_RESIGN TIME ACTION ERROR\n" + err) })
	})

}

const initialState = {
	alertMsg:[],
	confirmMsg:[],
}

const DeleteAccountReducer=(state=initialState, action) =>{
    switch(action.type) {
        case SHOW_CONFIRM:
			if(action.payload=="") {
				return Object.assign({}, state, {confirmMsg:[]})
			}else {
				return Object.assign({}, state, {confirmMsg:[{msg:action.payload}]})
			}
		case SHOW_ALERT:
			if(action.payload=="") {
				return Object.assign({}, state, {alertMsg:[]})
			}else {
				return Object.assign({}, state, {alertMsg:[{msg:action.payload}]})
			}
        default:
            return Object.assign({},state,{})
    }
}

export default DeleteAccountReducer
