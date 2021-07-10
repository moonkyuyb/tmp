import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';

export const CheckListHeader = styled.View`
	background-color: ${Colors.mainColor};
	height: 38px;
	justify-content: center;
	padding-left: 20px;
`;
export const CheckListBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-color: ${Colors.borderLightColors};
	border-bottom-width: 0.5px;
	padding: 10px 20px;
`;
export const ChkBoxBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
`;
export const ChkBoxTit = styled.Text`
	color: ${Colors.textNonColors};
	font-size: 12px;
	line-height: 16px;
	font-weight: ${Platform.OS === 'android' ? 'bold' : 500 };
`;
export const CheckInputBox = styled.View`
	padding: 14px 20px 34px 20px;
	flex-direction: column;
`;
export const CheckTextArea = styled.TextInput`
	font-size: 12px;
	line-height: 15px;
	height: 81px;
	width: 100%;
	padding: 8px 12px;
	font-weight: ${styleGuide.Light};
	border: ${styleGuide.BorderLineWidth} solid ${Colors.boxlineColors};
`;

