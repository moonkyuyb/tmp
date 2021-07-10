/* COMMON */
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { View, } from "react-native";
import Modal from "react-native-modal";
import RNDateTimePicker from "@react-native-community/datetimepicker";

/* UTILS */
import _ from "lodash";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { hangeulNumber, numberWithCommas } from "../utils/common";

/* UI COMPONENTS */
import Colors from './../../assets/colors';
import * as Common from './../styled/commonStyle';
import { ModalPopup } from "../container/commonContainer";
import{ DepositListWrap, DepositLabel, DepositCont, DepositBlackBox }from"./../styled/chatContractStyle/depositReceiptStyle";
import { Button } from "react-native";

//CONSTANTS
const testCrId = 6, testMIdTo = 34, testMIdFrom = 2
const TYPE_STRING_MAPPING = { downpayment: '계약금', middlepayment: '중도금', middlepayment2: '2차 중도금', balance: '잔금', balance2: '2차 잔금' }

const ContractReceiptScreen = ({
	m_id_to, m_id_from, cr_id, c_id, cr_type, contractReceipt, isMine, contractReceiptPosted,
	showAlertMessage, initContractReceiptState, getContractReceipt, setContractReceiptState, updateContractReceipt, 
})=>{
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//UI STATES
	const [loaded, setLoaded] = useState(false) 
	const [amount, setAmount] = useState(0)

	//REACT HOOK FORM
	const { control, handleSubmit, setValue } = useForm()
	const onValid = (data) => {
		console.log(`[💬CONTRACT RECEIPT SCREEN] VALIDATON SUCCESS: data⏬`, data)
		const payload = {}
		if(data.cr_signing_lessor && !data.cr_signing_date_lessor){
			payload['cr_signing_date_lessor'] = moment().format('YYYY-MM-DD HH:mm:ss')
		}
		if(data.cr_signing_tenants && !data.cr_signing_date_tenants){
			payload['cr_signing_date_tenants'] = moment().format('YYYY-MM-DD HH:mm:ss')
		}
		payload['c_id'] = c_id
		payload['cr_id'] = cr_id
		updateContractReceipt(payload)
	}
	const onInvalid = (err) => {
		console.log(`[💬CONTRACT RECEIPT SCREEN] VALIDATON FAIL`, err)
		showAlertMessage(`필수 입력 내용을 다시 확인해주세요.`)
	}

	//HANDLE EFFECTS
	useEffect(()=>{
		console.log(`💬💬💬💬💬💬💬💬💬💬💬💬PARAM: `, route.params);
		console.log(`💬[CONTRACT RECEIPT]HAS cr_id? ${_.has(route.params,'cr_id')}`, `💬HAS c_id? ${_.has(route.params,'c_id')}`);
		console.log(`💬[CONTRACT RECEIPT]HAS m_id_to? ${_.has(route.params,'m_id_to')}`, `💬HAS m_id_from? ${_.has(route.params,'m_id_from')}`);
		if(_.has(route.params,'cr_id')){
			var initState = { cr_id: route.params.cr_id }
		}else if(_.has(route.params,['c_id','cr_type'])){
			var initState = { c_id: route.params.c_id, cr_type: route.params.cr_type }
		}

		initState.m_id_to = route.params.m_id_to
		initState.m_id_from = route.params.m_id_from
		console.log(`💬💬💬💬💬💬💬💬💬💬💬💬initState: `,initState);
		initContractReceiptState(initState)
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		getContractReceipt({cr_id:cr_id, c_id:c_id, cr_type:cr_type})
	}},[loaded])

	useEffect(()=>{if(contractReceipt){
		console.log(`💁‍♀️ISEMPTY?: ${_.isEmpty(contractReceipt)}`);
		console.log(`💬[CONTRACT RECEIPT] cr_type: ${contractReceipt.cr_type}`);
		console.log(`💬[CONTRACT RECEIPT] contractReceipt["${contractReceipt.cr_type}"]: ${contractReceipt[`c_${contractReceipt.cr_type}`]}`);
		console.log(`💬[CONTRACT RECEIPT] contractReceipt.m_id_lessor: ${contractReceipt.m_id_lessor},  m_id_from: ${m_id_from}`);
		const amt = contractReceipt.cr_amount
		if(amt) setAmount(amt)
		console.log(`💬[CONTRACT RECEIPT] m_id_lessor: ${contractReceipt.m_id_lessor}, m_id_from: ${m_id_from}, isMine? ${contractReceipt.m_id_lessor==m_id_from}`);
		setContractReceiptState({isMine: contractReceipt.m_id_lessor==m_id_from, c_id: contractReceipt.c_id})

		if(contractReceipt.cr_signing_date_lessor){
			setValue('cr_signing_lessor', true)
			setValue('cr_signing_date_lessor', contractReceipt.cr_signing_date_lessor)
		}
		if(contractReceipt.cr_signing_date_tenants){
			setValue('cr_signing_tenants', true)
			setValue('cr_signing_date_tenants', contractReceipt.cr_signing_date_tenants)
		}
	}},[contractReceipt])

	useEffect(()=>{if(contractReceiptPosted){
		showAlertMessage('저장되었습니다.')
		initContractReceiptState({contractReceiptPosted: false})
		navigation.goBack()
	}},[contractReceiptPosted])
	
	//UI COMPONENTS
	const ChkIcon = () => (<Common.Image size={24} marginR={2} source={require('./../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')} /> );
	const ChkBtn 		= () => ( <Common.Image size={24} source={require('./../../assets/img/drawable-xhdpi/bt_combo_off.png')}/> )
	const ChkBtnActive	= () => ( <Common.Image size={24} source={require('./../../assets/img/drawable-xhdpi/bt_combo_on.png')}/> )

	return(<>
		<Common.ZipandaSafeView>
			{/* <Button title="TEST" onPress={()=>{setAmount();}}/> */}
			<Button title="TEST" onPress={()=>{console.log(isMine);}}/>
			<ModalPopup/>
			<Common.ScrollContainer>		
				<Common.TitleBox><Common.Title>계약금 입금확인증 내역</Common.Title></Common.TitleBox>
				<DepositListWrap>
					<Common.FlexBetweenBox>
						<DepositLabel>성명</DepositLabel><DepositCont>{contractReceipt.c_account_name||''}</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>입금 은행</DepositLabel><DepositCont>{contractReceipt.c_account_bank_str||''}</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>예금주</DepositLabel><DepositCont>{contractReceipt.c_account_name||''}</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>계좌번호</DepositLabel><DepositCont>{contractReceipt.c_account_number||''}</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel>입금액</DepositLabel><DepositCont>{hangeulNumber(amount)}원정</DepositCont>
					</Common.FlexBetweenBox>
					<Common.FlexBetweenBox>
						<DepositLabel></DepositLabel><DepositCont>￦ {numberWithCommas(amount)}</DepositCont>
					</Common.FlexBetweenBox>
				</DepositListWrap>

				<Controller control={control} name={'cr_signing_date_lessor'} render={({field})=>(<></>)}/>
				<Controller control={control} name={'cr_signing_lessor'} defaultValue={false} render={({field})=>(<>
					<Common.FlexCenter>
						<Common.FlexRowBtn onPress={()=>{
							if(!contractReceipt.cr_signing_date_lessor && isMine){
								if(!field.value) showAlertMessage('입금 계좌와 금액이 정확한지 반드시 확인해주세요.')
								field.onChange(!field.value)
							}
						}}>
							{field.value ? <ChkBtnActive/> : <ChkBtn/>}
							<Common.TextBold14 multiline={true}>상기 금액의 입금 완료를 증명합니다.</Common.TextBold14>
						</Common.FlexRowBtn>
					</Common.FlexCenter>
					<Common.FlexCenter>
						<Common.TextLight12 marginT={5}>
							{contractReceipt.cr_signing_date_lessor?moment(contractReceipt.cr_signing_date_lessor).format('YYYY년 MM월 DD일'):moment().format('YYYY년 MM월 DD일')}<Common.TextBold12>     {contractReceipt.c_name_lessor}</Common.TextBold12>
						</Common.TextLight12>
					</Common.FlexCenter>
				</>)}/>

				<Controller control={control} name={'cr_signing_date_tenants'} render={({field})=>(<></>)}/>
				<Controller control={control} name={'cr_signing_tenants'} defaultValue={false} render={({field})=>(<>
					<DepositBlackBox>
						<Common.FlexRowBtn onPress={()=>{
							if(!contractReceipt.cr_signing_date_tenants && !isMine){
								if(!field.value) showAlertMessage('입금 계좌와 금액이 정확한지 반드시 확인해주세요.')
								field.onChange(!field.value)
							}
						}}>
							{field.value ? <ChkBtnActive/> : <ChkBtn/>}
							<Common.TextLight14 color={Colors.whiteColor} multiline={true}>상기 금액의 입금 완료를 증명합니다.</Common.TextLight14>
						</Common.FlexRowBtn>
						<Common.TextLight12 color={Colors.whiteColor} marginT={5}>
							{contractReceipt.cr_signing_date_tenants?moment(contractReceipt.cr_signing_date_tenants).format('YYYY년 MM월 DD일'):moment().format('YYYY년 MM월 DD일')}<Common.TextBold12 color={Colors.whiteColor}>     {contractReceipt.c_name_tenant}</Common.TextBold12>
						</Common.TextLight12>
					</DepositBlackBox>
				</>)}/>
				
			</Common.ScrollContainer>
			<Common.FloatBtn onPress={handleSubmit(onValid,onInvalid)}>
				<Common.TextSemiBold18>저장</Common.TextSemiBold18>
			</Common.FloatBtn>
		</Common.ZipandaSafeView>
	</>)
}

export default ContractReceiptScreen
