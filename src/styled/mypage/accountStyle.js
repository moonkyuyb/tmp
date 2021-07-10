import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
// import { Dimensions } from 'react-native';

// const {width, height} = Dimensions.get('screen');
// const SnsLoginWidth = (Dimensions.get('window').width / 2) - 42;

export const AccountHeader = styled.View`
	justify-content: center;
	align-items: center;
	padding-top: 25;
	padding-bottom: 20;
`
export const AccountBox = styled.View`
	border-top-width: 1;
	border-top-color: ${Colors.blackColor};
	border-bottom-width: 1;
	border-bottom-color: ${Colors.blackColor};
	padding-top: 8;
	margin-bottom: 18;
`

export const ListItem = styled.View`
	padding-left: 8;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.borderColor};
	height: 44;
`
export const ListItemBtn = styled.TouchableOpacity`
	padding-left: 8;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.borderColor};
	height: 44;
`
export const GreyTextBox = styled.View`
	padding-right: 8;
`
export const GreyText = styled.Text`
	color: ${Colors.textNonColors};
	font-size: 13;
	font-weight: 500;
`
export const ListItemTimeSet = styled.View`
	padding-left: 8;
	padding-top: 16;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.borderColor};
	padding-bottom: 16;
`
export const TimeSetBox = styled.View`
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	margin-right: 5px;
`
export const HeaderImgBtn = styled.TouchableOpacity`
	margin-bottom: 12px;
`
export const ProfileWrap = styled.View`
	width: 72;
	height: 72;
	border-radius: 50px;
	box-shadow: 3px 3px 3px rgba(0,0,0,0.1);
	elevation: 5;
`
export const ProfileImg = styled.Image`
	width: 72px;
	height: 72px;
	border-radius: 50px;
	background-color: yellow;
`
export const CameraIcon = styled.Image`
	position: absolute;	
	width: 24px;
	height: 24px;
	border-radius: 50px;
	bottom: 0;
	right: 0;
	background-color: yellow;
	z-index: 9999;
	elevation: 6;

`
