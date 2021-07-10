import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

export const ChatHeaderContainer = styled.View`
	box-shadow: ${styleGuide.BoxShadow};
	z-index: 9;
`

export const ChatSaleTop = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${Colors.borderBottomColors};
	padding: 4px;
	min-height: 83px;
`
export const ChatSaleBtnBox = styled.View`
	flex-direction: column;
`
export const BuildingInfoText = styled(Common.TextLight14)`
	line-height: 17px;
`

export const BuildingPriceText = styled(Common.TextBold16)`
	margin-bottom: 2px;
`

export const SaleBtn = styled.TouchableOpacity`
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 57px;
	height: 38px;
	background-color: ${Colors.whiteColor};
	border: 0.5px solid ${Colors.blackColor};
	border-bottom-width: ${props => props.first ? 0 : 0.5}px;
`

// 메뉴
export const ChatContMenu = styled.View`
	flex-direction: column;
	background-color: ${Colors.whiteColor};
`

export const TitBox = styled.View`
	width: 100%;
	padding-top: 14px;
	padding-left: 20px;
	padding-bottom: 12px;
`
export const TitUnderLine = styled(Common.TextSemiBold14)`
	text-decoration: underline;
`
export const ChatMenu = styled.ScrollView`
`
export const OptionListBtn = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	min-width: 58px;
	padding: 0 15px;
	border: 0.5px solid ${Colors.blackColor};
	height: 34px;
	margin-right: 4px;
	background-color: ${props=> props.Active ? Colors.mainColor : Colors.whiteColor};
	margin-bottom: 4px;
`
export const OptionListText = styled(Common.TextLight14)`
	font-weight: ${ props => props.Active ? styleGuide.Bold : styleGuide.Light};
`