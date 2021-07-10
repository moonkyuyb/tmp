import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import { Dimensions } from 'react-native';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";

const {width, height} = Dimensions.get('screen');
const BottomSpaceHeight = getBottomSpace() + 16 + 'px';
const FloatingWrapWidth =  (Dimensions.get('window').width - 40) + 'px'; 
//FloatingBtn
export const FloatingWrap = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: ${BottomSpaceHeight};
	left: 20px;
	width: ${FloatingWrapWidth};
	padding: 16px 20px;
	z-index: 9999;
	box-shadow: ${styleGuide.BoxShadow};
	background-color: ${Colors.whiteColor};
	border-radius: 12px;
`
export const BtnCenterBar = styled.View`
	width: 0.5px;
	height: 19px;
	background-color: ${Colors.blackColor};
`
export const FloatingBtn = styled.TouchableOpacity`
	flex: auto;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`




export const StepListBox = styled.View`
	min-width: 130px;
	height: 62px;
	border-radius: 12px;
	padding: 0 15px;
	box-shadow: ${styleGuide.BoxShadow};
	border-width: ${props => props.active ? styleGuide.BorderLineWidth : 0};
	margin-top: 18px;
	margin-bottom: 23px;
	background-color: ${Colors.mainColor};
	
`

//추천매물
export const ZipRecommendWrap = styled.View`
	margin-top: 32px;
	padding-bottom: 80px;
`;
export const ZipRecommendHeader = styled.View`
	flex-direction: row;
	padding: 0 20px;
	justify-content: space-between;
`;
export const ZipRecommendList = styled.TouchableOpacity`
	margin-right: 8px;
	margin-top: 8px;
	margin-bottom: 10px;
	border-radius: 12px;
	box-shadow: ${styleGuide.BoxShadow};
	background-color: ${Colors.whiteColor};
`;
export const ZipImgBox = styled.View`
	right: 0;
	width: 140px;
	height: 140px;
	border-radius: 12px;
	background-color: ${Colors.whiteColor};
`
export const ZipImg = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 12px;
`
export const ZzimIconBtn = styled.TouchableOpacity`
	position: absolute;
	top: 6px;
	right: 6px;
	z-index: 999999;
	border-radius: 50px;
	overflow: hidden;
`
export const RecommendInfo = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	padding: 8px;

`


///지도 관련 styled
const MapViewHeight = (Dimensions.get('window').width * 0.88888888) + 'px';
export const MapViewWrap = styled.View`
	height: ${MapViewHeight};
`
export const MapSearchBtn = styled.View`
	position: absolute;
	flex-direction: row;
	top: 20px;
	left: 20px;
	height: 38px;
	align-items: center;
	justify-content: center;
	border-radius: 25px;
	background-color: ${Colors.blackColor};
	padding: 0 13px;
`;

export const MapBottonWrap = styled.View`
	flex-direction: row;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 52px;
	background-color: rgba(0,0,0,0.6);
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
`
