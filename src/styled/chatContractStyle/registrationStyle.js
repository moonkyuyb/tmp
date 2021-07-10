import React from 'react';
import styled from 'styled-components/native';
import Colors from './../../../assets/colors';
import * as Common from './../commonStyle';

export const RegistrationItemBox = styled.View`
	flex-direction: column;
	margin-top: 15;
	width: 100%;
	justify-content: flex-start;
	padding: 18px 9px;
	border-top-width: 0.5;
	border-bottom-width: 0.5;
	border-top-color: ${Colors.borderColor};
	border-bottom-color: ${Colors.borderColor};
	margin-bottom: 24;
`;
//btn
export const ApplyYellowBtn = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 160px;
    height: 40px;
    border-radius: 8px;
	background-color: ${Colors.mainColor};
`;
export const BtnTit = styled(Common.TextMedium16)`
	margin-left: 3;
`;

// 신청완료
export const ApplyWrap = styled.View`
	align-items: center;
	width: 100%;
`;
export const ServiceApplyComplet = styled.View`
	background-color: ${Colors.chatNoticeColors};
	padding: 25px;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-bottom: 54;
`;

//신청
export const ApplyTitBox = styled.View`
	margin-bottom: 68;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
