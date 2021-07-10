import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from './../styled/commonStyle';
import Colors from '../../assets/colors';
import {  } from "../styled/commonStyle";
import { ReceiptBoxCont, YellowBox } from "../styled/chatContractStyle/contractReceiptStyle";
import { UnitTit } from '../styled/chatContractStyle/contractStyle';
import { Button, View } from 'react-native';
import {RequiredS} from './../styled/sales/salesDirectCommonStyle'


const ContractReceiptPreviewScreen = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//UI STATE
	const [data, setData] = useState(route.params||{})
	const Required = () => (<RequiredS>*</RequiredS>)

	return(<>
		<Common.ZipandaSafeView>
			{/* <Button title="TEST" onPress={()=>{console.log(data);}}/> */}
			<Common.ScrollContainer paddingN>
				<YellowBox>
					<Common.TextBold14>계약금 영수증</Common.TextBold14>
				</YellowBox>
				<ReceiptBoxCont>
					<View>
						<Common.SubTitle>성명 <Required/></Common.SubTitle>
						<Common.ViewBorder>
							<Common.ViewBorderText>{data.params?.c_name_tenant}홍길동</Common.ViewBorderText>
							<UnitTit bold>귀하</UnitTit>
						</Common.ViewBorder>
					</View>
					<View>
						<Common.SubTitle>금액 <Required/></Common.SubTitle>
						<Common.ViewBorder>
							<Common.ViewBorderText>₩{data.params?.cr_amount_num}  </Common.ViewBorderText>
							<UnitTit bold>원정</UnitTit>
						</Common.ViewBorder>
						<Common.ViewBorder>
							<Common.ViewBorderText>{data.params?.cr_amount_han}</Common.ViewBorderText>
							<UnitTit bold>원정</UnitTit>
						</Common.ViewBorder>
					</View>
					<View>
					<Common.SubTitle>부동산의 표시 <Required/></Common.SubTitle>
						<Common.ViewBorder>
							<Common.ViewBorderText>{data.params?.c_building_address}</Common.ViewBorderText>
						</Common.ViewBorder>
					</View>
				</ReceiptBoxCont>
				<YellowBox>
					<Common.TextMedium14 paragraph>상기 금액을 위 표시 부동산에 의한 {data.params?.crTypeStr}으로 정히 영수하고 이에 본 영수증을 발행합니다.</Common.TextMedium14>
				</YellowBox>
				<ReceiptBoxCont>
					<View>
						<Common.SubTitle>발생인의 주소 <Required/></Common.SubTitle>
						<Common.ViewBorder>
							<Common.ViewBorderText>{data.params?.c_address_lessor}</Common.ViewBorderText>
						</Common.ViewBorder>
					</View>
					<View>
						<Common.SubTitle>발행인의 성명</Common.SubTitle>
						<Common.ViewBorder>
							<Common.ViewBorderText>{data.params?.c_name_lessor}</Common.ViewBorderText>
						</Common.ViewBorder>
					</View>
					<View>
						<Common.SubTitle>발행일</Common.SubTitle>
						<Common.ViewBorder>
							<Common.ViewBorderText>{data.params?.cr_issue_date}</Common.ViewBorderText>
						</Common.ViewBorder>
					</View>
				</ReceiptBoxCont>
			</Common.ScrollContainer>
			<Common.FloatBtnBox>
				<Common.FloatBtnsss onPress={()=>{navigation.goBack()}}>
					<Common.TextSemiBold18 >확인</Common.TextSemiBold18>
				</Common.FloatBtnsss>
				<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={()=>{navigation.goBack()}}>
					<Common.TextSemiBold18 color={Colors.whiteColor}>취소</Common.TextSemiBold18>
				</Common.FloatBtnsss>
			</Common.FloatBtnBox>
		</Common.ZipandaSafeView>
	</>)

}

export default ContractReceiptPreviewScreen