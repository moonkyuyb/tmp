import React from 'react';
import styled from 'styled-components/native';
import styleGuide from '../styleGuide';
import Colors from './../../../assets/colors';
import * as Common from './../commonStyle';

export const DepositListWrap = styled.View`
	border-bottom-width: ${styleGuide.BorderLineWidth};
	padding: 15px 0;
	margin-bottom: 24px;
`;
export const DepositLabel = styled(Common.TextLight14)`
	padding: 11px;
`;
export const DepositCont = styled(Common.TextBold14)`

`;
export const DepositBlackBox = styled.View`
	align-items: center;
	justify-content: center;
	background-color: ${Colors.chatNoticeColors};
	padding: 21px 0;
	margin-top: 24px;
`;
