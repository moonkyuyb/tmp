import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import * as Common from '../commonStyle';
import styleGuide from '../styleGuide';

export const SearchWrap = styled.View`
	width: 100%;
	box-shadow: ${styleGuide.BoxShadow};
	background-color: ${Colors.whiteColor};
	z-index: 999;
	
`
export const FilterBtn = styled.TouchableOpacity`
	position: absolute;
	top: 0;
	right: 0;
	width: 48px;
	height: 82px;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.mainColor};
	z-index: 99999;
`
export const SearchBox = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-right: 14px;
	margin-right: ${props => props.marginR ? 48 : 0}px;
`
export const SearchContBox = styled.TouchableOpacity`
	flex: 1;
	height: 40px;
	justify-content: center;
	padding-left: 20px;
`
// salesearch.js
export const PlacesInputWrap = styled.View`
	position: absolute;
	width: 100%;
	flex-direction: row;
	padding: 0 7px 0 10px ;
	z-index: 999999;
	background-color: ${Colors.whiteColor};
`
export const SearchBtn = styled.TouchableOpacity`
	height: 48px;
	justify-content: center;
`
export const SearchHeader = styled.View`
	position: absolute;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 50;
	width: 100%;
	z-index: 9999;
	background-color: ${Colors.mainColor};
	padding: 6px 15px 6px 24px;
`
export const SearchListWrap = styled.View`
	padding-top: 70px;
	
`
export const SearchList = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	border-bottom-color: ${Colors.boxlineColors};
	border-bottom-width: ${styleGuide.BorderLineWidth};
	padding: 14px 0;
`
export const SearchAD = styled.View`
	bottom: 0;
	background-color: #696661;
	/* justify-content: center; */
	align-items: center;
	padding: 17px;
	width: 100%;
`
export const Dot = styled.View`
	width: 3px;
	height: 3px;
	background-color: ${Colors.whiteColor};
	margin: 0 5px;
	border-radius: 50px;
`
export const SavingPrice = styled.View`
	background-color: ${Colors.mainColor};
	border-width: ${styleGuide.BorderLineWidth};
	border-color: ${Colors.blackColor};
	border-radius: 50px;
	padding: 5px 10px;
	margin: 0px 6px;
`