import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

// modal common
export const ZzimHeader = styled.View`
	flex-direction: row;
	justify-content: space-between;
	
`
export const ZzimHeaderBtn = styled.TouchableOpacity`
	width: 50%;
	height: 48;
	border-bottom-width: ${props => props.active ? 2 : 0.5};
	border-bottom-color: ${props => props.active ? Colors.blackColor : Colors.borderLightColors};
	justify-content: center;
	align-items: center;
	text-align: center;
`

export const Dot = styled.TouchableOpacity`
	position: absolute;
	width: 4;
	height: 4;
	right: 50%;
	margin-left: -2;
	top: 22;
	background-color: ${Colors.borderLightColors};
	border-radius: 50;
`

export const HeaderText = styled.Text`
	font-size: 14;
	font-weight: 300;

`
export const ChkIconS = styled.Image`
	width: 24px;
	height: 24px;
`
export const ChkBtn = styled.TouchableOpacity`
	padding-top: ${Platform.OS === 'android' ? 16 : 11 }px;
	margin-left: -5px;
	margin-right: 5px;
`

export const ListModifyBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

//danji
export const DanjiItemBox = styled.View`
	background-color: ${Colors.bgColor};
`
export const DanjiList = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	background-color: ${Colors.whiteColor};
	height: 67;
	padding: 0 16px;
	elevation: 3;
	box-shadow: 2px 2px 5px rgba(0,0,0,0.08);
	border-radius: 12px;	
	margin: 12px 10px 12px 0;
	max-width: 280px;
`
export const DanjiTitBox = styled.View`
	flex-direction: column;
	margin-left: 11;
`
export const DanjiName = styled.Text`
	padding-bottom: 3;
	font-size: 16;
	font-weight: ${Platform.OS === 'android' ? 'bold' : 600 };
	max-width: 190px;
`
export const DanjiInfo = styled.View`
	flex-direction: row;
	overflow: hidden;

`
export const DanjiInfoLabel = styled.TouchableOpacity`
	border-radius: 3;
	border: 0.5px solid ${Colors.textNonColors};
	max-width: 74px;
	margin-right: 2;
	padding: 2px;
`








export const DanjiTitleBox = styled.View`
	padding: 13px 24px 10px 24px;
	border-bottom-width: 1;
	border-bottom-color: ${Colors.borderBottomColors};
	border-top-width: 1;
	border-top-color: ${Colors.borderBottomColors};
`
//DanjiModifyWrap
export const DanjiModifyWrap = styled.ScrollView`
	flex: auto;
	padding: 0 15px 0 20px;
	background-color: ${Colors.bgColor};
`
export const DanjiItemWrap = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 12;
`
export const DanjiModifyList = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: ${Colors.whiteColor};
	height: 67;
	padding-left: 16px;
	elevation: 3;
	box-shadow: 2px 2px 5px rgba(0,0,0,0.08);
	border-radius: 12px;	
	margin-left: 7;
	flex: auto;
`
export const ListModifyBox = styled.View`
	height: 100%;
	width: 37;
	background-color: ${Colors.textNonColors};
	padding: 0 2px;
	border-top-right-radius: 12px;
	border-bottom-right-radius: 12px;
`
export const ModifyBtn = styled.TouchableOpacity`
	height: 50%;
	width: 100%;
	justify-content: center;
	align-items: center;
	opacity: ${props => props.Inactive ? 0.3 : 1 };
	border-bottom-width: ${props => props.firstBtn ? 0.5 : 0 };
	border-bottom-color: ${props => props.firstBtn ? Colors.whiteColor : Colors.textNonColors };
`
export const BtnBorder = styled.View`
	position: absolute;
	height: 1px;
	top: 50%;
	left: 10%;
	width: 90%;
	background-color: #a4a4a4;
`