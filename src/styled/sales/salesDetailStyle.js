import styled from 'styled-components/native';
import styleGuide from '../styleGuide';
import Colors from './../../../assets/colors';
import * as Common from './../../styled/commonStyle';
import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('screen');

//SaleHeader
export const SaleHeader = styled.View`
	padding: 24px 20px 26px 18px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
export const SaleHeader02 = styled.View`
	flex-direction: row;
	border-top-width: 0.5px;
	border-top-color: ${Colors.boxlineColors};
	border-bottom-width: 0.5px;
	border-bottom-color: ${Colors.boxlineColors};
`
export const SaleHeaderInner = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	width: 50%;
	height: 77px;
	border-right-width: ${props => props.first ? styleGuide.BorderLineWidth : 0};
	border-right-color: ${Colors.boxlineColors};
`
export const SaleTypeBox = styled.View`
	width: ${props => props.danji ? 'auto' : '52px'};
	height: ${props => props.danji ? 'auto' : '52px'};
	padding : ${props => props.danji ? '6' : '0'}px;
	background-color: ${Colors.mainColor};
	justify-content: center;
	align-items: center;
	border-radius: ${props => props.danji ? '4' : '11'}px;;
	margin-right: 12px;
	
`
//detail common layout
export const SalesCont = styled.View`
	padding: ${props => props.paddingN ? 0 : 20 }px;
	border-top-color: ${styleGuide.BorderColor};
	border-top-width: ${props => props.borderTN ? 0 : styleGuide.BorderWidth};
`
//시설정보
export const IconOptionView = styled.View`
	width: 20%;
	align-items: center;
`
//방정보 grey box
const GreyItemWidth = (Dimensions.get('window').width /2 -24);
const GreyBolckItemWidth = (Dimensions.get('window').width -44);

export const GreyListBox = styled.View`
	flex-basis: ${props => props.BlockBox ? GreyBolckItemWidth : GreyItemWidth };
	justify-content: flex-start;
	align-items: flex-start;
  	border-radius: 3px;
	margin-bottom: 4px;
	padding: 10px 12px;
	background-color: ${Colors.borderBottomColors};
	margin-left: ${styleGuide.Space};
`
export const GreyListLable = styled(Common.TextBold14)`
	margin-bottom: 4px;
`
export const GreyListCont = styled(Common.TextLight14)`
	margin-bottom: 4px;
`
//연락, 방문가능시간
export const LessorInfoBox = styled.View`
	padding-top: 20px;
`
export const LessorTextBox = styled.View`
	background-color: ${Colors.mainColor};
	padding: 16px 20px;
	margin-bottom: 12px;
`
//직거래톡으로 매도인에게~~~
export const TalkTitBox = styled.View`
	background-color: ${Colors.blackColor};
	padding: 7px 14px;
`

///Danji
export const DanjiHeader = styled.View`
	padding: 18px;
	flex-direction: column;
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderColor};
`
export const DanjiName = styled(Common.TextBold20)`
	margin-top: 8px;
`
export const CategoriesBox = styled.View`
	background-color: ${Colors.bgColor};
	padding: 6px ${styleGuide.Space};
`
export const CategoriesCont = styled.View`
	flex-direction: row;
`
export const CategoriesTab = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 25%;
	border: ${styleGuide.BorderLineWidth} solid ${Colors.blackColor};
	padding: 10px;
	background-color: ${props => props.first ? Colors.mainColor : Colors.whiteColor };
`
export const CategoriesTabActive = styled(CategoriesTab)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 25%;
	border: ${styleGuide.BorderLineWidth} solid ${Colors.blackColor};
	padding: 10px;
	background-color: ${props => props.first ? Colors.blackColor : Colors.mainColor };
`