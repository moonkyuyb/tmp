import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import ContractBasics from './../../components/provContract/provContractBasics';
import{Container,ScrollContainer20B,TitleBox,Title,SubTitle,TextLight10,TextLight12,TextBold12,TextBold16,InputBorder,BottomBtnYello,Image24,Image15,Image14,TextLight11}from"../../styled/commonStyle";
import{YellowViewBorder,GreyViewBorder,ViewBorderY,YellowLabel,BorderYInnerBox,Btn02Box,Contract02Btn,ContractBtnText,YTextInput,UnitTit,DatePickerIcons,SpecialTitle,
	SpecialContract,YellowBorderBtn,SContractHeader,SContractCont,SpecialContractAdd,SpecialContractInput,ContractInfoHeader,InfoAert}from"../../styled/chatStyle/proContractcApplyStyle";

const ProContractApply04 = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {

		}
		handleEffect()
	},[])

	const DatePickerIcon= () => (<DatePickerIcons source={require('./../../../assets/img/drawable-xhdpi/bt_calendar.png')}/>)
	const CloseIcon= () => (<Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_close_s.png')}/>)
	return(
		<Container>
			<ScrollContainer20B>
				<TitleBox><Title>가 계약서 신청 정보 입력</Title></TitleBox>

				<SubTitle>분류</SubTitle>
				<YellowViewBorder><TextLight12>홍길동</TextLight12></YellowViewBorder>

				<SubTitle>분류</SubTitle>
				<GreyViewBorder><TextLight12>서울시 강남구 신사동 15-64</TextLight12></GreyViewBorder>

				<SubTitle>토지</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>지목</TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<TextLight12>대</TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>면적</TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<TextLight12>23.9 m³</TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>건물</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>구조</TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<TextLight12>철근콘크리트구조</TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>용도</TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<TextLight12>제2종근린생활시설</TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>면적</TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<TextLight12>116 m³</TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>보증금</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'금액 입력'}/><UnitTit>원</UnitTit>
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>월세</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'금액 입력'}/><UnitTit>원</UnitTit>
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>계약금</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'금액 입력'}/><UnitTit>원</UnitTit>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>지불일</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'지불일 선택'}/><DatePickerIcon />
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>중도금</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'금액 입력'}/><UnitTit>원</UnitTit>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>지불일</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'지불일 선택'}/><DatePickerIcon />
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>잔금</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'금액 입력'}/><UnitTit>원</UnitTit>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>지불일</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'지불일 선택'}/><DatePickerIcon />
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>임대기간</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'금액 입력'}/><UnitTit>원</UnitTit>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'임대기간 선택'}/><DatePickerIcon />
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>계약 기본사항</SubTitle>
				<ContractBasics />

				<SpecialTitle>
					<SubTitle>특약사항</SubTitle>
					<YellowBorderBtn onPress={() => navigation.navigate('specialContract')}>
						<Image14 source={require('../../../assets/img/drawable-xhdpi/icon_option.png')} />
						<TextLight10> 등록</TextLight10>
					</YellowBorderBtn>
				</SpecialTitle>
				<SpecialContract>
					<SContractHeader>
						<TextBold12>시설물 상태에 대한 특약</TextBold12>
						<CloseIcon />
					</SContractHeader>
					<SContractCont>
						<TextLight11>시설물은 온전상 상태의 계약이며, 옵션 파손 시 원상 복구한다. 단 임차인의 책임 없는 노후 시설의 고장은 임대인이 적극 수리한다. </TextLight11>
					</SContractCont>
				</SpecialContract>
				<SpecialContract>
					<SContractHeader>
						<TextBold12>관리비에 대한 특약</TextBold12>
						<CloseIcon />
					</SContractHeader>
					<SContractCont>
						<TextLight11>관리비는 10만원 별도 있으며, 청소 비용 포함임</TextLight11>
					</SContractCont>
				</SpecialContract>

				<SubTitle>추가 특약사항</SubTitle>
				<SpecialContractInput placeholder={'추가 특약사항 입력'} multiline={true} />

				<Btn02Box>
					<Contract02Btn>
						<Image15 source={require('../../../assets/img/drawable-xhdpi/icon_save.png')} />
						<ContractBtnText>저장</ContractBtnText>
					</Contract02Btn>
					<ContractInfoHeader>
						<InfoAert source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
						<TextLight12 whiteTit>전자계약은 반드시 매수자(임차인)와사전에 합의를 하신 후 진행하셔야 합니다.</TextLight12>
					</ContractInfoHeader>
				</Btn02Box>

			</ScrollContainer20B>
			<BottomBtnYello onPress={() => navigation.navigate('proContract')}>
				<TextBold16>가 계약서 작성 신청</TextBold16>
			</BottomBtnYello>
		</Container>
	)
}
export default ProContractApply04;
