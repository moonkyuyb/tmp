import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';
//chat input wrap
export const ChatInputWrap = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	bottom: 0;
	height: 48px;
	width: 100%;
	background-color: ${Colors.whiteColor};
`
export const ChatInputBox = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex: 1;
`
export const ChatAddBtn = styled.TouchableOpacity`
	margin: 0 12px;
`
export const ChatInput = styled.TextInput`
	flex: 1;
	line-height: 16px;
	padding: 0px;
`
export const ChatSendBtn = styled.TouchableOpacity`
	background-color: ${Colors.mainColor};
`

//chat first panda Message
export const PandaChat = styled.View`
	flex-direction: row;
	background-color: ${Colors.mainColor};
	padding: 16px 20px 20px 20px;
	justify-content: flex-start;
	align-items: flex-start;
	margin-bottom: 16px;
	margin-bottom: ${props => props.firstPanda ? 16 : 0}px;
`
export const ChatPandaImg = styled.Image`
	width: 28px;
	height: 28px;
	margin-right: 12px;
`
export const PandaChatHeader = styled.View`
	flex-direction: row;
	margin-bottom: 10px;
	align-items: center;
`
export const PandaTag = styled(Common.TextSemiBold16)`
	
`
export const PandaChatCont = styled.View`
`
export const PandaText = styled(Common.TextLight14)`
	font-weight: 300;
	margin-top: 10px;
`
export const ItemBox = styled.View`
	padding-left: 15px;
	padding-right: 6px;
`
export const ItemList = styled.View`
	margin-bottom: 3px;
	padding-right: 35px;
`
export const PandaM = styled(Common.TextLight14)`
	line-height: 18px;
	font-weight: ${props => props.Bold ? styleGuide.SemiBold : styleGuide.Light};
`
export const TextDot = styled.View`
	position: absolute;
	top: 9px;
	left: -10px;
	margin-top: -1.5px;
	border-radius: 50px;
	background-color: ${props => props.color || Colors.blackColor};
	width: 3px;
	height: 3px;
`

//chat Message
export const ChatWrap = styled.View`
	background-color: ${Colors.chatBgColors};
	flex: auto;
	padding-bottom: ${props => props.Popup ? '58' : 0}px;
`
export const ChatScrollBox = styled.View`
	flex: auto;
`
export const ChatScroll = styled(Common.ScrollContainer)`
	background-color: ${Colors.chatBgColors};
	flex: auto;
	padding: 0;
`
export const ChatTopBox = styled.View`
	flex-direction: row;
	align-items: flex-end;
`
export const ChatTime = styled(Common.TextLight12)`
	line-height: 14px;
	margin-right: ${styleGuide.Space};
	margin-left: 10px;
`
export const ChatBox = styled.View`
	display: flex;
	align-items: ${props => props.chatLeft ? 'flex-start' : 'flex-end'};
	background-color: ${ props => props.chatLeft ? Colors.whiteColor : Colors.mainColor};
	padding: 10px 14px 10px 16px;
	border-radius: 16px;
	box-shadow: ${styleGuide.BoxShadow};
	margin-top: 7px;
	margin-bottom: 12px;
	max-width: 90%;
`
export const ChatM = styled(Common.TextLight14)`
	line-height: 18px;
`
export const ChatTri = styled.View`
	position: absolute;
	top: 13px;
	width: 0;
	height: 0px;
	border-top-width: ${styleGuide.Space};
	border-top-color: rgba(0,0,0,0);
	border-bottom-width: ${styleGuide.Space};
	border-bottom-color: rgba(0,0,0,0);
`



//R
export const ChatR = styled.View`
	justify-content: flex-end;
	align-items: flex-end;
	flex-direction: column;
	padding-right: 20px;
	min-height: 70px;
`
export const ChatTriR = styled(ChatTri)`
	right: -6px;
	border-left-width: 8px;
	border-left-color: ${Colors.mainColor};
`


// L
export const ChatL = styled.View`
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: row;
	width: 100%;
	padding-left: 20px;
	min-height: 70px;
`
export const ChatTriL = styled(ChatTri)`
	left: -7px;
	border-right-width: 8px;
	border-right-color: ${Colors.whiteColor};
`
export const ChatLinner = styled.View`
	flex: 1;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	max-width: 100%;
`
export const Profile = styled.View`
	justify-content: center;
	align-items: center;
	width: 28px;
	height: 28px;
	border-radius: 50px;
	box-shadow: 1px 1px 3px rgba(0,0,0,0.13);
	margin-right: 12px;
	background-color: ${props => props.color || Colors.profileNone};
`
export const ProfileTit = styled(Common.TextBold14)`
	color: ${Colors.whiteColor};
`

//info box
export const ChatInfoBox = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: ${props=>props.chatLeft ? Colors.borderBottomColors : Colors.whiteColor};
	padding: 8px 0px;
	width: 180;
	border-radius: 14px;
	margin-top: 8px;
`
export const InfoIcon = styled.Image`
	width: 16px;
	height: 16px;
	margin-right: 4px;
`
//bottom popup box
export const ChatPopup = styled.View`
	flex-basis: 64px;
	bottom: 0;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	background-color: ${Colors.chatNoticeColors};
	z-index: 999;
	padding: 16px 12px 13px 12px;
`
export const PopupTextBox = styled.View`
	flex-direction: row;
	flex: auto;
`
export const PopupText = styled(Common.TextSemiBold14)`
	color: ${Colors.whiteColor};
	margin-left: 6px;
	font-weight: ${props => props.Bold ? styleGuide.Bold : styleGuide.Light};
	flex: auto;
	line-height: 18px;
`
export const PopupBtn = styled.TouchableOpacity`
	justify-content: center;
	background-color: ${props => props.Yellow ? Colors.mainColor : Colors.whiteColor };
	margin-left: 4px;
	border-radius: 7px;
	padding: 4px 13px;
	height: 26px;
`

//scroll up, down btn
export const ScrollBtn = styled.TouchableOpacity`
	position: absolute;
	right: 12px;
	z-index: 999999999;
`
export const ScrollUpBtn = styled(ScrollBtn)`
	top: 12px;
`
export const ScrollDownBtn = styled(ScrollBtn)`
	bottom: 12px;
`