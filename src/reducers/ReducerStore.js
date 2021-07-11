/* COMMON */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { filterActions } from 'redux-ignore';
import ReactThunk from 'redux-thunk';

//@Ahn
import sampleReducer, { ALL_SAMPLE_ACTIONS } from '../reducers/sampleReducer';
import centralReducer, { ALL_CENTRAL_ACTIONS } from '../reducers/centralReducer';
import chatReducer, { ALL_CHAT_ACTIONS } from '../reducers/chatReducer';

//@Moon
import indexReducer, { ALL_INDEX_ACTIONS } from '../reducers/indexReducer';
import memberReducer, { ALL_MEMBER_ACTIONS } from '../reducers/memberReducer';
import salesReducer, { ALL_SALES_ACTIONS } from '../reducers/salesReducer';
import authReducer, { ALL_AUTH_ACTIONS } from '../reducers/authReducer';
import memberInfoReducer, { ALL_MEMBER_INFO_ACTIONS } from '../reducers/memberInfoReducer';
import boardReducer, { ALL_BOARD_ACTIONS } from '../reducers/boardReducer';
import FindPWReducer, { ALL_FINDPW_ACTIONS } from '../reducers/boardReducer';

const reducers = combineReducers({
	//@Ahn
	sampleReducer: filterActions(sampleReducer, ALL_SAMPLE_ACTIONS ),
	centralReducer: filterActions(centralReducer, ALL_CENTRAL_ACTIONS ),
	chatReducer: filterActions(chatReducer, ALL_CHAT_ACTIONS ),

	//@Moon
	indexReducer: filterActions(indexReducer, ALL_INDEX_ACTIONS ),
	memberReducer: filterActions(memberReducer, ALL_MEMBER_ACTIONS ),
	salesReducer: filterActions(salesReducer, ALL_SALES_ACTIONS ),
	authReducer: filterActions(authReducer, ALL_AUTH_ACTIONS ),
	memberInfoReducer: filterActions(memberInfoReducer, ALL_MEMBER_INFO_ACTIONS ),

	boardReducer:		filterActions(boardReducer,  ALL_BOARD_ACTIONS),
	findPWReducer:		filterActions(FindPWReducer,  ALL_FINDPW_ACTIONS),
})

const Store = createStore(reducers, applyMiddleware(ReactThunk));

export default Store;