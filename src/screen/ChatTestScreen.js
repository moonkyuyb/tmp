/* COMMON */
import React, { useEffect, useState } from "react";
import { View, ScrollView, TextInput, SafeAreaView, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native-elements";

/* ENVIRONMENTS */
import { ADMIN_URL } from "@env";

/* UTILS */
import _ from "lodash";
import moment from "moment";

/* UI COMPONENTS */
import { Image34 } from "../styled/commonStyle";
import { ModalPopup } from "../container/commonContainer";

/* CONSTANTS */
const testSId = 334, testMIdTo = 34, testMIdFrom = 33

const ChatTestScreen = ({
	s_id, m_id_from, m_id_to, c_id, chatList, isMine, hasChecklist, verifiedMember, showBottomPop, bottomPopStyle, salesForChat: sales, salesImgsForChat: salesImgs, toMemberForChat: toMember,
	showAlertMessage, initChatState, setChatState, postChat, getChatList, getSalesForChat, getSalesImgsForChat, getToMemberForChat, getContractForChat, checkChecklistForChat
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//UI STATE
	const [loaded, setLoaded] = useState(false)
	const [inputMessage, setInputMessage] = useState('')

	//HANDLE EFFECTS
	useEffect(()=>{
		const initParams = {
			s_id		: route.params?.s_id		? route.params?.s_id		: testSId,
			m_id_to		: route.params?.m_id_to		? route.params?.m_id_to		: testMIdTo,
			m_id_from	: route.params?.m_id_from	? route.params?.m_id_from	: testMIdFrom,
		}
		initChatState(initParams)
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		getChatList({s_id: s_id, m_id_from: m_id_from, m_id_to: m_id_to})

		getSalesForChat({s_id: s_id})
		getSalesImgsForChat({s_id: s_id})
		getToMemberForChat({m_id_to: m_id_to})
		checkChecklistForChat({s_id: s_id, m_id_from: m_id_from, m_id_to: m_id_to})

		// const interval = setInterval(() => {
		// 	getChatList({s_id: s_id, m_id_from: m_id_from, m_id_to: m_id_to})
		// }, 2000);

		// return()=>{
		// 	clearInterval(interval)
		// }
	}},[loaded])

	useEffect(()=>{if(!_.isEmpty(sales)){
		console.log(`💬IS MY SALE ITEM?:${sales.m_id == m_id_from}`);
		const _isMine = sales.m_id == m_id_from
		const mIdLessor = _isMine ? m_id_from : m_id_to
		const mIdTenants = _isMine ? m_id_to : m_id_from
		setChatState({isMine: _isMine, m_id_lessor: mIdLessor, m_id_tenants: mIdTenants})
		getContractForChat({s_id: s_id, m_id_lessor: mIdLessor, m_id_tenants: mIdTenants})
	}},[sales])

	//UI FUNCTION
	function handlePostChat(message){
		postChat({s_id: s_id, m_id_from: m_id_from, m_id_to: m_id_to, ct_message:message})
		setTimeout(() => {getChatList({s_id: s_id, m_id_from: m_id_from, m_id_to: m_id_to})}, 372);
		setInputMessage('')
	}

	function navigateToContract(){
		if (c_id || verifiedMember) {
			navigation.navigate('chatContractTest')
		} else {
			showAlertMessage(`가 계약서 작성을 요청하시겠습니까?\n가 계약서 작성 요청을 위해서는 먼저 신분증 본인인증이 필요합니다.\n확인을 눌러 본인인증을 진행해주세요.\n(신분증 인증 도입 후 적용(~2021/06))`)
			setChatState({verifiedMember: true, showBottomPop:true, bottomPopType:'CONTRACT_REQ'})
		}
	}

	return(<>
		<SafeAreaView style={{flex:1}}>
			<ScrollView>
				<ModalPopup/>
				<Button title='TEST' onPress={()=>{console.log(c_id);}}/>
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
				<View style={{flexDirection:'row'}}>
					<Button containerStyle={{flex:1}} title="전화번호공개요청" onPress={()=>{console.log(c_id);}}/>
					<Button containerStyle={{flex:1}} title="방문예약" onPress={()=>{}}/>
					{!isMine&&(<Button containerStyle={{flex:1}} buttonStyle={{backgroundColor:hasChecklist?'tomato':'blue'}} title="체크리스트" onPress={()=>{navigation.navigate('checklistTest',{s_id:s_id, m_id_to:m_id_to, m_id_from: m_id_from})}}/>)}
				</View>
				<View style={{flexDirection:'row'}}>
					<Button containerStyle={{flex:1}} buttonStyle={{backgroundColor:c_id?'tomato':'blue'}}  title="가계약" onPress={()=>{navigateToContract()}}/>
					<Button containerStyle={{flex:1}} buttonStyle={{backgroundColor:c_id?'tomato':'blue'}}  title="계약" onPress={()=>{navigateToContract()}}/>
					{!isMine&&(<Button containerStyle={{flex:1}} title="등기" onPress={()=>{}}/>)}
				</View>
				{chatList.map(item=>{
					const myMessage = item.m_id_from==m_id_from
					const regDate = moment(item.reg_date)
					const regDateStr = regDate.format('Y-MM-DD HH:mm:ss')
					return(
						<View style={{alignItems:myMessage?'flex-end':'flex-start'}} key={item.ct_message}>
							<Text>{regDateStr}</Text>
							<Text>{!myMessage&&`${toMember.m_name}: `}{item.ct_message}</Text>
						</View>
					)
				})}
				<TextInput
					value={inputMessage}
					onChangeText={(v)=>{setInputMessage(v)}}
				/>
				<Button title="보내기" onPress={()=>{handlePostChat(inputMessage)}}/>
			</ScrollView>
			{(showBottomPop)&&(
			<View style={{backgroundColor:'yellow', flexDirection:'row',  justifyContent:'space-between', flexBasis:40}}>
				{bottomPopStyle=='CONTRACT_REQ'&&(<>
				<Text>본인인증 완료, 가계약서 작성해주세요</Text>
				<Button title="가계약서작성" onPress={()=>{navigation.navigate('contractLessor')}}/>
				</>)}
			</View>
			)}
		</SafeAreaView>
	</>)
}

export default ChatTestScreen

