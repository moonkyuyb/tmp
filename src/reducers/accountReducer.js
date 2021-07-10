import { API_URL } from "@env";
import { fetchWithTimeout } from '../utils/networking/NetworkRequest';
import { SHOW_ALERT_MESSAGE } from "../reducers/commonReducer";
import axios from 'axios';


export const GET_MY_DATA = "myPage/GET_MY_DATA";
export const PUT_MY_IMG = "myPage/PUT_MY_IMG";
export const UPDATE_NAME = "mypage/UPDATE_NAME";
export const INIT_UPDATE_NAME = "mypage/INIT_UPDATE_NAME";

export const UPDATE_CONTACT_TIME = "mypage/UPDATE_CONTACT_TIME";
export const SHOW_CONFIRM		=	"mypage/SHOW_CONFIRM";
export const SHOW_ALERT		=	"mypage/SHOW_ALERT";
export const LOG_OUT			= "mypage/LOG_OUT";
export const MAIN_DATA		= "mypage/MAIN_DATA";
export const ALL_ACCOUNT_ACTION = [
	GET_MY_DATA,
	PUT_MY_IMG,
	UPDATE_NAME,
	INIT_UPDATE_NAME,
	UPDATE_CONTACT_TIME,
	SHOW_CONFIRM,
	LOG_OUT,
	SHOW_ALERT,
	MAIN_DATA,
];

//actions
export const getMainData = (payload) => {
	console.log("getMainDatagetMainDatagetMainDatagetMainDatagetMainDatagetMainDatagetMainDatagetMainDatagetMainData");
	console.log(API_URL + '/member/myPage/mainInfo/' + payload.mID);
	const getMyData = () => {
		const promisedFetch = new Promise((resolve, reject) => {

			fetch(API_URL + '/member/myPage/mainInfo/' + payload.mID,
				{
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
			.then(result => { dispatch({ type: MAIN_DATA, payload: result }) })
			.catch((err) => { console.log("== ❌ MAIN_DATA ACTION ERROR\n" + err) })
	})
}
export const getMyData = (payload) => {

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
			.then(result => { dispatch({ type: GET_MY_DATA, payload: result }) })
			.catch((err) => { console.log("== ❌ GET MYDATA ACTION ERROR\n" + err) })
	})
}

export const uploadToServer = async  (payload) => {

	var formData = new FormData();
	// 파일 업로드
    formData.append({
		name:"files",
        tmpName: payload.fileData.fileName,
        type: payload.fileData.type,
        mId: payload.mID,
        base64: payload.fileData.base64,
		uploadType:"members"
    })
      
	axios.headers = {
        "content-type": "multipart/form-data"
    };
	return await axios.post(API_URL+'/fileUpload', 
				{
					formData
				}
	)

}

export const putImgData = (payload) =>{
	const putMyImg = () => {
		const promisedFetch = new Promise((resolve, reject) => {

			fetch(API_URL + '/member/myPage/image',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify(payload)
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
		putMyImg()
			.then(result => { dispatch({ type: PUT_MY_IMG, payload: result }) })
			.catch((err) => { console.log("== ❌ PUT MY IMG ACTION ERROR\n" + err) })
	})

}

// 이름 변경
export const initUpdateName = () => {
	return (
		{
			type: INIT_UPDATE_NAME
		}
	)
}
export const updateName = (payload) =>{
	console.log("update name");
	const putMyImg = () => {
		const promisedFetch = new Promise((resolve, reject) => {

			fetch(API_URL + `/member/myPage/changeName`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify(payload)
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
		putMyImg()
			.then(result => { dispatch({ type: UPDATE_NAME, payload: result }) })
			.catch((err) => { console.log("== ❌ UPDATE NAME ACTION ERROR\n" + err) })
	})
}

export const updateContactTime = (payload) =>{
	const updateContact = () => {
		const promisedFetch = new Promise((resolve, reject) => {

			fetch(API_URL + `/member/myPage/avTime`,
				{
					method: 'POST',
					
					headers: {
						"AUTHORIZATION":'Bearer '+payload.user_info.token,
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify(payload)
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
		updateContact()
			.then(result => { dispatch({ type: UPDATE_NAME, payload: result }) })
			.catch((err) => { console.log("== ❌ UPDATE CONTACT TIME ACTION ERROR\n" + err) })
	})
}

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


export const logout = (payload) =>{
	const updateContact = () => {
		const promisedFetch = new Promise((resolve, reject) => {

			fetch(API_URL + `/auth/signout`,
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
						console.log(result);
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
		updateContact()
			.then(result => {console.log(result);  dispatch({ type: SHOW_ALERT, payload: result.results.msg }) })
			.catch((err) => { console.log("== ❌ LOG_OUT TIME ACTION ERROR\n" + err) })
	})

}


const initialState = {
	mainData:{
		like_cnt:0,
		like_danji_cnt:0,
		sales_cnt:0,
		contract_cnt:0,
	},
	myData: {
		m_name: "",
		m_username: "",
		m_mail: "",
		m_phone: "",
		m_appr_yn:0,
		mc_weekday_from_ampm: 0,
		mc_weekday_from_hour: "",
		mc_weekday_from_minute: "",
		mc_weekday_to_ampm: 0,
		mc_weekday_to_hour: "",
		mc_weekday_to_minute: "",

		mc_holiday_from_ampm: 0,
		mc_holiday_from_hour: "",
		mc_holiday_from_minute: "",
		mc_holiday_to_ampm: 0,
		mc_holiday_to_hour: "",
		mc_holiday_to_minute: "",

		mf_original_nm: "",
	},
	alertMsg:"",
	confirmMsg:[],
}

const AccountReducer = (state = initialState, action) => {
	

	switch (action.type) {
		case GET_MY_DATA:
			return Object.assign({}, state,{
				myData: action.payload.results[0]
			})

		case PUT_MY_IMG:
			var newData = state.myData;
			newData.mf_original_nm = action.payload.results.fileName;
			return Object.assign({}, state, {newData});
		
		case UPDATE_NAME:
			return Object.assign({}, state, {alertMsg:action.payload.msg, m_name: action.payload.results.m_name});
		case INIT_UPDATE_NAME:
			return Object.assign({}, state, {});
		case SHOW_CONFIRM:
			if(action.payload=="") {
				return Object.assign({}, state, {confirmMsg:[]})
			}else {
				return Object.assign({}, state, {confirmMsg:[{msg:action.payload}]})
			}
		case SHOW_ALERT:
			if(action.payload=="") {
				return Object.assign({}, state, {alertMsg:""})
			}else {
				return Object.assign({}, state, {alertMsg:{msg:action.payload}})
			}
		case MAIN_DATA:
			console.log(action.payload)
			return Object.assign({}, state, {mainData:action.payload.results[0]})
		default: return state;
	}
}


export default AccountReducer;







