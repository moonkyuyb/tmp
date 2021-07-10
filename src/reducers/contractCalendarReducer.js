
import { API_URL } from "@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";

const INIT_CONTRACT_CALENDAR = "contactCalendar/INIT_CONTRACT_CALENDAR";
const ON_CALENDAR_SELECT = "contactCalendar/ON_CALENDAR_SELECT";

export const ALL_CONTRACT_CALENDAR_ACTIONS = [
    INIT_CONTRACT_CALENDAR,
    ON_CALENDAR_SELECT,
];


export const initContractCalendar = (payload) =>{
    console.log(payload);
    const getData = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/member/myPage/reservation/'+payload, { 
                method: 'GET',
                headers:{
                    "Cache-control": "no-cache, no-stor, must-reavalidate",
                    "Pragma":"no-cache",
                    "Expires":0
                }
            })
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
		getData()
		.then(result=>{
            dispatch({ type:INIT_CONTRACT_CALENDAR, payload:result })
        })
		.catch(err=>{
            dispatch({ type:INIT_CONTRACT_CALENDAR, payload:{} })
            console.log("== ❌ INIT_CONTRACT_CALENDAR ACTION ERROR\n" + err)
        
        })
	})
}
export const onCalendarSelect = (payload) =>{

    const getDateData = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/member/myPage/schedule', { 
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:"{\"s_id\":"+payload.sID+",\"date\":\""+payload.date+"\"}" 
            })
			.then(response=>{      
				response.json().then((result)=>{
					if(response.ok && result.results) resolve(result)
					else reject(new Error(result.msg))
				})
			})
            .catch((err)=>{
                console.log(err);
            })
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}
	return(dispatch=>{
		getDateData()
		.then(result=>{
            result['selectedDate'] = payload.date;
            dispatch({ type:ON_CALENDAR_SELECT, payload:result })
        })
		.catch(err=>{
            console.log("== ❌ ON_CALENDAR_SELECT ACTION ERROR\n" + err)
        })
	})
    
}

const initialState={
    availableDate:[{}],
    selectedDate:[{}],
    selectedList:[],
}


const ContractCalendarReducer = (state=initialState, action) =>{
    switch(action.type) {
        case INIT_CONTRACT_CALENDAR:
            console.log("init calendar============================================");
            console.log(action.payload.results)
            
            var availableDate = state.availableDate[0];
            /*
            action.payload.results.map((el)=>{
                var formedDate = new Date(el.sad_date);
                availableDate[`${formedDate.getFullYear()}-${pad(formedDate.getMonth()+1)}-${pad(formedDate.getDate())}`] = {color: "#ffe800", endingDay: true, startingDay: true, textColor: "#000", startHour:el.sad_from_hour, startMin:el.sad_from_minute, endHour:el.sad_to_hour, endMin:el.sad_to_minute }      
            })
            */

            return Object.assign({},state,{availableDate:[action.payload.results]});
        case ON_CALENDAR_SELECT:
            var data = {};
            data[action.payload.selectedDate] = {"color": "#000", "endingDay": true, "startingDay": true, "textColor": "#ffe800"};
            
            return Object.assign({}, state, {selectedDate:[data], selectedList:action.payload})
            
        default:
            return Object.assign({}, state, {})
    }
}


export default ContractCalendarReducer;


