import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from "react-native-modal";
import { ModalBtn, ModalBtnBox, ModalContainer, ModalHeader, ModalTextCont } from '../../styled/modal/modalStyle';

import * as Common from '../../styled/commonStyle';
import PointText from '../../components/common/PointText'
import Colors from './../../../assets/colors';

import { useForm } from "react-hook-form";
import {AccountSubHeader} from '../../styled/mypageStyle/CommonSubAccountStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptWithSHA256 } from '../../utils/common';
import { CloseIcon } from '../../components/common/header';

	

const PwAccount = ({ confirmMsg, handleConfirmLogout, handleLogOut, alertMsg, handleAlert, handleRequestPwChange, resultCode }) => {
console.log("confirmMsg==========================================")
console.log(confirmMsg);
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const {control, handleSubmit, getValues, setValue, clearErrors} = useForm()

	useEffect(()=>{
		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	},[])


	return(
		<Common.ZipandaSafeView>
			{
			confirmMsg.length > 0 &&
			<Modal isVisible={true}>
					<ModalContainer>
						<ModalHeader>
							<Common.TextSemiBold14>{''}</Common.TextSemiBold14>
							<Common.TouchableOpacity onPress={()=>{ handleConfirmLogout(""); }}><CloseIcon/></Common.TouchableOpacity>
						</ModalHeader>
						<ModalTextCont>
							<Common.TextBold14>{ confirmMsg[0].msg }</Common.TextBold14>
						</ModalTextCont>
						<ModalBtnBox>
							<ModalBtn btnColor={Colors.mainColor} onPress={()=>{ AsyncStorage.getItem("mID").then((result)=>{handleRequestPwChange({m_id:result, pw: encryptWithSHA256(getValues("pw")),new_pw: encryptWithSHA256(getValues("newPw")) });});  handleConfirmLogout(""); }}>
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
							<Common.TextBold13>{''}</Common.TextBold13>
							<Common.TouchableOpacity onPress={()=>{ handleAlert(""); }}><CloseIcon/></Common.TouchableOpacity>
						</ModalHeader>
						<ModalTextCont>
							<Common.TextBold14>{ alertMsg[0].msg }</Common.TextBold14>
						</ModalTextCont>
						<ModalBtnBox>
							<ModalBtn onPress={()=>{ handleAlert(""); if(resultCode=="0000"){navigation.navigate("index");} }}><Common.TextBold13 whiteTit>확인</Common.TextBold13></ModalBtn>
						</ModalBtnBox>
					</ModalContainer>
			</Modal>
			}
			<Common.ScrollContainer>
				<AccountSubHeader>
					<PointText><Common.TextSemiBold18>회원님의 계정 비밀번호를 재설정해주세요</Common.TextSemiBold18></PointText>
					<Common.TextLight14 paragraph marginT={8}>
						비밀번호는 <Common.TextSemiBold14 paragraph>영문, 숫자 각 2회 이상 사용, 8자 이상 조합</Common.TextSemiBold14>
						으로 기존 등록하신 비밀번호와 다르게 재입력 바랍니다.
					</Common.TextLight14>
				</AccountSubHeader>
			
				<Common.SubTitle marginTN>비밀번호</Common.SubTitle>
				<Common.InputBorder marginBN secureTextEntry={true} onChangeText={(value)=>{ setValue("pw", value) } } placeholder={'비밀번호 입력'} />
				
				<Common.SubTitle>비밀번호 확인</Common.SubTitle>
				<Common.InputBorder secureTextEntry={true} onChangeText={(value)=>{ setValue("newPw", value) } } placeholder={'비밀번호 다시 입력'} />
			
			</Common.ScrollContainer>
			<Common.FloatBtn onPress={() => {handleConfirmLogout("비밀번호를 변경하시겠습니까?")} }>
				<Common.TextSemiBold18>확인</Common.TextSemiBold18>
			</Common.FloatBtn>
		</Common.ZipandaSafeView>
	)
}
export default PwAccount;