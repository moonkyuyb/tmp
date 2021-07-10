import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

export const NonWrap = styled.View`
	position: absolute;
	top: 40px;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.whiteColor};
`;
export const NoneBox = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	align-items: center;
`;