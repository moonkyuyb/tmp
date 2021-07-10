/* COMMON */
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useSelector } from "react-redux";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

/* UTILS */
import { Controller, useForm } from "react-hook-form";
import _ from "lodash";

/* UI COMPONENTS */
import Colors from "../../../assets/colors";
import * as Common from "../../styled/commonStyle";
import { YellowViewBorder, GreyViewBorder, ViewBorderY, YellowLabel, BorderYInnerBox, Btn02Box, YTextInput, UnitTit,
	DatePickerIcons, SpecialTitle, SpecialContract, YellowBorderBtn, SContractHeader, SContractCont, SpecialContractInput,
	ContractInfoHeader, InfoAert } from '../../styled/provContractStyle';
import { ModalPopup } from "../../container/commonContainer";
import { RequiredS } from "../../styled/sales/salesDirectCommonStyle";
import ContractBasics from "../../components/provContract/provContractBasics";

//XXX: 임시
const testSId = 256
const testMIdLessor = 2
const testMIdTenants = 32

const ProvContractPayment3Screen = ({
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
		console.log(`✅임대차계약서 작성완료`);
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
			"pc_trading_price", "pc_deposit", "pc_monthly", "pc_downpayment", "pc_downpayment_datetime",
			"pc_middlepayment_datetime", "pc_balance", "pc_balance_datetime", "pc_contract_start", "pc_contract_end"
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
			// if(salesDetail[0]?.s_contract_start)setValue('pc_contract_start',salesDetail[0].s_contract_start.toString());
			// if(salesDetail[0]?.s_contract_end)	setValue('pc_contract_end',salesDetail[0].s_contract_end.toString());
		}
	},[salesDetail])

	useEffect(()=>{ 
		if(uploadComplete) {
			showAlertMessage('신청이 완료되었습니다.')
			navigation.navigate('index')
		}
	},[uploadComplete])

	//UI COMPONENTS
	const DatePickerIcon= () => (<DatePickerIcons source={require('./../../../assets/img/drawable-xhdpi/bt_calendar.png')}/>)
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
				<Common.SubTitle>토지</Common.SubTitle>
				<ViewBorderY>
					<YellowLabel><Common.TextLight12>지목</Common.TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.TextLight12>-</Common.TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><Common.TextLight12>면적</Common.TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.TextLight12>{0}m³</Common.TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>

				<Common.SubTitle>건물</Common.SubTitle>
				<ViewBorderY>
					<YellowLabel><Common.TextLight12>구조</Common.TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.TextLight12>{salesDetail[0]?.sale_type||''}</Common.TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><Common.TextLight12>용도</Common.TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.TextLight12>{salesDetail[0]?.building_type||''}</Common.TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>
				<ViewBorderY>
					<YellowLabel><Common.TextLight12>면적</Common.TextLight12></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.TextLight12>{salesDetail[0]?.s_supply_area_m||''}m³</Common.TextLight12>
					</BorderYInnerBox>
				</ViewBorderY>

				<Controller
					control={control} name={'pc_deposit'} defaultValue='50000000'
					rules={{required:{value:salesDetail[0]?.s_price_type!='sales'?true:false, message:'보증금을 입력해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>보증금<Required/></Common.SubTitle>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>금액</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_monthly'} defaultValue='5000000'
					rules={{required:{value:true, message:'월세를 입력해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>월세<Required/></Common.SubTitle>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>금액</Common.TextLight12></YellowLabel>
							<BorderYInnerBox>
								<YTextInput placeholder={'금액 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>원</UnitTit>
							</BorderYInnerBox>
						</ViewBorderY>
					</>)}
				/>

				<Controller
					control={control} name={'pc_downpayment'} defaultValue='5000000'
					rules={{required:{value:true, message:'계약금을 입력해주세요'}}}
					render={({field})=>(<>
						<Common.SubTitle>계약금<Required/></Common.SubTitle>
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
									<YTextInput placeholder={'지불일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DatePickerIcon/>
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
									<YTextInput placeholder={'지불일 선택'} editable={false} value={middlePaymentRequired?field.value:''} onChangeText={field.onChange}/><DatePickerIcon/>
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
									<YTextInput placeholder={'지불일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DatePickerIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Common.SubTitle>임대기간<Required/></Common.SubTitle>
				<Controller
					control={control} name={'pc_contract_start'} defaultValue='2020-1-1'
					rules={{required:{value:salesDetail[0]?.s_price_type!='sales'?true:false, message:'임대시작일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>시작일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('pc_contract_start')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'임대시작일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DatePickerIcon/>
								</BorderYInnerBox>
							</TouchableOpacity>
						</ViewBorderY>
					</>)}
				/>
				<Controller
					control={control} name={'pc_contract_end'} defaultValue='2020-1-1'
					rules={{required:{value:salesDetail[0]?.s_price_type!='sales'?true:false, message:'임대종료일을 선택해주세요'}}}
					render={({field})=>(<>
						<ViewBorderY>
							<YellowLabel><Common.TextLight12>종료일</Common.TextLight12></YellowLabel>
							<TouchableOpacity style={{flex:1}} onPress={()=>{
								setTargetValue('pc_contract_end')
								setShowDatePicker(true)
							}}>
								<BorderYInnerBox>
									<YTextInput placeholder={'임대종료일 선택'} editable={false} value={field.value} onChangeText={field.onChange}/><DatePickerIcon/>
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
										<CloseIcon />
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
					control={control} name={'pc_additional_special'} defaultValue=''
					render={({field})=>(<>
						<Common.SubTitle>추가 특약사항</Common.SubTitle>
						<SpecialContractInput placeholder={'추가 특약사항 입력'} multiline={true} value={field.value} onChangeText={field.onChange} />
					</>)}
				/>
				<Btn02Box>
					<ContractInfoHeader>
						<InfoAert source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
						<Common.TextLight12 whiteTit>전자계약은 반드시 매수자(임차인)와사전에 합의를 하신 후 진행하셔야 합니다.</Common.TextLight12>
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

export default ProvContractPayment3Screen