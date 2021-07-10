import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import {Container,ScrollContainer20B,TitleBox,Title,TextLight12,TextBold16,BottomBtnYello,Image24,} from '../../styled/commonStyle';
import {ContractInfoHeader,InfoAert,ApplyChkCont,ApplyChkItemBox,ApplyChkBox,ApplyText} from '../../styled/chatStyle/proContractcApplyStyle';

const ProContractApply03 = () => {

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
			<ApplyChkBox onPress={() => { setActive (!active)}}>
				{active ? <ChkBtnActive/> : <ChkBtn/>}<ApplyText>{props.title?props.title:''}</ApplyText>
			</ApplyChkBox>
		)
	}

	return(
		<Container>
			<ScrollContainer20B>
				<TitleBox><Title>전자계약 이용 동의</Title></TitleBox>

				<ContractInfoHeader renter02>
					<InfoAert source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
					<TextLight12 whiteTit>온라인 전자계약 이용에 동의합니다.</TextLight12>
				</ContractInfoHeader>
		
				<ApplyChkCont>
					<ApplyChkItemBox>
						<ChkBtnBox title={'입력하는 서명의 법적 효력에 대해 동의합니다.'} />
					</ApplyChkItemBox>
					<ApplyChkItemBox>
						<ChkBtnBox title={'서명 완료 후 저장되는 전자문서를 원본으로 인정합니다. '} />
					</ApplyChkItemBox>
					<ApplyChkItemBox>
						<ChkBtnBox title={'모든 서명 참여자가 서명 입력에 정당한 권한을 가지는 것을 확인하였습니다'} />
					</ApplyChkItemBox>
					<ApplyChkItemBox>
						<ChkBtnBox title={'기타 자세한 내용은 이용약관 및 개인정보처리방침에 따라 동의합니다.'} />
					</ApplyChkItemBox>

				</ApplyChkCont>
				



			</ScrollContainer20B>
			<BottomBtnYello onPress={() => navigation.navigate('apply04')}>
				<TextBold16>다음</TextBold16>
			</BottomBtnYello>
		</Container>
	)
}
export default ProContractApply03;
