import React from 'react';
import styled from 'styled-components/native';
import Colors from './../../../assets/colors';
import * as Common from './../commonStyle';
import { Dimensions } from 'react-native';
import styleGuide from '../styleGuide';

const {width, height} = Dimensions.get('screen');
const MapHeight = (Dimensions.get('window').width * 0.644444);


export const MapBtnBox = styled.View`
	flex-direction: row;
	padding: 0 20px;
	border-bottom-width: 1;
	border-bottom-color: ${Colors.boxlineColors};
	justify-content: space-between;
	height: 48px;
`
export const MapBtn = styled.TouchableOpacity`
	/*  props.tabIndex = 2
		props.activeTab = 0. 1. 2 */
	flex-basis: 33.333%;
	justify-content: center;
	align-items: center;
	border-bottom-width: ${props => props.tabIndex  == props.activeTab ? 2 : 0};
	border-bottom-color: ${Colors.blackColor};
	height: 100%;
`
export const MapBtnText = styled(Common.TextUltraLight18)`
	font-weight: ${props => props.tabIndex  == props.activeTab ? styleGuide.Bold : styleGuide.Light};
`
export const MapContBox = styled.View`
	padding: 0 20px;
	padding-top: 18;
	padding-bottom: 14;
`
export const Map = styled.View`
	height: ${MapHeight};
	max-height: 500;
	
`

//
export const MapAdress = styled.View`
	flex-direction: row;
	background-color: ${Colors.chatNoticeColors};
	align-items: center;
	padding: 11px 13px;
	padding-right: 30;
	
`
export const MapAdressImg = styled.Image`
	width: 13;
	height: 14;
	margin: 0 7px;
`
export const MapAdressText = styled.Text`
	font-weight: 500;
	font-size: 14;
	color: ${Colors.whiteColor};
`

//시설정보
export const SaleInfoListBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	display: ${props => props.tabIndex == props.activeTab ? 'flex' : 'none'  };
`
export const SaleInfoList = styled.View`
	min-width: 55;
	align-items: center;
	margin-bottom: 10;
	opacity: ${props => props.Inactive ? 0.5 : 1};
`
export const SaleIcon = styled.View`
	justify-content: center;
	align-items: center;
	width: 48;
	height: 48;
	border-radius: 50;
	border-width: 0.5;
	border-color: ${Colors.boxlineColors};
	margin-bottom: 8;
`
export const SaleIconN = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	width: 48;
	height: 48;
	border-radius: 50;
	border-color: ${Colors.blackColor};
	margin-bottom: 8;
`


//grey box
export const GreyItemBox = styled.View`
	flex-wrap: wrap;
  	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 34;
	margin-top: 8;
`
export const GreyListBox = styled.View`
	flex-basis: ${props => props.BlockBox ? '100%' : '49.5%' };
	height: 48;
	justify-content: center;
  	border-radius: 3;
	margin-bottom: 4;
	padding: 0 12px;
	background-color: ${Colors.borderBottomColors};
	/* flex-direction: column; */
`
export const GreyItemLable = styled.Text`
	font-size: 12;
	font-weight: 300;
	margin-bottom: 6;

`

//SaleDescription
export const TitleGreyBox = styled.View`
	color: ${Colors.textNonColors};
	font-size: 11;
	font-weight: 300;
`
export const GreyTextMargin = styled.View`
	margin-left: 8 ;
`
export const GreyText = styled.Text`
	color: ${Colors.textNonColors};
	font-size: 11;
	font-weight: 300;
`
export const SaleDescription = styled.View`
	flex-direction: column;
	padding: 8px 20px 34px 20px;
`
export const DescriptionList = styled.View`
	margin-bottom: 4;
`
export const TextDot = styled.View`
	position: absolute;
	top: 6;
	left: -10;
	border-radius: 50;
	background-color: ${Colors.blackColor};
	width: 3;
	height: 3;
`
export const OptionItemBox = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	padding-bottom: 30px;
	padding-top: 8px;
`
export const OptionListActive = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-width: 58px;
	padding: 0 15px;
	border: 0.5px solid ${Colors.blackColor};
	height: 34px;
	margin-right: 4px;
	background-color: ${Colors.mainColor};
	margin-bottom: 4px;
`
//Lessor
export const YellowLessorInfo = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.mainColor};
	padding: 11px 35px;
	border-bottom-width: 5;
	border-bottom-color: ${Colors.borderBottomColors};
`
export const LessorInfoBox = styled.View`
	border-bottom-width: ${props => props.first ? 0.5 : 0 };
	border-bottom-color: ${Colors.blackColor};
	width: 100%;
	flex-direction: row;
	padding: 15px 1px;
	align-items: center;
`
export const LessorTextBox = styled.View`
	margin-left: 14;

`