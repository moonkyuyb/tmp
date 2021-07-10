import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

export const RegisterTit = styled(Common.TextExtraBold28)`
	background-color: ${Colors.blackColor};
	padding: 3px 5px 3px 3px;
	line-height: 37px;
	margin-top: 2px;
	color: ${Colors.mainColor};
`
export const RegisterHeader = styled.View`
	padding: 23px 0 36px 0;
	justify-content: flex-start;
	align-items: flex-start;
`
export const RegisterCont = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 36px 0;
	border-bottom-width : ${props => props.border ? styleGuide.BorderLineWidth : 0};
	border-top-width : ${props => props.border ? styleGuide.BorderLineWidth : 0};
`
export const RegisterBtn = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	min-width: 150px;
	height: 44px;
	box-shadow: ${styleGuide.BoxShadow};
	border-radius: 12px;
	margin-top: 14px;
	background-color: ${Colors.whiteColor};
`
export const RegisterFooter = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 36px 0;
`