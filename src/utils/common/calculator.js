export const PtoM =(value)=>{
    return (value*3.31)
}


export const MtoP = (value) =>{
    return (value/3.31)
}


export const pad = (variable) =>{
    variable = Number(variable).toString(); 
    if(Number(variable) < 10 && variable.length == 1) variable = "0" + variable; 
    return variable;
}

function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberToKorean(number){
    var inputNumber  = number < 0 ? false : number;
    var unitWords    = ['', '만', '억', '조', '경'];
    var splitUnit    = 10000;
    var splitCount   = unitWords.length;
    var resultArray  = [];
    var resultString = '';

    for (var i = 0; i < splitCount; i++){
        var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (var i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }

    return resultString;
}


export const getPriceTag = (sale) =>{
    if(!sale) return ''
    const {s_price_type, s_deposit, s_monthly_rent, s_trading_price} = sale
    switch(s_price_type){
        case "lease":
            return `전세 ${numberToKorean(s_deposit||0)} ${(s_monthly_rent>0)?`/ ${numberToKorean(s_monthly_rent)}`:``}`
        case "short":
            return `단기 ${numberToKorean(s_deposit||0)} ${(s_monthly_rent>0)?`/ ${numberToKorean(s_monthly_rent)}`:``}`
        case "monthly":
            return `월세 ${numberToKorean(s_deposit||0)} ${(s_monthly_rent>0)?`/ ${numberToKorean(s_monthly_rent)}`:``}`
        case "sales":
            return `매매 ${numberToKorean(s_trading_price||0)}`
        default: return ''
    }
}

export const DayToDate = (month, day) => {
    //console.log(`month: ${month}, day: ${day} `)
    const date = new Date();

    var year = date.getFullYear();
    var todayDate = date.getDate();
    
    var result =[];
    for (var i=1;i<32;i++) {
        const allDate = new Date(year+"-"+pad(month)+"-"+pad(i));

        if (allDate.getDay() == day) {
            if (i>=todayDate) {
                result.push(year+"-"+pad(month)+"-"+pad(i));
            }
        }
    }

    for (var i=1;i<32;i++) {
        const allDate = new Date(year+"-"+pad(month+1)+"-"+pad(i));

        if (allDate.getDay() == day) {
            //if (i>=todayDate) {
                result.push(year+"-"+pad(month+1)+"-"+pad(i));
            //}
        }
    }


    return result;

}




