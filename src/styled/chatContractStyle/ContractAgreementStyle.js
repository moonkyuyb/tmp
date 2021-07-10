import styled from 'styled-components/native';
import styleGuide from '../styleGuide';
import Colors from './../../../assets/colors';
import * as Common from './../commonStyle';

//동의
export const AgreementHeader = styled.View`
	padding: 12px 0;
	margin-bottom: 16px;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.bgColor};
`
export const AgreementBox = styled.View`
	margin-bottom: 12px;
`
export const AgreementText = styled(Common.TextLight12)`
	line-height: 18px;
`
export const AgreementTitle = styled(Common.TextBold14)`
	line-height: 18px;
`
export const AgreementChkBox = styled.View`
	padding: 14px 11px;
	background-color: ${Colors.chatNoticeColors};
`