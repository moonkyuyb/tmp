/* ENVIRONMENTS */
import { LESSOR_MAX_COUNT } from "@env";

/* COMMON */
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StackActions } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";

/* UTIL */
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import { getCodes } from "../reducers/codeReducer";

/* UI COMPONENTS */
import Colors from "../../assets/colors";
import * as Common from "../styled/commonStyle";
import { BorderYInnerBox, Btn01Box, Contract01Btn, ContractBorder20, ContractBtnBox, ContractBtnText, ContractdelBtn, AlertBox, HeaderBox, YellowLabelText,	InfoAert, AlertBoxText,ViewBorderY, YellowLabel, YTextInput } from "../styled/chatContractStyle/contractStyle";
import { ModalPopup } from "../container/commonContainer";
import { FromArrowIcon } from "../components/common/ArrowIcon";

/* CONSTANTS */
const testSId = 278, testMIdLessor = 2, testMIdTenants = 32
const lessorMaxCount = LESSOR_MAX_COUNT ? LESSOR_MAX_COUNT : 5

const ContractLessorScreen = ({
	c_id, s_id, m_id_lessor, m_id_tenants, lessorForContract: lessor, contractJointSaved, contract, 
	setContractState, showAlertMessage, getContract, getLessorForContract, handleContractJoint, initContractState
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//REDUX CONSTANTS
	const codes = useSelector(state=>state.codeReducer.codes)
	const dispatch = useDispatch()

	//UI STATE
	const [loaded, setLoaded] = useState(false)
	const [activatedLessor, setActivatedLessor] = useState([0])
	const [sameAddressList, setSameAddressList] = useState([])
	const [sellerTypeStr, setSellerTypeStr] = useState('매도인')

	//HANDLE EFFECT
	useEffect(()=>{
		if(!c_id && !s_id) navigation.dispatch(StackActions.pop(1)) //실제 서비스
		const initState = { s_id: s_id?s_id:testSId, m_id_lessor: m_id_lessor?m_id_lessor:testMIdLessor, m_id_tenants:m_id_tenants?m_id_tenants:testMIdTenants }
		console.log(`[💬CONTRACT LESSOR SCREEN] ${s_id?'HAS CONTRACT STATUS':'🟥USE TEST DATA(실제 서비스 시에는 pop(1))'}`);
		console.log(`[💬CONTRACT LESSOR SCREEN] s_id: ${initState.s_id}, m_id_lessor: ${initState.m_id_lessor}, m_id_tenants: ${initState.m_id_tenants}`);
		initContractState(initState)
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		dispatch(getCodes('bank'))
		getLessorForContract({m_id_lessor:m_id_lessor})
		getContract({s_id: s_id, m_id_lessor: m_id_lessor, m_id_tenants: m_id_tenants})
	}},[loaded])

	useEffect(()=>{if(!_.isEmpty(lessor)){
		console.log(`[💬CONTRACT LESSOR SCREEN] GET lessorForContract: name: ${lessor.m_name}, phone: ${lessor.m_phone}`);
		setValue('contractJoint[0].cj_name', lessor.m_name)
		setValue('contractJoint[0].cj_phone', lessor.m_phone)
	}},[lessor])

	useEffect(()=>{if(contractJointSaved){
		console.log(`[💬CONTRACT LESSOR SCREEN] JOINT(공동명의) HAS SAVED! => NAVIGATE TO AGREEMENT SCREEN`);
		setContractState({contractJointSaved:false})
		navigation.navigate('contractAgreement')
	}},[contractJointSaved])

	useEffect(()=>{if(contract){
		if(!_.isEmpty(contract)){
			showAlertMessage('이미 계약서를 작성했습니다.')
			navigation.goBack()
		}
	}},[contract])

	//REACT HOOK FORM
	const { control, handleSubmit, getValues, setValue } = useForm()
	const onValid = (data) => {
		console.log(`[💬CONTRACT LESSOR SCREEN] VALIDATION OK(1차)`);
		handleContractJoint({data: data, activatedLessor: activatedLessor})
	}
	const onInvalid = (error) => {
			 if(error.c_account_bank)	{showAlertMessage(error.c_account_bank.message)}
		else if(error.c_account_name)	{showAlertMessage(error.c_account_name.message)}
		else if(error.c_account_number)	{showAlertMessage(error.c_account_number.message)}
		else							{showAlertMessage(`입력 내용을 다시 확인해주세요.`)}
	}

	//UI FUNCTIONS
	function handleAddLessorForm() {
		if(activatedLessor.length >= lessorMaxCount){
			showAlertMessage(`명의자는 ${lessorMaxCount}인까지 추가 가능합니다. 명의자가 6인 이상의 경우 고객센터(02-300-3000)로 문의해주세요.`);
			return false;
		}
		for (let i = 0; i < lessorMaxCount; i++) {
			if(_.findIndex(activatedLessor, item=>item==i) < 0){
				const newIndexList = Object.assign([],activatedLessor)
				newIndexList.push(i)
				setActivatedLessor(newIndexList)
				break;
			}
		}
	}

	function handleRemoveLessorForm(index) {
		const newIndexList = Object.assign([],activatedLessor)
		_.remove(newIndexList,item=>item==index)
		setActivatedLessor(newIndexList)
	}
	function handleCopyAddress(index){
		const address = getValues('contractJoint[0].cj_address')
		const address_detail = getValues('contractJoint[0].cj_address_detail')
		setValue(`contractJoint[${index}].cj_address`,address)
		setValue(`contractJoint[${index}].cj_address_detail`,address_detail)
	}

	//UI COMPONENTS
	const ChkBtn 		= () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkBtnActive  = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const LessorForm = ({index, active}) => {

		const isFirst = index === 0 ? true : false
		const isLast = (_.findIndex(activatedLessor, i=>i==index)+1 === activatedLessor.length)

		const [sameAddress,setSameAddress] = useState(sameAddressList.findIndex(i=>i==index) >= 0 ? true:false)

		if(!active) return(<></>);
		return(
			<Common.ScrollContainer>
				<Controller control={control} name={`contractJoint[${index}].cj_type`} defaultValue={'lessor'} render={({field})=>(<></>)}/>
				{isFirst && (
					<HeaderBox>
						<Common.TextBold16>선택하신 매물로 가 계약을 진행하시겠습니까?</Common.TextBold16>
						<AlertBox marginT={13}>
							<InfoAert source={require('../../assets/img/drawable-xhdpi/icon_alert.png')} />
							<AlertBoxText>전자계약은 반드시 매수자(임차인)와 사전에 합의를 하신 후 진행하셔야 합니다.</AlertBoxText>
						</AlertBox>
					</HeaderBox>
				)}
				<Common.TitleBox><Common.Title>{index == 0 ? sellerTypeStr : '공동명의'}</Common.Title></Common.TitleBox>
				<Controller
					control={control} name={`contractJoint[${index}].cj_name`} defaultValue={index == 0 ? '' : '안민수'}
					render={({field})=>(<>
						<Common.SubTitle>{sellerTypeStr} 이름</Common.SubTitle>
						<Common.InputBorder marginBN placeholder={'이름 입력'} value={field.value} onChangeText={field.onChange} editable={index == 0 ? false : true}/>
					</>)}
				/>
				<Controller
					control={control} name={`contractJoint[${index}].cj_address`} defaultValue='서울시 송파구 한천로3가길'
					render={({field})=>(<>
						<Common.FlexBetweenBox>
							<Common.SubTitle>주소</Common.SubTitle>
							{index !== 0 && (
								<Common.FlexRowBtn onPress={() => {
									const tmpList = Object.assign([],sameAddressList)
									if(!sameAddress) {
										handleCopyAddress(index)
										tmpList.push(index)
									}else{
										tmpList.pop(index)
									}
									setSameAddressList(tmpList)
									setSameAddress(!sameAddress)
								}}>
									{sameAddress ? <ChkBtnActive/> : <ChkBtn/>}<Common.TextSemiBold13>{`${sellerTypeStr}과 동일`}</Common.TextSemiBold13>
								</Common.FlexRowBtn>
							)}
						</Common.FlexBetweenBox>
						<Common.InputBorder placeholder={'주소 입력'} value={field.value} onChangeText={field.onChange} editable={!sameAddress}/>
					</>)}
				/>
				<Controller
					control={control} name={`contractJoint[${index}].cj_address_detail`} defaultValue='삼익아파트 201동 110호'
					render={({field})=>(<>
						<Common.InputBorder placeholder={'상세주소 입력'} value={field.value} onChangeText={field.onChange} editable={!sameAddress}/>
					</>)}
				/>
				<Controller
					control={control} name={`contractJoint[${index}].cj_phone`} defaultValue='01073118350'
					render={({field})=>(<>
						<Common.SubTitle>휴대전화 번호</Common.SubTitle>
						<Common.InputBorder keyboardType={'numeric'} placeholder={'휴대전화 번호 입력'} value={field.value} onChangeText={field.onChange}/>
					</>)}
				/>
				{!isLast && !isFirst && (<ContractBtnBox>
					<ContractdelBtn onPress={()=>{handleRemoveLessorForm(index)}}>
						<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_registration_cencel_b.png')} />
						<ContractBtnText whiteTit>삭제</ContractBtnText>
					</ContractdelBtn>
				</ContractBtnBox>)}
				{isLast && (<Btn01Box>
					<Common.TextMedium14 align={'center'} paragraph>명의가 여러 명일 경우에는 {'\n'}모든 임차인의 정보를 입력해 주십시오</Common.TextMedium14>
					<ContractBtnBox>
						<Common.FlexRowBtn>
							{!isFirst && (<ContractdelBtn onPress={()=>{handleRemoveLessorForm(index)}}>
								<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_registration_cencel_b.png')} />
								<ContractBtnText whiteTit>삭제</ContractBtnText>
							</ContractdelBtn>)}
							<Contract01Btn onPress={()=>{handleAddLessorForm()}}>
								<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_attachment_b.png')} />
								<ContractBtnText>{sellerTypeStr} 추가 등록</ContractBtnText>
							</Contract01Btn>
						</Common.FlexRowBtn>
					</ContractBtnBox>
				</Btn01Box>)} 
			</Common.ScrollContainer>
		)
	}

	//RENDER SCREEN
	return (<>
		<Common.ZipandaSafeView>
			{/* <Button title="TEST" onPress={()=>{console.log(contractJointSaved)}}/> */}
			<ModalPopup/>
			<Common.ScrollContainer paddingN>
				{activatedLessor.map((item)=>( //명의자 입력 FORM[최대 5인까지]
					<LessorForm index={item} active={activatedLessor.findIndex(i=>i==item)>=0} key={item}/>
				))}
				<ContractBorder20 Last>
					<Common.SubTitle>계좌번호</Common.SubTitle>
					<Controller
						control={control} name={`c_account_bank`} defaultValue='epostbank'
						rules={{required:{value:true,message:'입금은행을 선택하세요'}}}
						render={({field})=>(<>
							<ViewBorderY>
								<YellowLabel><YellowLabelText>은행</YellowLabelText></YellowLabel>
								<BorderYInnerBox>
									<FromArrowIcon />
									<RNPickerSelect
										value={field.value}
										onValueChange={value=>{field.onChange(value)}}
										placeholder={{label: '은행 선택'}}
										style={pickerStyle}
										items={codes.bank?codes.bank:[]}
										useNativeAndroidPickerStyle={false}
									/>
								</BorderYInnerBox>
							</ViewBorderY>
						</>)}
					/>
					<Controller
						control={control} name={`c_account_name`} defaultValue='조인장'
						rules={{required:{value:true,message:'예금주 이름을 입력하세요'}}}
						render={({field})=>(<>
							<ViewBorderY>
								<YellowLabel><YellowLabelText>예금주</YellowLabelText></YellowLabel>
								<BorderYInnerBox>
									<YTextInput placeholder={'예금주 입력'} value={field.value} onChangeText={value=>{field.onChange(value)}}/>
								</BorderYInnerBox>
							</ViewBorderY>
						</>)}
					/>
					<Controller
						control={control} name={`c_account_number`} defaultValue='110342394851'
						rules={{required:{value:true,message:'계좌번호를 입력하세요'}}}
						render={({field})=>(<>
							<ViewBorderY>
								<YellowLabel><YellowLabelText>계좌번호</YellowLabelText></YellowLabel>
								<BorderYInnerBox>
									<YTextInput placeholder={'계좌번호 입력(-없이 번호만 입력)'} value={field.value} onChangeText={value=>{field.onChange(value)}}/>
								</BorderYInnerBox>
							</ViewBorderY>
						</>)}
					/>
				</ContractBorder20>
			</Common.ScrollContainer>
			<Common.FloatBtn onPress={handleSubmit(onValid, onInvalid)}>
				<Common.TextSemiBold18>다음</Common.TextSemiBold18>
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

export default ContractLessorScreen
