import { API_URL, API_URL_KYU, ADMIN_URL} from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";


export const ZIP_LIST = "map/ZIP_LIST"; //집 리스트 요청 액션

export const MAP_CLICK = "map/LIST_MAP_CLICK";
export const MY_LOCATION="map/MY_LOCATION";
export const MAP_CNT = "map/MAP_CNT";

export const SET_LOCATION = "map/SET_LOCATION";

export const MAP_MOVE="map/MAP_MOVE";
export const MAP_ZOOM="map/MAP_ZOOM";
export const SET_INIT = "map/SET_INIT";



//필터 적용
export const GET_SALES_LIST = 'filter/GET_SALES_LIST';
export const GET_DANJI_LIST = 'filter/GET_DANJI_LIST';
export const IS_FILTER = "filter/IS_FILTER";
export const SET_FILTER_COMPLETE = 'filter/SET_FILTER_COMPLETE';
export const SET_SEARCH_LOCATION = "filter/SET_SEARCH_LOCATION";

export const ALL_MAP_ACTIONS = [MAP_MOVE, MAP_ZOOM, MY_LOCATION, SET_LOCATION, MAP_CNT, MAP_CLICK, SET_INIT];



export const onMapMove = () => {
    return {
        type:MAP_MOVE
    }
};

export const onMapZoom = () => {
    return {
        type:MAP_ZOOM
    }
};
/*
export const setZipCount = (zipCount) => {
    return ({
        type: type.MAP_CNT,
        payload:zipCount
    }) 
}
*/
export const setMapZipCnt = (data) => {
    return {
        type:MAP_CNT,
        payload:data
    }
}

export const setFilterComplete = (isComplete) =>{
    return({
        type:SET_FILTER_COMPLETE,
        payload:isComplete
    })
}

export const getSalesList = (payload) => {
    //console.log("getSalesList================================================================================");
    //console.log(payload.tabIndex);


        if (payload.tabIndex == 0) {
        const fetchSalesList = () => {
            const promisedFetch = new Promise((resolve, reject)=>{
                
                fetch(API_URL+'/sales', 
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(payload)
                }
                )
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
            fetchSalesList()
            .then(result=>{ dispatch({ type:GET_SALES_LIST, payload:result }); })
            .catch((err) => {console.log("== ❌ SALES ACTION ERROR\n" + err)})
        })
    }
    else if (payload.tabIndex == 1) {

        const fetchSalesList = () => {
            const promisedFetch = new Promise((resolve, reject)=>{
                
                fetch(API_URL+'/sales/danji', 
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(payload)
                }
                )
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
            fetchSalesList()
            .then(result=>{ dispatch({ type:GET_DANJI_LIST, payload:result }); })
            .catch((err) => {console.log("== ❌ SALES ACTION ERROR\n" + err)})
        })
        
    }

}



export const onMapClick = (geoData, leftTop, rightTop, rightBottom, leftBottom ) => {

    return {
        type:SET_SEARCH_LOCATION,
        payload:{
            lat: geoData.latitude,
            lng: geoData.longitude,
            latitudeDelta: geoData.latitudeDelta,
            longitudeDelta: geoData.longitudeDelta
        }
    }

}

export const onCameraChange = async (latitude, longitude, zoom) => {
    return await axios.get(TYPE_ZIP_CNT);
}


export const onMyLocation = (lat, lng) => {
    return ({
        type:MY_LOCATION,
        payload:{lat,lng}
    })
}






export const fetchCountCircles = () => {
    //return axios.get('http://192.168.0.55:8888/reqZipList.php?type=countCircles');
    //return RequestAx('http://192.168.0.55:8888/reqZipList.php?type=countCircles');
    return RequestAx('http://192.168.0.55:8888/reqZipList.php?type=countCircles')
}

// 지도에 카운트 데이터
export const fetchZipCount = async (latitude, longitude, zoom) => {
    //return await axios.get(TYPE_ZIP_CNT);
    return await RequestAx(TYPE_ZIP_CNT,{lat:latitude, lng:longitude, zoom:zoom},'POST');

}

// 매물 리스트 받기
export const getZipList = async (latitude, longitude, zoom) =>{
   // return await RequestAx(TYPE_ZIP_LIST_DETAIL);
}

// 리스트 셋
export const setZipList = (data) =>{
    //console.log(data)
    return ({
        type: ZIP_LIST,
        payload:data
    })
    
}

/*
// 지도 이동될때
export const onCameraChange = (latitude, longitude, zoom) => {
    //return await axios.get(TYPE_ZIP_CNT);
    return RequestAx(TYPE_ZIP_CNT+latitude+'/'+longitude+"/"+zoom, "GET", {lat:latitude, lng:longitude, zoom:zoom})
    
    //.then((response) => {
    //    console.log("=-=-=-=-=-==--=-==-==on camera change=-=-=-=-=-==--=-==-==");
    //    console.log(response);
    //    return{
    //        type:type.MAP_CNT,
    //        payload: response.data
    //    }
    //})
}
*/




export const onSetLocationData = (lat, lng, latitudeDelta, longitudeDelta, zoom, countCircle) => {
    return {
        type:SET_LOCATION,
        locationData:{
            latitude: lat,
            longitude: lng,
            leftTop:        leftTop,
            rightTop:       rightTop,
            rightBottom:    rightBottom,
            leftBottom:     leftBottom,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
            countCircle: countCircle,
        },
    }
}

export const setInit = (payload) =>{
    return({
        type:SET_INIT,
        payload:payload
    })
}


const initialState = (
    {
        zipCntData: [],
        isInit:false

    }
);

const MapReducer = (state=initialState, action) => {
    
    const locationData = action.payload;
    const isInit        = action.payload

    switch(action.type) {
        case MAP_CLICK:
            //console.log("map clicked==========================================");
            //console.log(locationData)
            return Object.assign({}, state, {locationData: locationData})
        case SET_INIT :
            return Object.assign({}, state, {isInit: isInit})
             
        default :
            return Object.assign({}, state)

    }

}

export default MapReducer;


