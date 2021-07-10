import styled from 'styled-components/native';
import styleGuide from '../styleGuide';
import Colors from './../../../assets/colors';
import * as Common from './../../styled/commonStyle';
//Completedpw style
export const SignUpLogoImage = styled.Image`
	width: 138px;
	height: 60px;
	margin: 0 auto;
`
export const SignUpCText = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-top: 24px;
`
export const WelcomeTit = styled(Common.TextLight20)`
	margin-bottom: 8px;
`
export const SignUpInfoBox = styled.View`
	width: 100%;
	margin-top: 24px;
`
export const SignUpInfoList = styled.View`
	flex-direction: row;
	width: 100%;
	height: 76px;
	padding: 0 18px;
	border-radius: 12px;
	justify-content: flex-start;
	align-items: center;
	background-color: ${Colors.whiteColor};
	box-shadow: ${styleGuide.BoxShadow};
	margin-bottom: 12px;
`
export const SignUpInfoTextBox = styled.View`
	margin-left: 14px;
`
