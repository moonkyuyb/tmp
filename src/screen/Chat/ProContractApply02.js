import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import {Container,ScrollContainer20B,TitleBox,Title,SubTitle,ViewBorder,TextLight12,TextBold12,TextBold16,BottomBtnYello,Image24,TextMedium12,FlexRowBtn,TextLight11,TextBold11,} from '../../styled/commonStyle';
import {ContractInfoHeader,InfoAert,Btn01Box,Contract01Btn,ContractBtnText,ApplyInfoBox,ChkGreyBox} from '../../styled/chatStyle/proContractcApplyStyle';

const ProContractApply02 = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {

		}
		handleEffect()
	},[])

	const ChkBtn = () => (<Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkBtnActive = () => (<Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const ChkBtnBox = (props) => {
		const [active, setActive] = useState(props.isActive?props.isActive:false)
		return(
			<FlexRowBtn onPress={() => { setActive (!active)}}>
				{active ? <ChkBtnActive/> : <ChkBtn/>}<TextBold11>{props.title?props.title:''}</TextBold11>
			</FlexRowBtn>
		)
	}

	return(
		<Container>
			<ScrollContainer20B>
				<TitleBox><Title>임차인 정보 입력</Title></TitleBox>
				<TextMedium12>선택하신 매물로 가 계약을 진행하시겠습니까?</TextMedium12>
				<ContractInfoHeader>
					<InfoAert source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
					<TextLight12 whiteTit>전자계약은 반드시 매수자(임차인)과 사전에 합의를 하신 후 진행하셔야 합니다.</TextLight12>
				</ContractInfoHeader>

				<ApplyInfoBox>
					<TextLight11>
						임차인의 실명과 휴대폰번호를 정확하게 입력해 주십시오.{"\n"}
						입력된 정보가 정확하지 않을 경우 전자계약이 진행되지 않을 수 있습니다.
					</TextLight11>
				</ApplyInfoBox>
				
				<SubTitle>임차인 이름</SubTitle>
				<ViewBorder><TextLight12>홍길동</TextLight12></ViewBorder>

				<SubTitle>임차인 휴대전화 번호</SubTitle>
				<ViewBorder><TextLight12>010-1234-5678</TextLight12></ViewBorder>

				<Btn01Box>
					<TextBold12>명의가 여러 명일 경우에는 모든 임차인의 정보를 입력해 주십시오</TextBold12>
					<Contract01Btn>
						<Image24 source={require('../../../assets/img/drawable-xhdpi/icon_attachment_b.png')} />
						<ContractBtnText>임차인 추가 등록</ContractBtnText>
					</Contract01Btn>
				</Btn01Box>

				<ChkGreyBox>
					<ChkBtnBox title={'임차인의 동의 하에 연락처를 입력하였습니다.'} />
				</ChkGreyBox>

			</ScrollContainer20B>
			<BottomBtnYello onPress={() => navigation.navigate('apply03')}>
				<TextBold16>다음</TextBold16>
			</BottomBtnYello>
		</Container>
	)
}
export default ProContractApply02;