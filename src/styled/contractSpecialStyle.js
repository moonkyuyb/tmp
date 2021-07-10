import styled from 'styled-components/native';
import Colors from '../../assets/colors';

export const HeaderBox = styled.View`
	padding: 9px 0;
	flex-direction: row;
	justify-content: space-between; 
	align-items: center;
`;

export const SpecialGreyBox = styled.View`
	background-color: ${Colors.borderBottomColors};
	padding: 12px;
`;

export const CollapseWrap = styled.View`
	padding-bottom: 40px;
`;

export const CollapseBox = styled.View`
	border-bottom-color: ${Colors.borderColor};
	border-bottom-width: 0.5px;
`;

