import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import { Dimensions } from 'react-native';
import * as Common from './../commonStyle';
import styleGuide from '../styleGuide';

//요일 선택 탭
const DaySize = ((Dimensions.get('window').width - 66)/7);
export const DayBtn = styled.View`
	width: ${DaySize};
	height: ${DaySize};
	border-radius: 50;
	justify-content: center;
	align-items: center;
	box-shadow: ${styleGuide.BoxShadow};
	background-color: ${ props => props.active ? Colors.blackColor : Colors.mainColor };
	border: ${styleGuide.BorderLineWidth} solid ${Colors.blackColor};
`
export const DayText = styled(Common.TextLight16)`
	color: ${props => props.active ? Colors.mainColor : Colors.blackColor};
	font-weight: ${props => props.active ? styleGuide.SemiBold : styleGuide.Light};
`

//Calendar
export const CalendarBox = styled.View`
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderColor};
	padding-bottom: 10px;
`;
export const CalendarHeaderBg = styled.View`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 46;
	z-index: 0;
	background-color: ${Colors.bgColor};
`;
export const CHeaderBtn = styled.View`
	position: absolute;
	top: 50%;
	width: 100%;
	margin-top: -12;
	width: 24;
	height: 24;
	z-index: 0;
	background-color: ${Colors.bgColor};
	opacity: 0.2;
`;
export const CHeaderBtnR = styled(CHeaderBtn)`
	left: 12;
`;
export const CHeaderBtnL = styled(CHeaderBtn)`
	right: 12;
`;
export const TimeSetBox = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 9;
	flex: auto;
`;


const TimeSelectWidth = (Dimensions.get('window').width /2 -70);
export const TimeSelectBox = styled(Common.ViewBorderBtn)`
	flex: auto;
	width: ${TimeSelectWidth};
`;
export const SelectTit = styled(Common.TextLight14)`
	width: ${props => props.setS ? 60 : 40 }px;
	text-align: center;
`;
export const TimeSetInfoBox = styled.View`
	flex-direction: row;
	margin-top: 11;
	margin-bottom: 20;
`;
export const TimeSetInfoTit = styled(Common.TextLight14)`
	line-height: 18px;
	padding-left: 4px;
	padding-top: 4px;
	padding-right: 20px;
`;

//방문가능 시간
export const CalendarLabel = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	padding: 11px 17px;
`;
export const Label = styled.View`
	margin-left: 12px;
	margin-right: 6px;
	width: 10px;
	height: 10px;
	border-radius: 50px;
`;
export const Label01 = styled(Label)`
	background-color: ${Colors.mainColor};
`;
export const Label02 = styled(Label)`
	background-color: ${Colors.bgColor};
`;
export const Label03 = styled(Label)`
	background-color: ${Colors.borderColor};
`;
export const Label04 = styled(Label)`
	background-color: ${Colors.blackColor};
`;

//방문가능 시간 설정
export const CYellowBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 18px 21px;
	background-color: ${Colors.mainColor};
`
export const DatePickWrap = styled.View`
	padding: 16px 20px 0 20px;
`
export const CalendarDatePick = styled.View`
	background-color: ${Colors.bgColor};
	padding: 25px 20px 20px 20px;
`
export const DatePickTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 5;
`

//방문요청을 하였습니다~ 노란박스
export const CalendarYellowBox = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 22px 24px;
	background-color: ${Colors.mainColor};
 `;
 
export const YellowTitBox = styled.View`
	padding-left: 20;
`;



//채팅 관련 화면 - 날짜 선택
export const RequestTimeWrap = styled.View`
	padding: 16px 20px 4px 20px;
`