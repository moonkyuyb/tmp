import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

//name , pw Account Style

export const AppVersionHeader = styled.View`
	/* border-bottom-color: ${Colors.blackColor};
	border-bottom-width: 0.5; */
	padding-top: 50;
	padding-bottom: 27;
	justify-content: center;
	align-items: center;
`
export const AppLogoImg = styled.Image`
	width: 184;
	height: 84;
	margin: 0 auto;
	margin-bottom: 28;
`
export const AppVersionBox = styled.TouchableOpacity`
	height: 32;
	justify-content: center;
	padding: 0 20px;
	margin-top: 7px;
  	border-radius: 12px;
	background-color: ${Colors.mainColor};
`

