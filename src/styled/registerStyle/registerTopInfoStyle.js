import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const StepInfoCont = styled.View`
	background-color: #f7f7f7;
	padding: 0 20px;
`
export const InfoTitleBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding-top: 24;
	padding-bottom: 4;
	border-bottom-color: ${Colors.blackColor};
  	border-bottom-width: 0.5;
`;
export const StepNum = styled.Text`
	font-size: 11;
`;
export const NoticeItem = styled.View`
	padding-right: 20;
	padding-bottom: 11;
	padding-top: 18;
`;
export const NoticeList = styled.View`
	flex-direction: row;
	margin-bottom: 11;
`;
export const NoticeTit = styled.Text`
	margin-left: 3;
	line-height: 16;
	font-size: 11;
`;
export const YellowBgText = styled.Text`
	background-color: ${Colors.mainColor};
	font-weight: 500;
`;
export const ChkImg = styled.Image`
	width: 20;
	height: 20;
	margin-top: -2;
`
export const Title = styled.Text`
	font-size: 14;
	font-weight: 700;
`;
export const InfoChkBox = styled.View`
	flex-direction: row;
	margin-bottom: 36;
	margin-top: 8;
	/* justify-content: space-between; */
	padding-right: 20;
`
export const InfoChkText = styled.Text`
	font-size: 10px;
    font-weight: 200;
    line-height: 16px;
	padding-Left: 2px;
`
