import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';

import{Container,ScrollContainerB,TextBold16,BottomBtn3Box,BottomBtn3W,BottomBtn3Y,BottomBtn3B,TitleBox,Title,TextBold12,TextBold11,TextBold14,TextLight13,YellowBox20}from"../../styled/commonStyle";
import{ReceiptBoxCont,ReceiptLabelBox,ReceiptLabel,ReceiptBorderBox,SignImgBox}from"../../styled/chatStyle/receiptStyle";

const ReceiptView = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {

		}
		handleEffect()
	},[])
	
	
	const SignImg = () => (<AutoHeightImage width={60} source={require('../../../assets/img/sample/img_sign.png')} />)

	return(
		<Container>
			<ScrollContainerB>
				<YellowBox20>
					<TextBold12>계약금 영수증</TextBold12>
				</YellowBox20>
				<ReceiptBoxCont>
					<View>
						<ReceiptLabelBox>
							<ReceiptLabel><TextBold11>성명</TextBold11></ReceiptLabel>
						</ReceiptLabelBox>
						<ReceiptBorderBox>
							<TextBold14>홍길동</TextBold14><TextLight13>귀하</TextLight13>
						</ReceiptBorderBox>
					</View>
					<View>
						<ReceiptLabelBox>
							<ReceiptLabel><TextBold11>금액</TextBold11></ReceiptLabel>
						</ReceiptLabelBox>
						<ReceiptBorderBox>
							<TextBold14>이천이백삼십만(₩22,300,000)  </TextBold14><TextLight13>원정</TextLight13>
						</ReceiptBorderBox>
					</View>
					<View>
						<ReceiptLabelBox>
							<ReceiptLabel><TextBold11>부동산의 표시</TextBold11></ReceiptLabel>
						</ReceiptLabelBox>
						<ReceiptBorderBox>
							<TextBold14>서울시 강남구 신사동 16-54 301호</TextBold14>
						</ReceiptBorderBox>
					</View>
				</ReceiptBoxCont>
				<YellowBox20>
					<TextBold12>상기 금액을 위 표시 부동산에 의한 잔금으로 정히 영수하고 이에 본 영수증을 발행합니다.</TextBold12>
				</YellowBox20>
				<ReceiptBoxCont box02>
					<View>
						<ReceiptLabelBox>
							<ReceiptLabel><TextBold11>발행인 주소</TextBold11></ReceiptLabel>
						</ReceiptLabelBox>
						<ReceiptBorderBox>
							<TextBold14>서울시 강남구 신사동 16-54 501호</TextBold14>
						</ReceiptBorderBox>
					</View>
					<View>
						<ReceiptLabelBox>
							<ReceiptLabel><TextBold11>발행인 성명</TextBold11></ReceiptLabel>
						</ReceiptLabelBox>
						<ReceiptBorderBox>
							<TextBold14>헐길동</TextBold14>
							<SignImgBox>
								<SignImg />
							</SignImgBox>
						</ReceiptBorderBox>
					</View>
					<View>
						<ReceiptLabelBox>
							<ReceiptLabel><TextBold11>발행일</TextBold11></ReceiptLabel>
						</ReceiptLabelBox>
						<ReceiptBorderBox>
							<TextBold14>2021년 03월 29일</TextBold14>
						</ReceiptBorderBox>
					</View>
				</ReceiptBoxCont>
			</ScrollContainerB>
			<BottomBtn3Box>
				<BottomBtn3W>
					<TextBold16>pdf저장</TextBold16>
				</BottomBtn3W>
				<BottomBtn3Y>
					<TextBold16>확인</TextBold16>
				</BottomBtn3Y>
				<BottomBtn3B>
					<TextBold16 whiteTit>취소</TextBold16>
				</BottomBtn3B>
			</BottomBtn3Box>
		</Container>
	)
}
export default ReceiptView;