import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from './../styleGuide';
import * as Common from './../commonStyle';


export const ChatListNum = styled.View`
	justify-content: center;
	padding: 0 20px;
	height: 40px;
	background-color: ${Colors.borderBottomColors};
`;

export const ChatItemBox = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	padding: 18px 20px;
	border-bottom-width: 0.5px;
	border-bottom-color: ${Colors.boxlineColors};
	background-color: ${props=> props.Active ? Colors.mainColor : Colors.whiteColor};
`;
export const ChatInfoBox = styled.View`
	flex-direction: row;
	flex: 1;
	
`;
export const ChatImgBox = styled.View`
	box-shadow: ${styleGuide.BoxShadow};
`;
export const ChatImg = styled.Image`
	width: 42px;
	height: 42px;
	border-radius: 8px;
	margin-right: 14px;
`;
export const ChatTit = styled.View`
	/* flex: 1; */
`;

export const ChatPriceText = styled(Common.TextBold16)`
	margin-bottom: 4px;
`
export const ChatUserNameWrap = styled.View`
	flex-direction: row;
	align-items: center;
`;
export const ChatUserName = styled.View`
	flex-direction: row;
	padding: 0 10px ;
	height: 24px;
	border-radius: 5px;
	align-items: center;
	margin-top: 4px;
	border: ${styleGuide.BorderLineWidth};
	margin-right: ${styleGuide.Space};
`;
export const ChatUserNameText = styled(Common.TextBold13)`
	
`;

export const ChatBtnBox = styled.View`
	flex-direction: row;
`;
export const ChatBtn = styled.TouchableOpacity`
	background-color: ${props => props.Active ? Colors.whiteColor : Colors.mainColor};
	width: 24px;
	height: 24px;
	border-radius: 50px;
	justify-content: center;
	align-items: center;
	margin-left: 4px;
`;



//chat none
export const ChatNoneBox = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	align-items: center;
`;
export const ChatNoneImg = styled.Image`
	width: 76px;
	height: 76px;
	margin-bottom: 43px;
`;
export const ChatNoneTit = styled.Text`
	font-size: 18px;
	font-weight: 500;
	margin-bottom: 9px;
	line-height: 21px;
`;
export const ChatNoneSubTit = styled.Text`
	text-align: center;
	font-size: 12px;
	font-weight: 300;
	line-height: 17px;
	margin-bottom: 35%;
`;
