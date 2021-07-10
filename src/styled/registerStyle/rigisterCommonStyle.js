import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const StepCont = styled.View`
	padding-left: 20;
	padding-right: 20;
`;
export const StepContBorder = styled(StepCont)`
  	border-bottom-width: 5;
	border-bottom-color: ${Colors.borderBottomColors};
`;

export const TitleBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding-top: 24;
	padding-bottom: 4;
	border-bottom-color: ${Colors.blackColor};
  	border-bottom-width: 0.5;
	margin-bottom: 10;
`;
export const Title = styled.Text`
	font-size: 14;
	font-weight: 600;
`;
export const RadioTitleBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10;
	margin-top: 4;
`;

export const RadioBox = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	margin-left: 4;
`;
export const RadioBoxMarginN = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	margin-left: -4;
`;
export const RadioLable = styled.Text`
	font-size: 12;
`;

export const SubTitle = styled.Text`
	font-size: 12;
	font-weight: 600;
	margin-bottom: 10;
	margin-top: 14;
`;

// required
export const TextRequiredS = styled.Text`
	font-size: 10;
	font-weight: 300;
`;
export const RequiredS = styled.Text`
	color: ${Colors.redColors};
	font-size: 11;
	font-weight: 300;
`;


//list
export const FlexRowBox = styled.View`
	flex-direction: row;
	align-items: center;
`;
export const ItemList2Box = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-right: 4;
`;

export const Item2RowBox = styled.View`
	width: 50%;
	margin-right: 4;
`;
export const Item2RowBoxInput = styled.TextInput`
	border: 1px solid ${Colors.borderLightColors};
	width: 50%;
	margin-right: 4;
	height: 34;
	margin-bottom: 4px;
	font-size: 12;
	padding: 0 11px;

`;

export const SelectHalfBox = styled.View`
	width: 50%;
	margin-right: 4;
	height: 34px;
	padding: 0 9px;
	border: 1px solid ${Colors.borderLightColors};
	margin-bottom: 4px;
	overflow: hidden;
`;

export const ViewBorder = styled.View`
	font-size: 12;
	width: 100%;
	height: 34; 
	border: 0.5px solid ${Colors.borderLightColors};
	padding: 0 9px;
	margin-bottom: 4;
	overflow: hidden;
`
export const InputBorder = styled.TextInput`
	font-size: 12;
	width: 100%;
	height: 34; 
	padding-top: 0;
	padding-bottom: 0;
	border: 0.5px solid ${Colors.borderLightColors};
	padding: 0 9px;
	margin-bottom: 4;
`
export const BtnBorder = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	font-size: 12;
	width: 100%;
	height: 34;
	padding-top: 0;
	padding-bottom: 0;
	border: 0.5px solid ${Colors.borderLightColors};
	padding: 0 9px;
	margin-bottom: 4;
	color: red;
`


export const YellowBtn = styled.TouchableOpacity`
	position: absolute;
	right: 4;
	top: 4;
	line-height: 40;
	font-size: 12;
	height: 26px;
	width: 60;
	background-color: ${Colors.mainColor};
	justify-content: center;
	align-items: center;
	border-radius: 3;
	border-width: 0.5;
	border-color: ${Colors.blackColor};
`
export const YellowBtnText = styled.Text`
	font-size: 11;
	font-weight: 300;
`
export const ItemTextR = styled.Text`
	position: absolute;
	right: 9;
	top: 0;
	line-height: 34;
	font-size: 12;
    font-weight: 300;
`
export const ItemText = styled.Text`
	font-size: 12px;
	width: 100%; 
`



export const ItemRowList = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;


