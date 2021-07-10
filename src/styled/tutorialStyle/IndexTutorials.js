import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import { Dimensions } from 'react-native';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

const {width, height} = Dimensions.get('screen');
const ZipSaleBtnWidth = (Dimensions.get('window').width /2 - 30);


export const ZipSaleBtnWrap = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 0 20px;
	padding-top: 110px;
`
export const ZipSaleBtn = styled.TouchableOpacity`
	flex-direction: column;
	background-color: ${ props => props.active ? Colors.whiteColor : Colors.textNonColors };
	width: ${ZipSaleBtnWidth};
	height: 97px;
	border-radius: 12px;
	justify-content: center;
	align-items: center;
	margin: 0 4px;
`
export const ZipSaleBtnInner = styled.View`
	flex-direction: column;
	background-color: ${ props => props.active ? Colors.whiteColor : Colors.textNonColors };
	width: ${ZipSaleBtnWidth};
	height: 97px;
	border-radius: 12px;
	justify-content: center;
	align-items: center;
`

export const ContText = styled(Common.TextSemiBold18)`
	color: ${Colors.mainColor};
	width: 65%;
	padding-left: 25px;
	line-height: 22px;
	margin-top: 27px;
`
export const ArrowIcon01 = styled.Image`
	width: 31px;
  	height: 76px;
	margin-top: 10px;
	margin-left: 70px;
	
`
export const MapSearchBtn = styled.View`
	flex-direction: row;
	margin-left: 20px;
	margin-top: 10px;
	height: 40px;
	width: 126px;
	align-items: center;
	justify-content: center;
	border-radius: 25px;
	background-color: ${Colors.blackColor};
	padding: 0 13px;
	border: 2px solid ${Colors.mainColor};
`;



//02
const SellBottomBtnWrapWidth = (Dimensions.get('window').width /2 -20);
export const SellBottomBtnWrap = styled.View`
	position: absolute;
	bottom: 12px;
	border: 2px solid ${Colors.mainColor};
	width: ${SellBottomBtnWrapWidth};
	border-radius: 15px;
	height: 56px;
	margin: 4px;
	justify-content: center;
	align-items: center;
	margin-left: 20px;
`
const SellBottomBtnWidth = (Dimensions.get('window').width /2 - 28);
export const SellBottomBtn = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.whiteColor};
	height: 48px;
	width: ${SellBottomBtnWidth};
	border-radius: 12px;
`
export const ArrowIcon02 = styled.Image`
	position: absolute;
	right: -140px;
	bottom: 20px;
	width: 118px;
  	height: 279px;
`