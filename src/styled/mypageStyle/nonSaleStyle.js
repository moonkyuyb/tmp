import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
//
export const NonWrap = styled.View`
	position: absolute;
	top: ${props => props.MySale ? 40 : 88}px;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.bgColor};
`;
export const NoneBox = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	align-items: center;
`;
export const NoneImg = styled.Image`
	width: 76;
	height: 76;
	margin-bottom: 43;
`;
export const NoneTit = styled.Text`
	font-size: 18;
	font-weight: 500;
	margin-bottom: 9;
	line-height: 21;
`;
export const NoneSubTit = styled.Text`
	text-align: center;
	font-size: 12;
	font-weight: 300;
	line-height: 17;
	margin-bottom: 35%;
`;
