// ✔ TYPE & ACTIONS //////////////////////////////////////////////////////////
export const INIT_COMMON_STATE	= 'common/INIT_COMMON_STATE'
export const SET_COMMON_STATE	= 'common/SET_COMMON_STATE'
export const CLEAR_COMMON_STATE	= 'common/CLEAR_COMMON_STATE'
export const SHOW_ALERT_MESSAGE	= 'common/SHOW_ALERT_MESSAGE'
export const ALL_COMMON_ACTIONS	= [ INIT_COMMON_STATE, SET_COMMON_STATE, CLEAR_COMMON_STATE, SHOW_ALERT_MESSAGE ]

export const initCommonState = (payload) => {
	return(dispatch=>{ dispatch({ type:INIT_COMMON_STATE, payload:payload }) })
}

export const setCommonState = (payload) => {
	return(dispatch=>{ dispatch({ type:SET_COMMON_STATE, payload:payload }) })
}

export const clearCommonState = (payload) => {
	return(dispatch=>{ dispatch({ type:CLEAR_COMMON_STATE, payload:payload }) })
}

export const showAlertMessage = (payload) => {
	return(dispatch=>{
		dispatch({
			type:SHOW_ALERT_MESSAGE,
			payload:payload
		})
	})
}

// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
	alertMessage: '',
}

// ✔ REDUCER /////////////////////////////////////////////////////////////////
const commonReducer = (state=initialState, action)=>{
	switch(action.type){
		case INIT_COMMON_STATE:
		return Object.assign({},state,initialState)

		case SET_COMMON_STATE:
		return Object.assign({},state,action.payload)

		case CLEAR_COMMON_STATE:
		return Object.assign({},state,initialState)

		case SHOW_ALERT_MESSAGE:
		return Object.assign({},state,{
			alertMessage: action.payload
		})

		default:
		return Object.assign({}, state)
	}
}

export default commonReducer
