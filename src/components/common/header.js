import React from 'react';
import styled from 'styled-components/native';
import { Platform }  from 'react-native';
import * as Common from './../../styled/commonStyle';


// pre Icon
export const PrevIcon = () => (
	<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_header_back.png')}/>
)

// zipanda logo Icon
export const ZipandaLogoIcon = () => (
	<ZipandaLogoIcons source={require('./../../../assets/img/drawable-xhdpi/bt_logo_home.png')}/>
)
export const ZipandaLogoIconML = () => (
	<ZipandaLogoIconMLs source={require('./../../../assets/img/drawable-xhdpi/bt_logo_home.png')}/>
)

// menu Icon
export const MenuIcon = () => (
	<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_menu.png')}/>
)
// chattig list menu Icon
export const ChatMenuIcon = () => (
	<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_chat_list.png')}/>
)

// close
export const CloseIcon = () => (
	<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_menu_close.png')}/>
)

// notice on off
export const NoticeIconOn = () => (
	<Common.Image size={24} source={ require('./../../../assets/img/drawable-xhdpi/bt_bell_on_bg_yellow.png')}/>
)
export const NoticeIconOff = () => (
	<Common.Image size={24} source={ require('./../../../assets/img/drawable-xhdpi/bt_bell_off.png')}/>
)


export const ZipandaLogoIcons = styled.Image`
	width: 57px;
 	height: 19px;
`
export const ZipandaLogoIconMLs = styled(ZipandaLogoIcons)`
	width: 57px;
 	height: 19px;
	margin-left: 20px;
`