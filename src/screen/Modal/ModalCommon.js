import React, { useEffect, useState } from 'react';
import { block } from 'react-native-reanimated';
import{ ModalContainer, ModalHeader, ModalBtnBox, ModalBtn }from"../../styled/modal/modalStyle";

import * as Common from "../../styled/commonStyle";
import Colors from './../../../assets/colors';
import { CloseIcon } from '../../components/common/header';

const ModalCommon = props => {

	const ModalCloseBtn = () => (<Common.TouchableOpacity onPress={props.toggleModal}><CloseIcon/></Common.TouchableOpacity>);
	
	return (
		<ModalContainer style={ props.isVisible == true ? {display:'block'}:{display:'none'}}>
			<ModalHeader>
				<Common.TextSemiBold14>{props.title?props.title:''}</Common.TextSemiBold14>
				<ModalCloseBtn  />
			</ModalHeader>
				{props.children}
			<ModalBtnBox>
				<ModalBtn btnColor={Colors.mainColor} ><Common.TextSemiBold14>확인</Common.TextSemiBold14></ModalBtn>
				<ModalBtn onPress={props.toggleModal}><Common.TextSemiBold14 color={Colors.whiteColor}>취소</Common.TextSemiBold14></ModalBtn>
			</ModalBtnBox>
		</ModalContainer> 
	);
};
export default ModalCommon;
