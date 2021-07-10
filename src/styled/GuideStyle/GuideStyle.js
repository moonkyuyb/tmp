import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';

export const GuideWrap = styled.View`
	padding: 20px 0;
`
export const GuideHeader = styled.View`
	flex-direction: row;
	align-items: center;
	padding: 14px 14px 14px 20px;

	border-radius: 12px;
	background-color: ${Colors.mainColor};
`
export const GuideTitBox = styled.View`
	margin-top: 12px;
	margin-bottom: 24px;
`
export const GuideTitList = styled.View`
	padding-left: 20px;
`
export const GuideTitIcon = styled.Text`
	position: absolute;
	top: 1px;
	left: 4px;
	font-size: 12px;
	line-height: 16px;
`
export const PdfDownBox = styled.View`
	margin-top: 12px;
	margin-bottom: 36px;
`
export const GuideHeaderBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 14px 0 19px;
	height: 52px;
	border-radius: 12px;
	background-color: ${Colors.whiteColor};
	box-shadow: ${styleGuide.BoxShadow};
	margin-bottom: 16px;
`
export const PdfIconS = styled.Image`
	width: 26px;
	height: 26px;
	margin-right: 9px;
`
export const PdfTitBox = styled.View`
	padding: 0 15px;
`