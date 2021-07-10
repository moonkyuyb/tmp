import { API_URL } from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";

export const GET_SALE_DETAIL    = "GET_SALE_DETAIL";
export const GET_SALE_IMAGES    = "GET_SALE_IMAGES";

export const GET_SALE_OPTS      = "GET_SALE_OPTS";
export const GET_SALE_TAGS      = "GET_SALE_TAGS";
export const GET_SALE_AVLTIME  = "GET_SALES_AVLTIME";
export const GET_SALE_CONVI    = "GET_SALES_CONVI";
export const GET_SALE_SECURE    = "GET_SALES_SECURE";
export const GET_SALE_SCHOOL   = "GET_SALES_SCHOOL";
export const GET_SALE_LIKE      = "GET_SALE_LIKE";
export const SET_SALE_LIKE      = "SET_SALE_LIKE";

//필터 액션

export const GET_PRICE_LIST     = 'filter/GET_PRICE_LIST';
export const GET_SALE_TYPE_LIST = 'filter/GET_SALE_TYPE_LIST';
export const GET_LIVING_LIST    = 'filter/GET_LIVING_LIST';
export const GET_HEATING_LIST   = 'filter/GET_HEATING_LIST';
export const GET_SECURITY_LIST  = 'filter/GET_SECURITY_LIST';
export const GET_ETC_LIST       = 'filter/GET_ETC_LIST';
export const GET_TAG_LIST       = 'filter/GET_TAG_LIST';

export const ALL_SALE_DETAIL_ACTIONS = [
    GET_SALE_DETAIL, 
    GET_SALE_IMAGES, 
    GET_SALE_OPTS, 
    GET_SALE_TAGS, 
    GET_SALE_AVLTIME, 
    GET_SALE_CONVI, 
    GET_SALE_SECURE, 
    GET_SALE_SCHOOL, 
    GET_SALE_LIKE, 
    SET_SALE_LIKE,

    GET_PRICE_LIST,     
    GET_SALE_TYPE_LIST, 
    GET_LIVING_LIST,
    GET_HEATING_LIST,
    GET_SECURITY_LIST,
    GET_ETC_LIST,
    GET_TAG_LIST,

];




const fetchSaleDetail = async (sID) =>{

    const promisedFetch = new Promise((resolve, reject)=>{
		fetch(API_URL+'/sales/'+sID, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then(response=>{
			response.json().then((result)=>{
				if(response.ok) resolve(result)
				else reject(new Error(result.msg))
			})
		})
	})
	return await fetchWithTimeout(promisedFetch, 5000)

}

const fetchData = async (div,sID) =>{
    const promisedFetch = new Promise((resolve, reject)=>{
		fetch(API_URL+div+sID, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then(response=>{
			response.json().then((result)=>{
	            if(response.ok) resolve(result)
				else reject(new Error(result.msg))
			})
		})
	})
	return await fetchWithTimeout(promisedFetch, 5000)

}

const postData = async (div,data) =>{

    const promisedFetch = new Promise((resolve, reject)=>{
		fetch(API_URL+div, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
            body:JSON.stringify(data)
		})
		.then(response=>{
			response.json().then((result)=>{
	            if(response.ok) resolve(result)
				else reject(new Error(result.msg))
			})
		})
	})
	return await fetchWithTimeout(promisedFetch, 5000)

} 


const deleteData = async (div,data) =>{

    const promisedFetch = new Promise((resolve, reject)=>{
		fetch(API_URL+div, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
            body:JSON.stringify(data)
		})
		.then(response=>{
			response.json().then((result)=>{
	            if(response.ok) resolve(result)
				else reject(new Error(result.msg))
			})
		})
	})
	return await fetchWithTimeout(promisedFetch, 5000)

}


// actions
// ㅁㅐ물 상세
export const getSaleDetail = (sID) => {
    console.log("getSaleDetail============================");

    return (dispatch=>{
        fetchData("/sales/detail/",sID)
        .then(result=>{
            console.log("detail result ============================");
            dispatch({
                type:GET_SALE_DETAIL,
                payload:result.data
            })      
        })
        .catch(err=>{
            console.log("detail result err ============================");
            console.log(err);
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}
// 매물 이미지 받기
export const getImages = (sID) =>{
    return (dispatch=>{
        fetchData("/sales/imgs/",sID)
        .then(result=>{
            dispatch({
                type:GET_SALE_IMAGES,
                payload:result.data
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}
// 매물 시설정보 받기
export const getOptions = (sID) => {
    return (dispatch=>{
        fetchData("/sales/opt/",sID)
        .then(result=>{
            dispatch({
                type:GET_SALE_OPTS,
                payload:result.data
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}
// 매물 태그
export const getTags = (sID) =>{
    return (dispatch=>{
        fetchData("/sales/tags/",sID)
        .then(result=>{
            dispatch({
                type:GET_SALE_TAGS,
                payload:result.data
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}
// 연락 가능시간
export const getAvailableTime = (sID) =>{
    return (dispatch=>{
        fetchData("/sales/avl_time/",sID)
        .then(result=>{
            dispatch({
                type:GET_SALE_AVLTIME,
                payload:result.data
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}

// 좋아요 받기 
export const getLike = (sID, mID) =>{
    return (dispatch=>{
        fetchData("/sales/like/"+sID+"/",mID)
        .then(result=>{
            dispatch({
                type:GET_SALE_LIKE,
                payload:result.data[0].cnt
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}

// 좋아요 클릭 
export const setLike = (sID, mID) =>{
    return (dispatch=>{
        postData("/sales/like", {s_id:sID, m_id:mID})
        .then(result=>{
            console.log("set like data==-=-=-==-=-=-==-=-=-==-=-=-==-=-=-==-=-=-==-=-=-=");
            dispatch({
                type:SET_SALE_LIKE,
                payload:result.data.affectedRows
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}

// 좋아요 취소 
export const delLike = (sID, mID) =>{
    console.log("setlike==============================");
    return (dispatch=>{
        deleteData("/sales/like", {s_id:sID, m_id:mID})
        .then(result=>{
            dispatch({
                type:SET_SALE_LIKE,
                payload:result.data
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}


/*
// 편의 시설
export const getConvinience  = (sID) =>{
    return (dispatch=>{
        fetchData("/sales/convi/",sID)
        .then(result=>{
            dispatch({
                type:GET_SALE_AVLTIME,
                payload:result.data
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}
// 안전시설
export const getSecurity  = (sID) =>{
    return (dispatch=>{
        fetchData("/sales/security/",sID)
        .then(result=>{
            dispatch({
                type:GET_SALE_AVLTIME,
                payload:result.data
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}
// 학군정보
export const getSchools  = (sID) =>{
    return (dispatch=>{
        fetchData("/sales/school/",sID)
        .then(result=>{
            dispatch({
                type:GET_SALE_AVLTIME,
                payload:result.data[0]
            })      
        })
        .catch(err=>{
            dispatch({
                type:SHOW_ALERT_MESSAGE,
                payload:err.message.toString()
            })
        })
    })
}
*/



// reducer
const initialState  = {
    saleData    :{},
    imgData     :[],
    optData     :[],
    tagData     :[],
    avlTimeData :[],
    conviData   :[],
    secureData  :[],
    schoolData  :[],
    isLike      :false,
}

const saleDetailReducer = (state=initialState, action) =>{
    //console.log("reducer========================================================================");
    //console.log(action.payload);
    switch(action.type) {
        case GET_SALE_DETAIL:
            //console.log("reducer========================================================================");
            //console.log(action.payload);
            return Object.assign({}, state, {
                    saleData: action.payload[0]
                });
        break;
        case GET_SALE_IMAGES:
            return Object.assign({}, state, {
                    imgData: action.payload
                });
        break;
        case GET_SALE_OPTS:
            return Object.assign({}, state, {
                    optData: action.payload
                });
        break;

        case GET_SALE_TAGS:
            return Object.assign({}, state, {
                    tagData: action.payload
                });
        break;

        case GET_SALE_AVLTIME:
            return Object.assign({}, state, {
                avlTimeData: action.payload
                });
        break;

        case GET_SALE_CONVI:
            return Object.assign({}, state, {
                conviData: action.payload
                });
        break;

        case GET_SALE_SECURE:
            return Object.assign({}, state, {
                secureData: action.payload
                });
        break;

        case GET_SALE_SCHOOL:
            return Object.assign({}, state, {
                schoolData: action.payload
                });
        break;

        case GET_SALE_LIKE:
            
            return Object.assign({}, state, {
                isLike: (action.payload > 0)
                });    
        break;

        case SET_SALE_LIKE:
            return Object.assign({}, state, {
                isLike: (action.payload > 0)
                });
        break;

		default: return Object.assign({}, state)

    }
}


export default saleDetailReducer;


