/* COMMON */
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

/* UTILS */
import { Controller, useForm } from "react-hook-form";
import _ from "lodash";

/* UI COMPONENTS */
import Colors from "../../../assets/colors";
import * as Common from "../../styled/commonStyle";
import { YellowViewBorder, GreyViewBorder, ViewBorderY, YellowLabel, BorderYInnerBox, Btn02Box, YTextInput, UnitTit,
	DateIcons, SpecialTitle, SpecialContract, YellowBorderBtn, SContractHeader, SContractCont, SpecialContractInput,
	ContractInfoHeader, InfoAert, ContractRadioBox } from '../../styled/provContractStyle';
import { ModalPopup } from "../../container/commonContainer";
import { DateTextTextL, RequiredS } from "../../styled/sales/salesDirectCommonStyle";
import ContractBasics from "../../components/provContract/provContractBasics";
import FlexRowRadioBox from "../../components/common/FlexRowRadioBox";
import ArrowIcon from "../../components/common/ArrowIcon";

//XXX: 임시
const testSId = 282
const testMIdLessor = 2
const testMIdTenants = 32

const ProvContractPayment1Screen = ({
	readyToUpload, uploadComplete, codes, salesDetail,
	selectedSalesId, selectedMIdLessor, selectedMIdTenants,
	saveProvContractData, uploadProvContractData,
	showAlertMessage, getSalesDetail, getCodes
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const currentState = useSelector(state=>state.provContractReducer)

	//CONSTANT
	const sId = selectedSalesId||testSId
	const mIdLessor = selectedMIdLessor||testMIdLessor
	const mIdTenants = selectedMIdTenants||testMIdTenants

	//UI STATE
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [pickedDate, setPickedDate] = useState(new Date())
	const [targetValue, setTargetValue] = useState('pc_downpayment_datetime')
	const [showIndicator, setShowIndicator] = useState(false)

	const [mortgageRequired, setMortgageRequired] = useState(false)
	const [middlePaymentRequired, setMiddlePaymentRequired] = useState(false)

	//REACT HOOK FORM
	const { control, handleSubmit, setValue, getValues } = useForm()
	const onValid = (data) => {
		console.log(`✅표준임대차계약서 작성완료`);
		const payload = Object.assign({},data)
		payload['s_id'] = sId
		payload['m_id_lessor'] = mIdLessor
		payload['m_id_tenants'] = mIdTenants
		payload['readyToUpload'] = true
		saveProvContractData(payload)
	}
	const onInvalid = (err) => {
		console.log(`⏬표준임대차계약서 VALIDATON FAIL`);
		console.log(err);
		const errList = [
			"pc_business_temp_01", "pc_business_temp_02", "pc_business_temp_03", "pc_business_temp_04",
			"pc_business_temp_05", "pc_business_temp_06", "pc_business_temp_07", "pc_business_temp_08",
			"pc_business_temp_09", "pc_business_temp_10", "pc_business_temp_11", "pc_business_temp_12",
			"pc_business_temp_13", "pc_business_temp_14", "pc_business_temp_15", "pc_business_temp_16",
			"pc_business_temp_17", "pc_business_temp_18", "pc_trading_price", "pc_deposit", "pc_monthly",
			"pc_downpayment", "pc_downpayment_datetime", "pc_middlepayment_datetime", "pc_balance",
			"pc_balance_datetime", "pc_contract_start", "pc_contract_end",
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

	//HANDLE EFFECTS
	useEffect(()=>{
		getSalesDetail(sId)
		getCodes('bank')
		getCodes('special_agreement')
	},[])

	useEffect(()=>{ if(readyToUpload) uploadProvContractData(currentState) },[readyToUpload])

	useEffect(()=>{
		if(salesDetail){
			if(salesDetail[0]?.s_deposit)		setValue('pc_deposit',salesDetail[0].s_deposit.toString());
			if(salesDetail[0]?.s_monthly)		setValue('pc_monthly',salesDetail[0].s_monthly.toString());
			if(salesDetail[0]?.s_contract_start)setValue('pc_contract_start',salesDetail[0].s_contract_start.toString());
			if(salesDetail[0]?.s_contract_end)	setValue('pc_contract_end',salesDetail[0].s_contract_end.toString());
		}
	},[salesDetail])
	
	useEffect(()=>{ 
		if(uploadComplete) {
			showAlertMessage('신청이 완료되었습니다.')
			navigation.navigate('index')
		}
	},[uploadComplete])

	//UI COMPONENTS
	const CloseIcon= () => (<Common.Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_close_s.png')}/>)
	const Required = () => (<RequiredS> *</RequiredS>)

	//RENDER SCREEN
	return (<>
		<Common.Container>
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
			<Common.ScrollContainer20B>
				<Common.TitleBox><Common.Title>가계약서 신청 정보 입력</Common.Title></Common.TitleBox>
				<Common.SubTitle>분류</Common.SubTitle>
				<YellowViewBorder><Common.TextLight12>{`부동산 ${salesDetail[0]?.price_type||''} 계약서`}</Common.TextLight12></YellowViewBorder>
				<Common.SubTitle>소재지</Common.SubTitle>
				<GreyViewBorder><Common.TextLight12>{`${salesDetail[0]?.location1||''} ${salesDetail[0]?.location2||''} ${salesDetail[0]?.location3||''}`}</Common.TextLight12></GreyViewBorder>

				<Controller
					control={control} name={'pc_business_temp_01'} defaultValue={'3'}
					rules={{required:{value:true, message:'주택유형을 선택해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>주택유형<Required/></Common.SubTitle>
						<Common.ViewBorderRNPicker>
							<ArrowIcon/>
							<RNPickerSelect
								value={field.value}
								onValueChange={(value) => { field.onChange(value) } }
								placeholder={{label: '주택유형 선택', value:''}}
								useNativeAndroidPickerStyle={false}
								fixAndroidTouchableBug={false}
								style={pickerStyle}
								items={[
									{label:'아파트', value:'1'},
									{label:'연립 주택', value:'2'},
									{label:'다세대 주택', value:'3'},
									{label:'다가구 주택', value:'4'},
									{label:'그 밖의 주택', value:'5'},
								]}
							/>
						</Common.ViewBorderRNPicker>
					</>)}
				/>

				<Common.SubTitle>민간임대주택면적<Required/></Common.SubTitle>
				<Controller
					control={control} name={'pc_business_temp_02'} defaultValue={'69.2'}
					rules={{required:{value:true, message:'주거전용면적을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel wide><Common.TextLight12>주거전용면적</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'주거전용면적'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>m³</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_03'} defaultValue={'28'}
					rules={{required:{value:true, message:'주거공용면적을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel wide><Common.TextLight12>주거공용면적</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'주거공용면적'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>m³</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_04'} defaultValue={'38.2'}
					rules={{required:{value:true, message:'그 밖의 공용면적을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel wide><Common.TextLight12>그 밖의 공용면적</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'그 밖의 공용면적'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>m³</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_05'} defaultValue={'153.3'}
					rules={{required:{value:true, message:'합계 면적을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel wide><Common.TextLight12>합계</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'합계 면적'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>m³</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_06'} defaultValue={'2'}
					rules={{required:{value:true, message:'주택종류를 선택해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>민간임대주택의 종류<Required/></Common.SubTitle>
						<Common.ViewBorderRNPicker>
							<ArrowIcon/>
							<RNPickerSelect
								value={field.value}
								onValueChange={(value) => { field.onChange(value) } }
								placeholder={{label: '주택유형 선택'}}
								useNativeAndroidPickerStyle={false}
								fixAndroidTouchableBug={false}
								style={pickerStyle}
								items={[
									{label:'공공지원(임대의무기간: 8년)', value:'1'},
									{label:'장기일반(임대의무기간: 8년)', value:'2'},
									{label:'단기(임대의무기간: 4년)', value:'3'},
									{label:'3년 단기임대주택', value:'4'},
									{label:'5년 단기임대주택', value:'5'},
									{label:'10년 준공공임대주택', value:'6'},
									{label:'8년 준공공임대주택', value:'7'},
									{label:'기업형임대주택', value:'8'},
								]}
							/>
						</Common.ViewBorderRNPicker>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_07'} defaultValue={'1'}
					rules={{required:{value:true, message:'건설/매입 여부를 선택하세요'}}}
					render={({field})=>(<>
						<ContractRadioBox marginT>
							<Common.FlexRowBox>
								<Common.FlexQuarter><FlexRowRadioBox onPress={()=>{field.onChange('1')}} value={field.value==1?true:false} title='건설'/></Common.FlexQuarter>
								<Common.FlexQuarter><FlexRowRadioBox onPress={()=>{field.onChange('2')}} value={field.value==2?true:false} title='매입'/></Common.FlexQuarter>
							</Common.FlexRowBox>
						</ContractRadioBox>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_08'} defaultValue={'2020-10-21'}
					rules={{required:{value:true, message:'임대의무기간 개시일을 입력하세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>임대의무기간 개시일<Required/></Common.SubTitle>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>개시일</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<TouchableOpacity style={{backgroundColor:'transparent', width:'100%', height:'100%'} } onPress={ () => {
									setTargetValue('pc_business_temp_08')
									setShowDatePicker(true)
								}}>
									<DateTextTextL>{field.value?field.value:'개시일 선택'}</DateTextTextL>
								</TouchableOpacity>
								<DateIcon source={require('../../../assets/img/drawable-xhdpi/bt_calendar.png')}  />
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_09'} defaultValue={''}
					render={({field})=>(<>
						<Common.SubTitle>민간 임대주택에 딸린 부대시설∙복리시설의 종류</Common.SubTitle>
						<SpecialContractInput placeholder='입력' multiline={true} value={field.value} onChangeText={value=>{field.onChange(value)}} />
					</>)}
				/>

				<Controller
					control={control} name={'pc_business_temp_10'} defaultValue={'1'}
					rules={{required:{value:true, message:'권리관계 설정 여부를 선택하세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>선순위 담보권 등 권리관계 설정 여부<Required/></Common.SubTitle>
						<ContractRadioBox marginT>
							<Common.FlexRowBox>
								<Common.FlexQuarter><FlexRowRadioBox onPress={()=>{field.onChange('1'); setMortgageRequired(false)}} value={field.value==1?true:false} title='없음'/></Common.FlexQuarter>
								<Common.FlexQuarter><FlexRowRadioBox onPress={()=>{field.onChange('2'); setMortgageRequired(true)}} value={field.value==2?true:false} title='있음'/></Common.FlexQuarter>
							</Common.FlexRowBox>
						</ContractRadioBox>
					</>)}
				/>

				{mortgageRequired && (<>
					<Controller
						control={control} name={'pc_business_temp_11'} defaultValue={''} shouldUnregister={true}
						rules={{required:{value:mortgageRequired, message:'권리관계를 입력하세요'}}}
						render={({field})=>(<>
							<Common.SubTitle>선순위 담보권 등 권리관계 종류<Required/></Common.SubTitle>
							<Common.InputBorder placeholder='선순위 담보권 등 권리관계 종류 입력' value={field.value} onChangeText={value=>{field.onChange(value)}} />
						</>)}
					/>
					<Controller
						control={control} name={'pc_business_temp_12'} defaultValue={'5000000'} shouldUnregister={true}
						rules={{required:{value:mortgageRequired, message:'설정금액을 입력하세요'}}}
						render={({field})=>(<>
							<ViewBorderY>
								<YellowLabel><Common.TextLight12>설정금액</Common.TextLight12></YellowLabel>
								<BorderYInnerBox>
									<YTextInput placeholder={'설정금액'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
								</BorderYInnerBox>
							</ViewBorderY>
						</>)}
					/>
					<Controller
						control={control} name={'pc_business_temp_13'} defaultValue={'2020-01-01'} shouldUnregister={true}
						rules={{required:{value:mortgageRequired, message:'설정일자를 입력하세요'}}}
						render={({field})=>(<>
							<Common.SubTitle>설정일자<Required/></Common.SubTitle>
							<ViewBorderY>
								<YellowLabel><Common.TextLight12>설정일자</Common.TextLight12></YellowLabel>
								<BorderYInnerBox>
									<TouchableOpacity style={{backgroundColor:'transparent', width:'100%', height:'100%'} } onPress={ () => {
										setTargetValue('pc_business_temp_13')
										setShowDatePicker(true)
									}}>
										<DateTextTextL>{field.value?field.value:'설정일자 선택'}</DateTextTextL>
									</TouchableOpacity>
									<DateIcon source={require('../../../assets/img/drawable-xhdpi/bt_calendar.png')}  />
								</BorderYInnerBox>
							</ViewBorderY>
						</>)}
					/>
				</>)}

				<Controller
					control={control} name={'pc_business_temp_14'} defaultValue={'1'}
					rules={{required:{value:true, message:'임대보증금 보증 가입 여부를 선택하세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>임대보증금 보증 가입 여부<Required/></Common.SubTitle>
						<ContractRadioBox marginB>
							<Common.FlexRowBox>
								<Common.FlexHalf><FlexRowRadioBox onPress={()=>{field.onChange('1')}} value={field.value=='1'?true:false} title='의무 가입 대상 아님'/></Common.FlexHalf>
								<Common.FlexHalf><FlexRowRadioBox onPress={()=>{field.onChange('2')}} value={field.value=='2'?true:false} title='의무 가입 대상 임'/></Common.FlexHalf>
							</Common.FlexRowBox>
						</ContractRadioBox>
					</>)}
				/>

				<Controller
					control={control} name={'pc_business_temp_15'} defaultValue={'50000'}
					rules={{required:{value:true, message:'보증대상금액을 입력하세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>보증대상금액</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'보증대상금액'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>

				<Common.SubTitle>임대보증금<Required/></Common.SubTitle>
				<Controller
					control={control} name={'pc_deposit'} defaultValue={'7000000'}
					rules={{required:{value:true, message:'보증금을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>금액</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_16'} defaultValue='0.5'
					rules={{required:{value:false, message:'연체이율을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>연체이율</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'연체이율 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>%</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_monthly'} defaultValue='50000000'
					rules={{required:{value:true, message:'월임대료를 입력해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>월임대료<Required/></Common.SubTitle>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>월임대료</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'월임대료 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>

				<Common.SubTitle>임대차 계약 기간<Required/></Common.SubTitle>
				<Controller
					control={control} name={'pc_contract_start'} defaultValue='2020-1-1'
					rules={{required:{value:true, message:'임대시작일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>시작일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('pc_contract_start')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'임대시작일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_contract_end'} defaultValue='2022-12-31'
					rules={{required:{value:true, message:'임대종료일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>종료일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('pc_contract_end')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'임대종료일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>계약금<Required/></Common.SubTitle>
				<Controller
					control={control} name={'pc_downpayment'} defaultValue='5000000'
					rules={{required:{value:true, message:'계약금을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>금액</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_downpayment_datetime'} defaultValue='2020-1-1'
					rules={{required:{value:true, message:'계약금 지급일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>지불일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('pc_downpayment_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>중도금</Common.SubTitle>
				<Controller
					control={control} name={'pc_middlepayment'} defaultValue=''
					rules={{required:{value:middlePaymentRequired, message:'중도금을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>금액</Common.TextLight12></YellowLabel>
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
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>지불일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} disabled={!middlePaymentRequired} onPress={()=>{
								setTargetValue('pc_middlepayment_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={middlePaymentRequired?field.value:''} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>잔금<Required/></Common.SubTitle>
				<Controller
					control={control} name={'pc_balance'} defaultValue='5000000'
					rules={{required:{value:true, message:'잔금을 입력해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>금액</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_balance_datetime'} defaultValue='2020-1-1'
					rules={{required:{value:true, message:'잔금 지급일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>지불일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('pc_balance_datetime')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'지불일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>입주일</Common.SubTitle>
				<Controller
					control={control} name={'pc_business_temp_17'} defaultValue='2020-1-1'
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>시작일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('pc_business_temp_17')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'입주 시작일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_business_temp_18'} defaultValue='2020-1-1'
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>종료일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('pc_business_temp_18')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'입주 종료일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>계약 기본사항</Common.SubTitle>
				<ContractBasics/>
				<Controller
					control={control} name={'provisonal_contract_special'} defaultValue={[]}
					render={({field})=>(<>
						<SpecialTitle>
							<Common.SubTitle>특약사항</Common.SubTitle>
							<YellowBorderBtn onPress={()=>{navigation.navigate('provContractSpecial',{onChange: field.onChange, provisonal_contract_special:getValues('provisonal_contract_special')})}}>
								<Common.Image14 source={require('../../../assets/img/drawable-xhdpi/icon_option.png')} />
								<Common.TextLight10> 등록</Common.TextLight10>
							</YellowBorderBtn>
						</SpecialTitle>
						{field?.value?.map((item,index)=>{
							if(!codes?.special_agreement) return null;
							const target = _.find(codes.special_agreement,i=>i.value==item)
							return (
								<SpecialContract key={item}>
									<SContractHeader>
										<Common.TextBold12>{target.label}</Common.TextBold12>
										<TouchableOpacity onPress={()=>{
											const newVal = Object.assign([],field.value)
											newVal.splice(index,1)
											field.onChange(newVal)
										}}>
											<CloseIcon />
										</TouchableOpacity>
									</SContractHeader>
									<SContractCont>
										<Common.TextLight11>{target.content}</Common.TextLight11>
									</SContractCont>
								</SpecialContract>
							)
						})}
					</>)}
				/>
				<Controller
					control={control} name={'pc_additional_special_contract'} defaultValue='1. 전세대출 실행 불가 시 계약금을 반환합니다. 등'
					render={({field})=>(<>
						<Common.SubTitle>추가 특약사항</Common.SubTitle>
						<SpecialContractInput placeholder={'추가 특약사항 입력'} multiline={true} value={field.value} onChangeText={field.onChange} />
					</>)}
				/>
				<Btn02Box>
					<ContractInfoHeader>
						<InfoAert source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
						<Common.TextLight12 whiteTit>가계약서 작성 신청 전에 잘못 입력된 정보가 있는지 다시한번 확인해 주십시오.</Common.TextLight12>
					</ContractInfoHeader>
				</Btn02Box>
			</Common.ScrollContainer20B>
			<Common.BottomBtnWrapper>
				<Common.BottomBtnYello onPress={handleSubmit(onValid, onInvalid)}>
					<Common.TextBold16>가 계약서 작성 신청</Common.TextBold16>
				</Common.BottomBtnYello>
			</Common.BottomBtnWrapper>
		</Common.Container>
	</>)
}

const pickerStyle = {
	inputIOS: {
		color: '#000000',
		height: 34,
		fontSize: 12,
		paddingHorizontal: 0,
	},
	inputAndroid: {
		width: '100%',
		color: '#000000',
		fontSize: 12,
		padding: 0,
		height: 34,
		lineHeight: 34,
		backgroundColor: Colors.whiteColor,
	},
};

export default ProvContractPayment1Screen