import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const HeaderImg = styled.Image`
	width: 87;
	height: 87;
	margin: 32px auto;

`
export const BorderTextBox = styled.View`
	border: 1px solid ${Colors.borderColor};
	padding: 34px 19px 39px 34px;

`
export const ListItem = styled.View`
	margin-bottom: 18;

`
export const TextDot = styled.View`
	position: absolute;
	top: 6;
	left: -10;
	border-radius: 50;
	background-color: ${Colors.blackColor};
	width: 4;
	height: 4;

`

//bottom Btn Box
export const BottomBtn2Box = styled.View`
	position: absolute;
	bottom: 0;
	height: 48;
	width: 100%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
  	box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
	elevation: 10;
`
export const BottomBtn2 = styled.TouchableOpacity`
	width: 50%;
	height: 48;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.balck ? Colors.blackColor : Colors.mainColor};
`
export const BtnWhiteText = styled.Text`
	font-size: 16;
	font-weight: 600;
	color:  ${Colors.whiteColor};
`