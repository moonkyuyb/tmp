import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

/* COMMON COMPONENTS */
import Colors from '../../../assets/colors';
import * as Common from './../../styled/commonStyle';
import { RegisterHeader, RegisterTit, RegisterCont, RegisterBtn, RegisterFooter } from './../../styled/registerStyle/registerScreenStyle'

import { PrevIcon, ZipandaLogoIcon, CloseIcon, NoticeIconOff, NoticeIconOn, MenuIcon } from './../../components/common/header';
import Modal from "react-native-modal";
import { ModalBtn, ModalBtnBox, ModalContainer, ModalHeader, ModalTextCont } from '../../styled/modal/modalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ModalPopup } from '../../container/commonContainer';


const RegisterScreen = ({myData, handleInit, handleRequest, showAlertMessage}) => {

	console.log("myData========================================================");
	console.log(myData);

	const [notice, setNotice] = useState(false)

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const ChkIcon = () => (<Common.Image size={24} marginR={2} source={require('./../../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')}/>)
	const [mID, setMID] = useState("");
	useEffect(()=>{
		const handleEffect = async (props) => {
			//navigation
			
			navigation.setOptions({
				drawerLabel: 'About',
				headerStyle: {
					backgroundColor: Colors.mainColor,	
					shadowColor: 'transparent', elevation:0
				},
				headerTitle: "" ,
				headerLeft: props => (
					<Common.FlexRowBtn marginL={20} onPress={()=>navigation.navigate('index')} {...props}>
						<PrevIcon/><ZipandaLogoIcon/>
					</Common.FlexRowBtn>),
				headerRight: () => (
					<Common.FlexRowBox marginR={20}>
						<Common.TouchableOpacity marginR={8} >
							{ notice ? <NoticeIconOn/> : <NoticeIconOff/> }
						</Common.TouchableOpacity>
						<Common.TouchableOpacity onPress={()=>navigation.openDrawer()}>
							<MenuIcon/>
						</Common.TouchableOpacity>
					</Common.FlexRowBox>
				),
			})
			
			AsyncStorage.multiGet(["token", "mID"])
			.then((result)=>{
			setMID(result[1][1]);
			handleInit({token:result[0][1], mID:result[1][1]});
			})
			.catch((err)=>{
			})
		}
		handleEffect()
	},[])


	const [isShow, setShow] = useState(false);

	

	return(
		<Common.ZipandaSafeView bgColor={Colors.mainColor}>
			<ModalPopup />

            <Common.ScrollContainer>

				<Modal isVisible={isShow}>
					<ModalContainer>
						<ModalHeader>
							<Common.TextSemiBold15>{''}</Common.TextSemiBold15>
							<Common.TouchableOpacity onPress={()=>{ setShow(false); }}>
								<CloseIcon/>
							</Common.TouchableOpacity>
						</ModalHeader>
						<ModalTextCont>
							<Common.TextSemiBold15 paragraph>{ `성함:${myData.m_name}\n연락처:${myData.m_phone}\n회원님의 정보를 확인 해 주세요.\n매물 등록을 의뢰하시겠습니까?` }</Common.TextSemiBold15>
						</ModalTextCont>
						<ModalBtnBox>
							<ModalBtn onPress={()=>{ handleRequest({m_id:mID, s_wait_reg_status:1})}} btnColor={Colors.mainColor}><Common.TextSemiBold14>확인</Common.TextSemiBold14></ModalBtn>
							<ModalBtn onPress={()=>{ setShow(false); }}><Common.TextSemiBold14 color={Colors.whiteColor}>취소</Common.TextSemiBold14></ModalBtn>
						</ModalBtnBox>
					</ModalContainer>
				</Modal>
				<RegisterHeader>
					<Common.TextUltraLight20 paragraph>직접 등록해도, 대신 등록해도</Common.TextUltraLight20>
					<RegisterTit>집판다는 매물 등록 비용이</RegisterTit>
					<RegisterTit>없습니다</RegisterTit>
				</RegisterHeader>
				
				<RegisterCont border>
					<Common.View>
						<Common.TextUltraLight16 paragraph>
							필수 정보와 직접 찍은 사진으로{"\n"}<Common.TextSemiBold16 paragraph>매물을 빠르고 간편하게{"\n"}등록</Common.TextSemiBold16>할 수 있어요.
						</Common.TextUltraLight16>
						<RegisterBtn onPress={() => { if(mID==null || mID==""){showAlertMessage('로그인 후 이용 가능합니다.')}else{ setShow(true) } }  }>
							<Common.Image size={24} marginR={9} source={require('./../../../assets/img/drawable-xhdpi/icon_direct_regist.png')} />
							<Common.TextSemiBold16>등록 의뢰하기</Common.TextSemiBold16>
						</RegisterBtn>
					</Common.View>
					<Image source={require('./../../../assets/img/drawable-xhdpi/img_regist.png')} style={{width:77, height:132}}/>
				</RegisterCont>
				<RegisterCont>
					<Image source={require('./../../../assets/img/drawable-xhdpi/img_call_regist.png')} style={{width:104, height:105}}/>
					<Common.View ViewAlign={'flex-end'}>
						<Common.TextUltraLight16 paragraph align={'right'}>
							등록하실 매물의 정보를 {"\n"}<Common.TextSemiBold16 paragraph align={'right'}>전달해주시면 “판비서”가 매물을 {"\n"}대신 등록</Common.TextSemiBold16>해드려요.
						</Common.TextUltraLight16>
						<RegisterBtn onPress={() =>{ if(mID==null || mID==""){showAlertMessage('로그인 후 이용 가능합니다.')}else{ navigation.navigate('salesDirect', {mode:'new'}); } }}>
							<Common.Image size={24} marginR={11} source={require('./../../../assets/img/drawable-xhdpi/icon_call_regist.png')}/>
							<Common.TextSemiBold16>직접 등록하기</Common.TextSemiBold16>
						</RegisterBtn>
					</Common.View>
				</RegisterCont>
				<RegisterFooter>
				
					<Common.FlexRowBox flexStart marginB={12}>
						<ChkIcon/>
						<Common.FlexView>
							<Common.TextLight14>
								등록 의뢰를 선택하시면 작성하신 정보를 바탕으로 집판다의 에이전트 
								<Common.TextSemiBold14>“판비서”가 통화 예정 시간과 구비 서류 안내</Common.TextSemiBold14>
								를 직거래톡으로 보내드립니다.
							</Common.TextLight14>
						</Common.FlexView>
					</Common.FlexRowBox>
					<Common.FlexRowBox flexStart>
						<ChkIcon/>
						<Common.FlexView>
							<Common.TextLight14>
								등록 의뢰를 선택하시면 작성하신 정보를 바탕으로 집판다의 에이전트 
								<Common.TextSemiBold14>“판비서”가 통화 예정 시간과 구비 서류 안내</Common.TextSemiBold14>
								를 직거래톡으로 보내드립니다.
							</Common.TextLight14>
						</Common.FlexView>
					</Common.FlexRowBox>
				</RegisterFooter>
			</Common.ScrollContainer>
			
		</Common.ZipandaSafeView>
	)
}
export default RegisterScreen;