import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import { Dimensions } from 'react-native';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

export const DrawerColseBtn = styled.TouchableOpacity`
	position: absolute;
	z-index: 99999;
	top: 8px;
	right: -8px;
	width: 40px;
	height: 40px;
	justify-content: center;
	align-items: center;
`
export const Dot = styled.View`
	width: 3px;
	height: 3px;
	border-radius: 50px;
	background-color: ${Colors.lightGreyColor};
	margin: 0 8px;
`

//상태
export const ZipNotice = styled.View`
	width: 100%;
	flex-direction: row;
	background-color: ${Colors.whiteColor};
	border-radius: 12px;
	margin-top: 15px;
	margin-bottom: 5px;
	box-shadow: ${styleGuide.BoxShadow};
	align-items: center;
	padding: 0 10px;
`
//메뉴 
export const ZipandaMenuHeader = styled.View`
	flex-direction: row;
	align-items: center;
	padding-bottom: 13px;
	margin-bottom: 15px;
	padding-top: 20px;
	border-bottom-width: ${styleGuide.BorderLineWidth};
`



//메뉴3
export const MenuWrap = styled.View`
	padding-top: 27px;
	flex-direction: row;
	justify-content: space-between;
	margin-left: -4px;
`
export const MenuBtn = styled.TouchableOpacity`
	flex: auto;
	background-color: ${Colors.bgColor};
	height: 88px;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-radius: 12px;
	margin-left: 4px;
	margin-top: 10px;
`
export const ZzimLinkBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 95px;
  	height: 36px;
  	border-radius: 18px;
  	background-color: ${Colors.mainColor};
  	box-shadow: ${styleGuide.BoxShadow};
`



//하단 ㅁ뉴 리스트
export const MenuItemList = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 44px;
	padding-left: 8px;
	padding-right: 8px;
`

export const MenuItemListBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 44px;
	background-color: ${Colors.bgColor};
	padding-left: 12px;
	border-radius: 6px;
	margin-bottom: 2px;
	padding-right: 8px;

`
