import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';


export const ProContractBox = styled.View`
	background-color: ${props => props.bgProContract ? Colors.chatNoticeColors : 'rgba(0,0,0,0)'};
	padding-bottom: 0;
	padding: ${props => props.first ? '24px 20px 14px 20px' : '24px 20px'};
`
export const PandaContract = styled.View`
	flex-direction: row;
	padding: 16px 20px 22px 20px;
	justify-content: flex-start;
	align-items: flex-start;
`;
export const ContBox = styled.View`
	justify-content: center;
	align-items: center;
	/* padding: 0 20px; */
	
`;
export const ProContractInfo = styled.View`
	padding: 0 12px;
	width: 100%;
	border-color: #6c6c6c;
	margin-bottom: 25px;
	/* padding: 14px 0; */
	border-top-width: ${styleGuide.BorderLineWidth};
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-color: ${Colors.whiteColor};
`;
export const InfoBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-color: ${Colors.textNonColors};
	border-bottom-width: ${styleGuide.BorderLineWidth};
	padding: 14px 0;
`;

export const NameTit = styled(Common.TextSemiBold18)`
	color: ${props => props.active ? Colors.mainColor : Colors.textNonColors};
	margin-top: 3px;
`;
export const SignatureState = styled.View`
	justify-content: center;
	align-items: center;
	height: 36px;
	width: 80px;
	border-radius: 6px;
	margin-left: 14px;
	background-color: ${props => props.active ? Colors.mainColor : Colors.textNonColors };
`;
export const StateText = styled(Common.TextSemiBold14)`
	color: ${props => props.active ? Colors.blackColor : Colors.whiteColor};
`;

export const ContractBtnText = styled(Common.TextSemiBold18)`
	margin-left: 5px;
	color: ${props=>props.active ? Colors.blackColor : Colors.whiteColor};
	box-shadow : ${styleGuide.BoxShadow};
`;
export const ContractStateBox = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 44px;
	background-color: #474747;
`;
export const ContractStateBtn = styled(SignatureState)`
	height: 30px;
	width: 66px;
	margin-left: 8px;
`;