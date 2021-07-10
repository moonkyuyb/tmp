import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
// import { Dimensions } from 'react-native';

// const {width, height} = Dimensions.get('screen');
// const SnsLoginWidth = (Dimensions.get('window').width / 2) - 42;

export const MypageHeader = styled.View`
	padding-top: 25;
	padding-bottom: 25;
`
export const EmailBox = styled.View`
	padding-top: 8;
`
export const MypageYellowBox = styled.View`
	padding-top: 8;
`
export const YellowBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	padding: 0 14px;
	align-items: center;
	background-color: ${Colors.mainColor};
	border-radius : 8;
	height: 46;
	margin-bottom: 2;
`

export const MypageListBox = styled.View`
	margin-top: 18;
`
export const ListItem = styled.TouchableOpacity`
	padding-right: 9;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.borderColor};
	height: 44;
`
