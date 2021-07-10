import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from './../styled/commonStyle';
import{RegistrationItemBox,ServiceApplyComplet,ApplyWrap,ApplyYellowBtn,BtnTit,ApplyTitBox}from"./../styled/chatContractStyle/registrationStyle";
import Colors from './../../assets/colors';

const ChkIcon = () => (<Common.Image size={24} marginR={2} source={require('./../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')} /> );
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
			<Common.FlexRowBox>
				<Common.Image size={14} source={require('./../../assets/img/drawable-xhdpi/icon_alert.png')} />
				<Common.TextSemiBold14 color={Colors.whiteColor}>등기 서비스 신청이 완료되었습니다.</Common.TextSemiBold14>
			</Common.FlexRowBox>
			<Common.TextLight12 paragraph color={Colors.whiteColor} align={'center'} marginT={8}>
				집판다 등기 서비스팀이{"\n"}직접 회원님 연락처로 전화드립니다.
			</Common.TextLight12>
		</ServiceApplyComplet>
		<ApplyYellowBtn>
			<Common.Image size={24} source={require('./../../assets/img/drawable-xhdpi/icon_registration_cencel.png')} />
			<BtnTit>신청취소</BtnTit>
		</ApplyYellowBtn>
	</ApplyWrap>		
	)
	const Apply = () => (
		<ApplyWrap>
			<ApplyTitBox>
				<Common.TextLight16 marginB={4}>지금 바로 집판다</Common.TextLight16>
				<Common.TextSemiBold16>최저가 등기 서비스를 신청하십시오.</Common.TextSemiBold16>
			</ApplyTitBox>
			<ApplyYellowBtn>
				<Common.Image size={24} source={require('./../../assets/img/drawable-xhdpi/icon_registration_b.png')} />
				<BtnTit>등기신청</BtnTit>
			</ApplyYellowBtn>
		</ApplyWrap>	
	)

	return(
		<Common.ZipandaSafeView>
			<Common.VerticalCenter>		

				<Common.Image size={98} marginB={30} source={require('./../../assets/img/drawable-xhdpi/icon_registration.png')} />
				<Common.TextBold24>등기서비스 신청</Common.TextBold24>
				
				<RegistrationItemBox>
					<Common.FlexRowBox>
						<ChkIcon/>
						<Common.TextLight14><Common.TextBold14>부동산 등기의 거품을 제거</Common.TextBold14>했습니다.</Common.TextLight14>
					</Common.FlexRowBox>
					<Common.FlexRowBox>
						<ChkIcon/>
						<Common.TextLight14><Common.TextBold14>집판다 등기서비스는 중개소 소개비</Common.TextBold14>가 없습니다.</Common.TextLight14>
					</Common.FlexRowBox>
					<Common.FlexRowBox>
						<ChkIcon/>
						<Common.TextLight14><Common.TextBold14>가장 빠르고 정확하게 최상의 서비스</Common.TextBold14>를 제공합니다.</Common.TextLight14>
					</Common.FlexRowBox>
				</RegistrationItemBox>

				{/* 계약 신청 , 신청 완료 */}
				{ registration ? <ApplyComplet /> : <Apply /> }
				
			</Common.VerticalCenter>
		</Common.ZipandaSafeView>
	)
}
export default ProContract;


