import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Modal from "react-native-modal";
import * as Common from '../../styled/commonStyle';
import Colors from '../../../assets/colors';
import { ModalBtn, ModalBtnBox, ModalContainer, ModalHeader, ModalTextCont } from '../../styled/modal/modalStyle';
import { BorderTextBox, TextDot, ListItem } from '../../styled/mypageStyle/deleteAccountStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
	

const DeleteAccount = ({handleConfirmLogout, handleLogOut, confirmMsg, alertMsg, handleAlert, handleRequestDelete}) => {
	
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	},[])
	
	const resetStorage=() =>{

		AsyncStorage.multiRemove(['mID','mName','token'])
	}


	return(
		<Common.ZipandaSafeView>
			{
			confirmMsg.length > 0 &&
			<Modal isVisible={true}>
					<ModalContainer>
						<ModalHeader>
							<Common.TextSemiBold14>{''}</Common.TextSemiBold14>
							<Common.TouchableOpacity onPress={()=>{ }}><Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_menu_close.png')}/></Common.TouchableOpacity>
						</ModalHeader>
						<ModalTextCont>
							<Common.TextBold14>{ confirmMsg[0].msg }</Common.TextBold14>
						</ModalTextCont>
						<ModalBtnBox>
							<ModalBtn color={Colors.mainColor} onPress={()=>{ AsyncStorage.getItem( "mID").then((result)=>{handleRequestDelete({m_id:result}); }); resetStorage(); handleConfirmLogout(""); }}>
								<Common.TextSemiBold14>확인</Common.TextSemiBold14>
							</ModalBtn>
							<ModalBtn onPress={()=>{ handleConfirmLogout(""); }}><Common.TextSemiBold14 color={Colors.whiteColor}>취소</Common.TextSemiBold14></ModalBtn>
						</ModalBtnBox>
					</ModalContainer>
			</Modal>
			}
			{
			alertMsg.length > 0 &&
			<Modal isVisible={true}>
					<ModalContainer>
						<ModalHeader>
							<Common.TextSemiBold14>{''}</Common.TextSemiBold14>
							<Common.TouchableOpacity onPress={()=>{ }}><Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_menu_close.png')}/></Common.TouchableOpacity>
						</ModalHeader>
						<ModalTextCont>
							<Common.TextBold14>{ alertMsg[0].msg }</Common.TextBold14>
						</ModalTextCont>
						<ModalBtnBox>
							<ModalBtn onPress={()=>{ handleAlert(""); navigation.navigate("index") }}><Common.TextSemiBold14 color={Colors.whiteColor}>확인</Common.TextSemiBold14></ModalBtn>
						</ModalBtnBox>
					</ModalContainer>
			</Modal>
			}
			<Common.ScrollContainer>
				<Common.FlexCenter column>
					<Common.Image size={87} marginT={8} source={require('./../../../assets/img/drawable-xhdpi/icon_withdrawal.png')}/>
					<BorderTextBox>
						<ListItem>
							<TextDot/>
							<Common.TextLight14 paragraph>회원 탈퇴와 동시에 서비스 이용내역 및 모든 데이터 (개인정보 및 등록 매물)가 삭제됩니다.</Common.TextLight14>
						</ListItem>
						<ListItem>
							<TextDot/>
							<Common.TextLight14 paragraph>이후 동일한 계정으로 가입이 가능하지만 기록은 남아있지 않습니다.</Common.TextLight14>
						</ListItem>
						<ListItem>
							<TextDot/>
							<Common.TextLight14 paragraph>거래 진행 (매수∙매도) 중인 매물이 있을 경우 회원탈퇴가 제한됩니다.</Common.TextLight14>
						</ListItem>
					</BorderTextBox>
				</Common.FlexCenter>
			</Common.ScrollContainer>
			<Common.FloatBtnBox>
				<Common.FloatBtnsss onPress={()=>{handleConfirmLogout("회원탈퇴 하시겠습니까?")}} >
					<Common.TextSemiBold18>회원탈퇴</Common.TextSemiBold18>
				</Common.FloatBtnsss>
				<Common.FloatBtnsss btnColor={Colors.blackColor}>
					<Common.TextSemiBold18 color={Colors.whiteColor}>취소</Common.TextSemiBold18>
				</Common.FloatBtnsss>
			</Common.FloatBtnBox>
		</Common.ZipandaSafeView>
	)
}
export default DeleteAccount;