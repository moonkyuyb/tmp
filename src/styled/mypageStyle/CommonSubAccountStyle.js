import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';

//name , pw Account Style

export const AccountSubHeader = styled.View`
	padding-bottom: ${props => props.paddingB ? props.paddingB : 11}px;
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.blackColor};
	margin-bottom: 19px;
	margin-top: ${props => props.marginT ? props.marginT : 0}
`