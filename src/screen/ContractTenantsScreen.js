/* ENVIRONMENTS */
import { TENATNS_MAX_COUNT } from "@env";

/* COMMON */
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StackActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

/* UTIL */
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import { getContractForChat } from "../reducers/chatReducer";

/* UI COMPONENTS */
import Colors from "../../assets/colors";
import * as Common from "../styled/commonStyle";
import { BorderYInnerBox, Btn01Box, Contract01Btn, ContractBorder20, ContractBtnBox, ContractBtnText, ContractdelBtn, AlertBox, HeaderBox, YellowLabelText,	InfoAert, AlertBoxText,ViewBorderY, YellowLabel, YTextInput } from "../styled/chatContractStyle/contractStyle";
import { ModalPopup } from "../container/commonContainer";
import ArrowIcon from "../components/common/ArrowIcon";

/* CONSTANTS */
const testCId = '24', testSId = '278', testMIdLessor = '2', testMIdTenants = '32'
const tenantsMaxCount = TENATNS_MAX_COUNT ? TENATNS_MAX_COUNT : 5

const ContractTenantsScreen = ({
	c_id, s_id, m_id_lessor, m_id_tenants, tenantsForContract: tenants, contractJointSaved, contract, handleContractJointUpdate, contractUpdated,
	setContractState, showAlertMessage, getLessorForContract, handleContractJoint, initContractState, getContract, getTenantsForContract
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const dispatch = useDispatch()

	//UI STATE
	const [loaded, setLoaded] = useState(false)
	const [activatedTenants, setActivatedTenants] = useState([0])
	const [sameAddressList, setSameAddressList] = useState([])
	const [sellerTypeStr, setSellerTypeStr] = useState('임대인')

	//HANDLE EFFECT
	useEffect(()=>{
		if(!c_id && !m_id_tenants) navigation.dispatch(StackActions.pop(1)) //실제 서비스
		const initState = { c_id: c_id?c_id:testCId, m_id_tenants: m_id_tenants?m_id_tenants:testMIdTenants  }
		console.log(`[💬CONTRACT TENANTS SCREEN] ${m_id_tenants?'HAS CONTRACT STATUS':'🟥USE TEST DATA(실제 서비스 시에는 pop(1))'}`);
		console.log(`[💬CONTRACT TENANTS SCREEN] c_id: ${initState.c_id}`);
		console.log(`[💬CONTRACT TENANTS SCREEN] m_id_tenants: ${initState.m_id_tenants}`);
		initContractState(initState)
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		getContract({c_id:c_id})
		getTenantsForContract({m_id_tenants:m_id_tenants})
	}},[loaded])

	useEffect(()=>{if(!_.isEmpty(tenants)){
		console.log(`[💬CONTRACT TENANTS SCREEN] GET tenantsForContract: name: ${tenants.m_name}, phone: ${tenants.m_phone}, m_id: ${tenants.m_id}`);
		setValue('contractJoint[0].cj_name', tenants.m_name)
		setValue('contractJoint[0].cj_phone', tenants.m_phone)
	}},[tenants])
	
	useEffect(()=>{if(contractUpdated){
		setContractState({contractUpdated:false})
		getContract({c_id:c_id})
		dispatch(getContractForChat({c_id:c_id}))
		showAlertMessage('등록되었습니다.')
		navigation.dispatch(StackActions.pop(1))
	}},[contractUpdated])

	//REACT HOOK FORM
	const { control, handleSubmit, getValues, setValue } = useForm()
	const onValid = (data) => {
		console.log(`[💬CONTRACT TENANTS SCREEN] VALIDATION OK(1차)`);
		handleContractJointUpdate({c_id:c_id, data: data, activatedTenants: activatedTenants})
	}
	const onInvalid = (error) => {
		if(error) showAlertMessage(`입력 내용을 다시 확인해주세요.`)
	}

	//UI FUNCTIONS
	function handleAddTenantsForm() {
		if(activatedTenants.length >= tenantsMaxCount){
			showAlertMessage(`명의자는 ${tenantsMaxCount}인까지 추가 가능합니다. 명의자가 6인 이상의 경우 고객센터(02-300-3000)로 문의해주세요.`);
			return false;
		}
		for (let i = 0; i < tenantsMaxCount; i++) {
			if(_.findIndex(activatedTenants, item=>item==i) < 0){
				const newIndexList = Object.assign([],activatedTenants)
				newIndexList.push(i)
				setActivatedTenants(newIndexList)
				break;
			}
		}
	}
	function handleRemoveTenantsForm(index) {
		const newIndexList = Object.assign([],activatedTenants)
		_.remove(newIndexList,item=>item==index)
		setActivatedTenants(newIndexList)
	}     
	function handleCopyAddress(index){
		const address = getValues('contractJoint[0].cj_address')
		const address_detail = getValues('contractJoint[0].cj_address_detail')
		setValue(`contractJoint[${index}].cj_address`,address)
		setValue(`contractJoint[${index}].cj_address_detail`,address_detail)
	}

	//UI COMPONENTS
	const ChkBtn = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkBtnActive = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const TenantsForm = ({index, active}) => {

		const isFirst = index === 0 ? true : false
		const isLast = (_.findIndex(activatedTenants, i=>i==index)+1 === activatedTenants.length)

		const [sameAddress,setSameAddress] = useState(sameAddressList.findIndex(i=>i==index) >= 0 ? true:false)

		if(!active) return(<></>);
		return(
			<Common.ScrollContainer>
				<Controller control={control} name={`contractJoint[${index}].cj_type`} defaultValue={'tenants'} render={({field})=>(<></>)}/>
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
					control={control} name={`contractJoint[${index}].cj_name`} defaultValue={index == 0 ? '' : '공동명'}
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
					control={control} name={`contractJoint[${index}].cj_phone`} defaultValue='01073118333'
					render={({field})=>(<>
						<Common.SubTitle>휴대전화 번호</Common.SubTitle>
						<Common.InputBorder keyboardType={'numeric'} placeholder={'휴대전화 번호 입력'} value={field.value} onChangeText={field.onChange}/>
					</>)}
				/>
				<Controller
					control={control} name={`contractJoint[${index}].cj_identified_num`} defaultValue='9212229-1'
					render={({field})=>(<>
						<Common.SubTitle>주민등록번호</Common.SubTitle>
						<Common.InputBorder keyboardType={'numeric'} placeholder={'주민등록번호 입력'} value={field.value} onChangeText={field.onChange}/>
					</>)}
				/>
				
				{!isLast && !isFirst && (<ContractBtnBox>
					<ContractdelBtn onPress={()=>{handleRemoveTenantsForm(index)}}>
						<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_registration_cencel_b.png')} />
						<ContractBtnText whiteTit>삭제</ContractBtnText>
					</ContractdelBtn>
				</ContractBtnBox>)}
				{isLast && (<Btn01Box>
					<Common.TextMedium14 align={'center'} paragraph>명의가 여러 명일 경우에는 {'\n'}모든 임차인의 정보를 입력해 주십시오</Common.TextMedium14>
					<ContractBtnBox>
						<Common.FlexRowBtn>
							{!isFirst && (<ContractdelBtn onPress={()=>{handleRemoveTenantsForm(index)}}>
								<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/icon_registration_cencel_b.png')} />
								<ContractBtnText whiteTit>삭제</ContractBtnText>
							</ContractdelBtn>)}
							<Contract01Btn onPress={()=>{handleAddTenantsForm()}}>
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
			{/* <Button title="TEST" onPress={()=>{console.log(tenants)}}/> */}
			<ModalPopup/>
			<Common.ScrollContainer paddingN>
				{activatedTenants.map((item)=>( //명의자 입력 FORM[최대 5인까지]
					<TenantsForm index={item} active={activatedTenants.findIndex(i=>i==item)>=0} key={item}/>
				))}
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
		fontSize: 12,
		padding: 0,
		height: 14,
		lineHeight: 34,
		backgroundColor: Colors.whiteColor,
	},
};

export default ContractTenantsScreen
