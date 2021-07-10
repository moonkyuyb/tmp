import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('screen');
const SliderWidth = (Dimensions.get('window').width - 58);

export const minRange = 0;
export const maxRange = 10000;
export const minMonthRange = 0;
export const maxMonthRange = 100;
export const minAreaRange = 0;
export const maxAreaRange = 20;
export const minMaintRange = 0;
export const maxMaintRange = 32;
export const minFloorRange = 0;
export const maxFloorRange = 14;
export const viewWidth = SliderWidth;

export const floorStr = (floor) =>{
	var start = floor[0];
	var end   = floor[1];
	var startStr = "";
	var endStr   = "";
	if (start <=minFloorRange && end >=maxFloorRange) {
		return "전체";
	}else {
		if (start > minFloorRange) {
			startStr = `${start}층~`;
		}else {
			startStr = "반지층~";
		}
		if (end < maxFloorRange) {
			endStr   = end+"층";
		}else {
			endStr   = "옥탑"
		}
		return startStr+endStr;
	}
}

export const amtDivide = (amt) =>{
	if (amt>=maxRange) {
		return "무제한";
	}
	else if (amt <=minRange) {
		return "0원";
	}
	else {
		return (Math.floor(amt/1000) > 0? Math.floor(amt/1000)+"억":"") + ( Math.floor((amt%1000)/100)>0 ? Math.floor((amt%1000)/100) + "천만원":"" );
	}
}
	
export const amtMonthDivide = (amt) =>{
	if (amt>=maxMonthRange) {
		return "무제한";
	}
	else if (amt <=minMonthRange) {
		return "0원";
	}
	else {
		return (Math.floor(amt/1) > 0? Math.floor(amt/1):"" )+"만원";
	}
}

export const areaStr =(size) => {
	if (size>=maxAreaRange) {
		return "무제한";
	}
	else if (size <=minAreaRange) {
		return "0m²(0평)";
	}
	else {
		return (`${ Math.floor(size*3.306) }m²(${size}평)` );
	}
}
export const maintStr = (str) =>{
	if (str>=maxMaintRange) {
		return "무제한";
	}
	else if (str <=minMaintRange) {
		return "0원";
	}
	else {
		return (`${str}만원` );
	}
}

export const convertCodeToStr = (codeArr, selectedArr) =>{
	var str = "";
	for (var j=0; j<selectedArr.length; j++) {
		for(var i=0;i<codeArr.length; i++) {
			if (codeArr[i].code == selectedArr[j]) {
				str += codeArr[i].string+",";
			}
		}
	}
	str = str.slice(0,-1)
	return str;
}
export const convertCodeToTag = (tagArr, selectedArr) => {
	var str = "";
	for (var j=0; j<selectedArr.length; j++) {
		for(var i=0;i<tagArr.length; i++) {
			if (tagArr[i].st_id == selectedArr[j]) {
				str += tagArr[i].st_title+",";
			}
		}
	}
	str = str.slice(0,-1)
	return str;
}
