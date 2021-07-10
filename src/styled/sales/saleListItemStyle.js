import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from './../styleGuide';
import * as Common from './../commonStyle';

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('screen');

export const ZipItemBox = styled.View`
	padding: 0 20px;
	flex-direction: column;
	flex: auto;
`
export const ZipItemList = styled.TouchableOpacity`
	flex-direction: ${props => props.flexcolumn ? 'column' : 'row' };
	justify-content: space-between;
	align-items: ${props => props.topAlign ? 'flex-start' : 'center'};
	text-align: center;
	padding: ${props => props.MySales ? '20px 0 16px 0' : '20px 0'};
	border-bottom-width: ${props => props.MySales ? 0 : styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderLightColors};
	width: 100%;
`
//L
const ZipInfoWidth = (Dimensions.get('window').width - 150);
const ZipInfoWidthS = (Dimensions.get('window').width - 190);
export const ZipInfoBox = styled.View`
	width: ${props => props.transaction ? ZipInfoWidthS : ZipInfoWidth}px;
	background-color: ${Colors.whiteColor};
`
export const BuildingNameText = styled(Common.TextSemiBold12)`
	margin-bottom: 6px;
`
export const PriceText = styled(Common.TextBold20)`
	margin-bottom: 2px;
	padding-top: 4px;
`
export const BuildingInfoBox = styled.View`
	margin-top: ${props => props.marginTN ? 0 : 8}px;
`
export const BuildingInfoText = styled(Common.TextLight14)`
	line-height: 18px;
`
export const ZipTagBox = styled.View`
	flex-wrap: wrap;
	flex-direction: row;

	margin-top: ${ props => props.danji ? '0' : '10px'};
	width: 100%;
`
export const ZipTag = styled.View`
	flex-direction: row;
	height: 24px;
	align-items: center;
	padding: ${ props => props.danji ? '0' : '0 10px'};
	background-color: ${ props => props.btnColor ? props.btnColor : Colors.mainColor };
	margin-right: ${styleGuide.Space};
	border-radius: 5px;
	overflow: hidden;
`
export const ZipTagText = styled(Common.TextLight12)``

//단지 리스트
export const DanjiContBox = styled.View`
	width: 100%;

`
export const ZipTagLabel = styled(Common.TextLight12)`
	padding: 0 8px;
`
export const DanjiNum = styled(Common.TextBold13)`
	padding: 0 8px;
	height: 24px;
	line-height: 24px;
	background-color: ${Colors.blackColor};
	color: ${Colors.mainColor};
`

//R
export const ZipImgBox = styled.View`
	position: ${props => props.danjiImg ? 'absolute' : 'relative'};
	right: 0;
	top: ${props => props.danjiImg ? 20 : 0 }px;
	width: ${props => props.transactionImg ? 76 : 94}px;
	height: ${props => props.transactionImg ? 76 : 94}px;
	border-radius: 12px;
	background-color: ${Colors.whiteColor};
	box-shadow: ${styleGuide.BoxShadow};
`
export const ZipImg = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 12px;
`
export const ZzimBtn = styled.TouchableOpacity`
	position: absolute;
	top: 6px;
	right: 6px;
	width: 24px;
	height: 24px;
	z-index: 999999;
	border-radius: 50px;
	overflow: hidden;
`

export const DealingBgBox = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 12px;
	justify-content: center;
	align-items: center;
	background-color: rgba(0,0,0,0.4);
`