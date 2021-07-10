import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

//name , pw Account Style

export const AccountSubHeader = styled.View`
	padding-top: 24;
	padding-bottom: 18;
	padding-left: 2;
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.blackColor};
	margin-bottom: 5;
`
// export const ViewBorder = styled.View`
// 	font-size: 12;
// 	width: 100%;˜
// 	height: 34; 
// 	padding-top: 0;
// 	padding-bottom: 0;
// 	justify-content: space-between;
// 	align-items: center;
// 	border: 0.5px solid ${Colors.borderLightColors};
// 	padding: 0 9px;
// 	margin-bottom: 4;
// `
export const AccountInput = styled.TextInput`
	font-size: 12;
	width: 100%;
	height: 34; 
	padding-top: 0;
	padding-bottom: 0;
	justify-content: space-between;
	align-items: center;
	padding: 0 9px;
	margin-bottom: 6;
	color: ${ Colors.blackColor };
	border: 0.5px solid ${ Colors.borderColor };
	background-color: ${ Colors.whiteColor };
`
