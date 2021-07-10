/* COMMON */
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Button, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

/* ENVIRONMENTS */
import { ADMIN_URL } from "@env";

/* UTILS */
import _ from "lodash";
import { getModuURL as getModuContractURL, initContractState } from "../reducers/contractReducer";
import { getModuURL as getModuReceiptURL, getContractReceipt } from "../reducers/contractReceiptReducer";

/* UI COMPONENTS */
import { Image34 } from "../styled/commonStyle";
import { ModalPopup } from "../container/commonContainer";

/* CONSTANTS */
const testSId = 256, testMIdTo = 2, testMIdFrom = 32, testMIdLessor = 2, testMIdTenants = 32

const ChatContractTestScreen = ({
	s_id, m_id_from, m_id_to, c_id, m_id_lessor, m_id_tenants, isMine, salesForChat: sales, salesImgsForChat: salesImgs, toMemberForChat: toMember, contractForChat: contract,
	setChatState, getSalesForChat, getSalesImgsForChat, getContractForChat, checkContractModuForChat
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//REDUX CONSTANTS
	const dispatch = useDispatch()
	const moduContractURL = useSelector(state=>state.contractReducer.moduURL)
	const moduReceiptURL = useSelector(state=>state.contractReceiptReducer.moduURL)
	const contractReceiptList = useSelector(state=>state.contractReceiptReducer.contractReceiptList)

	//UI STATES
	const [loaded, setLoaded] = useState(false)

	//HANDLE EFFECT
	useEffect(()=>{
		const initState = { s_id: s_id?s_id:testSId, m_id_lessor: m_id_lessor?m_id_lessor:testMIdLessor, m_id_tenants:m_id_tenants?m_id_tenants:testMIdTenants }
		console.log(`[💬CONTRACT LESSOR SCREEN] s_id: ${initState.s_id}, m_id_lessor: ${initState.m_id_lessor}, m_id_tenants: ${initState.m_id_tenants}`);
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		if(_.isEmpty(sales)) getSalesForChat({s_id: s_id})
		if(_.isEmpty(salesImgs)) getSalesImgsForChat({s_id: s_id})
	}},[loaded])

	useEffect(()=>{if(!_.isEmpty(sales)){
		console.log(`💬IS MY SALE ITEM?:${sales.m_id == m_id_from}`);
		const _isMine = sales.m_id == m_id_from
		const mIdLessor = _isMine ? m_id_from : m_id_to
		const mIdTenants = _isMine ? m_id_to : m_id_from
		setChatState({isMine: _isMine, m_id_lessor: mIdLessor, m_id_tenants: mIdTenants})
		if(_.isEmpty(contract)) getContractForChat({s_id: s_id, m_id_lessor: mIdLessor, m_id_tenants: mIdTenants})
	}},[sales])

	useEffect(()=>{if(!_.isEmpty(contract)){
		if(contract.c_modu_id) checkContractModuForChat({contract: contract})
		dispatch(getContractReceipt({c_id:contract.c_id})) //contractReceiptList
	}},[contract])

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
			dispatch(initContractState({c_id:c_id}))
			navigation.navigate('contractTenants',{c_id:c_id})
		}
	}
	function navigateToReceipt() {
		navigation.navigate('contractReceiptTest',{c_id:c_id, crType: 'downpayment'})
	}
	function handleModuURL(){
		console.log(`💬contract.c_modu_id: ${contract.c_modu_id}`)
		dispatch(getModuContractURL({c_modu_id:contract.c_modu_id}))
	}
	function handleModuReceiptURL(){
		console.log(`💬contractReceipt.cr_modu_id: ${contractReceiptList[0].cr_modu_id}`)
		dispatch(getModuReceiptURL({cr_modu_id:contractReceiptList[0].cr_modu_id}))
	}
	useEffect(()=>{if(moduContractURL){
		Linking.openURL(moduContractURL);
	}},[moduContractURL])
	useEffect(()=>{if(moduReceiptURL){
		Linking.openURL(moduReceiptURL);
	}},[moduReceiptURL])
	

	return(<>
		<SafeAreaView style={{flex:1}}>
			<ScrollView>
				<ModalPopup/>
				<Button title='TESTRUE' onPress={()=>{console.log(`💬moduReceiptURL: ${moduReceiptURL}/  c_id: ${contract.c_id} / c_signing_date_lessor: ${contract.c_signing_date_lessor} / boolean: ${!!contract.c_id&&!!contract.c_signing_date_lessor}`);}}/>
				<Button title='TEST' onPress={()=>{console.log(c_id?true:false);}}/>
				<View style={{flexDirection:'row', justifyContent:'space-around'}}>
					{salesImgs[0]?.sf_unique_nm ? (<Image34 source={{uri:`${ADMIN_URL}${salesImgs[0]?.sf_unique_nm}`}}/>) : null }
					<Text>
						{sales?.s_price_type == 'sales' ? (
							`${sales.price_type||''} ${Number(sales.s_trading_price)||''}`
						):(
							`${sales.price_type||''} ${Number(sales.s_deposit)||''} ${Number(sales?.s_monthly_rent)?`/ ${Number(sales?.s_monthly_rent)}`:``}`
						)}
					</Text>
					<Text>{`${sales.building_type||''} ${sales.s_floor?`/ ${sales.s_floor}층`:''} ${Number(sales.s_supply_area_m)?`/ ${Number(sales.s_supply_area_m)}m² `:''} ${Number(sales.m_cost)?`/ ${Number(sales.m_cost)}만 `:''}`}</Text>
					<Text>{`${sales.s_address_street1||''} ${sales.s_address_street2||''}`}</Text>
					<Text>{`이름: ${toMember.m_name||''}, 이메일: ${toMember.m_mail||''}`}</Text>
				</View>
				<Text>집판다:</Text>
				{_.isEmpty(contract)?(<>
					<Text>{`•해당 매물의 계약서가 등록되어 있지 않습니다.`}</Text>
					<Text>임대인이름:미입력<TouchableOpacity><Text>입력대기</Text></TouchableOpacity></Text>
					<Text>임차인이름:미입력<TouchableOpacity><Text>입력대기</Text></TouchableOpacity></Text>
					<TouchableOpacity onPress={()=>{navigateToContractLessor()}}><Text>{isMine?'계약서신청':'계약서신청대기'}</Text></TouchableOpacity>
				</>):(<>
					<Text>{`•계약서 날인은 먼저 계약서 보기로 계약서`}</Text>
					<Text>{`    내용을 확인하신 후 날인을 진행해 주십시오.`}</Text>
					<Text>임대인이름:{contract.c_name_lessor||'미등록'}
						{ !contract.c_id&&(<Text>입력완료</Text>)}
						{!!contract.c_id&&!contract.c_signing_date_lessor&&(<Text>날인대기</Text>)}
						{!!contract.c_id&&!!contract.c_signing_date_lessor&&(<Text>날인완료</Text>)}
					</Text>
					<Text>임차인이름:{contract.c_name_tenant||'미등록'}
						{ !contract.c_id&&(<Text>입력대기</Text>)}
						{!!contract.c_id&& !contract.c_name_tenant&&(<TouchableOpacity onPress={()=>{navigateToContractTenants()}}><Text>명의등록</Text></TouchableOpacity>)}
						{!!contract.c_id&&!!contract.c_name_tenant&&!contract.c_signing_date_tenants&&(<Text>날인대기</Text>)}
						{!!contract.c_id&&!!contract.c_name_tenant&&!!contract.c_signing_date_tenants&&(<Text>날인완료</Text>)}
					</Text>
					{ !contract.c_modu_id&&(<TouchableOpacity><Text>계약서준비중</Text></TouchableOpacity>)}
					{!!contract.c_modu_id&&(<TouchableOpacity onPress={()=>{handleModuURL()}}><Text>계약서다운로드</Text></TouchableOpacity>)}
				</>)}
				<Text></Text>
				<Text></Text>
				<Text>임대인이 발행한 영수증입니다</Text>
				{!!isMine&&!contractReceiptList&&(<Button title="계약금 영수증 발송" onPress={()=>{navigateToReceipt()}}/>)}
				{contractReceiptList&&contractReceiptList[0]&&!contractReceiptList[0].cr_modu_id&&(<Button title="계약금 영수증 미발행" onPress={()=>{}}/>)}
				{contractReceiptList&&contractReceiptList[0]&&!!contractReceiptList[0].cr_modu_id&&(<Button title="계약금 영수증 다운로드" onPress={()=>{handleModuReceiptURL()}}/>)}
			</ScrollView>
		</SafeAreaView>
	</>)
}

export default ChatContractTestScreen