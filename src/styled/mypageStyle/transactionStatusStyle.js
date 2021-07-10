import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

export const Slider = styled.ScrollView`
	flex: 1;
`
export const Header = styled.View`
	padding: 10px 33px 0 33px;
	background-color: ${Colors.mainColor};
`
export const StepHeader = styled.View`
	flex-direction: row;
	align-items: center;
`
export const TSSaleWrap = styled.View`
	margin-top: 7px;
	border-radius: 12px;
	background-color: ${Colors.whiteColor};
	margin-bottom: 16px;
	padding: 0 19px;
	box-shadow: ${styleGuide.BoxShadow};
`
export const StepIcon = styled.Image`
	width: 28px;
	height: 28px;
	margin-right: ${styleGuide.Space};
`
export const SliderButton = styled.TouchableOpacity`
	position: absolute;
	top: 50%;
	margin-top: -10px;
	width: 24px;
	height: 24px;
`
export const SliderButtonL = styled(SliderButton)`
	left: ${styleGuide.Space};
`
export const SliderButtonR = styled(SliderButton)`
	right: ${styleGuide.Space};
`
export const TsChatHeader = styled.View`
	padding: 10px 18px;
	border-top-width: ${styleGuide.BorderLineWidth};
	border-top-color: ${Colors.borderColor};
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderColor};
`
export const TsChatList = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderLightColors};
	background-color: ${props => props.None ? Colors.borderBottomColors : Colors.whiteColor };
`
export const ChatIconS = styled.Image`
	width: 30px;
	height: 30px;
	opacity: ${props => props.None ? 0.3 : 1};
`
export const TsName = styled(Common.TextSemiBold16)`
	color : ${props => props.None ? Colors.textNonColors : Colors.blackColor };
	margin-right: ${styleGuide.Space};
`
export const TsDate = styled(Common.TextUltraLight12)`
	color : ${props => props.None ? Colors.textNonColors : Colors.blackColor };
`
export const TsInfoTit = styled(Common.TextLight15)`
	color : ${props => props.None ? Colors.textNonColors : Colors.blackColor };
	margin-top: ${styleGuide.Space};
`