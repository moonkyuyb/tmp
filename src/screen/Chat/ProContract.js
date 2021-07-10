import React, { useEffect, useState } from 'react';
import { View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import ChatHeaderSale from './../../components/chat/ChatHeaderSale';

import * as Common from './../styled/commonStyle';
import Colors from '../../assets/colors';
import {Image24,TextBold11,TextBold12,TextLight11,Image14} from '../../styled/commonStyle';
import {PandaChat,ChatPandaImg,PandaChatCont,PandaChatHeader,ChatTime,ItemBox,ItemList,TextDot} from '../../styled/chatStyle/chatStyle';
import {ProContractContainer,PandaContract,ProContractWrap,ProContractBox,ContBox,ProContractInfo,InfoDot,InfoBox,InfoTitBox,NameTit,
	SignatureState,StateText,ContractBtn,ContractBtnActive,ContractBtnText,ContractBtnTextActive} from '../../styled/chatStyle/proContractStyle';
import {ChatSaleBtnBox,SaleBtn,BtnText} from '../../styled/chatStyle/chatHeaderStyle';
const ProContract = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {
			
		}
		handleEffect()
	},[])

	const PandaChatBoxTop = (props) => {
		return(
			<PandaContract>
				<ChatPandaImg source={require('../../../assets/img/drawable-xhdpi/image_panda_thumbnail.png')} />
				<PandaChatCont>
					<PandaChatHeader>
						<PandaTag>집판다</PandaTag><ChatTime color={Colors.whiteTit}>2021-02-15  14:25:23</ChatTime>
					</PandaChatHeader>
					<View>{props.children}</View>
				</PandaChatCont>
			</PandaContract>
		)
	}
	const PandaChatBox = (props) => {
		return(
			<PandaContract >
				<ChatPandaImg source={require('../../../assets/img/drawable-xhdpi/image_panda_thumbnail.png')} />
				<PandaChatCont >
					<PandaChatHeader>
						<TextBold12>집판다</TextBold12><ChatTime>2021-02-15  14:25:23</ChatTime>
					</PandaChatHeader>
					<View>{props.children}</View>
				</PandaChatCont>
			</PandaContract>
		)
	}
	const BtnIcon01 = () => (<Image24 source={require('../../../assets/img/drawable-xhdpi/icon_contract_off.png')} />)
	const BtnIcon01Active = () => (<Image24 source={require('../../../assets/img/drawable-xhdpi/icon_contract_on.png')} />)
	const BtnIcon02 = () => (<Image24 source={require('../../../assets/img/drawable-xhdpi/icon_receipt_off.png')} />)
	const BtnIcon02Active = () => (<Image24 source={require('../../../assets/img/drawable-xhdpi/icon_receipt_on.png')} />)
	
	return(
		<ProContractContainer>
			{/* header */}
			<ChatHeaderSale>
				<ChatSaleBtnBox>
					<SaleBtn first>
						<Image14 source={require('./../../../assets/img/drawable-xhdpi/icon_outdoor_g.png')} /><BtnText>나가기</BtnText>
					</SaleBtn>
					<SaleBtn>
						<Image14 source={require('./../../../assets/img/drawable-xhdpi/icon_cutout_g.png')} /><BtnText>차단</BtnText>
					</SaleBtn>
				</ChatSaleBtnBox>
			</ChatHeaderSale>

			<ProContractWrap>
				{/* 계약서 */}
				<ProContractBox bgProContract>
					<PandaChatBoxTop>
						<ItemBox>
							<ItemList>
								<TextDot whiteTit/><TextLight11 whiteTit>해당 매물의 가 계약서가 등록되어 있지 않습니다.</TextLight11>
							</ItemList>
							<ItemList>
								<TextDot whiteTit/><TextLight11 whiteTit><TextBold11>가 계약서 날인은 먼저 가 계약서 보기로 계약서 내용을 확인</TextBold11>하신 후 날인을 진행해 주십시오.</TextLight11>
							</ItemList>
						</ItemBox>
					</PandaChatBoxTop>
					<ContBox>
						<ProContractInfo>
							<InfoDot/>
							<InfoBox>
								<InfoTitBox>
									<TextLight11 whiteTit>임대인</TextLight11>
									<NameTit None>미입력</NameTit>
								</InfoTitBox>
								<SignatureState>
									<StateText None>날인{"\n"}대기</StateText>
								</SignatureState>
							</InfoBox>
							<InfoBox>
								<View>
									<TextLight11 whiteTit>임차인</TextLight11>
									<NameTit >김판다</NameTit>
								</View>
								<SignatureState active>
									<StateText>날인{"\n"}완료</StateText>
								</SignatureState>
							</InfoBox>
						</ProContractInfo>
						{/* 가계약서 미등록시 */}
						<ContractBtn bgBtn onPress={() => navigation.navigate('apply01')}>
							<BtnIcon01 /><ContractBtnText whiteTit>가 계약서 미등록</ContractBtnText>
						</ContractBtn>

						{/* 계약서 등록시 */}
						<ContractBtnActive onPress={() => navigation.navigate('proApplyView')}>
							<BtnIcon01Active />
							<ContractBtnTextActive>가 계약서 보기</ContractBtnTextActive>
						</ContractBtnActive>

					</ContBox>
				</ProContractBox>

				{/* 영수증 */}
				<ProContractBox>
					<PandaChatBox>
						<ItemBox>
							<ItemList>
								<TextDot/><TextLight11>임대인이 발행한 영수증 입니다.</TextLight11>
							</ItemList>
							<ItemList>
								<TextDot/><TextLight11>영수증 보기로 <TextBold11>계약금 및 중도금의 영수증을 확인</TextBold11>할 수 있습니다. </TextLight11>
							</ItemList>
						</ItemBox>
					</PandaChatBox>
					<ContBox>
						<ContractBtnActive onPress={() => navigation.navigate('receiptView')}>
							<BtnIcon02Active />
							<ContractBtnTextActive>계약금 영수증 보기</ContractBtnTextActive>
						</ContractBtnActive>
						<ContractBtn onPress={() => navigation.navigate('receipt')}>
							<BtnIcon02 />
							<ContractBtnText>중도금 영수증 미등록</ContractBtnText>
						</ContractBtn>
					</ContBox>
				</ProContractBox>
			</ProContractWrap>
		</ProContractContainer>
	)
}
export default ProContract;


