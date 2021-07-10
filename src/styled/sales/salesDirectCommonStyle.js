import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('screen');
const StepWidth = (Dimensions.get('window').width /2 - 4);


//header
export const StepHeaderWrap = styled.View`
	background-color: ${Colors.whiteColor};
	box-shadow: ${styleGuide.BoxShadow};
	padding: ${styleGuide.Space};
	margin-left: -${styleGuide.Space};
	z-index:99999 ;
`
export const Step = styled.View`
	justify-content: center;
	width: ${ props => props.modi ? 160 : StepWidth}px;
  	height: 56px;
	border-radius: 12px;
	background-color: ${props=> props.active ? Colors.mainColor : Colors.borderBottomColors};
	margin-left: ${styleGuide.Space};
	padding: 0 18px;
`
export const StepNumText = styled(Common.TextLight14)``
export const StepText = styled(Common.TextSemiBold18)``

//cont
export const StepCont = styled.View`
	padding: ${props => props.paddingN ? 0 : 20}px;
	padding-top: ${props => props.paddingTN ? 0 : 20}px;
	padding-bottom: ${props => props.paddingBN ? 0 : 20}px;
	border-bottom-width: ${props => props.borderB ? 5 : 0}px;
	border-color: ${Colors.bgColor};
	background-color: ${ props => props.color || Colors.whiteColor};
`
// required
export const RequiredS = styled(Common.TextMedium12)`
	color: ${Colors.redColors};
`
export const TextRequiredS = styled(Common.TextLight12)``


//botton alert box
export const AlertWrap = styled.View`
	flex-direction: row;
	padding: 20px 30px 20px 14px;
	background-color: ${Colors.chatNoticeColors};
	margin-top: 14px;
	margin-bottom: 14px;

`
export const AlertText = styled(Common.TextUltraLight12)`
	padding-Left: 2px;
	font-weight: ${props=>props.bold ? styleGuide.SemiBold : styleGuide.UltraLight};
	color: ${Colors.whiteColor};
	line-height: 16px;
`


//radiotitle
export const RadioTitleBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`
export const RadioBox = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	margin-left: ${props => props.marginLN ? 0 : 8}px;
`
// export const RadioBoxMarginN = styled.TouchableOpacity`
// 	flex-direction: row;
// 	align-items: center;
// 	margin-left: -4px;
// `

{/* <RadioTitleBox>
	<RadioBox>
		<RadioBtnActive />
		<Common.ViewBorderText></Common.ViewBorderText>
	</RadioBox>
</RadioTitleBox> */}



export const UnitTit = styled(Common.TextLight14)`
	position: absolute;
	right: 10px;
	height: 100%;
	line-height: ${styleGuide.FormHeight};

	font-weight: ${props => props.bold ? styleGuide.Bold : styleGuide.Light};
`
