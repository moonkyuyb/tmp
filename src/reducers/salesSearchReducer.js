import { defaultTo } from 'lodash';
import {SET_SEARCH_LOCATION, SET_FILTER_COMPLETE} from './searchFilterReducer';


export const setSearchLocation = (location) =>{ 

    return({
        type:SET_SEARCH_LOCATION,
        payload:location
    })
}

export const setFilterComplete = (isComplete) =>{
    return({
        type:SET_FILTER_COMPLETE,
        payload:isComplete
    })
}

const initialState = [{

}]

const SearchLocationReducer = (state=initialState, action) =>{

    switch(action.type) {
        default:
            return Object.assign(state, {});
    }

}


export default SearchLocationReducer;

