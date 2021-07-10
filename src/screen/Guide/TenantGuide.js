import React, { useEffect, useState } from 'react';

import * as Common from './../../styled/commonStyle';
import{ GuideHeader,GuideHeaderBtn,GuideTitBox,GuideTitList,GuideTitIcon,PdfDownBox,PdfIconS,PdfTitBox } from "./../../styled/GuideStyle/GuideStyle";

const TenantGuide = props => {

	useEffect((props)=>{
		const handleEffect = async (props) => {
			//...
		}
		
		handleEffect()
	},[])
	const StepIcon01 = () => (<Common.Image size={28} marginR={15}  source={require('./../../../assets/img/drawable-xhdpi/icon_housesearch.png')} />)
	const StepIcon02 = () => (<Common.Image size={28} marginR={15} pIcon source={require('./../../../assets/img/drawable-xhdpi/icon_common_deal.png')} />)
	const StepIcon03 = () => (<Common.Image size={28} marginR={15}  source={require('./../../../assets/img/drawable-xhdpi/icon_common_sign.png')} />)
	const StepIcon04 = () => (<Common.Image size={28} marginR={15}  source={require('./../../../assets/img/drawable-xhdpi/icon_common_pay.png')} />)
	const StepIcon05 = () => (<Common.Image size={28} marginR={15}  source={require('./../../../assets/img/drawable-xhdpi/icon_common_real_sign.png')} />)
	const StepIcon06 = () => (<Common.Image size={28} marginR={15}  source={require('./../../../assets/img/drawable-xhdpi/icon_common_registered.png')} />)
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
					<GuideList title="매물을 지역 분류, 필터 입력을 통해 검색으로 찾습니다."/>
					<GuideList title="검색된 매물리스트에서 본인이 원하는 조건의 매물인지 상세정보를 확인합니다."/>
					<GuideList title="여러 개의 필터 정보를 등록하여 등록된 조건에 맞는 매물을 추천 받을 수 있습니다."/>
				</GuideTitBox>
		
				<GuideHeader>
					<StepIcon02 />
					<Common.View><Common.TextLight12 marginB={4}>Step 02</Common.TextLight12><Common.TextBold14>거래 협의</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="본인이 원하는 조건과 맞는 매물인 경우 거래 전 매물 임대(매도)인에게 사전 직거래톡을 통해 매물과 계약조건에 관한 구체적인 정보를 확인합니다."/>
					<GuideList title="직거래톡 메시지 창을 통해 상대 전화번호 공개요청과 매물 방문을 요청합니다."/>
					<GuideList title="매물 방문 시 체크리스트를 열어 매물의 상태와 주변 환경 등을 체크하여 저장합니다."/>
					<GuideList title="매물이 마음에 들면 매도(임대)인과 금액 및 특약사항 등 계약에 대한 조건을 협의합니다."/>
				</GuideTitBox>
	
				<GuideHeader>
					<StepIcon03 />
					<Common.View><Common.TextLight12 marginB={4}>Step 03</Common.TextLight12><Common.TextBold14>가 계약서 날인</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="매도(임대)인이 가 계약서 작성을 신청하고 가 계약서 작성이 완료되면 협의된 내용이 반영되었는지 확인합니다. "/>
					<GuideList title="변경할 내용이 있으면 재 작성을 요청하시고, 내용에 문제가 없으면 가 계약서에 날인을 합니다."/>
				</GuideTitBox>
		
				<GuideHeader>
					<StepIcon04 />
					<Common.View><Common.TextLight12 marginB={4}>Step 04</Common.TextLight12><Common.TextBold14>입금 및 영수증 확인</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="가 계약서에 작성된 계약금 및 중도금 입금 날짜에 협의된 금액을 입금합니다."/>
					<GuideList title="입금 후 해당 금액에 대하여 매도(임대)인 발급한 영수증을 확인합니다."/>
				</GuideTitBox>
		
				<GuideHeader>
					<StepIcon05 />
					<Common.View><Common.TextLight12 marginB={4}>Step 05</Common.TextLight12><Common.TextBold14>계약서 날인</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="매도(임대)인이 계약서 작성을 신청하고 계약서 작성이 완료되면 협의된 내용이 반영되었는지 확인합니다. "/>
					<GuideList title="변경할 내용이 있으면 재 작성을 요청하시고, 내용에 문제가 없으면 계약서에 날인을 합니다."/>
					<GuideList title="양쪽 모두 날인을 하면 모든 계약이 완료됩니다."/>
				</GuideTitBox>
	
				<GuideHeader>
					<StepIcon06 />
					<Common.View><Common.TextLight12 marginB={4}>Step 06</Common.TextLight12><Common.TextBold14>등기</Common.TextBold14></Common.View>
				</GuideHeader>
				<GuideTitBox>
					<GuideList title="매매 계약인 경우에는 가 계약서 날인 시점부터 등기 서비스 신청을 할 수 있습니다."/>
					<GuideList title="등기서비스를 신청하면 집판다 관리자가 부동산 등기를 위해 사전에 준비해야할 문서를 알려드리고 방문일자 등을 협의합니다."/>
					<GuideList title="집판다 법무법인에서 잔금 입금 일자에 맞춰 방문합니다."/>
					<GuideList title="방문한 집판다 법무법인 담당자에게 준비 서류를 모두 전달하시고, 등기가 완료되어 등기권리증을 받으시면 모두 완료됩니다."/>
				</GuideTitBox>
			
				<PdfDownBox>
					<GuideHeaderBtn>
						<Common.FlexRowBox><PdfIcon /><Common.TextBold14>매수(임차)인 사용 메뉴얼</Common.TextBold14></Common.FlexRowBox>
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
export default TenantGuide;
