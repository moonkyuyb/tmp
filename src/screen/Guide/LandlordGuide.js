import React, { useEffect, useState } from 'react';

import * as Common from './../../styled/commonStyle';
import{ GuideHeader,GuideHeaderBtn,GuideTitBox,GuideTitList,GuideTitIcon,PdfDownBox,PdfIconS,PdfTitBox } from "./../../styled/GuideStyle/GuideStyle";

const LandlordGuide = props => {

	useEffect((props)=>{
		const handleEffect = async (props) => {
			//...
		}
		
		handleEffect()
	},[])
	const StepIcon01 = () => (<Common.Image size={28} marginR={15} source={require('./../../../assets/img/drawable-xhdpi/icon_housesearch.png')} />)
	const StepIcon02 = () => (<Common.Image size={28} marginR={15} source={require('./../../../assets/img/drawable-xhdpi/icon_common_deal.png')} />)
	const StepIcon03 = () => (<Common.Image size={28} marginR={15} source={require('./../../../assets/img/drawable-xhdpi/icon_common_sign.png')} />)
	const StepIcon04 = () => (<Common.Image size={28} marginR={15} source={require('./../../../assets/img/drawable-xhdpi/icon_common_pay.png')} />)
	const StepIcon05 = () => (<Common.Image size={28} marginR={15} source={require('./../../../assets/img/drawable-xhdpi/icon_common_real_sign.png')} />)
	const StepIcon06 = () => (<Common.Image size={28} marginR={15} source={require('./../../../assets/img/drawable-xhdpi/icon_common_registered.png')} />)
	const PdfIcon = () => (<PdfIconS source={require('./../../../assets/img/drawable-xhdpi/bt_pdf_download.png')} />)
	
	const GuideList = (props) => (
		<GuideTitList>
			<GuideTitIcon>✔︎</GuideTitIcon>
			<Common.TextLight14 paragraph marginB={4}>{props.title?props.title:''}</Common.TextLight14>
		</GuideTitList>)
	
	
	return (
		<Common.ZipandaSafeView>
			<Common.ScrollContainer>
			
				<GuideHeader>
					<StepIcon01 />
					<Common.View><Common.TextLight12 marginB={4}>Step 01</Common.TextLight12><Common.TextBold14>매물 검색</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="집판다 회원 가입 후 본인인증을 완료합니다. "/>
					<GuideList title="매물 관리 규정에 맞게 매물을 등록합니다."/>
					<GuideList title="매물 등록이 완료되면 실매물 여부를 관리자에서 확인 후 승인을 해야 매물이 회원들 검색 결과에 노출 됩니다."/>
				</GuideTitBox>
			
				<GuideHeader>
					<StepIcon02 />
					<Common.View><Common.TextLight12 marginB={4}>Step 02</Common.TextLight12><Common.TextBold14>거래 협의</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="매수(임차)인이 매물 거래를 위해 직거래톡 메시지를 등록하면 매물 거래를 위한 1:1 메시지 창이 생성됩니다."/>
					<GuideList title="직거래톡 메시지 창에서 매수(임차)인과 전화번호 공개, 매물 방문 등을 통해 매매(임차) 조건을 협의합니다."/>
				</GuideTitBox>
			
				<GuideHeader>
					<StepIcon03 />
					<Common.View><Common.TextLight12 marginB={4}>Step 03</Common.TextLight12><Common.TextBold14>가 계약서 날인</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="매수(임차)인과 매매(임차) 조건 협의가 되면 상호간의 동의 하에 가 계약서 작성을 신청합니다."/>
					<GuideList title="가 계약서 작성을 위해 매매(임차) 조건을 상세하게 입력하여 가 계약서 작성을 신청합니다."/>
					<GuideList title="집판다 계약 관리자가 가 계약서 작성을 완료하여 등록을 하면 직거래 톡을 통해 날인 요청 메시지가 수신됩니다."/>
					<GuideList title="가 계약서 내용을 확인한 후 날인을 위한 2차 인증을 완료합니다."/>
					<GuideList title=" 2차 인증이 완료되면 가 계약서에 날인을 하고 상대방이 날인을 할 때까지 기다립니다."/>
				</GuideTitBox>
			
				<GuideHeader>
					<StepIcon04 />
					<Common.View><Common.TextLight12 marginB={4}>Step 04</Common.TextLight12><Common.TextBold14>입금 및 영수증 확인</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="가 계약서에 작성된 계약금 및 중도금 입금 날짜에 협의된 금액이 입금이 되었는지 확인합니다."/>
					<GuideList title="정해진 날짜에 입금이 된 것을 확인하였다면 해당 금액에 대한 영수증을 발급합니다."/>
				</GuideTitBox>
			
				<GuideHeader>
					<StepIcon05 />
					<Common.View><Common.TextLight12 marginB={4}>Step 05</Common.TextLight12><Common.TextBold14>계약서 날인</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="가 계약서에 작성된 잔금 일자에 맞춰 계약서 작성을 신청합니다."/>
					<GuideList title="가 계약서와 변동된 계약사항이나 특약사항이 있으면 그 부분을 수정 또는 추가하여 계약서 작성을 신청합니다."/>
					<GuideList title="집판다 계약 관리자가 계약서 작성을 완료하여 등록을 하면 직거래 톡을 통해 날인 요청 메시지가 수신됩니다."/>
					<GuideList title="가 계약서 내용을 확인한 후 날인을 하고 상대방이 날인을 할 때까지 기다립니다."/>
					<GuideList title="상대방이 날인을 하면 모든 계약이 완료됩니다."/>
				</GuideTitBox>
			
				<PdfDownBox>
					<GuideHeaderBtn>
						<Common.FlexRowBox><PdfIcon /><Common.TextBold14>매도(임차)인 사용 메뉴얼</Common.TextBold14></Common.FlexRowBox>
						<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_menu_arrow_01.png')} />
					</GuideHeaderBtn>
					<PdfTitBox>
						<Common.TextMedium13>더 자세한 이용방법은 매수(임차)인 사용매뉴얼을 참고하시기 바랍니다.</Common.TextMedium13>
					</PdfTitBox>
				</PdfDownBox>


			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	);
};
export default LandlordGuide;
