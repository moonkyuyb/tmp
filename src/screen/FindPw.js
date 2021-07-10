import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from "react-native-modal";
import { ModalBtn, ModalBtnBox, ModalContainer, ModalHeader, ModalTextCont } from '../styled/modal/modalStyle';

import * as Common from '../styled/commonStyle';
import PointText from '../components/common/PointText'
import Colors from './../../assets/colors';

import { useForm } from "react-hook-form";
import {AccountSubHeader} from '../styled/mypageStyle/CommonSubAccountStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptWithSHA256 } from '../utils/common';
import { CloseIcon } from '../components/common/header';

	

const FindPW = ({handleFindPW, resultMSG, resultCode, handlePopup}) => {
    
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
			<Modal isVisible={resultCode=="0000"}>
					<ModalContainer>
						<ModalHeader>
							<Common.TextBold13 ></Common.TextBold13>
							<Common.TouchableOpacity onPress={()=>{handlePopup();}} ><CloseIcon/></Common.TouchableOpacity>
						</ModalHeader>
						<ModalTextCont>
							<Common.TextBold14>{resultMSG[0]}</Common.TextBold14>
						</ModalTextCont>
						<ModalBtnBox>
							<ModalBtn onPress={()=>{handlePopup(); /*if(resultCode=="0000"){navigation.navigate("index");}*/ }}><Common.TextBold13 whiteTit>확인</Common.TextBold13></ModalBtn>
						</ModalBtnBox>
					</ModalContainer>
			</Modal>
			}
			<Common.ScrollContainer>
				<AccountSubHeader>
					<PointText><Common.TextSemiBold18>비밀번호가 생각나지 않으시나요?</Common.TextSemiBold18></PointText>
					<Common.TextLight14 paragraph marginT={8}>
						<Common.TextSemiBold14 paragraph>회원가입 시 입력한 성명과 아이디(이메일)를 입력해주시면, 회원님의
메일로 비밀번호 찾기 안내 메일이 발송됩니다.</Common.TextSemiBold14>
					</Common.TextLight14>
				</AccountSubHeader>
			
				<Common.SubTitle marginTN>성명</Common.SubTitle>
				<Common.InputBorder marginBN  onChangeText={(value)=>{ setValue("m_name", value) } } placeholder={'성명'} />
				
				<Common.SubTitle>이메일</Common.SubTitle>
				<Common.InputBorder  onChangeText={(value)=>{ setValue("m_mail", value) } } placeholder={'이메일'} />
			
			</Common.ScrollContainer>
			<Common.FloatBtn onPress={()=>{handleFindPW({m_name:getValues("m_name"), m_mail:getValues("m_mail")})}} >
				<Common.TextSemiBold18>확인</Common.TextSemiBold18>
			</Common.FloatBtn>
		</Common.ZipandaSafeView>
	)
}
export default FindPW;