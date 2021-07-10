/* COMMON */
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

/* UTILS */
import _ from "lodash";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { getCodes } from "../reducers/codeReducer";
import { getContractForChat } from "../reducers/chatReducer";

/* UI COMPONENTS */
import Colors from "./../../assets/colors";
import * as Common from "./../styled/commonStyle";
import { ViewBorderY, YellowLabel, YellowLabelText, BorderYInnerBox, YTextInput, UnitTit,  SpecialTitle, SpecialContract, YellowBorderBtn, 
	SContractHeader, SContractCont, SpecialContractInput, AlertBox, InfoAert, AlertBoxText, ContractRadioBox } from './../styled/chatContractStyle/contractStyle';
import { ModalPopup } from "./../container/commonContainer";
import { DateTextTextL, RequiredS } from "./../styled/sales/salesDirectCommonStyle";
import { CloseIcon } from "../components/common/header";
import { DateIcon } from "./../components/common/DateIcon";
import ContractBasics from "./../components/provContract/provContractBasics";
import FlexRowRadioBox from "./../components/common/FlexRowRadioBox";
import { FromArrowIcon } from "./../components/common/ArrowIcon";
import { StackActions } from "@react-navigation/native";

/* CONSTANTS */
const testSId = 365, testMIdLessor = 2, testMIdTenants = 34

const ContractBusinessScreen = ({
	c_id, s_id, m_id_lessor, m_id_tenants, salesForContract: sales,  contractPosted,
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
	const [mortgageRequired, setMortgageRequired] = useState(false)
	const [middlePaymentRequired, setMiddlePaymentRequired] = useState(false)
	const [needMonthlyPayday, setNeedMontlyPayday] = useState(false) 

	
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
		// if(!s_id) navigation.dispatch(StackActions.pop(3)) //실제 서비스
		const initState = { s_id: s_id?s_id:testSId, m_id_lessor: m_id_lessor?m_id_lessor:testMIdLessor, m_id_tenants:m_id_tenants?m_id_tenants:testMIdTenants }
		console.log(`[💬CONTRACT BUSINESS SCREEN] ${s_id?'HAS CONTRACT STATUS':'🟥USE TEST DATA(실제 서비스 시에는 pop(1))'}`);
		console.log(`[💬CONTRACT BUSINESS SCREEN] s_id: ${initState.s_id}, m_id_lessor: ${initState.m_id_lessor}, m_id_tenants: ${initState.m_id_tenants}`);
		setContractState(initState)
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		console.log(`[💬CONTRACT BUSINESS SCREEN] GET code, salesForContract: ${s_id}`)
		if(!codes.special_agreement || codes.special_agreement.length<=0) dispatch(getCodes('special_agreement'))
		if(!codes.businessLessor_bd || codes.businessLessor_bd.length<=0) dispatch(getCodes('businessLessor_bd'))
		if(!codes.businessLessor_ls || codes.businessLessor_ls.length<=0) dispatch(getCodes('businessLessor_ls'))
		getSalesForContract({s_id:s_id})
	}},[loaded])

	useEffect(()=>{if(sales&&!_.isEmpty(sales)){
		console.log(`[💬CONTRACT BUSINESS SCREEN] SET salesForContract DATA. salesForContract⏬`)
		console.log(sales)
		if(sales.s_deposit) setValue('c_deposit', (sales.s_deposit*10000).toString())
		if(sales.s_monthly_rent > 0) setNeedMontlyPayday(true)
		if(sales.s_monthly_rent > 0) setValue('c_monthly', (sales.s_monthly_rent*10000).toString())
		if(sales.s_contract_start) setValue('c_contract_start', moment(sales.s_contract_start).format('Y-M-D'))
		if(sales.s_contract_end) setValue('c_contract_end', moment(sales.s_contract_end).format('Y-M-D'))
		// if(sales.s_address_street1) setValue('c_building_address', `${sales.s_address_street1} ${sales.s_address_street2}`)
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
	const CloseIcon= () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_close_s.png')}/>)
	const Required = () => (<RequiredS> *</RequiredS>)

	//RENDER SCREEN
	return(<>
		<Common.ZipandaSafeView>
			<ModalPopup/>
			<Modal isVisible={showDatePicker} style={{zIndex:500}}>
				<Common.View style={ {backgroundColor:'#ffffff'} }>
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
				</Common.View>
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
				<Controller control={control} name={'c_building_address'} render={({field})=>(<>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>주소</YellowLabelText></YellowLabel>
						<BorderYInnerBox TextNon>
							<Common.ViewBorderText>{field.value}</Common.ViewBorderText>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}/>

				<Controller
					control={control} name={'c_business_building_type'} defaultValue={'BD_TY_02'}
					rules={{required:{value:true, message:'주택유형을 선택해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>주택유형<Required/></Common.SubTitle>
						<Common.ViewBorder marginBN>
							<FromArrowIcon/>
							<RNPickerSelect
								value={field.value}
								onValueChange={(value) => { field.onChange(value) } }
								placeholder={{label: '주택유형 선택', value:''}}
								useNativeAndroidPickerStyle={false}
								fixAndroidTouchableBug={false}
								style={pickerStyle}
								items={codes.businessLessor_bd?codes.businessLessor_bd:[]}
							/>
						</Common.ViewBorder>
					</>)}
				/>
				<Common.SubTitle>민간임대주택면적<Required/></Common.SubTitle>
				<Controller
					control={control} name={'c_business_use_m'} defaultValue={'69.2'}
					rules={{required:{value:true, message:'주거전용면적을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel wide><YellowLabelText>주거전용면적</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'주거전용면적'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>m³</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_business_supply_m'} defaultValue={'28'}
					rules={{required:{value:true, message:'주거공용면적을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel wide><YellowLabelText>주거공용면적</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'주거공용면적'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>m³</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_business_extra_m'} defaultValue={'38.2'}
					rules={{required:{value:true, message:'그 밖의 공용면적을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel wide><YellowLabelText>그 밖의 공용면적</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'그 밖의 공용면적'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>m³</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_business_sum_m'} defaultValue={'153.3'}
					rules={{required:{value:true, message:'합계 면적을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel wide><YellowLabelText>합계</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'합계 면적'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>m³</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_business_lease_type'} defaultValue='LS_TY_02'
					rules={{required:{value:true, message:'주택종류를 선택해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>민간임대주택의 종류<Required/></Common.SubTitle>
						<Common.ViewBorder>
							<FromArrowIcon/>
							<RNPickerSelect
								value={field.value}
								onValueChange={(value) => { field.onChange(value) } }
								placeholder={{label: '주택유형 선택'}}
								useNativeAndroidPickerStyle={false}
								fixAndroidTouchableBug={false}
								style={pickerStyle}
								items={codes.businessLessor_ls?codes.businessLessor_ls:[]}
							/>
						</Common.ViewBorder>
					</>)}
				/>
				<Controller
					control={control} name={'c_business_gun_mae'} defaultValue='GM_TY_M'
					rules={{required:{value:true, message:'건설/매입 여부를 선택하세요'}}}
					render={({field})=>(<>
						<ContractRadioBox marginT>
							<Common.FlexRowBox>
								<Common.View marginR={8}>
									<FlexRowRadioBox onPress={()=>{field.onChange('GM_TY_G')}} value={field.value=='GM_TY_G'?true:false} title='건설'/>
								</Common.View>
								<Common.View>
									<FlexRowRadioBox onPress={()=>{field.onChange('GM_TY_M')}} value={field.value=='GM_TY_M'?true:false} title='매입'/>
								</Common.View>
							</Common.FlexRowBox>
						</ContractRadioBox>
					</>)}
				/>
			    <Controller
					control={control} name={'c_business_start_date'} defaultValue={'2020-10-21'}
					rules={{required:{value:true, message:'임대의무기간 개시일을 입력하세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>임대의무기간 개시일<Required/></Common.SubTitle>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>개시일</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<Common.TouchableOpacity style={{backgroundColor:'transparent', width:'100%', height:'100%'} } onPress={ () => {
									setTargetValue('c_business_start_date')
									setShowDatePicker(true)
								}}>
									<Common.ViewBorderText>{field.value?field.value:'개시일 선택'}</Common.ViewBorderText>
								</Common.TouchableOpacity>
								<DateIcon/>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_business_facilities'} defaultValue={''}
					render={({field})=>(<>
						<Common.SubTitle>민간 임대주택에 딸린 부대시설∙복리시설의 종류</Common.SubTitle>
						<SpecialContractInput marginBN placeholder='입력' multiline={true} value={field.value} onChangeText={value=>{field.onChange(value)}} />
					</>)}
				/>
				<Controller
					control={control} name={'c_business_right_yn'} defaultValue={true}
					rules={{required:{value:true, message:'권리관계 설정 여부를 선택하세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>선순위 담보권 등 권리관계 설정 여부<Required/></Common.SubTitle>
						<ContractRadioBox>
							<Common.FlexRowBox>
								<Common.View marginR={8}>
									<FlexRowRadioBox onPress={()=>{field.onChange(false); setMortgageRequired(false)}} value={!field.value?true:false} title='없음'/>
								</Common.View>
								<Common.View>
									<FlexRowRadioBox onPress={()=>{field.onChange(true); setMortgageRequired(true)}} value={field.value?true:false} title='있음'/>
								</Common.View>
							</Common.FlexRowBox>
						</ContractRadioBox>
					</>)}
				/>
				{mortgageRequired && (<>
					<Controller
						control={control} name={'c_business_right_type'} defaultValue='구글 검색?q=권리관계 뜻' shouldUnregister={true}
						rules={{required:{value:mortgageRequired, message:'권리관계를 입력하세요'}}}
						render={({field})=>(<>
							<Common.SubTitle>선순위 담보권 등 권리관계 종류<Required/></Common.SubTitle>
							<Common.InputBorder placeholder='선순위 담보권 등 권리관계 종류 입력' value={field.value} onChangeText={value=>{field.onChange(value)}} />
						</>)}
					/>
					<Controller
						control={control} name={'c_business_right_amt'} defaultValue='5000000' shouldUnregister={true}
						rules={{required:{value:mortgageRequired, message:'설정금액을 입력하세요'}}}
						render={({field})=>(<>
							<ViewBorderY>
								<YellowLabel><YellowLabelText>설정금액</YellowLabelText></YellowLabel>
								<BorderYInnerBox>
									<YTextInput placeholder={'설정금액'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
								</BorderYInnerBox>
							</ViewBorderY>
						</>)}
					/>
					<Controller
						control={control} name={'c_business_right_date'} defaultValue={'2020-01-01'} shouldUnregister={true}
						rules={{required:{value:mortgageRequired, message:'설정일자를 입력하세요'}}}
						render={({field})=>(<>
							<Common.SubTitle>설정일자<Required/></Common.SubTitle>
							<ViewBorderY>
								<YellowLabel><YellowLabelText>설정일자</YellowLabelText></YellowLabel>
								<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
									setTargetValue('c_business_right_date')
									setShowDatePicker(true)
								}}>
									<BorderYInnerBox marginBN>
										<YTextInput placeholder={'설정일자 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
									</BorderYInnerBox>
								</Common.TouchableOpacity>
							</ViewBorderY>
						</>)}
					/>
				</>)}

				<Controller
					control={control} name={'c_business_deposit_insu_yn'} defaultValue={true}
					rules={{required:{value:true, message:'임대보증금 보증 가입 여부를 선택하세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>임대보증금 보증 가입 여부<Required/></Common.SubTitle>
						<ContractRadioBox marginB>
							<Common.FlexRowBox>
								<Common.View marginR={8}>
									<FlexRowRadioBox onPress={()=>{field.onChange(false)}} value={field.value==false?true:false} title='의무 가입 대상 아님'/>
								</Common.View>
								<Common.View>
									<FlexRowRadioBox onPress={()=>{field.onChange(true)}} value={field.value==true?true:false} title='의무 가입 대상 임'/>
								</Common.View>
							</Common.FlexRowBox>
						</ContractRadioBox>
					</>)}
				/>
				<Controller
					control={control} name={'c_business_deposit_insu_amt'} defaultValue='5000000'
					rules={{required:{value:true, message:'보증대상금액을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>보증대상금액</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'보증대상금액'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>

				<Common.SubTitle>임대보증금<Required/></Common.SubTitle>
				<Controller
					control={control} name={'c_deposit'} defaultValue={'7000000'}
					rules={{required:{value:true, message:'보증금을 입력해주세요'}}}
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
					control={control} name={'c_business_deposit_over_rate'} defaultValue='0.5'
					rules={{required:{value:false, message:'연체이율을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>연체이율</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'연체이율 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>%</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_monthly'} defaultValue='10000000'
					rules={{required:{value:needMonthlyPayday, message:'월임대료를 입력해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>월임대료<Required/></Common.SubTitle>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>월임대료</YellowLabelText></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'월임대료 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>

				<Common.SubTitle>임대차 계약 기간<Required/></Common.SubTitle>
				<Controller
					control={control} name={'c_contract_start'} defaultValue='2020-1-1'
					rules={{required:{value:true, message:'임대시작일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><YellowLabelText>시작일</YellowLabelText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('c_contract_start')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'임대시작일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_contract_end'} defaultValue='2022-12-31'
					rules={{required:{value:true, message:'임대종료일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>종료일</YellowLabelText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('c_contract_end')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'임대종료일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>계약금<Required/></Common.SubTitle>
				<Controller
					control={control} name={'c_downpayment'} defaultValue='5000000'
					rules={{required:{value:true, message:'계약금을 입력해주세요'}}}
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
					control={control} name={'c_downpayment_datetime'} defaultValue='2020-1-1'
					rules={{required:{value:true, message:'계약금 지급일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>지불일</YellowLabelText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('c_downpayment_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>중도금</Common.SubTitle>
				<Controller
					control={control} name={'pc_middlepayment'} defaultValue=''
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
					control={control} name={'pc_middlepayment_datetime'} defaultValue=''
					rules={{required:{value:middlePaymentRequired, message:'중도금 지급일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY marginBN>
							<YellowLabel><YellowLabelText>지불일</YellowLabelText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} disabled={!middlePaymentRequired} onPress={()=>{
								setTargetValue('pc_middlepayment_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={middlePaymentRequired?field.value:''} onChangeText={field.onChange}/><DateIcon/>
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
						<ViewBorderY >
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
				<Common.SubTitle>입주일</Common.SubTitle>
				<Controller
					control={control} name={'c_move_in_start'} defaultValue='2020-1-1'
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><YellowLabelText>시작일</YellowLabelText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('c_move_in_start')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'입주 시작일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'c_move_in_end'} defaultValue='2020-1-1'
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><YellowLabelText>종료일</YellowLabelText></YellowLabel>
							<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('c_move_in_end')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'입주 종료일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</Common.TouchableOpacity>
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
				<Controller control={control} name={'c_contract_type'} defaultValue='business' render={()=>(<></>)}/>
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

export default ContractBusinessScreen