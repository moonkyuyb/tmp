import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';

export const HeaderImg = styled.Image`
	width: 87;
	height: 87;
	margin: 32px auto;

`
export const BorderTextBox = styled.View`
	border: ${styleGuide.BorderLineWidth} solid ${Colors.borderColor};
	padding: 34px 19px 39px 34px;
	margin-top: 32px;

`
export const ListItem = styled.View`
	margin-bottom: 18;
`
export const TextDot = styled.View`
	position: absolute;
	top: 6;
	left: -10;
	border-radius: 50;
	background-color: ${Colors.blackColor};
	width: 3;
	height: 3;

`

