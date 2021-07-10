import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const TSContainer = styled.View`
	flex: 1;
	background-color: ${Colors.whiteColor};
`
export const TSInnerContainer = styled.View`
	flex: 1;
`
export const SwiperWrap = styled.View`
	flex: auto;
	border: 1px solid red;
`
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
	elevation: 5;
	box-shadow: 2px 2px 10px rgba(0,0,0,0.12);
`
export const StepIcon = styled.Image`
	width: 28;
	height: 28;
	margin-right: 4px;
`


export const SliderButton = styled.TouchableOpacity`
position: absolute;
	top: 50%;
	width: 24;
	height: 24;
	
`
export const SliderButtonL = styled(SliderButton)`
	left: 4;
`
export const SliderButtonR = styled(SliderButton)`
	right: 4;
`
export const TsChatBox = styled.View`
	right: 4;
`
export const TsChatHeader = styled.View`
	padding: 13px 18px 10px 18px;
	border-top-width: 0.5;
	border-top-color: ${Colors.borderColor};
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.borderColor};
`
export const TsChatList = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 19px 20px;
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.borderLightColors};
	background-color: ${props => props.None ? Colors.borderBottomColors : Colors.whiteColor };

`
export const ChatIconS = styled.Image`
	width: 30;
	height: 30;
	opacity: ${props => props.None ? 0.3 : 1};
`
export const TsName = styled.Text`
	font-size: 12;
	font-weight: ${Platform.OS === 'android' ? 'bold' : 600 };
	line-height: 16;
	color : ${props => props.None ? Colors.textNonColors : Colors.blackColor };
`
export const TsDate = styled.Text`
	font-size: 10;
	line-height: 15;
	font-weight: 300;
	color : ${props => props.None ? Colors.textNonColors : Colors.blackColor };
`
export const TsInfoTit = styled.Text`
	font-size: 12;
	font-weight: 300;
	line-height: 16;
	color : ${props => props.None ? Colors.textNonColors : Colors.blackColor };
`