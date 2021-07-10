/* COMMON */
import { connect } from 'react-redux'

/* SCREEN & COMPONETS */
import IndexScreen from "../screen/IndexScreen"

//INDEX REDUCER
import { initIndexState, setIndexState, clearIndexState, syncIndexState } from "../reducers/indexReducer"

const indexStateToProps = (state) => {
	return{
		//INDEX REDUCER
		index: state.indexReducer.index
	}
}

const indexDispatchToProps = (dispatch) => {
	return{
		//INDEX REDUCER
		initIndexState: (payload) => {dispatch(initIndexState(payload))},
		setIndexState: (payload) => {dispatch(setIndexState(payload))},
		clearIndexState: (payload) => {dispatch(clearIndexState(payload))},
		syncIndexState: (payload) => {dispatch(syncIndexState(payload))},
	}
}

export const IndexContainer = connect(indexStateToProps, indexDispatchToProps)(IndexScreen)