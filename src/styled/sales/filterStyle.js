import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from './../../../assets/colors';
import React from 'react';
import styleGuide from '../styleGuide';

//tagContainer
export const FilterContainer = styled.View`
	background-color: ${Colors.whiteColor};
`
// 상단 filter tag
export const HeaderFilterTagWrap = styled.View`
	z-index: 99999;
`
export const HeaderFilterTag = styled.ScrollView`
	background-color: ${Colors.bgColor};
	padding: ${styleGuide.Space} ;
`
export const FilterList = styled.View`
	padding: ${ props => props.paddingTN ? '0 20px 20px 20px' : '20px'};
	border-top-width: ${props => props.borderT ? styleGuide.BorderWidth : 0};
	border-top-color: ${styleGuide.BorderColor};
`
export const BorderTopView = styled.View`
	border-top-width: ${styleGuide.BorderWidth};
	border-top-color: ${styleGuide.BorderColor};
`
//optionItemBox
export const FilterOptionBox = styled.View`
	flex-direction : row;
	flex-wrap: wrap;
`
export const FilterIconOptionBox = styled.View`
	flex-direction : row;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-left: ${props => props.marginLN ? 0 : -22}px;	
`
//option
export const Options = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-width: 60px;
	padding: ${props => props.optionArrow ? '0 4px 0 10px' : '0 8px'};
	height: 34px;
	margin-right: ${styleGuide.Space};
	margin-bottom: ${props => props.marginBN ? 0 : styleGuide.Space};
	background-color: ${props => props.optionWhite? Colors.whiteColor : Colors.bgColor};
	border-width: ${styleGuide.BorderLineWidth};
	border-color: ${Colors.boxlineColors};
`
export const OptionActives = styled(Options)`
	background-color: ${Colors.mainColor};
	border-color: ${Colors.blackColor};
`
export const OptionActivesView = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-width: 60px;
	padding: 0 8px;
	height: 34px;
	margin-right: ${styleGuide.Space};
	margin-bottom: ${ styleGuide.Space};
	background-color: ${Colors.mainColor};
	border: ${styleGuide.BorderLineWidth} solid ${Colors.blackColor};
`
export const IconOptionBtn = styled.TouchableOpacity`
	margin-left: 22px;
`
export const IconOption = styled.View`
	width: 48px;
	height: 48px;
	border-radius: 50;
	border-width: ${styleGuide.BorderLineWidth};
	border-color: ${Colors.blackColor};
	justify-content: center;
	align-items: center;
	margin-bottom: 9;
	margin-top: 10px;
	background-color: ${Colors.whiteColor};
`
export const IconOptionActive = styled(IconOption)`
	background-color: ${Colors.mainColor};
`

//slider
export const MultiSliderBox = styled.View`
	flex-direction : row;
	justify-content: center;
	align-items: center;
	width: 100%;
	z-index: 99;
	margin-top: 0px;
	padding-bottom: 14px;
`
export const SliderLabelCont = styled.View`
	position: absolute;
	width: 100%;
	bottom: 0;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
`
export const LabelBox = styled.View`
	flex: auto;
	justify-content: center;
	align-items: center;
	padding: 0 0px;
`
export const LabelBoxL = styled(LabelBox)`
	align-items: flex-start;
`
export const LabelBoxR = styled(LabelBox)`
	align-items: flex-end;
`
export const SliderBottomBar = styled.View`
	width: 1px;
	height: 8px;
	background-color: ${Colors.borderColor};
	margin: 0 3px 2px 3px;
`
export const CollapseTitle = styled.View`
	width: 100%;
	height: 40px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`
export const CollapseTitleActive = styled(CollapseTitle)`
	background-color: ${Colors.mainColor};
`
export const FilterSaveInfoBox = styled.View`
	padding: 26px;
	flex-direction: row;
	justify-content: center;
	background-color: ${Colors.mainColor};
`

//StyleSheet
export const filterStyle = StyleSheet.create({
	optionList:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 60,
		height: 34,
		paddingHorizontal: 15,
		borderWidth: 0.5,
		marginRight: 4,
		marginBottom: 4,
		borderColor: Colors.boxlineColors,
		backgroundColor: Colors.bgColor,
	},
	optionListActive:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 60,
		height: 34,
		paddingHorizontal: 15,
		borderWidth: 0.5,
		marginRight: 4,
		marginBottom: 4,
		borderColor: Colors.blackColor,
		backgroundColor: Colors.mainColor,
	},
    displayNone: {
        display:'none'
    },
    displayFlex: {
        display:'flex'
    },
});
