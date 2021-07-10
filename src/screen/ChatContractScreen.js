/* COMMON */
import React, { useEffect, useState } from "react";
import { View, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

/* ENVIRONMENTS */
import { ADMIN_URL } from "@env";

/* UTILS */
import _ from "lodash";
import moment from "moment";
import { getModuURL as getModuContractURL, initContractState, postModu } from "../reducers/contractReducer";
import { createContractReceipt, getContractReceipt, getContractReceiptList } from "../reducers/contractReceiptReducer";

/* UI COMPONENTS */
import * as Common from './../styled/commonStyle';
import Colors from './../../assets/colors';
import { ChatPandaImg,PandaChatCont,PandaChatHeader,PandaTag,ChatTime,ItemBox,ItemList,PandaM,TextDot } from "../styled/chatStyle/chatStyle";
import { PandaContract,ProContractBox,ContBox,ProContractInfo,InfoBox,NameTit,SignatureState,StateText,ContractBtnText,ContractStateBox,ContractStateBtn} from '../styled/chatContractStyle/chatContractStyle';
import { SaleList, SaleImg } from '../styled/chatStyle/chatCommonStyle';
import { ChatSaleBtnBox, SaleBtn,ChatSaleTop, BuildingPriceText, BuildingInfoText } from '../styled/chatStyle/chatHeaderStyle';
import { ModalPopup } from "../container/commonContainer";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";

/* CONSTANTS */
const testSId = '365', testMIdTo = '2', testMIdFrom = '34', testMIdLessor = '34', testMIdTenants = '2'

const ChatContractScreen = ({
	s_id, m_id_from, m_id_to, c_id, m_id_lessor, m_id_tenants, isMine, salesForChat: sales, salesImgsForChat: imgs, toMemberForChat: toMember, contractForChat: contract,
	showAlertMessage, setChatState, getSalesForChat, getSalesImgsForChat, getContractForChat, checkContractModuForChat
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//REDUX CONSTANTS
	const dispatch = useDispatch()
	const moduContractURL = useSelector(state=>state.contractReducer.moduURL)
	const contractReceiptList = useSelector(state=>state.contractReceiptReducer.contractReceiptList)

	//UI STATES
	const [loaded, setLoaded] = useState(false)
	const [downpaymentReceipt, setDownpaymentReceipt] = useState(null)
	const [middlepaymentReceipt, setMiddlepaymentReceipt] = useState(null)
	const [middlepayment2Receipt, setMiddlepayment2Receipt] = useState(null)
	const [balanceReceipt, setBalanceReceipt] = useState(null)

	//HANDLE EFFECT
	useEffect(()=>{
		const initParams = {
			s_id		: s_id			? s_id			: testSId,
			m_id_to		: m_id_to		? m_id_to		: testMIdTo,
			m_id_from	: m_id_from		? m_id_from		: testMIdFrom,
			m_id_lessor	: m_id_lessor	? m_id_lessor	: testMIdLessor,
			m_id_tenants: m_id_tenants	? m_id_tenants	: testMIdTenants,
		}
		setChatState(initParams)
		setLoaded(true)
		// console.log(`[💬CONTRACT LESSOR SCREEN] s_id: ${initState.s_id}, m_id_lessor: ${initState.m_id_lessor}, m_id_tenants: ${initState.m_id_tenants}`);
	},[])

	useEffect(()=>{if(loaded){
		if(_.isEmpty(sales)) getSalesForChat({s_id: s_id})
		if(_.isEmpty(imgs)) getSalesImgsForChat({s_id: s_id})
	}},[loaded])

	useEffect(()=>{if(!_.isEmpty(sales)){
		console.log(`💬IS MY SALE ITEM?:${sales.m_id == m_id_from}`);
		const _isMine = sales.m_id == m_id_from
		const mIdLessor = _isMine ? m_id_from : m_id_to
		const mIdTenants = _isMine ? m_id_to : m_id_from
		setChatState({isMine: _isMine, m_id_lessor: mIdLessor, m_id_tenants: mIdTenants})
		getContractForChat({s_id: s_id, m_id_lessor: mIdLessor, m_id_tenants: mIdTenants})
	}},[sales])

	useEffect(()=>{if(!_.isEmpty(contract)){
		if(contract.c_modu_id) {
			checkContractModuForChat({c_id: c_id, c_modu_id: contract.c_modu_id})
		}
		dispatch(getContractReceiptList({c_id: c_id}))
	}},[contract])

	useEffect(()=>{if(!_.isEmpty(contractReceiptList)){
		for (let i = 0; i < contractReceiptList.length; i++) {
			const item = contractReceiptList[i];
			switch (item.cr_type) {
				case 'downpayment'	 	: setDownpaymentReceipt(item.cr_id);	 break;
				case 'middlepayment'	: setMiddlepaymentReceipt(item.cr_id);	 break;
				case 'middlepayment2'	: setMiddlepayment2Receipt(item.cr_id); break;
				case 'balance'		 	: setBalanceReceipt(item.cr_id);		 break;
				default: break;
			}
		}
	}},[contractReceiptList])

	//UI FUNCTIONS
	function navigateToContractLessor(){
		if(c_id){
			dispatch(initContractState({c_id:c_id}))
		}else if(s_id&&m_id_from&&m_id_to){
			dispatch(initContractState({s_id:s_id, m_id_lessor: m_id_from, m_id_tenants: m_id_to}))
		}
		navigation.navigate('contractLessor')
	}
	function navigateToContractTenants(){
		if(!isMine){
			dispatch(initContractState({c_id:c_id, m_id_lessor: m_id_to, m_id_tenants: m_id_from}))
			navigation.navigate('contractTenants',{c_id:c_id})
		}
	}
	function navigateToReceipt() {
		navigation.navigate('contractReceipt',{c_id:c_id, crType: 'downpayment'})
	}
	function handleModuURL(){
		console.log(`💬contract.c_modu_id: ${contract.c_modu_id}`)
		dispatch(getModuContractURL({c_modu_id:contract.c_modu_id}))
	}
	useEffect(()=>{if(moduContractURL){
		Linking.openURL(moduContractURL);
	}},[moduContractURL])

	//UI COMPONENTS
	const PandaChatBoxTop = (props) => {
		return(
			<PandaContract>
				<ChatPandaImg source={require('../../assets/img/drawable-xhdpi/image_panda_thumbnail.png')} />
				<PandaChatCont>
					<PandaChatHeader>
						<PandaTag color={Colors.whiteColor}>집판다</PandaTag><ChatTime color={Colors.whiteColor}>{contract?`${moment(contract.reg_date).format('Y-M-D H:m')}`:``}</ChatTime>
					</PandaChatHeader>
					<Common.View>{props.children}</Common.View>
				</PandaChatCont>
			</PandaContract>
		)
	}
	const PandaChatBox = (props) => {
		return(
			<PandaContract >
				<ChatPandaImg source={require('../../assets/img/drawable-xhdpi/image_panda_thumbnail.png')} />
				<PandaChatCont >
					<PandaChatHeader>
						<PandaTag>집판다</PandaTag><ChatTime>2021-02-15  14:25:23</ChatTime>
					</PandaChatHeader>
					<Common.View>{props.children}</Common.View>
				</PandaChatCont>
			</PandaContract>
		)
	}
	const BtnIcon01 	  = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_contract_off.png')} />)
	const BtnIcon01Active = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_contract_on.png')} />)
	const BtnIcon02		  = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_receipt_off.png')} />)
	const BtnIcon02Active = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_receipt_on.png')} />)

	//UI FUNCTION
	function handleNavigateReceipt(payload){
		navigation.navigate('contractReceipt', {...payload, m_id_to: m_id_to, m_id_from:m_id_from})
	}

	return(<>
		<Common.ZipandaSafeView color={Colors.borderBottomColors}>
			{/* <Button title="TEST" onPress={()=>{console.log(m_id_to);}}/> */}
			{/* header */}
			<ModalPopup/>
			<ChatSaleTop>
				<SaleList>
					{(imgs && imgs.length > 0) && ( <SaleImg source={{uri:`${ADMIN_URL}${imgs[0].sf_thumb_nm}`}}/> )}
					{(!imgs||imgs.length <= 0) && ( <SaleImg source={require('../../assets/img/sample/sample_room_04.jpg')} /> )}
					<Common.View>
						{sales&&(<>
							<BuildingPriceText>
								{sales?.s_price_type == 'sales' ? (
									`${sales?.price_type||''} ${Number(sales?.s_trading_price)||''}`
								):(
									`${sales?.price_type||''} ${Number(sales?.s_deposit)||''} ${Number(sales?.s_monthly_rent)?`/ ${Number(sales?.s_monthly_rent)}`:``}`
								)}
							</BuildingPriceText>
							<BuildingInfoText>
								{`${sales?.building_type||''} ${sales?.s_floor?`/ ${sales?.s_floor}층`:''} ${Number(sales?.s_supply_area_m)?`/ ${Number(sales?.s_supply_area_m)}m² `:''} ${Number(sales?.m_cost)?`/ ${Number(sales?.m_cost)}만 `:''}`}
							</BuildingInfoText>
							<BuildingInfoText>
								{`${sales?.location1||''} ${sales?.location2||''} ${sales?.location3||''}`}
							</BuildingInfoText>
						</>)}
					</Common.View>
				</SaleList>
				<ChatSaleBtnBox>
					<SaleBtn first onPress={()=>{console.log(downpaymentReceipt);}}>
						<Common.Image size={14} source={require('../../assets/img/drawable-xhdpi/icon_outdoor_g.png')} /><Common.TextMedium11>나가기</Common.TextMedium11>
					</SaleBtn>
					<SaleBtn onPress={()=>{dispatch(postModu({c_id:c_id}))}}>
						<Common.Image size={14} source={require('../../assets/img/drawable-xhdpi/icon_cutout_g.png')} /><Common.TextMedium11>차단</Common.TextMedium11>
					</SaleBtn>
				</ChatSaleBtnBox>
			</ChatSaleTop>

			<Common.ScrollContainer paddingN>
				{/* 계약서 */}
				<ProContractBox bgProContract first >
					<PandaChatBoxTop>
						<ItemBox>
						{_.isEmpty(contract)?(<>
							<ItemList>
								<TextDot color={Colors.whiteColor}/>
								<PandaM color={Colors.whiteColor}>해당 매물의 계약서가 등록되어 있지 않습니다.</PandaM>
							</ItemList>
						</>):(<>
							<ItemList>
								<TextDot color={Colors.whiteColor}/>
								<PandaM color={Colors.whiteColor} >
									<PandaM color={Colors.mainColor} Bold>계약서 날인은 먼저 계약서 보기로 계약서 내용을 확인</PandaM> 하신 후 날인을 진행해 주십시오.
								</PandaM>
							</ItemList>
						</>)}
						</ItemBox>
					</PandaChatBoxTop>
					<ContBox>
						<ProContractInfo>
						{_.isEmpty(contract)?(<>
							<InfoBox borderB>
								<Common.TextLight14 color={Colors.whiteColor}>임대인</Common.TextLight14>
								<Common.FlexRowBox>
									<NameTit active={contract?true:false}>미입력</NameTit>
									<SignatureState active={contract?true:false}><StateText active={contract?true:false}>입력 대기</StateText></SignatureState>
								</Common.FlexRowBox>
							</InfoBox>
							<InfoBox>
								<Common.TextLight14 color={Colors.whiteColor}>임차인</Common.TextLight14>			
								<Common.FlexRowBox>
									<NameTit>미입력</NameTit>
									<SignatureState><StateText>입력 대기</StateText></SignatureState>
								</Common.FlexRowBox>
							</InfoBox>
						</>):(<>
							<InfoBox>
								<Common.TextLight14 color={Colors.whiteColor}>임대인</Common.TextLight14>
								<Common.FlexRowBox>
									<NameTit active={contract.c_name_lessor?true:false}>{contract.c_name_lessor||'미입력'}</NameTit>
									{ !contract.c_id&&(<SignatureState><StateText>입력 완료</StateText></SignatureState>)}
									{!!contract.c_id&&!contract.c_signing_date_lessor&&(<SignatureState><StateText>날인 대기</StateText></SignatureState>)}
									{!!contract.c_id&&!!contract.c_signing_date_lessor&&(<SignatureState active><StateText active>날인 완료</StateText></SignatureState>)}
								</Common.FlexRowBox>
							</InfoBox>
							<InfoBox>
								<Common.TextLight14 color={Colors.whiteColor}>임차인</Common.TextLight14>	
								<Common.FlexRowBox>
									<NameTit active={contract.c_name_tenant?true:false}>{contract.c_name_tenant||'미입력'}</NameTit>
									{ !contract.c_id&&(<SignatureState><StateText>입력 대기</StateText></SignatureState>)}
									{!!contract.c_id&& !contract.c_name_tenant&&(<SignatureState active={isMine?false:true}><Common.TouchableOpacity onPress={()=>{navigateToContractTenants()}}><StateText active={isMine?false:true}>명의 등록</StateText></Common.TouchableOpacity></SignatureState>)}
									{!!contract.c_id&&!!contract.c_name_tenant&&!contract.c_signing_date_tenants&&(<SignatureState><StateText>날인 대기</StateText></SignatureState>)}
									{!!contract.c_id&&!!contract.c_name_tenant&&!!contract.c_signing_date_tenants&&(<SignatureState active><StateText active>날인 완료</StateText></SignatureState>)}
								</Common.FlexRowBox>
							</InfoBox>
						</>)}
						</ProContractInfo>

						{_.isEmpty(contract)&&!isMine&&(<>
							<Common.RadiusBtn btnColor={Colors.textNonColors} onPress={()=>{}}>
								<BtnIcon01 /><ContractBtnText>계약서 미등록</ContractBtnText>
							</Common.RadiusBtn>
						</>)}
						{_.isEmpty(contract)&&!!isMine&&(<>
							<Common.RadiusBtn onPress={()=>{navigateToContractLessor()}}>
								<BtnIcon01Active/><ContractBtnText active>계약서 신청</ContractBtnText>
							</Common.RadiusBtn>
						</>)}
						{!_.isEmpty(contract)&&!contract.c_modu_id&&(
							<Common.RadiusBtn bgBtn disabled={true} activeOpacity={1}>
								<BtnIcon01Active /><ContractBtnText active>계약서준비중</ContractBtnText>
							</Common.RadiusBtn>
						)}
						{!_.isEmpty(contract)&&!!contract.c_modu_id&&(
							<Common.RadiusBtn onPress={()=>{handleModuURL()}}>
								<BtnIcon01Active /><ContractBtnText active>계약서 다운로드</ContractBtnText>
							</Common.RadiusBtn>
						)}
					</ContBox>
				</ProContractBox>
				{/* {_.isEmpty(contract)&&!isMine&&(<>
				<ContractStateBox>
					<Common.TextSemiBold16 color={Colors.textNonColors}>계약서 미신청</Common.TextSemiBold16>
				</ContractStateBox>
				</>)}
				{_.isEmpty(contract)&&!!isMine&&(<>
				<ContractStateBox>
					<Common.TextSemiBold16 color={Colors.textNonColors}>계약서 미신청</Common.TextSemiBold16>
				</ContractStateBox>
				</>)}
				{!_.isEmpty(contract)&&!contract.c_modu_id&&(<>
				<ContractStateBox>
					<Common.TextSemiBold16 color={Colors.mainColor}>계약서 작성중</Common.TextSemiBold16>
					<ContractStateBtn active><StateText active>삭제요청</StateText></ContractStateBtn>
				</ContractStateBox>
				</>)}
				{!_.isEmpty(contract)&&!!contract.c_modu_id&&(<>
				<ContractStateBox>
					<Common.TextSemiBold16 color={Colors.whiteColor}>계약서 작성완료</Common.TextSemiBold16>
					<ContractStateBtn active><StateText active>신청취소</StateText></ContractStateBtn>
				</ContractStateBox>
				</>)} */}

				<ProContractBox paddng>
					<Common.TextLight14 paragraph marginB={24}>
						계약금과 중도금 입금 완료를 증명하는 입금확인증입니다.{'\n'}
						계약금과 중도금의 입금확인 내용을 조회하고 저장할 수 있습니다. 
					</Common.TextLight14>
					{downpaymentReceipt&&(
						<Common.RadiusBtn marginB={8} border btnColor={Colors.mainColor} onPress={()=>{handleNavigateReceipt({cr_id:downpaymentReceipt})}}>
							<BtnIcon02Active /><ContractBtnText active>계약금 입금확인증</ContractBtnText>
						</Common.RadiusBtn>
					)}
					{!downpaymentReceipt&&(
						<Common.RadiusBtn marginB={8} btnColor={Colors.whiteColor} onPress={()=>{
							dispatch(createContractReceipt({c_id:c_id, cr_type:'downpayment'}))
							setTimeout(()=>{dispatch(getContractReceiptList({c_id:c_id}))},700)
						}}>
							<BtnIcon02 /><ContractBtnText active>계약금 입금확인증 발급</ContractBtnText>
						</Common.RadiusBtn>
					)}
					{middlepaymentReceipt&&(
						<Common.RadiusBtn marginB={8} border btnColor={Colors.mainColor} onPress={()=>{handleNavigateReceipt({cr_id:middlepaymentReceipt})}}>
							<BtnIcon02Active /><ContractBtnText active>중도금 입금확인증</ContractBtnText>
						</Common.RadiusBtn>
					)}
					{!middlepaymentReceipt&&(
						<Common.RadiusBtn marginB={8} btnColor={Colors.whiteColor} onPress={()=>{
							dispatch(createContractReceipt({c_id:c_id, cr_type:'middlepayment'}))
							setTimeout(()=>{dispatch(getContractReceiptList({c_id:c_id}))},700)
						}}>
							<BtnIcon02 /><ContractBtnText active>중도금 입금확인증 발급</ContractBtnText>
						</Common.RadiusBtn>
					)}
					{balanceReceipt&&(
						<Common.RadiusBtn marginB={8} border btnColor={Colors.mainColor} onPress={()=>{handleNavigateReceipt({cr_id:balanceReceipt})}}>
							<BtnIcon02Active /><ContractBtnText active>잔금 입금확인증</ContractBtnText>
						</Common.RadiusBtn>
					)}
					{!balanceReceipt&&(
						<Common.RadiusBtn marginB={8} btnColor={Colors.whiteColor} onPress={()=>{
							dispatch(createContractReceipt({c_id:c_id, cr_type:'balance'}))
							setTimeout(()=>{dispatch(getContractReceiptList({c_id:c_id}))},700)
						}}>
							<BtnIcon02 /><ContractBtnText active>잔금 입금확인증 발급</ContractBtnText>
						</Common.RadiusBtn>
					)}
				</ProContractBox>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	</>)
}

export default ChatContractScreen
