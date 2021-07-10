import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

export const FaqTagBox = styled.View`
	padding: 4px 0;
`
export const FaqTagBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-width: 58;
	padding: 0 15px;
	border: 0.5px solid ${Colors.blackColor};
	height: 34;
	margin-right: 4px;
	background-color: ${props => props.Active ? Colors.mainColor : Colors.whiteColor};
`
export const FaqHeader = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px 0;
	border-bottom-width: 0.5px;
	border-bottom-color: ${Colors.boxlineColors};
`
export const FaqHeaderTit = styled(Common.TextLight14)`
	padding-right: 20px;
	flex: auto;
	padding-left: 8px;
	line-height: 18px;
	padding-top: 2px;
`
export const FaqTitBox = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	flex: auto;
`
export const GreyBox = styled.View`
	flex-direction: row;
	background-color: ${Colors.bgColor};
	padding: 23px 23px 23px 13px;
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.boxlineColors};
`
export const GreyBoxTit = styled(Common.TextLight14)`
	line-height: 18px;
	padding-left: 9px;
	flex: auto;
`