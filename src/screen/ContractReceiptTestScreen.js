import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { ModalPopup } from "../container/commonContainer";
import styled from "styled-components";
import { hangeulNumber } from "../utils/common";

import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, SafeAreaView, TextInput, Text } from "react-native";
import Modal from "react-native-modal";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native";
import { useState } from "react";
import { View } from "react-native";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { getContractForChat } from "../reducers/chatReducer";

//CONSTANTS
const testCId = 1, testCrType = 'downpayment', editable = true
const TYPE_STRING_MAPPING = {
	downpayment: '계약금',
	middlepayment: '중도금',
	middlepayment2: '2차 중도금',
	balance: '잔금',
	balance2: '2차 잔금',
}

const ContractReceiptScreen = ({
	contract, crType, selectedCId, contractReceiptPosted,
	showAlertMessage, getContract,
	initContractReceiptState, setContractReceiptState, getContractReceipt, postContractReceipt,
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//UI STATES
	const [loaded, setLoaded] = useState(false)
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [pickedDate, setPickedDate] = useState(new Date())
	const [targetValue, setTargetValue] = useState('cr_execution_date')
	const [crTypeStr, setCrTypeStr] = useState('')

	//REACT HOOK FORM
	const {control, handleSubmit, setValue } = useForm()
	const onValid = (data) => {
		console.log(`✅RECEIPT VALIDATION OK👍`);
		console.log(data);
		postContractReceipt(data)
	}
	const onInvalid = (err) => {
		console.log(`❎RECEIPT VALIDATION ERROR👎`);
		console.log(err);
		const errList=[
			'c_id','cr_type','cr_amount','c_name_tenant','cr_amount_han','cr_amount_num',
			'cr_execution_date','c_building_address','c_address_lessor','c_name_lessor','cr_issue_date',
			'c_phone_lessor', 'c_phone_tenant'
		]
		for (let i = 0; i < errList.length; i++) {
			const item = errList[i];
			if(err[item]) {
				showAlertMessage(err[item]['message'])
				break;
			}else if(i==errList.length-1){
				showAlertMessage(`입력 내용을 다시 확인해주세요.`)
			}
		}
	}

	//UI FUNCTIONS
	function handleOpenDatePicker(target){
		setTargetValue(target)
		setShowDatePicker(true)
	}
	function handleCloseDatePicker(event, selectedDate){
		if(event.type === 'set'){
			const resultString = selectedDate.getFullYear().toString()+"-"+(selectedDate.getMonth()+1)+"-"+selectedDate.getDate()
			setValue(targetValue, resultString)
		}
		setShowDatePicker(false)
	}
	
	//HANDLE EFFECTS
	useEffect(()=>{
		const paramState = {
			selectedCId:route.params?.c_id 	? route.params?.c_id	: testCId,
			crType:		route.params?.crType? route.params?.crType	: testCrType,
		}
		setContractReceiptState(paramState)
		setLoaded(true)

		return()=>{ initContractReceiptState() }
	},[])

	useEffect(()=>{ if(loaded) { getContract({'c_id':selectedCId})} },[loaded])

	useEffect(()=>{ if(contract&&!_.isEmpty(contract)) {
		switch (crType) {
			case 'downpayment':
			setCrTypeStr(TYPE_STRING_MAPPING['downpayment'])
			var cr_amount_tmp = contract.c_downpayment || 0
			var cr_execution_date_tmp = contract.c_downpayment_datetime || ''
			break;

			case 'middlepayment':
			setCrTypeStr(TYPE_STRING_MAPPING['middlepayment'])
			var cr_amount_tmp = contract.c_middlepayment || 0
			var cr_execution_date_tmp = contract.c_middlepayment_datetime || ''
			break;

			case 'balance':
			setCrTypeStr(TYPE_STRING_MAPPING['balance'])
			var cr_amount_tmp = contract.c_balance || 0
			var cr_execution_date_tmp = contract.c_balance_datetime || ''
			break;

			default:
			setCrTypeStr(TYPE_STRING_MAPPING['downpayment'])
			var cr_amount_tmp = contract.c_downpayment || 0
			var cr_execution_date_tmp = contract.c_downpayment_datetime || ''
			break;
		}
		const c_id					= (contract.c_id)?.toString()||''
		const cr_type				= crType||''
		const cr_amount				= cr_amount_tmp?.toString()||''
		const c_phone_lessor		= contract.c_phone_lessor?.toString()||''
		const c_phone_tenant		= contract.c_phone_tenant?.toString()||''

		const c_name_tenant			= contract.c_name_tenant?.toString()||''
		const cr_amount_han			= hangeulNumber(cr_amount)||''
		const cr_amount_num			= cr_amount_tmp?.toString()||''
		const cr_execution_date		= cr_execution_date_tmp?new moment(cr_execution_date_tmp):new moment()
		const cr_execution_date_str	= cr_execution_date.format('Y-M-D')
		const c_building_address	= contract.c_building_address||''
		const c_address_lessor		= (contract.c_address_lessor||'') + (contract.c_address_detail_lessor&&' ') + (contract.c_address_detail_lessor||'')
		const c_address_tenant		= (contract.c_address_tenant||'') + (contract.c_address_detail_tenant&&' ') + (contract.c_address_detail_tenant||'')
		const c_name_lessor			= contract.c_name_lessor||''
		const cr_issue_date			= new moment()
		const cr_issue_date_str		= cr_issue_date.format('Y-M-D')

		// // HIDDEN
		setValue('c_id',				c_id)
		setValue('cr_type',				cr_type)
		setValue('cr_amount',			cr_amount)
		setValue('c_phone_lessor',		c_phone_lessor)
		setValue('c_phone_tenant',		c_phone_tenant)

		// // TEXTINPUT
		setValue('c_name_tenant',		c_name_tenant)
		setValue('cr_amount_han',		cr_amount_han)
		setValue('cr_amount_num',		cr_amount_num)
		setValue('cr_execution_date',	cr_execution_date_str)
		setValue('c_building_address',	c_building_address)
		setValue('c_address_lessor',	c_address_lessor)
		setValue('c_name_lessor',		c_name_lessor)
		setValue('cr_issue_date',		cr_issue_date_str)
	}},[contract])

	useEffect(()=>{
		if(contractReceiptPosted){
			showAlertMessage(`발송되었습니다. 카카오 혹은 문자 메시지를 확인해주세요.`)
			dispatch(checkContractModuForChat({contract:contract}))
			navigation.goBack('chat')
		}
	},[contractReceiptPosted])

	return(<>
		<SafeAreaView>
			<ModalPopup/>
			<Modal isVisible={showDatePicker} style={{zIndex:500}}>
				<View style={ {backgroundColor:'#ffffff'} }>
					<RNDateTimePicker
						value={pickedDate}
						style={{zIndex:1000}}
						mode={"date"} is24Hour={true} display="default" testID="dateTimePicker"
						onChange={handleCloseDatePicker}
					/>
				</View>
			</Modal>
			<ScrollView>
				{/* <Button title="TEST" onPress={()=>{console.log(contract)}}/> */}
				{/* <Button title="getContract" onPress={()=>{getContract({'c_id':selectedCId})}}/> */}
				<Button title="발송" onPress={handleSubmit(onValid, onInvalid)}/>
				<Text style={{marginTop:10,marginBottom:4,fontSize:18,fontWeight:'bold'}}>계약금 영수증 입력 정보</Text>
				<Controller control={control} name={'c_id'}		render={()=>(null)}/>
				<Controller control={control} name={'cr_type'}	render={()=>(null)}/>
				<Controller control={control} name={'cr_amount'}render={()=>(null)}/>


				<Controller
					control={control} name={`c_name_tenant`} rules={{required:{value:true,message:`수신인을 입력해주세요`}}}
					render={({field})=>(
					<InputControllerWrap>
						<TextInputTitle style={{fontSize:16}}>수신인</TextInputTitle>
						<TextInputGray value={field.value} onChangeText={field.onChange} editable={editable}/>
					</InputControllerWrap>
				)}/>

				<InputControllerWrap>
					{/* <TextInputTitle style={{fontSize:16}}>{crTypeStr}</TextInputTitle> */}
					<Controller
						control={control} name={`cr_amount_han`} rules={{required:{value:true,message:`금액을 입력해주세요`}}}
						render={({field})=>(
						<TextInputBoxWrap>
							<TextInputSubTitle>금액(한글)</TextInputSubTitle>
							<TextInputGray value={field.value} onChangeText={field.onChange} editable={editable}/>
						</TextInputBoxWrap>
					)}/>
					<Controller
						control={control} name={`cr_amount_num`} rules={{required:{value:true,message:`금액을 입력해주세요`}}}
						render={({field})=>(
						<TextInputBoxWrap>
							<TextInputSubTitle>금액(숫자)</TextInputSubTitle>
							<TextInputGray value={field.value} onChangeText={field.onChange} editable={editable}/>
						</TextInputBoxWrap>
					)}/>
					<Controller
						control={control} name={`cr_execution_date`} rules={{required:{value:true,message:`입금일을 선택해주세요`}}}
						render={({field})=>(
						<TextInputBoxWrap>
							<TextInputSubTitle>입금일</TextInputSubTitle>
							<DummyInput onPress={()=>{handleOpenDatePicker('cr_execution_date')}}>
								<DummyInputText>{field.value}</DummyInputText>
							</DummyInput>
						</TextInputBoxWrap>
					)}/>
				</InputControllerWrap>
				
				<Controller
					control={control} name={`c_building_address`} rules={{required:{value:true,message:`소재지를 입력해주세요`}}}
					render={({field})=>(
					<InputControllerWrap>
						<TextInputTitle style={{fontSize:16}}>소재지</TextInputTitle>
						<TextInputGray value={field.value} onChangeText={field.onChange} editable={editable}/>
					</InputControllerWrap>
				)}/>

				<Controller
					control={control} name={`c_address_lessor`} rules={{required:{value:true,message:`발행인 주소를 입력해주세요`}}}
					render={({field})=>(
					<InputControllerWrap>
						<TextInputTitle style={{fontSize:16}}>발행인 주소</TextInputTitle>
						<TextInputGray value={field.value} onChangeText={field.onChange} editable={editable}/>
					</InputControllerWrap>
				)}/>

				<Controller
					control={control} name={`c_name_lessor`} rules={{required:{value:true,message:`발행인 성명을 입력해주세요`}}}
					render={({field})=>(
					<InputControllerWrap>
						<TextInputTitle style={{fontSize:16}}>발행인 성명</TextInputTitle>
						<TextInputGray value={field.value} onChangeText={field.onChange} editable={editable}/>
					</InputControllerWrap>
				)}/>

				<Controller
					control={control} name={`cr_issue_date`} rules={{required:{value:true,message:`발행일을 선택해주세요`}}}
					render={({field})=>(
					<InputControllerWrap>
						<TextInputTitle style={{fontSize:16}}>발행일</TextInputTitle>
						<DummyInput onPress={()=>{handleOpenDatePicker('cr_issue_date')}}>
							<DummyInputText>{field.value}</DummyInputText>
						</DummyInput>
					</InputControllerWrap>
				)}/>
				
				<Controller
					control={control} name={`c_phone_lessor`}
					render={({field})=>(
					<InputControllerWrap>
						<TextInputTitle style={{fontSize:16}}>발행인 전화번호(임시)</TextInputTitle>
						<TextInputGray value={field.value} onChangeText={field.onChange} editable={editable}/>
					</InputControllerWrap>
				)}/>

			</ScrollView>
		</SafeAreaView>
	</>)

}

const TextInputWrapHeight = 37
const InputControllerWrap = styled.View`
	margin-top: 10px;
`
const TextInputTitle = styled.Text`
	margin-bottom: 4px;
	font-weight: bold;
`
const TextInputBoxWrap = styled.View`
	height: ${TextInputWrapHeight}px;
	flex-direction: row;
	align-items: center;
`
const TextInputSubTitle = styled.Text`
	text-align: center;
	font-weight: bold;
	flex-basis: 100px;
`

const TextInputWhite = styled.TextInput`
	background-color: #FFF;
	flex:1;
`
const TextInputGray = styled.TextInput`
	background-color: #DDD;
	flex:1;
`
const DummyInput = styled.TouchableOpacity`
	flex:1;
`
const DummyInputText = styled.Text`
	background-color: #FFF;
	height: ${TextInputWrapHeight}px;
	line-height: ${TextInputWrapHeight}px;
`

export default ContractReceiptScreen