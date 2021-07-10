import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { API_URL } from "@env";
import { launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import { ModalBtn, ModalBtnBox, ModalContainer, ModalHeader, ModalTextCont } from '../../styled/modal/modalStyle';
import * as Common from './../../styled/commonStyle';
import { CloseIcon } from './../../components/common/header';
import { ArrowIcon } from './../../components/common/ArrowIcon';
import Colors from './../../../assets/colors';
//import Spinner from '../../screen/Spinner'
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {AccountHeader,AccountBox,ListItemBtn,ListItem,TimeSetBox,HeaderImgBtn,ProfileWrap,ProfileImg,CameraIcon,ProfileNonImg} from '../../styled/mypageStyle/accountStyle';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAccount = ({ handleGetMyData, handleFileUpload, myData, profileImg, confirmMsg, handleConfirmLogout, handleLogOut, alertMsg, handleAlert }) => {

	//console.log("mydata === === === === === === === === ===")
	//console.log(myData);
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation();
	const [mInfo, setMInfo] = useState({});
	const [isLoading, setLoading] = useState(false);
	useEffect(() => {

		AsyncStorage.multiGet(["token", "mID"])
			.then((result) => {
				console.log("token=====================================================");
				console.log({ token: result[0][1], mID: result[1][1] })
				setMInfo({ token: result[0][1], mID: result[1][1] })
				//handleGetMyData({token:result[0][1], mID:result[1][1]});
			})

		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	}, [])

	useEffect(() => {
		//if (mID!=""){
		handleGetMyData(mInfo);
		//}
	}, [mInfo])
	function numberPad(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
	function timeFormat(apm, hour, min) {
		return numberPad(Number(apm) * 12 + Number(hour), 2) + ":" + min
	}
	const handleImageUpload = (field) => {
		let options = {
			mediaType: 'photo',
			includeBase64: true
		};
		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {
				setLoading(true);
				handleFileUpload({ mID: mInfo.mID, fileData: response })

			}
		})
	}

	useEffect(() => {
		setLoading(false);
	}, [profileImg]);

	const [showPop, setShowPop] = useState(true);

	const resetStorage=() =>{

		AsyncStorage.multiRemove(['mID','mName','token']);
		
	}

	const [conf, setConf] = useState(false);


	return (
		<>
			{/*
		<Spinner isLoading={isLoading} />
		*/}
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
							<ModalBtn btnColor={Colors.mainColor} onPress={()=>{ AsyncStorage.getItem( "token").then((result)=>{console.log(result); handleLogOut({token:result}); }); resetStorage();  handleConfirmLogout(""); }}>
								<Common.TextSemiBold14>확인</Common.TextSemiBold14>
							</ModalBtn>
							<ModalBtn onPress={()=>{ handleConfirmLogout(""); }}><Common.TextSemiBold14 color={Colors.whiteColor}>취소</Common.TextSemiBold14>
							</ModalBtn>
						</ModalBtnBox>
					</ModalContainer>
			</Modal>
			}
			{alertMsg.length > 0 &&
			<Modal isVisible={false}>
					<ModalContainer>
						<ModalHeader>
							<Common.TextSemiBold14>{''}</Common.TextSemiBold14>
							<Common.TouchableOpacity onPress={()=>{ }}><CloseIcon/></Common.TouchableOpacity>
						</ModalHeader>
						<ModalTextCont>
							<Common.TextBold14>{ alertMsg }</Common.TextBold14>
						</ModalTextCont>
						<ModalBtnBox>
							<ModalBtn onPress={()=>{setConf(false)}} >
								<Common.TextSemiBold14 color={Colors.whiteColor}>확인</Common.TextSemiBold14>
							</ModalBtn>
						</ModalBtnBox>
					</ModalContainer>
			</Modal>
			}
			<Common.ZipandaSafeView>
            	<Common.ScrollContainer>
					<AccountHeader>
						<HeaderImgBtn onPress={() => { handleImageUpload(); }}>
							<CameraIcon source={require('./../../../assets/img/drawable-xhdpi/bt_mypage_add_image.png')} />
							<ProfileWrap>
								<ProfileImg resizeMode={'cover'} source={{ uri: `${API_URL}${profileImg}` }} />
								<ProfileNonImg source={require('./../../../assets/img/drawable-xhdpi/bt_profile.png')}/>
							</ProfileWrap>
						</HeaderImgBtn>
						<Common.TextLight14>프로필 이미지</Common.TextLight14>
					</AccountHeader>
					<AccountBox>
						<ListItemBtn onPress={() => navigation.navigate('nameAccount')}>
							<Common.TextLight14>이름</Common.TextLight14>
							<Common.FlexRowBox>
								<Common.TextSemiBold16  marginR={8}>{myData.m_name}</Common.TextSemiBold16>
								<ArrowIcon/>
							</Common.FlexRowBox>
						</ListItemBtn>
						<ListItem>
							<Common.TextLight14>아이디(이메일)</Common.TextLight14>
							<Common.TextSemiBold16 color={Colors.textNonColors}>{myData.m_username}</Common.TextSemiBold16>
						</ListItem>
						<ListItem>
							<Common.TextLight14>비밀번호</Common.TextLight14>
							<Common.SmallBtn onPress={() => navigation.navigate('pwAccount')} btnColor={Colors.mainColor}>
								<Common.TextSemiBold12>비밀번호 변경</Common.TextSemiBold12>
							</Common.SmallBtn>
						</ListItem>
						<ListItem>
							<Common.TextLight14>전화번호</Common.TextLight14>
							<Common.FlexRowBox>
								<Common.TextSemiBold16 marginR={12}>{myData.m_phone}</Common.TextSemiBold16>
								{/* 								
								<Common.SmallBtn><Common.TextSemiBold12>{myData.m_appr_yn == 0 ? "인증미완료":"인증완료"}</Common.TextSemiBold12></Common.SmallBtn>
							 	*/}
							</Common.FlexRowBox>
						</ListItem>

						<ListItemBtn onPress={() => navigation.navigate('contactTelTime')}>
							<Common.TextLight14>연락가능시간</Common.TextLight14>
							<Common.FlexRowBox>
								<TimeSetBox>
									<Common.TextSemiBold16>평일 {timeFormat(myData.mc_weekday_from_ampm, myData.mc_weekday_from_hour, myData.mc_weekday_from_minute)}~{timeFormat(myData.mc_weekday_to_ampm, myData.mc_weekday_to_hour, myData.mc_weekday_to_minute)}</Common.TextSemiBold16>
									<Common.TextSemiBold16>토요일 {timeFormat(myData.mc_holiday_from_ampm, myData.mc_holiday_from_hour, myData.mc_holiday_from_minute)}~{timeFormat(myData.mc_holiday_to_ampm, myData.mc_holiday_to_hour, myData.mc_holiday_to_minute)}</Common.TextSemiBold16>
								</TimeSetBox>
								<ArrowIcon/>
							</Common.FlexRowBox>
						</ListItemBtn>
					</AccountBox>
					<ListItemBtn onPress={()=>{handleConfirmLogout("로그아웃 하시겠습니까?")}}>
						<Common.TextLight14>로그아웃</Common.TextLight14>
						<ArrowIcon/>
					</ListItemBtn>
					<ListItemBtn onPress={() => navigation.navigate('deleteAccount')}>
						<Common.TextLight14>회원탈퇴</Common.TextLight14>
						<ArrowIcon/>
					</ListItemBtn>
				</Common.ScrollContainer>
			</Common.ZipandaSafeView>
			
		</>
	)
}
export default MyAccount;