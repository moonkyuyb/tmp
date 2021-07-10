import styled from 'styled-components/native';
import {  StyleSheet, } from 'react-native';
import Colors from './../../../assets/colors';

import { Dimensions } from 'react-native';
const ModalWidth = (Dimensions.get('window').width * 0.777777777777778)+'px';

// modal common
export default StyleSheet.create({
	Modal:{	
		justifyContent: 'center',
		alignItems: 'center',
	}
});
export const ModalContainer = styled.View`
	background-color: ${Colors.whiteColor};
	justify-content: center;
	min-width: ${ModalWidth};
`
export const ModalTextCont = styled.View`
	justify-content: center;
	align-items: center;
	margin-bottom: 6px;
	padding: 0 25px;
	text-align: center;
`
export const ModalHeader = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 12px 12px 24px 12px;
`
export const ModalBtnBox = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-bottom: 30px;
	margin-top: 20px;
`
export const ModalBtn = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	width: 92px;
	height: 40px;
	margin: 0 2px;
	background-color: ${ props => props.btnColor ? props.btnColor : Colors.blackColor };
`
export const ModalSubTitleBox = styled.View`
	padding: 0 16px 10px 16px;
`
export const ModalSubTitle = styled.Text`
	font-size: 11px;
	line-height: 13px;
	font-weight: ${Platform.OS === 'android' ? 'bold' : 500 };
`
export const ModalCont = styled.View`
	padding: 0 18px 10px 18px;
`


//modal ModalPointBox
export const ModalPointBox = styled.View`
	margin: 10px 0;

`
export const ModalTextCenter = styled.View`
	text-align: center;

`

// modal text area
// <ModalTextArea multiline={true} placeholder={'내용을 입력해주세요.'} />
export const ModalTextArea = styled.TextInput`
	border: 0.5px solid ${Colors.borderColor};
	padding: 8px;
	height: 110;
	font-size: 12px;
	line-height: 15px;

`

// 주소검색 address
export const ModalAddressCont = styled.View`
	padding: 0 4px;
`
export const ModalSearchInputBox = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 34px; 
	padding: 0 6.5px 0 0;
	border: 0.5px solid ${Colors.borderLightColors};
	margin-top: 10px;
`
export const ModalInput = styled.TextInput`
	flex: auto;
	font-size: 12px;
	padding: 0 10px;
`
export const AddressGreyBox = styled.ScrollView`
	background-color: ${Colors.bgColor};
	height: 193px;
	padding: 0 11.5px;
`
export const AddressList = styled.View`
	margin-bottom: 1px;
	background-color: ${Colors.whiteColor};
	padding: 10px 12px 8px 12px;
`
export const PostCodeBox = styled.View`
	line-height: 17px;
	margin-bottom: 6px;
`
export const PostCodeOld = styled.Text`
	font-size: 11px;
	font-weight: 300;
	color: ${Colors.textNonColors};

`
export const AddressBox = styled.View`
	flex-direction: row;
	margin-bottom: 4px;
	/* border: 1px solid red; */

`
export const AddressLabel = styled.View`
	width: 32px;
	height: 16px;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.yellow ? Colors.mainColor : Colors.borderColor };
	border-radius: 4px;
	margin-right: 4px;
`
export const LabelTit = styled.Text`
	font-size: 9px;
	font-weight: 300;

`
export const AddressTit = styled.Text`
	font-size: 10px;
	font-weight: 300;
	padding-right: 30px;
	padding-top: 1px;
	line-height: 12px;

`



//my page zzim sale
export const ModalLabelBtnBox = styled.View`
	flex-wrap: wrap;
	flex-direction: row;
`
export const MLabelBtn = styled.TouchableOpacity`
	width: 32%;
	justify-content: center;
	align-items: center;
	height: 34px;
	margin: 0 0.65%;
	margin-bottom: 4px;
	border-width: 0.5px;
	border-color: ${ props => props.active ? Colors.blackColor : Colors.boxlineColors };
	background-color: ${props => props.active ? Colors.mainColor : Colors.whiteColor };
`
export const UnitBtn = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	margin-bottom: 12px;
`
export const UnitIcon = styled.Image`
	width: 28px;
	height: 28px;
	margin-right: 8px;
`