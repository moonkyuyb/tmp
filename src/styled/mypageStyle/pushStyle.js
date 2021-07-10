import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const PushSetBox = styled.View`
	flex-direction: row;
	margin-top: 24px;
	margin-bottom: 24px;
	height: 46;
	border: 0.5px solid ${props => props.pushOn ? Colors.whiteColor : Colors.borderColor };
	justify-content: space-between;
	align-items: center;
	border-radius: 12px;
	padding-left: 19;
	padding-right: 13;
	background-color: ${props => props.pushOn ? Colors.mainColor : Colors.whiteColor };
`