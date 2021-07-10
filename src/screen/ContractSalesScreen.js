/* COMMON */
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";

/* UTILS */
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";

/* UI COMPONENTS */
import Colors from "../../assets/colors"
import * as Common from "../styled/commonStyle";
import { ModalPopup } from "../container/commonContainer";
import { RequiredS } from "../styled/sales/salesDirectCommonStyle";
import { ViewBorderY, YellowLabel, YellowLabelText, BorderYInnerBox, YTextInput, UnitTit, SpecialTitle, SpecialContract, YellowBorderBtn, SContractHeader, SContractCont, SpecialContractInput, InfoAert, AlertBox, AlertBoxText} from '../styled/chatContractStyle/contractStyle';
import ContractBasics from "../components/provContract/provContractBasics";
import { StackActions } from "@react-navigation/native";
import {FromArrowIcon} from "../components/common/ArrowIcon";
import { DateIcon } from "./../components/common/DateIcon";
import { useDispatch, useSelector } from "react-redux";
import { getCodes } from "../reducers/codeReducer";
import { getContractForChat } from "../reducers/chatReducer";

/* CONSTANTS */
const testSId = 363, testMIdLessor = 2, testMIdTenants = 34

const ContractSalesScreen = ({
	c_id, s_id, m_id_lessor, m_id_tenants, salesForContract: sales, contractPosted,
	handleContractPayment, showAlertMessage, getSalesForContract, contractSaved, setContractState, postContract,
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//REDUX CONSTANTS
	const contractState = useSelector(state=>state.contractReducer)
	const codes = useSelector(state=>state.codeReducer.codes)
	const dispatch = useDispatch()

	//UI STATE
	const [loaded, setLoaded] = useState(false)
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [pickedDate, setPickedDate] = useState(new Date())
	const [targetValue, setTargetValue] = useState('c_downpayment_datetime')
	const [middlePaymentRequired, setMiddlePaymentRequired] = useState(false)
	const [middlePayment2Required, setMiddlePayment2Required] = useState(false)

	//REACT HOOK FORM
	const { control, handleSubmit, setValue, getValues } = useForm()
	const onValid = (data) => {
		console.log(`[💬CONTRACT PAYMENT SCREEN] VALIDATON SUCCESS: data⏬`)
		console.log(data)
		const payload = Object.assign({},contractState, data)
		handleContractPayment(payload)
	}
	const onInvalid = (err) => {
		console.log(`[💬CONTRACT PAYMENT SCREEN] VALIDATON FAIL`);
		const errList = [
			"c_trading_price", "c_deposit", "c_monthly", "c_downpayment", "c_downpayment_datetime", 
			"c_middlepayment_datetime", "c_balance", "c_balance_datetime", "c_contract_start", "c_contract_end",
			"c_monthly_payday", "c_monthly_payday_type"
		]

		for (let i = 0; i < errList.length; i++) {
			const item = errList[i];
			if(err[item]) {
				showAlertMessage(err[item]['message'])
				break;
			}else if(i==errList.length-1){
				showAlertMessage(`필수 입력 내용을 다시 확인해주세요.`)
			}
		}
	}

	//HANDLE EFFECT
	useEffect(()=>{
		//if(!s_id) navigation.dispatch(StackActions.pop(3)) //실제 서비스
		const initState = { s_id: s_id?s_id:testSId, m_id_lessor: m_id_lessor?m_id_lessor:testMIdLessor, m_id_tenants:m_id_tenants?m_id_tenants:testMIdTenants }
		console.log(`[💬CONTRACT SALES SCREEN] ${s_id?'HAS CONTRACT STATUS':'🟥USE TEST DATA(실제 서비스 시에는 pop(1))'}`);
		console.log(`[💬CONTRACT SALES SCREEN] s_id: ${initState.s_id}, m_id_lessor: ${initState.m_id_lessor}, m_id_tenants: ${initState.m_id_tenants}`);
		setContractState(initState)
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		console.log(`[💬CONTRACT SALES SCREEN] GET code, salesForContract: ${s_id}`)
		if(!codes.special_agreement || codes.special_agreement.length<=0) dispatch(getCodes('special_agreement'))
		if(!codes.bank || codes.bank.length<=0) dispatch(getCodes('bank'))
		getSalesForContract({s_id:s_id})
	}},[loaded])

	useEffect(()=>{if(sales&&!_.isEmpty(sales)){
		console.log(`[💬CONTRACT SALES SCREEN] SET salesForContract DATA. salesForContract⏬`)
		console.log(sales)
		if(sales.s_address_street1) setValue('c_building_address', `${sales.s_address_street1} ${sales.s_address_street2}`)
		if(sales.s_trading_price) setValue('c_trading_price', (sales.s_trading_price*10000).toString())
	}},[sales])

	useEffect(()=>{if(contractSaved){
		setContractState({contractSaved:false})
		postContract(contractState)
	}},[contractSaved])

	useEffect(()=>{if(contractPosted){
		setContractState({contractPosted:false})
		console.log(`[💬CONTRACT SALES SCREEN] contractPosted 완료되었습니다.`)
		showAlertMessage(`완료되었습니다.`)
		dispatch(getContractForChat({c_id:c_id}))
		navigation.dispatch(StackActions.pop(3))
	}},[contractPosted])

	//UI COMPONENTS
	const CloseIcon= () => (<Common.Image24 source={require('../../assets/img/drawable-xhdpi/bt_close_s.png')}/>)
	const Required = () => (<RequiredS> *</RequiredS>)

	//RENDER SCREEN
	return (<>
		{/* <Button title="test" onPress={()=>{console.log(`💬CODE`, codes);}}/> */}
		<Common.ZipandaSafeView>
			<ModalPopup/>
			<Modal isVisible={showDatePicker} style={{zIndex:500}}>
				<View style={ {backgroundColor:'#ffffff'} }>
					<RNDateTimePicker
						value={pickedDate}
						style={{zIndex:1000}}
						mode={"date"} is24Hour={true} display="default" testID="dateTimePicker"
						onChange={(event, selectedDate) => {
							console.log(`⏬EVENT`);
							console.log(event);
							if(event.type === 'set'){
								const resultString = selectedDate.getFullYear().toString()+"-"+(selectedDate.getMonth()+1)+"-"+selectedDate.getDate()
								setValue(targetValue, resultString)
							}
							setShowDatePicker(false)
						}}
					/>
				</View>
			</Modal>
			<Common.ScrollContainer>
				<Common.TitleBox><Common.Title>가계약서 신청 정보 입력</Common.Title></Common.TitleBox>

				<Common.SubTitle>분류</Common.SubTitle>
				<Common.ViewBorder marginBN bgColor={Colors.mainColor} borderColor={Colors.blackColor}>
					<Common.ViewBorderText>{`부동산 ${sales.price_type||''} 계약서`}</Common.ViewBorderText>
				</Common.ViewBorder>

				<Common.SubTitle>소재지</Common.SubTitle>
				<Common.ViewBorder marginBN bgColor={Colors.bgColor}>
					<Common.ViewBorderText>{`${sales.location1||''} ${sales.location2||''} ${sales.location3||''}`}</Common.ViewBorderText>
				</Common.ViewBorder>
				<Common.SubTitle>토지</Common.SubTitle>
				<ViewBorderY bgColor={Colors.bgColor}>
					<YellowLabel><YellowLabelText>지목</YellowLabelText></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.ViewBorderText>-</Common.ViewBorderText>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY marginBN>
					<YellowLabel><YellowLabelText>면적</YellowLabelText></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.ViewBorderText>{0}m³</Common.ViewBorderText>
					</BorderYInnerBox>
				</ViewBorderY>

				<Common.SubTitle>건물</Common.SubTitle>
				<ViewBorderY>
					<YellowLabel><YellowLabelText>구조</YellowLabelText></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.ViewBorderText>{sales.sale_type||''}</Common.ViewBorderText>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><YellowLabelText>용도</YellowLabelText></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.ViewBorderText>{sales.building_type||''}</Common.ViewBorderText>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><YellowLabelText>면적</YellowLabelText></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.ViewBorderText>{sales.s_supply_area_m||''}m³</Common.ViewBorderText>
					</BorderYInnerBox>
				</ViewBorderY>
				<Controller control={control} name={'c_building_address'} render={({field})=>(<>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>주소</YellowLabelText></YellowLabel>
						<BorderYInnerBox TextNon>
							<Common.ViewBorderText>{field.value}</Common.ViewBorderText>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}/>

				<Controller
					control={control} name={'c_trading_price'} defaultValue={'100000'}
					rules={{required:{value:true, message:'매매가를 입력해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>매매가<Required/></Common.SubTitle>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>금액</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>융자금</Common.SubTitle>
				<Controller
					control={control} name={'c_succession_loan'}
					render={({field})=>(<>
						<ViewBorderY >
							<YellowLabel><YellowLabelText>금액</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_succession_loan_bank'} defaultValue='epostbank'
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>승계은행</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<FromArrowIcon/>
								<RNPickerSelect
									onValueChange={(value) => { field.onChange(value) } }
									placeholder={{label: '승계은행 선택'}}
									useNativeAndroidPickerStyle={false}
									fixAndroidTouchableBug={false}
									style={pickerStyle}
									items={codes.bank?codes.bank:[]}
								/>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>				
				<Controller
					control={control} name={'c_downpayment'} defaultValue='5000000'
					rules={{required:{value:true, message:'계약금을 입력해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>계약금<Required/></Common.SubTitle>
						<ViewBorderY>
							<YellowLabel><YellowLabelText>금액</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_downpayment_datetime'} defaultValue='2020-1-1'
					rules={{required:{value:true, message:'계약금 지급일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>지불일</YellowLabelText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('c_downpayment_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox marginBN>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>중도금</Common.SubTitle>
				<Controller
					control={control} name={'c_middlepayment'} defaultValue=''
					rules={{required:{value:middlePaymentRequired, message:'중도금을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><YellowLabelText>금액</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{
									setMiddlePaymentRequired(value?true:false)
									field.onChange(value)
								}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_middlepayment_datetime'} defaultValue=''
					rules={{required:{value:middlePaymentRequired, message:'중도금 지급일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><Common.ViewBorderText>지불일</Common.ViewBorderText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} disabled={!middlePaymentRequired} onPress={()=>{
								setTargetValue('c_middlepayment_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={middlePaymentRequired?field.value:''} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>2차중도금</Common.SubTitle>
				<Controller
					control={control} name={'c_middlepayment2'} defaultValue=''
					rules={{required:{value:middlePayment2Required, message:'2차중도금을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><YellowLabelText>금액</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{
									setMiddlePayment2Required(value?true:false)
									field.onChange(value)
								}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_middlepayment2_datetime'} defaultValue=''
					rules={{required:{value:middlePayment2Required, message:'2차중도금 지급일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><Common.ViewBorderText>지불일</Common.ViewBorderText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} disabled={!middlePayment2Required} onPress={()=>{
								setTargetValue('c_middlepayment2_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={middlePayment2Required?field.value:''} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>잔금<Required/></Common.SubTitle>
				<Controller
					control={control} name={'c_balance'} defaultValue='5000000'
					rules={{required:{value:true, message:'잔금을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><YellowLabelText>금액</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_balance_datetime'} defaultValue='2020-1-1'
					rules={{required:{value:true, message:'잔금 지급일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>지불일</YellowLabelText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('c_balance_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>인도일<Required/></Common.SubTitle>
				<Controller
					control={control} name={'c_contract_start'} defaultValue='2020-1-1'
					rules={{required:{value:true, message:'인도일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><YellowLabelText>인도일</YellowLabelText></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('c_contract_start')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'인도일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>계약 기본사항</Common.SubTitle>
				<ContractBasics/>
				<Controller
					control={control} name={'contract_special'} defaultValue={[]}
					render={({field})=>(<>
						<SpecialTitle>
							<Common.SubTitle>특약사항</Common.SubTitle>
							<YellowBorderBtn onPress={()=>{navigation.navigate('contractSpecial',{onChange: field.onChange, contract_special:getValues('contract_special')})}}>
								<Common.TextMedium14> 등록</Common.TextMedium14>
							</YellowBorderBtn>
						</SpecialTitle>
						{field?.value?.map((item,index)=>{
							if(!codes?.special_agreement) return null;
							const target = _.find(codes.special_agreement,i=>i.value==item)
							return (
								<SpecialContract key={item}>
									<SContractHeader>
										<Common.TextSemiBold14>{target.label}</Common.TextSemiBold14><CloseIcon />
									</SContractHeader>
									<SContractCont>
										<Common.TextLight14 paragraph>{target.content}</Common.TextLight14>
									</SContractCont>
								</SpecialContract>
							)
						})}
					</>)}
				/> 
				<Controller
					control={control} name={'c_additional_special_contract'} defaultValue=''
					render={({field})=>(<>
						<Common.SubTitle>추가 특약사항</Common.SubTitle>
						<SpecialContractInput placeholder={'추가 특약사항 입력'} multiline={true} value={field.value} onChangeText={field.onChange} />
					</>)}
				/>
				<Controller control={control} name={'c_contract_type'} defaultValue='sales' render={()=>(<></>)}/>
				<AlertBox>
					<InfoAert source={require('../../assets/img/drawable-xhdpi/icon_alert.png')} />
					<AlertBoxText>전자계약은 반드시 매수자(임차인)와사전에 합의를 하신 후 진행하셔야 합니다.</AlertBoxText>
				</AlertBox>				
			</Common.ScrollContainer>
			<Common.FloatBtn onPress={handleSubmit(onValid, onInvalid)}>
				<Common.TextSemiBold18>계약서 작성 신청</Common.TextSemiBold18>
			</Common.FloatBtn>			
		</Common.ZipandaSafeView>
	</>)
}

const pickerStyle = {
	inputIOS: {
		color: '#000000',
		height: 34,
		fontSize: 14,
		paddingHorizontal: 0,
	},
	inputAndroid: {
		width: '100%',
		color: '#000000',
		fontSize: 14,
		padding: 0,
		height: 34,
		lineHeight: 34,
		backgroundColor: Colors.whiteColor,
	},
};

export default ContractSalesScreen