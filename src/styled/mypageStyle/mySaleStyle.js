import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';

export const RegistrationBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 38;
	background-color: ${props => props.active ? Colors.mainColor : Colors.bgColor };
	width: 100%;
	border-radius: 8;
`
export const ModifyBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.whiteColor};
	margin-left: 9;
	border-radius: 14;
	height: 26;
	padding: 0 12px 0 6px;
`
export const ModifyIconS = styled.Image`
	width: 20;
	height: 20;
`
export const MySaleList = styled.View`
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderLightColors};
	padding-bottom: 8px;
`
