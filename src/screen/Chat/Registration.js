import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import ChatHeaderSale from './../../components/chat/ChatHeaderSale';

import{Image20,ScrollContainer20,Container,TextBold12,TextLight12,FlexRowBox,Image14,TextBold13,TextLight11,Image24}from"../../styled/commonStyle";
import{RegistrationContainer,RegistrationImg,RegistrationText,RegistrationWrap,RegistrationItemBox,InnerBox,ServiceApplyComplet,ServiceIcon,ServiceTit,ApplyWrap,ApplyYellowBtn,BtnTit,ApplyTitBox,ApplyTit,ApplyBoldTit}from"../../styled/chatStyle/registrationStyle.js";

const ChkIcon = () => (<Image20 source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')} /> );
const ProContract = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [registration, setRegistration] = useState(false)

	useEffect(()=>{
		const handleEffect = async (props) => {
			
		}
		handleEffect()
	},[])

	const ApplyComplet = () => (
		<ApplyWrap>
			<ServiceApplyComplet>
				<FlexRowBox>
					<ServiceIcon source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
					<TextBold13 whiteTit>등기 서비스 신청이 완료되었습니다.</TextBold13>
				</FlexRowBox>
				<ServiceTit>집판다 등기 서비스팀이{"\n"}직접 회원님 연락처로 전화드립니다.</ServiceTit>
			</ServiceApplyComplet>
			<ApplyYellowBtn>
				<Image24 source={require('../../../assets/img/drawable-xhdpi/icon_registration_cencel.png')} />
				<BtnTit>신청취소</BtnTit>
			</ApplyYellowBtn>
		</ApplyWrap>
	)
	const Apply = () => (
		<ApplyWrap>
			<ApplyTitBox>
				<ApplyTit>지금 바로 집판다</ApplyTit>
				<ApplyBoldTit>최저가 등기 서비스를 신청하십시오.</ApplyBoldTit>
			</ApplyTitBox>
			<ApplyYellowBtn>
				<Image24 source={require('../../../assets/img/drawable-xhdpi/icon_registration_b.png')} />
				<BtnTit>등기신청</BtnTit>
			</ApplyYellowBtn>
		</ApplyWrap>
	)

	return(
		<RegistrationContainer>
			<RegistrationWrap>			
				<RegistrationImg source={require('../../../assets/img/drawable-xhdpi/icon_registration.png')} />
				<RegistrationText>등기서비스 신청</RegistrationText>
				<RegistrationItemBox>
					<InnerBox>
						<FlexRowBox>
							<ChkIcon/><TextLight12><TextBold12>부동산 등기의 거품을 제거</TextBold12>했습니다.</TextLight12>
						</FlexRowBox>
						<FlexRowBox>
							<ChkIcon/><TextLight12><TextBold12>집판다 등기서비스는 중개소 소개비</TextBold12>가 없습니다.</TextLight12>
						</FlexRowBox>
						<FlexRowBox>
							<ChkIcon/><TextLight12><TextBold12>가장 빠르고 정확하게 최상의 서비스</TextBold12>를 제공합니다.</TextLight12>
						</FlexRowBox>
					</InnerBox>
				</RegistrationItemBox>

				{/* 계약 신청 , 신청 완료 */}
				{ registration ? <ApplyComplet /> : <Apply /> }
				
			</RegistrationWrap>

			</RegistrationContainer>
	)
}
export default ProContract;


