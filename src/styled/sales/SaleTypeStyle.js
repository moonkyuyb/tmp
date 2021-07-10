import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';

export const SaleList = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 38px;
	padding: 0 16px 0 20px;
	border-bottom-color: ${Colors.borderLightColors};
	border-bottom-width: ${styleGuide.BorderLineWidth};
`
export const SaleListActive = styled(SaleList)`
	background-color: ${Colors.mainColor};
`
