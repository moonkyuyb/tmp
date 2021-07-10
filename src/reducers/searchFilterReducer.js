import { API_URL, API_URL_KYU, ADMIN_URL} from "@env";
import _ from "lodash";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";


export const SET_FILTER = 'filter/SET_FILTER';
export const GET_PRICE_LIST = 'filter/GET_PRICE_LIST';
export const GET_SALE_TYPE_LIST = 'filter/GET_SALE_TYPE_LIST';
export const GET_LIVING_LIST = 'filter/GET_LIVING_LIST';
export const GET_HEATING_LIST = 'filter/GET_HEATING_LIST';
export const GET_SECURITY_LIST = 'filter/GET_SECURITY_LIST';
export const GET_ETC_LIST = 'filter/GET_ETC_LIST';
export const GET_TAG_LIST = 'filter/GET_TAG_LIST';

export const GET_ALL_FILTERS =  'filter/GET_ALL_FILTERS';

export const ON_PRICE_LIST_CLICK = 'filter/ON_PRICE_LIST_CLICK';
export const ON_SALE_TYPE_LIST_CLICK = 'filter/ON_SALE_TYPE_LIST_CLICK';
export const ON_LIVING_ITEM_CLICK   = 'filter/ON_LIVING_ITEM_CLICK';
export const ON_HEATING_ITEM_CLICK   = 'filter/ON_HEATING_ITEM_CLICK';
export const ON_SECURITY_ITEM_CLICK  = 'filter/ON_SECURITY_ITEM_CLICK';
export const ON_ETC_ITEM_CLICK  = 'filter/ON_ETC_ITEM_CLICK';
export const ON_TAG_ITEM_CLICK  = 'filter/ON_TAG_ITEM_CLICK';

export const ON_ROOM_CNT_CLICK = 'filter/ON_ROOM_CNT_CLICK';
export const ON_BATH_CNT_CLICK = 'filter/ON_BATH_CNT_CLICK';
export const ON_BUILT_YEAR_CLICK = 'filter/ON_BUILT_YEAR_CLICK';
export const ON_PARKING_CNT_CLICK = 'filter/ON_PARKING_CNT_CLICK';

export const ON_DEPOSIT_AMT_CHANGE = 'filter/ON_DEPOSIT_AMT_CHANGE';
export const ON_MONTH_AMT_CHANGE = 'filter/ON_MONTH_AMT_CHANGE';
export const ON_SALE_AMT_CHANGE = 'filter/ON_SALE_AMT_CHANGE';
export const ON_MAINT_AMT_CHANGE = 'filter/ON_MAINT_AMT_CHANGE';
export const ON_AREA_SIZE_CHANGE = 'filter/ON_AREA_SIZE_CHANGE';
export const ON_FLOOR_RANGE_CHANGE = 'filter/ON_FLOOR_RANGE_CHANGE';

export const ON_FILTER_COMPLETE = 'filter/ON_FILTER_COMPLETE';

export const SET_FILTER_COMPLETE = 'filter/SET_FILTER_COMPLETE';
export const CURRENT_FILTER = "list/CURRENT_FILTER";

export const SAVE_FILTER = "filter/SAVE_FILTER";

export const SET_SEARCH_LOCATION = "filter/SET_SEARCH_LOCATION";

export const INIT_FILTER        = "filter/INIT_FILTER";


export const ALL_SEARCH_FILTER_ACTIONS = [
        SET_FILTER,
        GET_PRICE_LIST,
        ON_PRICE_LIST_CLICK,
        GET_SALE_TYPE_LIST,
        ON_SALE_TYPE_LIST_CLICK,
        GET_LIVING_LIST,
        ON_LIVING_ITEM_CLICK,
        GET_SECURITY_LIST,
        GET_ETC_LIST,
        GET_HEATING_LIST,
        ON_SECURITY_ITEM_CLICK,
        ON_ETC_ITEM_CLICK,
        ON_HEATING_ITEM_CLICK,
        GET_TAG_LIST,
        ON_TAG_ITEM_CLICK,
        GET_ALL_FILTERS,

        ON_ROOM_CNT_CLICK,
        ON_BATH_CNT_CLICK,
        ON_BUILT_YEAR_CLICK,
        ON_PARKING_CNT_CLICK,

        ON_DEPOSIT_AMT_CHANGE,
        ON_MONTH_AMT_CHANGE,
        ON_SALE_AMT_CHANGE,
        ON_AREA_SIZE_CHANGE,
        ON_MAINT_AMT_CHANGE,
        ON_FLOOR_RANGE_CHANGE,

        ON_FILTER_COMPLETE,

        SET_FILTER_COMPLETE,

        CURRENT_FILTER,

        SAVE_FILTER,
        SET_SEARCH_LOCATION,
        INIT_FILTER,
    ];


export const setSearchLocation = (location) =>{ 

    return({
        type:SET_SEARCH_LOCATION,
        payload:location
    })
}


export const getPriceTypeList = () =>{
    const fetchPriceList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/codes/contract_shape', { method: 'GET' })
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
		fetchPriceList()
		.then(result=>{
            dispatch(
                { type:GET_PRICE_LIST, payload:result }
                )
            }
            )
		.catch((err) => {console.log("== ❌ PRICE LIST ACTION ERROR\n" + err)})
	})
}

export const getSaleTypeList = () =>{
    const fetchPriceList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/codes/sale_type', { method: 'GET' })
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
		fetchPriceList()
		.then(result=>{
            dispatch(
                { type:GET_SALE_TYPE_LIST, payload:result }
                )
            }
            )
		.catch((err) => {console.log("== ❌ PRICE LIST ACTION ERROR\n" + err)})
	})
}

export const getLivingList = () =>{
    const fetchPriceList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/codes/living', { method: 'GET' })
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
		fetchPriceList()
		.then(result=>{
            dispatch(
                { type:GET_LIVING_LIST, payload:result }
                )
            }
            )
		.catch((err) => {console.log("== ❌ PRICE LIST ACTION ERROR\n" + err)})
	})
}

// 보안시설 get
export const getSecurityList = () =>{
    const fetchPriceList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/codes/security', { method: 'GET' })
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
		fetchPriceList()
		.then(result=>{
            dispatch(
                { type:GET_SECURITY_LIST, payload:result }
                )
            }
            )
		.catch((err) => {console.log("== ❌ PRICE LIST ACTION ERROR\n" + err)})
	})
}

// 기타옵션 get
export const getEtcList = () =>{
    const fetchPriceList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/codes/etc', { method: 'GET' })
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
		fetchPriceList()
		.then(result=>{
            dispatch(
                { type:GET_ETC_LIST, payload:result }
                )
            }
            )
		.catch((err) => {console.log("== ❌ PRICE LIST ACTION ERROR\n" + err)})
	})
}


// 냉난방 get
export const getHeatingList = () =>{
    const fetchPriceList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/codes/heating', { method: 'GET' })
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
		fetchPriceList()
		.then(result=>{
            dispatch(
                { type:GET_HEATING_LIST, payload:result }
                )
            }
            )
		.catch((err) => {console.log("== ❌ PRICE LIST ACTION ERROR\n" + err)})
	})
}

// ㅌㅐ그 get
export const getTagsList = () =>{
    const fetchPriceList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/tags/top', { method: 'GET' })
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
		fetchPriceList()
		.then(result=>{
            dispatch(
                { type:GET_TAG_LIST, payload:result }
                )
            }
            )
		.catch((err) => {console.log
            ("== ❌ PRICE LIST ACTION ERROR\n" + err)})
	})
}


export const saveFilter=(data) =>{

    const fetchPriceList = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/sales/filter/add', { 
                method: 'POST',
                headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
                body: JSON.stringify(data)
            })
			.then(response=>{
				response.json().then((result)=>{
                    console.log("filte result:===================================");
                    //console.log(result)
					if(response.ok && result.results) resolve(result)
					else reject(new Error(result.msg))
				})
			})
		
        })
		return fetchWithTimeout(promisedFetch, 7000)
	}

    return(dispatch=>{
    	fetchPriceList()
    	.then(result=>{
            dispatch(
                { type:SAVE_FILTER, payload:result }
                )
            }
            )
    	.catch((err) => {console.log
            ("== ❌ FILTER SAVE ACTION ERROR\n" + err)})
    })
    
}

export const getFilterAll = () =>{
    const fetchAllFilter = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			
			fetch(API_URL+'/codes/filter_list/all', { method: 'GET' })
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
		fetchAllFilter()
		.then(result=>{
            dispatch(
                { type:GET_ALL_FILTERS, payload:result }
                )
            }
            )
		.catch((err) => {console.log
            ("== ❌ FILTER ALL LIST ACTION ERROR\n" + err)})
	})
}


export const onPriceClicked =(code) =>{
    return({
        type:ON_PRICE_LIST_CLICK,
        payload: code
    })
}
export const onSaleTypeClicked =(code) =>{
    return({
        type:ON_SALE_TYPE_LIST_CLICK,
        payload:code
    })
}

export const onLivingItemClicked = (code) =>{
    return ({
        type:ON_LIVING_ITEM_CLICK,
        payload:code
    })
}

export const onHeatingItemClicked = (code) =>{
    return ({
        type:ON_HEATING_ITEM_CLICK,
        payload:code
    })
}

export const onSecurityItemClicked = (code) =>{
    return ({
        type:ON_SECURITY_ITEM_CLICK,
        payload:code
    })
}

export const onEtcItemClicked = (code) =>{
    return ({
        type:ON_ETC_ITEM_CLICK,
        payload:code
    })
}

export const onTagItemClicked = (stID) =>{
    return({
        type:ON_TAG_ITEM_CLICK,
        payload:stID
    })
}

export const onRoomCntClicked = (cnt) => {
    return({
        type: ON_ROOM_CNT_CLICK,
        payload:cnt
    })
}

export const onBathCntClicked = (cnt) => {
    return({
        type: ON_BATH_CNT_CLICK,
        payload:cnt
    })
}
export const onBuiltYearClicked = (cnt) => {
    return({
        type: ON_BUILT_YEAR_CLICK,
        payload:cnt
    })
}
export const onParkingCntClicked = (cnt) => {
    return({
        type: ON_PARKING_CNT_CLICK,
        payload:cnt
    })
}
export const onFilterComplete = ()=>{
    console.log("filter complete");
    return({
        type:ON_FILTER_COMPLETE,
        payload:true
    })
}

export const onBarChange=(type, range) =>{
    
    switch (type){
        case 1:
            return({type: ON_DEPOSIT_AMT_CHANGE,payload:range})
        case 2:
            return({type: ON_MONTH_AMT_CHANGE,payload:range});
        case 3:
            return({type: ON_SALE_AMT_CHANGE,payload:range});
        case 4:
            return({type: ON_AREA_SIZE_CHANGE,payload:range});
        case 5:
            return({type: ON_MAINT_AMT_CHANGE, payload:range});
        case 6:
            return({type:ON_FLOOR_RANGE_CHANGE, payload:range})
    }
}

export const setCurrentFilter=(filter) =>{
    return({
        type:CURRENT_FILTER,
        payload:filter
    })
}

export const initFilter=(payload=null) =>{
    return({
        type:INIT_FILTER,
        payload:payload
    })
}




// ✔ INITIAL STATE ///////////////////////////////////////////////////////////
const initialState = {
    // display data
    priceList:[],
    saleTypeList:[],
    livingList:[],
    heatingList:[],
    securityList:[],
    etcOptList:[],
    tagsList:[],

    // inserted data
    priceListSelected:[],
    saleTypeSelected:[],
    livingItemSelected:[],
    heatingItemSelected:[],
    securityItemSelected:[],
    etcItemSelected:[],
    tagsItemSelected:[],


    roomCnt:[],
    bathCnt:[],
    builtYear:[],
    parkingCnt:[],

    depositAmtRange:[0,10000],
    monthAmtRange:[0,1000],
    saleAmtRange:[0,10000],
    areaSizeRange:[0,20],
    maintenanceAmtRange:[0,32],
    floorRange:[0,14],

    filterComplete:true,
    currentFilter:"",

    alertMsg:"",

    geoLocation:{
        lat: 37.33796413923191,
        lng:127.11310504004359,
        latitudeDelta:0.2,
        longitudeDelta:0.2
    },

/*
geoLocation:{
    lat: 0,
    lng: 0,
    latitudeDelta:0.02,
    longitudeDelta:0.02
},
*/
    isInit:false

}


// ✔ REDUCER /////////////////////////////////////////////////////////////////
const SearchFilterReducer = (state=initialState, action)=>{
    const priceListSelected     = state.priceListSelected;
    const saleTypeSelected      = state.saleTypeSelected;
    const livingItemSelected    = state.livingItemSelected;
    const heatingItemSelected   = state.heatingItemSelected;
    const securityItemSelected  = state.securityItemSelected;
    const etcItemSelected       = state.etcItemSelected;
    const tagsItemSelected      = state.tagsItemSelected;
    const roomCnt               = state.roomCnt;
    const bathCnt               = state.bathCnt;
    const builtYear             = state.builtYear;
    const parkingCnt            = state.parkingCnt;
    const currentFilter         = state.currentFilter;
    const geoLocation           = state.geoLocation;

    switch (action.type) {
		case SET_FILTER:
            return state;
		
        case ON_PRICE_LIST_CLICK:

            if (state.priceListSelected.indexOf(action.payload) >= 0 ) {
                priceListSelected.splice( priceListSelected.indexOf(action.payload), 1 )
            }else {
                priceListSelected.push(action.payload);
            }
            return Object.assign({}, state, {priceListSelected: [...priceListSelected]})

        case GET_PRICE_LIST:
            return Object.assign({}, state, {priceList: action.payload.results})

        case GET_SALE_TYPE_LIST:
            return Object.assign({}, state, {saleTypeList: action.payload.results})
            
        case GET_LIVING_LIST:
            return Object.assign({}, state, {livingList: action.payload.results})
        
        case GET_SECURITY_LIST:
            return Object.assign({}, state, {securityList: action.payload.results})
            
        case GET_ETC_LIST:
            return Object.assign({}, state, {etcOptList: action.payload.results})          
              
        case GET_HEATING_LIST:
            return Object.assign({}, state, {heatingList: action.payload.results})

        case GET_TAG_LIST:
            return Object.assign({}, state, {tagsList: action.payload.results})
          
        case GET_ALL_FILTERS:
            //console.log(action.payload.results);
            return Object.assign({}, state, 
                {
                    priceList: action.payload.results.contract,
                    saleTypeList: action.payload.results.saleType,
                    livingList: action.payload.results.living,
                    securityList: action.payload.results.security,
                    etcOptList: action.payload.results.etc,
                    heatingList: action.payload.results.heating,
                    tagsList: action.payload.results.tag,
                
                })

        case ON_SALE_TYPE_LIST_CLICK:
            if (state.saleTypeSelected.indexOf(action.payload) >= 0 ) {
                saleTypeSelected.splice( saleTypeSelected.indexOf(action.payload), 1 )
            }else {
                saleTypeSelected.push(action.payload);
            }
            return Object.assign({}, state, {saleTypeSelected: [...saleTypeSelected]})
            
        case ON_LIVING_ITEM_CLICK:
            if (state.livingItemSelected.indexOf(action.payload) >= 0 ) {
                livingItemSelected.splice( livingItemSelected.indexOf(action.payload), 1 )
            }else {
                livingItemSelected.push(action.payload);
            }
            return Object.assign({}, state, {livingItemSelected: [...livingItemSelected]})
            

        case ON_HEATING_ITEM_CLICK:

            if (state.heatingItemSelected.indexOf(action.payload) >= 0 ) {
                heatingItemSelected.splice( heatingItemSelected.indexOf(action.payload), 1 )
            }else {
                heatingItemSelected.push(action.payload);
            }
            return Object.assign({}, state, {heatingItemSelected: [...heatingItemSelected]})
                
        case ON_SECURITY_ITEM_CLICK:
            if (state.securityItemSelected.indexOf(action.payload) >= 0 ) {
                securityItemSelected.splice( securityItemSelected.indexOf(action.payload), 1 )
            }else {
                securityItemSelected.push(action.payload);
            }
            return Object.assign({}, state, {securityItemSelected: [...securityItemSelected]})
            
        case ON_ETC_ITEM_CLICK:
            if (state.etcItemSelected.indexOf(action.payload) >= 0 ) {
                etcItemSelected.splice( etcItemSelected.indexOf(action.payload), 1 )
            }else {
                etcItemSelected.push(action.payload);
            }
            return Object.assign({}, state, {etcItemSelected: [...etcItemSelected]})
            
        case ON_TAG_ITEM_CLICK:
            if (state.tagsItemSelected.indexOf(action.payload) >= 0 ) {
                tagsItemSelected.splice( tagsItemSelected.indexOf(action.payload), 1 )
            }else {
                tagsItemSelected.push(action.payload);
            }
            return Object.assign({}, state, {tagsItemSelected: [...tagsItemSelected]})
                
        case ON_ROOM_CNT_CLICK:
            if (state.roomCnt.indexOf(action.payload) >= 0 ) {
                roomCnt.splice( roomCnt.indexOf(action.payload), 1 )
            }else {
                roomCnt.push(action.payload);
            }
            return Object.assign({}, state, {tagsItemSelected: [...roomCnt]})
            
        case ON_BATH_CNT_CLICK:
            if (state.bathCnt.indexOf(action.payload) >= 0 ) {
                bathCnt.splice( bathCnt.indexOf(action.payload), 1 )
            }else {
                bathCnt.push(action.payload);
            }
            return Object.assign({}, state, {tagsItemSelected: [...bathCnt]})

        case ON_BUILT_YEAR_CLICK:
            if (state.builtYear.indexOf(action.payload) >= 0 ) {
                builtYear.splice( builtYear.indexOf(action.payload), 1 )
            }else {
                builtYear.push(action.payload);
            }
            return Object.assign({}, state, {tagsItemSelected: [...builtYear]})

        case ON_PARKING_CNT_CLICK:
            if (state.parkingCnt.indexOf(action.payload) >= 0 ) {
                parkingCnt.splice( parkingCnt.indexOf(action.payload), 1 )
            }else {
                parkingCnt.push(action.payload);
            }
            return Object.assign({}, state, {tagsItemSelected: [...parkingCnt]})


        // bar 
        case ON_DEPOSIT_AMT_CHANGE:
            return Object.assign({}, state, {depositAmtRange: action.payload})

        case ON_MONTH_AMT_CHANGE:
            return Object.assign({}, state, {monthAmtRange: action.payload})

        case ON_SALE_AMT_CHANGE:
            return Object.assign({}, state, {saleAmtRange: action.payload})

        case ON_AREA_SIZE_CHANGE:
            return Object.assign({}, state, {areaSizeRange: action.payload})

        case ON_MAINT_AMT_CHANGE:
            return Object.assign({}, state, {maintenanceAmtRange: action.payload})
        
        case ON_FLOOR_RANGE_CHANGE:
            return Object.assign({}, state, {floorRange: action.payload})
        
        case ON_FILTER_COMPLETE:
            return Object.assign({}, state, {filterComplete: action.payload, currentFilter:""})
        
        case SET_FILTER_COMPLETE:
            return Object.assign({}, state, {filterComplete: action.payload})

        case CURRENT_FILTER:
            var newCurrentFilter = "";
            if (currentFilter == "" ) {
                newCurrentFilter = action.payload;
            }else {
                if (currentFilter == action.payload) {
                    newCurrentFilter="";
                }else {
                    newCurrentFilter=action.payload;
                }
            }

            return Object.assign({}, state, {currentFilter: newCurrentFilter})

        case SAVE_FILTER:
            return Object.assign({},state, {alertMsg:action.payload} )

        case SET_SEARCH_LOCATION:
            console.log("SET_SEARCH_LOCATION======================================");
            //geoLocation.lat = action.payload.lat;
            //geoLocation.lng = action.payload.lng;
            var newGeo = {
                lat: action.payload.lat,
                lng: action.payload.lng,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            }
            var newComplete = true;
			return Object.assign({}, state, {geoLocation: newGeo, filterComplete:newComplete })

        case INIT_FILTER:
            return Object.assign({}, state, {
                // inserted data
                priceListSelected:[],
                saleTypeSelected:[],
                livingItemSelected:[],
                heatingItemSelected:[],
                securityItemSelected:[],
                etcItemSelected:[],
                tagsItemSelected:[],

                roomCnt:[],
                bathCnt:[],
                builtYear:[],
                parkingCnt:[],

                depositAmtRange:[0,10000],
                monthAmtRange:[0,1000],
                saleAmtRange:[0,10000],
                areaSizeRange:[0,20],
                maintenanceAmtRange:[0,32],
                floorRange:[0,14],

                filterComplete:true,
                currentFilter:"",

                isInit:false
            })
   
        default:
        	return Object.assign({}, state )
    }

}
export default SearchFilterReducer;

