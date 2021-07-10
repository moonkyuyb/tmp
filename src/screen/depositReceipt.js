import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from './../styled/commonStyle';
import{ DepositListWrap, DepositLabel, DepositCont, DepositBlackBox }from"./../styled/chatContractStyle/depositReceiptStyle";
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

	const ChkBtn 		= () => ( <Common.Image size={24} source={require('./../../assets/img/drawable-xhdpi/bt_combo_off.png')}/> )
	const ChkBtnActive	= () => ( <Common.Image size={24} source={require('./../../assets/img/drawable-xhdpi/bt_combo_on.png')}/> )
	const FlexRowCheckBold = (props) => (
		<Common.FlexRowBtn {...props}>
			{props.value ? <ChkBtnActive/> : <ChkBtn/>}
			<Common.TextBold14 multiline={true}>{props.title?props.title:''}</Common.TextBold14>
		</Common.FlexRowBtn>
	)

	const FlexRowCheckBox = (props) => (
		<Common.FlexRowBtn {...props}>
			{props.value ? <ChkBtnActive/> : <ChkBtn/>}
			<Common.TextLight14 color={Colors.whiteColor} multiline={true}>{props.title?props.title:''}</Common.TextLight14>
		</Common.FlexRowBtn>
	)

	return(
		<Common.ZipandaSafeView>
			<Common.ScrollContainer>		
				<Common.TitleBox><Common.Title>계약금 입금확인증 내역</Common.Title></Common.TitleBox>

				<DepositListWrap>
					<Common.FlexBetweenBox>
						<DepositLabel>성명</DepositLabel><DepositCont>박문수</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>입금 확인일</DepositLabel><DepositCont>2021-06-15</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>입금 은행</DepositLabel><DepositCont>신한은행</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>예금주</DepositLabel><DepositCont>박문수</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>계좌번호</DepositLabel><DepositCont>123-45-678910</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>입금액</DepositLabel><DepositCont>이천이백삼십만 원정</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel></DepositLabel><DepositCont>₩ 22,300,000</DepositCont>
					</Common.FlexBetweenBox>
				</DepositListWrap>
				<Common.FlexCenter>
					<FlexRowCheckBold title='상기 금액의 입금 완료를 증명합니다.'/>
				</Common.FlexCenter>
				<Common.FlexCenter>
					<Common.TextLight12 marginT={5}>
						2021년  06월  15일  <Common.TextBold12>홍길동</Common.TextBold12>
					</Common.TextLight12>
				</Common.FlexCenter>

				<DepositBlackBox>
					<FlexRowCheckBox title='상기 금액의 입금 완료를 증명합니다.'/>
					<Common.TextLight12 color={Colors.whiteColor} marginT={5}>
						2021년  06월  15일  <Common.TextBold12 color={Colors.whiteColor}>박문수</Common.TextBold12>
					</Common.TextLight12>
				</DepositBlackBox>

			</Common.ScrollContainer>
			<Common.FloatBtn>
				<Common.TextSemiBold18>저장</Common.TextSemiBold18>
			</Common.FloatBtn>
		</Common.ZipandaSafeView>
	)
}
export default ProContract;


