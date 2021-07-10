import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import * as Common from '../commonStyle';
import styleGuide from '../styleGuide';
import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('screen');

const ZipListHeight = Dimensions.get('window').height - 170;

export const ZipItemContainer = styled.View`
	z-index: 999;
	position: absolute;
	bottom: 0;
	background-color: ${Colors.whiteColor};
	/* height: ${props => props.listView ? '40%' : ZipListHeight}; */
`

export const ZipHeaderBtnBox = styled.View`
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	padding-left: 48px;
	margin-left: -48px;
	background-color: ${Colors.whiteColor};
`

export const ZipHeaderBtn = styled.TouchableOpacity`
	flex: auto;
	height: 48px;
	border-bottom-width: ${props=>props.active? '2px' : styleGuide.BorderLineWidth};
	border-bottom-color: ${props=>props.active? Colors.blackColor : Colors.borderLightColors};
	justify-content: center;
	align-items: center;
	text-align: center;
`
export const ZipHeaderText = styled(Common.TextLight18)`
	font-weight:${props=>props.active? styleGuide.Bold : styleGuide.UltraLight};
`
export const ZipDot = styled.View`
	position: absolute;
	width: 4px;
	height: 4px;
	right: -2px;
	top: 22px;
	background-color: ${Colors.borderLightColors};
	border-radius: 50px;
`
export const ZipViewBtnBox = styled.TouchableOpacity`
	width: 48px;
	height: 48px;
	justify-content: center;
	align-items: center;
	background-color: ${props=>props.active?Colors.mainColor:Colors.bgColor};
`