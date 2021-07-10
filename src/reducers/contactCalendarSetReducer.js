
/* ENVIRONMENTS */
import { API_URL } from
"@env";
import { fetchWithTimeout } from "../utils/networking/NetworkRequest";
import { pad } from "../utils/common/calculator";

export const INIT_CALENDAR = "calendar/INIT_CALENDAR";
export const INIT_CALENDAR_SCHD = "calendar/INIT_CALENDAR_SCHD";
export const ON_DAY_SELECT = "calendar/ON_DAY_SELECT";
export const ON_DATE_SELECT = "calendar/ON_DATE_SELECT";
export const ON_AV_SELECT   = "calendar/ON_AV_SELECT";
export const ON_SUBMIT_SCHD   = "calendar/ON_SUBMIT_SCHD";
export const ON_SUBMIT_SCHD_DETAIL   = "calendar/ON_SUBMIT_SCHD_DETAIL";

export const SHOW_ALERT          =   "calendar/SHOW_ALERT";
export const CLEAR          =   "calendar/CLEAR";

export const ALL_CALENDAR_ACTIONS = [
    INIT_CALENDAR,
    ON_DAY_SELECT,
    ON_DATE_SELECT,
    ON_AV_SELECT,   
    ON_SUBMIT_SCHD,
    INIT_CALENDAR_SCHD,
    ON_SUBMIT_SCHD_DETAIL, 
    SHOW_ALERT,
    CLEAR,
]

export const clear = () =>{
    return({
        type:CLEAR
    })
}

export const selectedDay = (payload) => {
    return({
        type: ON_DAY_SELECT,
        payload: payload
    })
}

export const onDateSelect = (payload) => {
    return({
        type:    ON_DATE_SELECT,
        payload: payload
    });
}

export const onAVSelect = (payload) => {
    return(dispatch=>{
        dispatch( {
            type:    ON_AV_SELECT,
            payload: payload
        })
    });
}


export const initCalendarSchd=(payload)=>{

    const fetchApptData = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/member/myPage/appointmentDetail/'+payload, { method: 'GET' })
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
		fetchApptData()
		.then(result=>{
            dispatch({ type:INIT_CALENDAR_SCHD, payload:result })
        })
		.catch(err=>{console.log("== ❌ INIT_CALENDAR_SCHD ACTION ERROR\n" + err)})
	})
}


export const initCalendar=(payload)=>{

    const fetchApptData = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/member/myPage/appointment/'+payload, { method: 'GET' })
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
		fetchApptData()
		.then(result=>{
            //console.log(result);
            dispatch({ type:INIT_CALENDAR, payload:result })
        })
		.catch(err=>{console.log("== ❌ INIT_CALENDAR ACTION ERROR\n" + err)})
	})
}

export const submitScheduleDetail = (payload) =>{

    const sibmitDataDetail = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/member/myPage/add/scheduleDetail/', { 
                method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(payload)
                
            })
			.then(response=>{           
                console.log(response)     
				response.json().then((result)=>{
					if(response.ok && result.results) resolve(result)
					else reject(new Error(result.msg))
				})
                

			})
		})
		return fetchWithTimeout(promisedFetch, 7000)
	}
	return(dispatch=>{
		sibmitDataDetail()
		.then(result=>{
            console.log(result);
            dispatch({ type:ON_SUBMIT_SCHD_DETAIL, payload:result })
            dispatch({ type:SHOW_ALERT, payload:result })
        })
		.catch(err=>{

            //dispatch({ type:SHOW_ALERT, payload:{msg:err} })
            console.log("== ❌ ON_SUBMIT_SCHD_DETAIL ACTION ERROR\n" + err)
        })
	})
    
}
export const showAlert = (msg) => {
    console.log("alert!");
    return({
        type:SHOW_ALERT,
        payload:{msg:msg}
    })
}


export const submitSchedule=(payload) => {
    
    const sibmitData = () => {
		const promisedFetch = new Promise((resolve, reject)=>{
			fetch(API_URL+'/member/myPage/add/schedule/', { 
                method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(payload)
                
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
		sibmitData()
		.then(result=>{
            dispatch({ type:ON_SUBMIT_SCHD, payload:result })
        })
		.catch(err=>{console.log("== ❌ ON_SUBMIT_SCHD ACTION ERROR\n" + err)})
	})
    
}

const initialState = {
    appt:{
        "mod_date": null, 
        "reg_date": null, 
        "s_id": 0, 
        "sa_id": 0,

        "sa_from_ampm": 0, 
        "sa_from_hour": "00", 
        "sa_from_minute": "00", 

        "sa_to_ampm": 0,
        "sa_to_hour": "00",
        "sa_to_minute": "00",

        "sa_pattern_fri": 0, 
        "sa_pattern_mon": 0, 
        "sa_pattern_sat": 0, 
        "sa_pattern_sun": 0, 
        "sa_pattern_thu": 0, 
        "sa_pattern_tue": 0,
        "sa_pattern_wed": 0,

        "status"        :1,
    },
    apptDate:[
        {
            "sa_id":0,
            "sad_id": 0,
            "sad_date": null,
 
            "sad_from_ampm": 0,
            "sad_from_hour": "00",
            "sad_from_minute": "00",

            "sad_to_ampm": 0,
            "sad_to_hour": "00",
            "sad_to_minute": "00",

            "status": 0 
        }
    ],
    selectedDateStr:"",
    selectedDate:{},
    availableDate:[{}],
    saveData: [],
    submitResult: {},
    alertMsg:[]
}

const ContactCalendarReducer = (state=initialState, action) =>{

    switch(action.type) {
        case ON_DAY_SELECT:

            var apptData = state.appt;
            apptData[action.payload.key]    = action.payload.value;
            apptData.sa_from_hour           = action.payload.sa_from_hour
            apptData.sa_from_minute         = action.payload.sa_from_minute
            apptData.sa_to_hour             = action.payload.sa_to_hour
            apptData.sa_to_hour             = action.payload.sa_to_hour

            return Object.assign({},state,{ appt:apptData });

        case ON_DATE_SELECT:
            var selectedDate = {};
            selectedDate[action.payload.dateValue] = action.payload.cssType;
            return Object.assign({},state,{selectedDate: selectedDate, selectedDateStr:action.payload.dateValue});
        
        case ON_AV_SELECT:
            var avDate = state.availableDate[0];
            if (action.payload.mode=="week") {
                if (action.payload.weekOnOff) {
                    avDate[action.payload.dateValue] = action.payload.cssType;
                }else {
                    delete avDate[action.payload.dateValue];  
                }
            }else {
                if (avDate[action.payload.dateValue] == undefined) {
                    avDate[action.payload.dateValue] = action.payload.cssType;
                }else {
                    delete avDate[action.payload.dateValue];  
                }
            }

            return Object.assign({},state,{availableDate: [avDate] });

        case INIT_CALENDAR:
            return Object.assign({},state,{appt: action.payload.results[0]});

        case INIT_CALENDAR_SCHD:
            
            var availableDate = state.availableDate[0];
            action.payload.results.map((el)=>{
                var formedDate = new Date(el.sad_date);
                availableDate[`${formedDate.getFullYear()}-${pad(formedDate.getMonth()+1)}-${pad(formedDate.getDate())}`] = {color: "#ffe800", endingDay: true, startingDay: true, textColor: "#000", startHour:el.sad_from_hour, startMin:el.sad_from_minute, endHour:el.sad_to_hour, endMin:el.sad_to_minute }      
            })
            return Object.assign({},state,{availableDate:[availableDate]});

        case ON_SUBMIT_SCHD:
            return Object.assign({},state,{});
        case ON_SUBMIT_SCHD_DETAIL:
            return Object.assign({},state,{});
        case SHOW_ALERT:
            return Object.assign({},state,{alertMsg:[{msg:action.payload.msg}]});
        case CLEAR:
            return Object.assign({},state,{
            appt:{
                "mod_date": null, 
                "reg_date": null, 
                "s_id": 0, 
                "sa_id": 0,
        
                "sa_from_ampm": 0, 
                "sa_from_hour": "00", 
                "sa_from_minute": "00", 
        
                "sa_to_ampm": 0,
                "sa_to_hour": "00",
                "sa_to_minute": "00",
        
                "sa_pattern_fri": 0, 
                "sa_pattern_mon": 0, 
                "sa_pattern_sat": 0, 
                "sa_pattern_sun": 0, 
                "sa_pattern_thu": 0, 
                "sa_pattern_tue": 0,
                "sa_pattern_wed": 0,
        
                "status"        :1,
            },
            apptDate:[
                {
                    "sa_id":0,
                    "sad_id": 0,
                    "sad_date": null,
         
                    "sad_from_ampm": 0,
                    "sad_from_hour": "00",
                    "sad_from_minute": "00",
        
                    "sad_to_ampm": 0,
                    "sad_to_hour": "00",
                    "sad_to_minute": "00",
        
                    "status": 0 
                }
            ],
            selectedDateStr:"",
            selectedDate:{},
            availableDate:[{}],
            saveData: [],
            submitResult: {},
            alertMsg:[]});
            
        default:
            return Object.assign({},state,{});
    }
}



export default ContactCalendarReducer;


