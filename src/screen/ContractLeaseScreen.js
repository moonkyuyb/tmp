/* COMMON */
import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackActions } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/core";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";

/* UTILS */
import _ from "lodash";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { getCodes } from "../reducers/codeReducer";
import { getContractForChat } from "../reducers/chatReducer";

/* UI COMPONENTS */
import Colors from './../../assets/colors';
import * as Common from "../styled/commonStyle";
import { ModalPopup } from "../container/commonContainer";
import { RequiredS } from "../styled/sales/salesDirectCommonStyle";
import { DateIcon } from "./../components/common/DateIcon";
import { ViewBorderY, YellowLabel, YellowLabelText, BorderYInnerBox, YTextInput, UnitTit, SpecialTitle, SpecialContract, YellowBorderBtn, SContractHeader, SContractCont, SpecialContractInput,
	AlertBox, AlertBoxText, InfoAert } from '../styled/chatContractStyle/contractStyle';
import ContractBasics from "../components/provContract/provContractBasics";
import { FromArrowIcon } from "../components/common/ArrowIcon";
import { TextInput } from "react-native";

/* CONSTANTS */
const testSId = 361, testMIdLessor = 2, testMIdTenants = 34

const ContractPaymentLeaseScreen = ({
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
	const [middlePaymentRequired, setMiddlePaymentRequired] = useState(false)
	const [needMonthlyPayday, setNeedMontlyPayday] = useState(false) 

	//REACT HOOK FORM
	const { control, handleSubmit, setValue, getValues } = useForm()
	const onValid = (data) => {
		console.log(`[????CONTRACT PAYMENT SCREEN] VALIDATON SUCCESS: data???`)
		console.log(data)
		const payload = Object.assign({},contractState, data)
		handleContractPayment(payload)
	}
	const onInvalid = (err) => {
		console.log(`[????CONTRACT PAYMENT SCREEN] VALIDATON FAIL`);
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
				showAlertMessage(`?????? ?????? ????????? ?????? ??????????????????.`)
			}
		}
	}
	//HANDLE EFFECT
	useEffect(()=>{
		//if(!s_id) navigation.dispatch(StackActions.pop(3)) //?????? ?????????
		const initState = { s_id: s_id?s_id:testSId, m_id_lessor: m_id_lessor?m_id_lessor:testMIdLessor, m_id_tenants:m_id_tenants?m_id_tenants:testMIdTenants }
		console.log(`[????CONTRACT LEASE SCREEN] ${s_id?'HAS CONTRACT STATUS':'????USE TEST DATA(?????? ????????? ????????? pop(1))'}`);
		console.log(`[????CONTRACT LEASE SCREEN] s_id: ${initState.s_id}, m_id_lessor: ${initState.m_id_lessor}, m_id_tenants: ${initState.m_id_tenants}`);
		setContractState(initState)
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		console.log(`[????CONTRACT LEASE SCREEN] GET code, salesForContract: ${s_id}`)
		if(!codes.special_agreement || codes.special_agreement.length<=0) dispatch(getCodes('special_agreement'))
		getSalesForContract({s_id:s_id})
	}},[loaded])

	useEffect(()=>{if(sales&&!_.isEmpty(sales)){
		console.log(`[????CONTRACT LEASE SCREEN] SET salesForContract DATA. salesForContract???`)
		console.log(sales)
		if(sales.s_deposit) setValue('c_deposit', (sales.s_deposit*10000).toString())
		if(sales.s_address_street1) setValue('c_building_address', `${sales.s_address_street1} ${sales.s_address_street2}`)
		if(sales.s_contract_start) setValue('c_contract_start', moment(sales.s_contract_start).format('Y-M-D'))
		if(sales.s_contract_end) setValue('c_contract_end', moment(sales.s_contract_end).format('Y-M-D'))
		if(sales.s_monthly_rent > 0) setNeedMontlyPayday(true)
		if(sales.s_monthly_rent > 0) setValue('c_monthly', (sales.s_monthly_rent*10000).toString())
	}},[sales])

	useEffect(()=>{if(contractSaved){
		setContractState({contractSaved:false})
		postContract(contractState)
	}},[contractSaved])

	useEffect(()=>{if(contractPosted){
		setContractState({contractPosted:false})
		console.log(`[????CONTRACT LEASE SCREEN] contractPosted ?????????????????????.`)
		showAlertMessage(`?????????????????????.`)
		dispatch(getContractForChat({c_id:c_id}))
		navigation.dispatch(StackActions.pop(3))
	}},[contractPosted])

	//UI COMPONENTS
	const CloseIcon= () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_close_s.png')}/>)
	const Required = () => (<RequiredS> *</RequiredS>)

	//RENDER SCREEN
	return (<>
		<Common.ZipandaSafeView>
			<ModalPopup/>
			<Modal isVisible={showDatePicker} style={{zIndex:500}}>
				<View style={ {backgroundColor:'#ffffff'} }>
					<RNDateTimePicker
						value={pickedDate}
						style={{zIndex:1000}}
						mode={"date"} is24Hour={true} display="default" testID="dateTimePicker"
						onChange={(event, selectedDate) => {
							console.log(`???EVENT`);
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
			{/* <Button title="TEST" onPress={()=>{console.log(contractJoint);}}/>
			<Button title="TEST2" onPress={()=>{console.log(getValues('c_building_address'));}}/> */}
			<Common.TitleBox><Common.Title>???????????? ?????? ?????? ??????</Common.Title></Common.TitleBox>

			<Common.SubTitle>??????</Common.SubTitle>
			<Common.ViewBorder marginBN bgColor={Colors.mainColor} borderColor={Colors.blackColor}>
				<Common.ViewBorderText>{`????????? ${sales.price_type||''} ?????????`}</Common.ViewBorderText>
			</Common.ViewBorder>

			<Common.SubTitle>?????????</Common.SubTitle>
			<Common.ViewBorder marginBN bgColor={Colors.bgColor}>
				<Common.ViewBorderText>{`${sales.location1||''} ${sales.location2||''} ${sales.location3||''}`}</Common.ViewBorderText>
			</Common.ViewBorder>

			<Common.SubTitle>??????</Common.SubTitle>
			<ViewBorderY bgColor={Colors.bgColor}>
				<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
				<BorderYInnerBox TextNon>
					<Common.ViewBorderText>-</Common.ViewBorderText>
				</BorderYInnerBox>
			</ViewBorderY>
			<ViewBorderY marginBN>
				<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
				<BorderYInnerBox TextNon>
					<Common.ViewBorderText>{0}m??</Common.ViewBorderText>
				</BorderYInnerBox>
			</ViewBorderY>

			<Common.SubTitle>??????</Common.SubTitle>
			<ViewBorderY>
				<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
				<BorderYInnerBox TextNon>
					<Common.ViewBorderText>{sales.sale_type||''}</Common.ViewBorderText>
				</BorderYInnerBox>
			</ViewBorderY>
			<ViewBorderY>
				<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
				<BorderYInnerBox TextNon>
					<Common.ViewBorderText>{sales.building_type||''}</Common.ViewBorderText>
				</BorderYInnerBox>
			</ViewBorderY>
			<ViewBorderY>
				<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
				<BorderYInnerBox TextNon>
					<Common.ViewBorderText>{sales.s_supply_area_m||''}m??</Common.ViewBorderText>
				</BorderYInnerBox>
			</ViewBorderY>
			<Controller control={control} name={'c_building_address'} render={({field})=>(<>
				<ViewBorderY>
					<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
					<BorderYInnerBox TextNon>
						<Common.ViewBorderText>{field.value}</Common.ViewBorderText>
					</BorderYInnerBox>
				</ViewBorderY>
			</>)}/>
			<Controller
				control={control} name={'c_rentpart'} defaultValue='????????? ??????'
				rules={{required:{value:true, message:'?????????????????? ??????????????????'}}}
				render={({field})=>(<>
				<ViewBorderY marginBN>
					<YellowLabel><YellowLabelText>???????????????</YellowLabelText></YellowLabel>
					<BorderYInnerBox>
						<YTextInput placeholder={'??????????????? ??????'} value={field.value} onChangeText={value=>{field.onChange(value)}}/>
					</BorderYInnerBox>
				</ViewBorderY>
			</>)}/>

			<Controller
				control={control} name={'c_deposit'} defaultValue='50000000'
				rules={{required:{value:sales.s_price_type!='sales'?true:false, message:'???????????? ??????????????????'}}}
				render={({field})=>(<>
					<Common.SubTitle>?????????<Required/></Common.SubTitle>
					<ViewBorderY marginBN>
						<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
						<BorderYInnerBox>
							<YTextInput placeholder={'?????? ??????'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>???</UnitTit>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}
			/>
			 <Controller
				control={control} name={'c_downpayment'} defaultValue='5000000'
				rules={{required:{value:true, message:'???????????? ??????????????????'}}}
				render={({field})=>(<>
					<Common.SubTitle>?????????<Required/></Common.SubTitle>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
						<BorderYInnerBox>
							<YTextInput placeholder={'?????? ??????'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>???</UnitTit>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}
			/>
			<Controller
				control={control} name={'c_downpayment_datetime'} defaultValue='2020-1-1'
				rules={{required:{value:true, message:'????????? ???????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY marginBN>
						<YellowLabel><YellowLabelText>?????????</YellowLabelText></YellowLabel>
						<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
							setTargetValue('c_downpayment_datetime')
							setShowDatePicker(true)
						}}>
							<BorderYInnerBox marginBN>
								<YTextInput placeholder={'????????? ??????'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
							</BorderYInnerBox>
						</Common.TouchableOpacity>
					</ViewBorderY>
				</>)}
			/>
			<Common.SubTitle>?????????</Common.SubTitle>
			<Controller
				control={control} name={'c_middlepayment'} defaultValue=''
				rules={{required:{value:middlePaymentRequired, message:'???????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
						<BorderYInnerBox>
							<YTextInput placeholder={'?????? ??????'} value={field.value} onChangeText={value=>{
								setMiddlePaymentRequired(value?true:false)
								field.onChange(value)
							}}/><UnitTit>???</UnitTit>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}
			/>
			<Controller
				control={control} name={'c_middlepayment_datetime'} defaultValue=''
				rules={{required:{value:middlePaymentRequired, message:'????????? ???????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY marginBN>
						<YellowLabel><Common.ViewBorderText>?????????</Common.ViewBorderText></YellowLabel>
						<Common.TouchableOpacity style={{flex:1}} disabled={!middlePaymentRequired} onPress={()=>{
							setTargetValue('c_middlepayment_datetime')
							setShowDatePicker(true)
						}}>
							<BorderYInnerBox>
								<YTextInput placeholder={'????????? ??????'} editable={false} value={middlePaymentRequired?field.value:''} onChangeText={field.onChange}/><DateIcon/>
							</BorderYInnerBox>
						</Common.TouchableOpacity>
					</ViewBorderY>
				</>)}
			/>
			<Common.SubTitle>??????<Required/></Common.SubTitle>
			<Controller
				control={control} name={'c_balance'} defaultValue='5000000'
				rules={{required:{value:true, message:'????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
						<BorderYInnerBox>
							<YTextInput placeholder={'?????? ??????'} value={field.value} onChangeText={value=>{field.onChange(value)}}/><UnitTit>???</UnitTit>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}
			/>
			<Controller
				control={control} name={'c_balance_datetime'} defaultValue='2020-1-1'
				rules={{required:{value:true, message:'?????? ???????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY marginBN>
						<YellowLabel><YellowLabelText>?????????</YellowLabelText></YellowLabel>
						<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
							setTargetValue('c_balance_datetime')
							setShowDatePicker(true)
						}}>
							<BorderYInnerBox>
								<YTextInput placeholder={'????????? ??????'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
							</BorderYInnerBox>
						</Common.TouchableOpacity>
					</ViewBorderY>
				</>)}
			/>
			<Common.SubTitle>????????????<Required/></Common.SubTitle>
			<Controller
				control={control} name={'c_contract_start'} defaultValue='2020-1-1'
				rules={{required:{value:sales.s_price_type!='sales'?true:false, message:'?????????????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>?????????</YellowLabelText></YellowLabel>
						<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
							setTargetValue('c_contract_start')
							setShowDatePicker(true)
						}}>
							<BorderYInnerBox>
								<YTextInput placeholder={'??????????????? ??????'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
							</BorderYInnerBox>
						</Common.TouchableOpacity>
					</ViewBorderY>
				</>)}
			/>
			<Controller
				control={control} name={'c_contract_end'} defaultValue='2020-1-1'
				rules={{required:{value:sales.s_price_type!='sales'?true:false, message:'?????????????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY marginBN>
						<YellowLabel><YellowLabelText>?????????</YellowLabelText></YellowLabel>
						<Common.TouchableOpacity style={{flex:1}} onPress={()=>{
							setTargetValue('c_contract_end')
							setShowDatePicker(true)
						}}>
							<BorderYInnerBox>
								<YTextInput placeholder={'??????????????? ??????'} editable={false} value={field.value} onChangeText={field.onChange}/><DateIcon/>
							</BorderYInnerBox>
						</Common.TouchableOpacity>
					</ViewBorderY>
				</>)}
			/>
			
			{needMonthlyPayday&&(<>
			<Common.SubTitle>??????<Required/></Common.SubTitle>
			<Controller
				control={control} name={'c_monthly'} defaultValue='300000'
				rules={{required:{value:needMonthlyPayday, message:'????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>??????</YellowLabelText></YellowLabel>
						<BorderYInnerBox style={{flexDirection:'row', padding:0}}>
							<YTextInput 
								style={{ textAlign:'right'}}
								keyboardType = 'number-pad'
								placeholder={'?????? ??????'} value={field.value} onChangeText={value=>{if(value<=31){field.onChange(value)}else{field.onChange('')}}}
							/>
							<Text style={{flexBasis:50, textAlignVertical:'center', fontSize:14, textAlign:'right'}}>???</Text>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}
			/>
			<Controller
				control={control} name={'c_monthly_payday_type'} defaultValue='post'
				rules={{required:{value:needMonthlyPayday, message:'??????????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>????????????</YellowLabelText></YellowLabel>
						<BorderYInnerBox >
							<RNPickerSelect
								value={field.value}
								onValueChange={(value) => { field.onChange(value) } }
								placeholder={{label: '?????? ?????? ??????', value:''}}
								useNativeAndroidPickerStyle={false}
								fixAndroidTouchableBug={false}
								style={pickerStyle}
								items={[
									{label:'??????', value:'pre'},
									{label:'??????', value:'post'},
								]}
							/>
							<FromArrowIcon/>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}
			/>
			<Controller
				control={control} name={'c_monthly_payday'} defaultValue='5'
				rules={{required:{value:needMonthlyPayday, message:'?????????????????? ??????????????????'}}}
				render={({field})=>(<>
					<ViewBorderY>
						<YellowLabel><YellowLabelText>?????????</YellowLabelText></YellowLabel>
						<BorderYInnerBox style={{flexDirection:'row', padding:0}}>
							<Text style={{flexBasis:50, textAlignVertical:'center', fontSize:14, textAlign:'left'}}>??????</Text>
							<YTextInput 
								style={{ textAlign:'right'}}
								keyboardType = 'number-pad'
								maxLength = {2}
								placeholder={'????????? ??????'} value={field.value} onChangeText={value=>{if(value<=31){field.onChange(value)}else{field.onChange('')}}}
							/>
							<Text style={{flexBasis:50, textAlignVertical:'center', fontSize:14, textAlign:'right'}}>???</Text>
						</BorderYInnerBox>
					</ViewBorderY>
				</>)}
			/>
			</>)}

			<Common.SubTitle>?????? ????????????</Common.SubTitle>
			<ContractBasics/>
			<Controller
				control={control} name={'contract_special'} defaultValue={[]}
				render={({field})=>(<>
					<SpecialTitle>
						<Common.SubTitle>????????????</Common.SubTitle>
						<YellowBorderBtn onPress={()=>{navigation.navigate('contractSpecial',{onChange: field.onChange, contract_special:getValues('contract_special')})}}>
							<Common.TextMedium14> ??????</Common.TextMedium14>
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
					<Common.SubTitle>?????? ????????????</Common.SubTitle>
					<SpecialContractInput placeholder={'?????? ???????????? ??????'} multiline={true} value={field.value} onChangeText={field.onChange} />
				</>)}
			/>
			<Controller control={control} name={'c_contract_type'} defaultValue='lease' render={()=>(<></>)}/>
			<AlertBox>
				<InfoAert source={require('../../assets/img/drawable-xhdpi/icon_alert.png')} />
				<AlertBoxText>??????????????? ????????? ?????????(?????????)???????????? ????????? ?????? ??? ??????????????? ?????????.</AlertBoxText>
			</AlertBox>
		</Common.ScrollContainer>
	
		<Common.FloatBtn onPress={handleSubmit(onValid, onInvalid)}>
			<Common.TextSemiBold18>??? ????????? ?????? ??????</Common.TextSemiBold18>
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

export default ContractPaymentLeaseScreen