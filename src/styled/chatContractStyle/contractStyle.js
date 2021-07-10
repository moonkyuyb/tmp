import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

//wrap
export const ContractWrap = styled.ScrollView`
	padding: 0 20px;
	flex: auto;
`
// infoheader
export const ContractInfoHeader = styled.View`
	flex-direction: row;
	background-color: ${Colors.chatNoticeColors};
	margin-top: 12px;
	${props=> props.renter02 ? 'justify-content: center;' :  ''}
	padding: ${props=> props.renter02 ? '20px 0' :  '12px 30px 12px 15px;'};
	margin-bottom: ${props => props.marginAfter ? '25px' : 0};
`
export const InfoAert = styled.Image`
	width: 14px;
	height: 14px;
	margin-right: 6px;
	margin-top: 1px;
`

export const ViewBorderY = styled(Common.ViewBorder)`
	padding: 0;
	flex-direction: row;
`
export const YellowLabel = styled.View`
	width: ${props => props.wide ? '110px' : '80px'};
	height: 100%;
	background-color: ${Colors.mainColor};
	justify-content: center;
	align-items: center;
`
export const YellowLabelText = styled(Common.TextLight14)``

export const BorderYInnerBox = styled.View`
	flex: auto;
	height: 100%;
	padding: 0 10px;
	justify-content: center;
	background-color : ${props => props.TextNon ? Colors.bgColor : Colors.whiteColor };
`
export const YTextInput = styled.TextInput`
	font-size: 14px;
	font-weight: ${styleGuide.Light};
	height: 100%;
	padding: 0;
	width: 100%;
	flex: auto;
`
export const BtnBox = styled.View`
	flex-direction: column;
	justify-content: center;
	padding-bottom: 20px;
`
//Common AlertBox
export const AlertBox = styled.View`
	flex-direction: row;
	background-color: ${Colors.chatNoticeColors};
	${props=> props.renter02 ? 'justify-content: center;' :  ''}
	padding: 17px 30px 17px 20px;
	margin-top: ${props => props.marginT || 0}px;
`
export const AlertBoxText = styled(Common.TextLight14)`
	color: ${Colors.whiteColor};
	line-height: 17px ;
`
// 01,02,04
export const ContractBtn = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${Colors.mainColor};
	border-radius: 8px;
	height: 40px;
`
//주소찾기 버튼
export const YellowAddBtn = styled.TouchableOpacity`
	position: absolute;
	right: 4px;
	top: 4px;
	line-height: 40px;
	font-size: 12px;
	height: 26px;
	padding: 0 10px;
	background-color: ${Colors.mainColor};
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	border-width: 0.5px;
	border-color: ${Colors.blackColor};
`

//apply 01,02 common
export const HeaderBox = styled.View`
	margin-bottom: 24px;
`
export const ContractBorder20 = styled.View`
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: ${props => props.Last ? '39px' : '20px'};
  	border-bottom-width: ${props => props.Last ? '0px' : '5px'};
	border-bottom-color: ${Colors.borderBottomColors};
`
export const Contract20 = styled.View`
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 39px;
`
export const ContractBtnBox = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
`
export const ContractdelBtn = styled(ContractBtn)`
	width: 115px;
	background-color: ${Colors.blackColor};
	margin: 0 4px;
`

//Apply 01 
export const Btn01Box = styled(BtnBox)`
	margin-top: 24px;
	padding-bottom: 0px;
`
export const Contract01Btn = styled(ContractBtn)`
	width: 160px;
`
export const ContractBtnText = styled(Common.TextMedium16)`
	margin-left: 4px;
	color: ${props => props.whiteTit ? Colors.whiteColor : Colors.blackColor};
`

//Apply 02
export const ApplyInfoBox = styled.View`
	padding-top: 12px;
	padding-bottom: 10px;
`
export const ChkGreyBox = styled.View`
	background-color: ${Colors.bgColor};
	padding: 5px 7px;
	margin-top: 34px;
`

//Apply 03
export const ApplyChkCont = styled.View`
	margin-top: 17px;
`

export const ApplyChkItemBox = styled.View`
	border-bottom-width: 0.5px;
	border-bottom-color: ${Colors.borderLightColors};
	padding: 15px 20px 15px 0;
`
export const ApplyChkBox = styled.View`
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
`
export const ApplyText = styled.Text`
	font-size: 12px;
	padding-left: 3px;
	padding-right: 10px;
	padding-top: 4px;
	line-height: 15px;
	color: ${props => props.whiteTit ? '#ffffff' : '#000000'};
`

//Apply 04
//저장 버튼 상단 마진
// export const Btn02Box = styled(BtnBox)`
// 	margin-top: 10px;
// `
export const Contract02Btn = styled(ContractBtn)`
	width: 115px;
	margin-bottom: 10px;
`
export const YellowViewBorder = styled.View``


export const UnitTit = styled(Common.TextLight14)`
	position: absolute;
	right: 10px;
	font-weight: ${props => props.bold ? styleGuide.Bold : styleGuide.Light};
`

//ContractRadioBox
export const ContractRadioBox = styled.View`
	margin-bottom: ${props => props.marginB ? 10 : 0}px;
	margin-top: ${props => props.marginT ? 10 : 0}px;
`

//계약 기본사항
export const ContractBasicsWrap = styled.ScrollView.attrs(props => ({
	contentContainerStyle: {
		paddingVertical: 10
	}
  }))`
	font-size: 12px;
	font-weight: 300;
	height: 134px;
	border: 0.5px solid ${Colors.textNonColors};
	padding: 0 10px;
`
//계약 특약사항
export const SpecialTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 10px;
`
export const YellowBorderBtn = styled.TouchableOpacity`
	flex-direction: row;
	height: 30px;
	width: 59px;
	justify-content: center;
	align-items: center;
	padding-right: 12px;
	padding-left: 11px;
	border-radius: 50px;
	background-color: ${Colors.mainColor};
`
export const SpecialContract = styled.View`
	font-size: 12px;
	font-weight: 300;
	border: 0.5px solid ${Colors.textNonColors};
	margin-bottom: 8px;
`
export const SContractHeader = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
  	padding: 13px 8px 13px 13px;
	padding-left: 12px;
	padding-right: 8px;
	background-color: ${Colors.mainColor};
`
export const SContractCont = styled.View`
	padding: 12px 12px 20px 12px;
`
//추가 특약사항
export const SpecialContractInput = styled.TextInput`
	font-size: 14px;
	line-height: 18px;
	height: 130px;
	padding: 12px 14px;
	border: 0.5px solid ${Colors.textNonColors};
	align-items: flex-start;
	justify-content: flex-start;
	margin-bottom: ${props => props.marginBN ? 0 : 24}px;
`
export const SaveBtn = styled.TouchableOpacity`
	width: 115px;
	height: 40px;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.mainColor};
`