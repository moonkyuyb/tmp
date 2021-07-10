import styled from 'styled-components/native';
import styleGuide from '../styleGuide';
import Colors from './../../../assets/colors';
import * as Common from './../../styled/commonStyle';
import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('screen');

///step02
export const GreyBox = styled.View`
	background-color: ${Colors.borderBottomColors};
	border-radius: 9px;
	padding: 16px 18px;
`

//filterstyle

export const OptionItemBox = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
` 
export const Options = styled.TouchableOpacity` 
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-width: 60px;
	padding: ${props => props.optionArrow ? '0 4px 0 10px' : '0 8px'};
	height: 34px;
	margin-right: ${styleGuide.Space};
	margin-bottom: ${props => props.marginBN ? 0 : styleGuide.Space};
	background-color: ${props => props.active? Colors.mainColor : Colors.bgColor};
	border-width: ${styleGuide.BorderLineWidth};
	border-color: ${ props => props.active? Colors.blackColor : Colors.boxlineColors};
`

//사진등록
export const ImageUploadCont = styled.View`
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: flex-start;
`
export const ImageUploadBtn = styled.TouchableOpacity`
	flex: 0 0 23.6%;
	border: 1px dashed #000;
	border-radius: 6;
	height: 77;
	overflow: hidden;
	margin-bottom: 4;
	margin-right: 4;
	justify-content: center;
	align-items: center;
`
export const ImageUploadBox = styled.View`
	width: 23.6%;
	overflow: hidden;
	border-radius: 6;
	height: 77;
	margin-right: 4;
`
export const ImageUploadImg = styled.Image`
	width: 24px;
	height: 21px;
`
export const ImageUploadText = styled.Text`
	font-size: 10;
	margin-top: 5;
`
export const UploadImg = styled.Image`
	width: 100%;
	height: 100%;
`
export const UploadImgXImg = styled.Image`
	width: 24;
	height: 24;
`
export const UploadImgX = styled.TouchableOpacity`
	position: absolute;
	top: 0;
	right: 0;
`


//하단 동의
export const RegisterInfoBox = styled.View`
	padding: 16px 20px 34px 0;
` 
export const InfoList = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	margin-bottom: ${styleGuide.Space};
	padding-right: 24px;
`
export const InfoNum = styled(Common.TextSemiBold13)`
	padding-right: ${styleGuide.Space};
`
export const InfoText = styled(Common.TextMedium14)`
	line-height: 18px;
`
export const InfoNumS = styled(Common.TextLight12)`
	padding-right: ${styleGuide.Space};
	padding-left: 8px;
`
export const InfoTextS = styled(Common.TextLight12)`
	line-height: 18px;
`
export const AgreedChkBtn = styled.View`
	background-color: ${Colors.whiteColor};
	border: ${styleGuide.BorderLineWidth} solid ${Colors.boxlineColors};
	padding: 20px;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-bottom: 14px;
	margin-top: 14px;
` 



//step03
//inputborder 70%
const InputBorder70Width = (Dimensions.get('window').width  - 142);


export const InputBorder70Wrap = styled(Common.FlexBetweenBox)`
	margin-top: 8px;
	margin-bottom: 8px;
` 
export const View70= styled(Common.View)`
	width: ${InputBorder70Width};
	flex-direction: row;
` 
export const InputBorder70 = styled(Common.InputBorder)`
	width: ${InputBorder70Width};
	margin-bottom: 0;
` 
export const ViewBorder70Btn = styled(Common.ViewBorderBtn)`
	width: ${InputBorder70Width};
	margin-bottom: 0;
` 
export const ViewBorderFlexBtn = styled(Common.ViewBorderBtn)`
	flex: auto;
	margin-bottom: 0;
` 

export const TagBox = styled.View`
	margin-top: 8px;
	flex-wrap: wrap;
	flex-direction: row;
`
export const Tag = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${Colors.borderBottomColors};
	height: 34px;
	padding: 0 12px 0 6px;
	margin-right: ${styleGuide.Space};
	margin-bottom: ${styleGuide.Space};
`
export const TagText = styled(Common.TextLight14)``

export const TagAddBtn = styled(Common.SmallBtn)`
	width: 52px;
	position: absolute;
	top: 6px;
	right: 6px;
	background-color: ${Colors.mainColor};
`

export const RoomTextArea = styled.TextInput`
	height: 160;
	padding: 14px;
	font-size: 14px;
	line-height: 18px;
	font-weight: ${styleGuide.Light};
	margin-bottom: 10;
	height: 160px;
	border: 1px solid ${Colors.borderLightColors};

`
export const GreyBox2 = styled.View`
	padding: 10px 8px;
	background-color: ${Colors.borderBottomColors};
	margin: 12px 0 0px 0;

`





















