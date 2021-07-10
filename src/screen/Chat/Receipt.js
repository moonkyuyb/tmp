import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from "react-native";

import{Container,ScrollContainer20B,TextBold16,TextLight12,BottomBtn3Box,BottomBtn3W,BottomBtn3Y,BottomBtn3B,TitleBox,Title,SubTitle,InputIconS,ViewBorder}from"../../styled/commonStyle";
import{GreyViewBorder,ViewBorderY,YellowLabel,BorderYInnerBox}from"../../styled/chatStyle/proContractcApplyStyle";
const Receipt = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [checkData, setCheckData] = useState([])

	useEffect(()=>{
		const handleEffect = async (props) => {

		}
		handleEffect()
	},[])
	const DateIcon = () => (<InputIconS source={require('./../../../assets/img/drawable-xhdpi/bt_calendar.png')} />)

	return(
		<Container>
			<ScrollContainer20B>
				<TitleBox>
					<Title>계약금 영수증 입력정보</Title>
				</TitleBox>

				<SubTitle>대상</SubTitle>
				<GreyViewBorder><TextLight12>홍길동</TextLight12></GreyViewBorder>

				<SubTitle>계약금</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액(한글)</TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<TextLight12>이천이백삼십만 원</TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>금액(숫자)</TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<TextLight12>22,300,000 원</TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><TextLight12>입금일</TextLight12></YellowLabel>
					<BorderYInnerBox>
						{/* datePicker */}
						<DateIcon />
					</BorderYInnerBox>
				</ViewBorderY>

				<SubTitle>소재지</SubTitle>
				<GreyViewBorder><TextLight12>서울시 강남구 신사동 15-64 301호</TextLight12></GreyViewBorder>

				<SubTitle>발행인 주소</SubTitle>
				<GreyViewBorder><TextLight12>서울시 강남구 신사동 15-64 301호</TextLight12></GreyViewBorder>

				<SubTitle>발행인 성명</SubTitle>
				<GreyViewBorder><TextLight12>발행인</TextLight12></GreyViewBorder>

				<SubTitle>발행일</SubTitle>
				<ViewBorder>
					{/* datePicker */}
					<DateIcon />
				</ViewBorder>

			</ScrollContainer20B>
			<BottomBtn3Box>
				<BottomBtn3W>
					<TextBold16>미리보기</TextBold16>
				</BottomBtn3W>
				<BottomBtn3Y>
					<TextBold16>날인</TextBold16>
				</BottomBtn3Y>
				<BottomBtn3B>
					<TextBold16 whiteTit>취소</TextBold16>
				</BottomBtn3B>
			</BottomBtn3Box>
		</Container>
	)
}
export default Receipt;

