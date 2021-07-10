import React from 'react';
import styled from 'styled-components/native'
import { Dimensions, Platform, FlatList } from 'react-native';
import * as Common from './../commonStyle';

import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';


export  const MainTopWrap = styled.View`
    background-color: ${Colors.mainColor};
`;

export const MainHeader = styled.View`
	padding: 14px 20px 27px 20px;
`
export  const HeaderBg = styled.Image`
    position: absolute;
    right: -20px;
    top: 15px;
    width: 122px;
    height: 172px;
    opacity : ${Dimensions.get('window').width > 320 ? 1 : 0.3};
`;
export  const MainYTit = styled(Common.TextExtraBold28)`
    font-size: 34px;
	line-height: 41px;
	background-color: ${Colors.blackColor};
	flex-direction: row;
	color: ${Colors.mainColor};
	margin-top: 8px;
	margin-bottom: 12px;
`;
export  const StepCont = styled.View`
	padding-bottom: 25px;
`
export  const StepHeader = styled.View`
    flex-direction: row;
	padding: 0 20px;
	margin-bottom: 15px;
`;
export  const StepHBtn = styled.TouchableOpacity`
    border-width: ${styleGuide.BorderLineWidth};
	border-radius: 50px;
	justify-content: center;
	align-items: center;
	padding: 0 12px;
	margin-right: ${styleGuide.Space};
	height: 34px;
	background-color: ${props => props.color || Colors.mainColor};
`;



//List item

export const StepItemListActive = styled.TouchableOpacity`
    min-width: 108px;
    height: 53px;
    border-radius: 12px;
    justify-content: center;
    padding:  0 15px;
    margin-right: 8px;
    background-color: ${Colors.mainColor};
	box-shadow: ${styleGuide.BoxShadow};
    border-width: ${styleGuide.BorderLineWidth};
`;
export const StepNumBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
`;