import styled from 'styled-components/native';
import Colors from './../../../assets/colors';
import styleGuide from '../styleGuide';
import { Dimensions } from 'react-native';

export const SignInInputList = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 46px;
	margin-bottom: 17px;
	border-bottom-color: ${Colors.blackColor};
  	border-bottom-width: ${styleGuide.BorderLineWidth};
`
export const SignInInput = styled.TextInput`
	font-size: 16px;
	font-weight: ${styleGuide.Light};
	flex: auto;
	text-align: right;
`
//SignIn 로그인상태유지 / 비밀번호 잊으셨나요
export const SignInInfoBox = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 9px;
	margin-bottom: 35px;
`

// SNS
export const SNSSignInBox = styled.View`
	margin-top: 44px;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`
const SNSSignInWidth = (Dimensions.get('window').width / 2) - 28;
export const SNSSignInBtn = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	width: ${SNSSignInWidth}px;
	height: 64px;
	border-radius: 8px;
	border: 0.5px solid ${Colors.borderColor};
	margin-left: ${styleGuide.Space};
	margin-bottom: ${styleGuide.Space};
	padding-left: 14px;
`
