/* COMMON */
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

/* UTILS */
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { checkChecklistForChat } from "../reducers/chatReducer";
import Colors from './../../assets/colors';

/* UI COMPONENTS */
import * as Common from './../styled/commonStyle';
import { ModalPopup } from "../container/commonContainer";
import { Container,Image,ScrollContainerB,TextBold12,TextBold16, TextMedium12,BottomBtn2Box,BottomBtn2,SubTitle,TextBold14,TextLight11 } from '../styled/commonStyle';
import { CheckListHeader,CheckListBox,ChkBoxBtn,ChkBoxTit,CheckInputBox,CheckTextArea } from '../styled/chatContractStyle/checkListStyle';
import { ChatHeaderContainer, ChatSaleBtnBox, SaleBtn, TitBox, TitUnderLine, ChatMenu, OptionListBtn, OptionListText, ChatContMenu, ChatSaleTop, BuildingInfoText } from '../styled/chatStyle/chatHeaderStyle';

import { SaleList, SaleImg } from '../styled/chatStyle/chatCommonStyle';

/* CONSTANTS */
const testSId = 256, testMIdTo = 2, testMIdFrom = 32
const CKLIST_MEMO_CODE = 'CKLIST_000' //※절대 변경 금지 !

const ChecklistScreen = ({
	s_id, m_id_from, m_id_to, checklist, checklistCompleted,
	initChecklistState, setChecklistState, clearChecklistState, getChecklist, postChecklist
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const sales = useSelector(state=>state.chatReducer.salesForChat)
	const dispatch = useDispatch()

	//UI STATES
	const [loaded, setLoaded] = useState(false)

	//HANDLE EFFECTS
	useEffect(()=>{
		// console.log(`💬route.param: ${route.params}`); console.log(route.params);
		const initParams = {
			s_id:	route.params?.s_id		? route.params?.s_id		: testSId,
			m_id_to:	route.params?.m_id_to	? route.params?.m_id_to		: testMIdTo,
			m_id_from:route.params?.m_id_from	? route.params?.m_id_from	: testMIdFrom,
		}
		// console.log(`💬initState: ${initParams}`); console.log(initParams);
		initChecklistState(initParams)
		setLoaded(true)

		return()=>{ clearChecklistState() }
	},[])

	useEffect(()=>{ if(loaded) getChecklist({s_id:s_id, m_id_from:m_id_from, m_id_to:m_id_to}) },[loaded])
	useEffect(()=>{ if(checklist.length>0 && checklist[0]['code'] == CKLIST_MEMO_CODE) setValue('content',checklist[0]?.content) },[checklist])
	useEffect(()=>{ if(checklistCompleted) {
		dispatch(checkChecklistForChat({s_id: s_id, m_id_from: m_id_from, m_id_to: m_id_to}))
		navigation.goBack()
	}},[checklistCompleted])

	//REACT HOOK FORM
	const { control, handleSubmit, setValue } = useForm()
	const onValid = data => {
		// console.log(data);
		postChecklist({
			's_id': s_id, 'm_id_from': m_id_from, 'm_id_to': m_id_to, 'data': data, 'checklist': checklist
		})
	}
	const onInvalid = err => { console.log(err) }

	//UI COMPONENTS
	const ChkOnIcon = () => (<Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const ChkOffIcon = () => (<Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const CheckItem=({item,index})=>{
		if(item['code']==CKLIST_MEMO_CODE&&index == 0) return null
		return (
			<Controller control={control} name={`checkedlist[${index}]`} defaultValue={item['checked']?true:false} render={({field})=>(
				<CheckListBox>
					<Common.TextMedium14>{item['string']}</Common.TextMedium14>
					<ChkBoxBtn onPress={()=>{field.onChange(!field.value)}}>
						{field.value?(<ChkOnIcon/>):(<ChkOffIcon />)}
						{field.value?(<TextMedium12>예</TextMedium12>):(<ChkBoxTit>예</ChkBoxTit>)}
					</ChkBoxBtn>
				</CheckListBox>
			)}/>
		)
	}

	return(<>
		<ModalPopup/>
		<Common.ZipandaSafeView>
			<View style={{flex:1}}>
				<ChatSaleTop>
					<SaleList>
						<SaleImg source={require('../../assets/img/sample/sample_room_04.jpg')} />
						<Common.View>
						{sales&&(<>
							<Common.TextBold16 marginB={2}>
								{sales?.s_price_type == 'sales' ? (
									`${sales.price_type||''} ${Number(sales.s_trading_price)||''}`
								):(
									`${sales.price_type||''} ${Number(sales.s_deposit)||''} ${Number(sales?.s_monthly_rent)?`/ ${Number(sales?.s_monthly_rent)}`:``}`
								)}
							</Common.TextBold16>
							<BuildingInfoText>
								{`${sales.building_type||''} ${sales.s_floor?`/ ${sales.s_floor}층`:''} ${Number(sales.s_supply_area_m)?`/ ${Number(sales.s_supply_area_m)}m² `:''} ${Number(sales.m_cost)?`/ ${Number(sales.m_cost)}만 `:''}`}
							</BuildingInfoText>
							<BuildingInfoText>
								{`${sales?.location1||''} ${sales?.location2||''} ${sales?.location3||''}`}
							</BuildingInfoText>
						</>)}
						</Common.View>
					</SaleList>
				</ChatSaleTop>
				<CheckListHeader>
					<Common.TextBold14>체크리스트</Common.TextBold14>
				</CheckListHeader>
				<FlatList
					data={ checklist }
					renderItem ={ CheckItem }
					keyExtractor={(item,index)=>item.code}
					ListFooterComponent={()=>(<>
						<Controller control={control} name={`checkedlist[0]`} defaultValue={true} render={()=>null}/>
					</>)}
				/>
			</View>
			<Controller control={control} name={`content`} defaultValue={checklist[0]?.content} render={({field})=>(
				<CheckInputBox>
					<Common.SubTitle marginTN>기타메모</Common.SubTitle>
					<CheckTextArea value={field.value} onChangeText={field.onChange} multiline={true} placeholder={'기타 메모내용을 입력해주세요.'}/>
				</CheckInputBox>
			)}/>
			<Common.FloatBtnBox>
				<Common.FloatBtnsss onPress={handleSubmit(onValid,onInvalid)}>
					<Common.TextSemiBold18>저장</Common.TextSemiBold18>
				</Common.FloatBtnsss>
				<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={()=>{navigation.goBack()}}>
					<Common.TextSemiBold18 color={Colors.whiteColor}>취소</Common.TextSemiBold18>
				</Common.FloatBtnsss>
			</Common.FloatBtnBox>
		</Common.ZipandaSafeView>
	</>)
}

export default ChecklistScreen


