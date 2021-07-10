/* COMMON */
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StackActions } from "@react-navigation/native";

/* UTILS */
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";

/* UI COMPONENTS */
import * as Common from "../styled/commonStyle";
import { ApplyText, ContractInfoHeader } from '../styled/chatContractStyle/contractStyle';
import { AgreementHeader, AgreementBox, AgreementTitle, AgreementText, AgreementChkBox } from '../styled/chatContractStyle/ContractAgreementStyle';
import { ModalPopup } from "../container/commonContainer";

/* CONSTANTS */
const testSId = 278, testMIdLessor = 2, testMIdTenants = 32

const ContractAgreementScreen = ({
	s_id, m_id_lessor, m_id_tenants, lessorForContract: lessor, salesForContract: sales, 
	setContractState, showAlertMessage, getLessorForContract, handleContractJoint, initContractState,
	contractStyle, contractAgreementSaved, getSalesForContract, getTenantsForContract, handleContractAgreement
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//UI STATE
	const [loaded, setLoaded] = useState(false)

	//HANDLE EFFECT
	useEffect(()=>{
		// if(!s_id) navigation.dispatch(StackActions.pop(2)) //실제 서비스
		const initState = { s_id: s_id?s_id:testSId, m_id_lessor: m_id_lessor?m_id_lessor:testMIdLessor, m_id_tenants:m_id_tenants?m_id_tenants:testMIdTenants }
		console.log(`[💬CONTRACT LESSOR SCREEN] ${s_id?'HAS CONTRACT STATUS':'🟥USE TEST DATA(실제 서비스 시에는 pop(2))'}`);
		console.log(`[💬CONTRACT LESSOR SCREEN] s_id: ${initState.s_id}, m_id_lessor: ${initState.m_id_lessor}, m_id_tenants: ${initState.m_id_tenants}`);
		setContractState(initState)
		setLoaded(true)
	},[])

	useEffect(()=>{if(loaded){
		console.log(`[💬CONTRACT AGREEMENT SCREEN] GET sales ${s_id}`);
		getSalesForContract({s_id:s_id})
	}},[loaded])
	
	useEffect(()=>{if(sales&&!_.isEmpty(sales)){
		console.log(`[💬CONTRACT AGREEMENT SCREEN] sales.s_seller_type:${sales.s_seller_type} / sales.s_price_type: ${sales.s_price_type}`);
		if(sales.s_seller_type === 'business'){
			setContractState({contractStyle:'contractBusiness'})
			console.log(`[💬CONTRACT AGREEMENT SCREEN] 표준임대차계약서`);
		}else if(sales.s_price_type === 'sales'){
			setContractState({contractStyle:'contractSales'})
			console.log(`[💬CONTRACT AGREEMENT SCREEN] 매매계약서`);
		}else if(sales.s_price_type === 'lease' || sales.s_price_type === 'monthly' ){
			setContractState({contractStyle:'contractLease'})
			console.log(`[💬CONTRACT AGREEMENT SCREEN] 임대차계약서`);
		}else{
			console.log(`[💬CONTRACT AGREEMENT SCREEN] 알 수 없는 형식의 계약서`);
		}
	}},[sales])

	useEffect(()=>{if(contractAgreementSaved){
		console.log(`[💬CONTRACT AGREEMENT SCREEN] navigate to contractStyle: ${contractStyle}`);
		setContractState({contractAgreementSaved:false})
		navigation.navigate(contractStyle)
	}},[contractAgreementSaved])

	//REACT HOOK FORM
	const {control, handleSubmit} = useForm()
	const onValid = (data) => {
		console.log(`[💬CONTRACT AGREEMENT SCREEN] VALIDATION OK`);
		handleContractAgreement({data:data})
	}
	const onInvalid = (err) => {
		console.log(`[💬CONTRACT AGREEMENT SCREEN] VALIDATION FAILED`);
		if(err.c_service_agreement1) {showAlertMessage(err.c_service_agreement1.message)}
	}

	//UI COMPONENTS
	const ChkBtn = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkBtnActive = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const ChkBtnBox = (props) => (
		<Common.FlexRowBtn {...props}>
			{props.checked ? <ChkBtnActive/> : <ChkBtn/>}
			<Common.FlexBox><ApplyText whiteTit>{props.title?props.title:''}</ApplyText></Common.FlexBox>
		</Common.FlexRowBtn>
	)
	
	//RENDER SCREEN
	return (<>
		<Common.ZipandaSafeView>
			<ModalPopup/>
			<Common.ScrollContainer>
				{/* <Common.TitleBox><Common.Title>전자계약 이용 동의</Common.Title></Common.TitleBox> */}
				<AgreementHeader>
					<Common.TextSemiBold14>온라인 전자계약 이용약관에 동의합니다.</Common.TextSemiBold14>
				</AgreementHeader>
					<AgreementBox>
						<AgreementText>서명 요청자는 회원가입, 서명 참여자는 전자서명을 진행하며 <AgreementTitle>"동의하고 서명 완료"</AgreementTitle> 버튼을 누름으로써 아래 내용에 대해 동의하였습니다.</AgreementText>
					</AgreementBox>
					<AgreementBox>
						<AgreementTitle>1. 용어 정리</AgreementTitle>
						<AgreementText>
							1) 서비스 : 클라우드 기반 간편 전자계약 서비스 모두싸인을 말합니다. (URL : https://modusign.co.kr){"\n"}
							2) 회사 : 모두싸인을 운영하는 주식회사 모두싸인을 말합니다.{"\n"}
							3) 이용자 : 서비스를 이용하는 회원 또는 비회원을 말합니다.{"\n"}
							4) 회원 : 서비스에 접속하여 이용약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.{"\n"}
							5) 비회원 : 서비스에 가입하지 않고 서비스가 제공하는 정보 및 서비스를 이용하는 자를 말합니다.{"\n"}
							6) 서명 요청자 : 서명 참여자에게 문서에 대한 전자서명을 요청하는 회원을 말합니다.{"\n"}
							7) 서명 참여자 : 서명 요청자로부터 문서에 서명을 요청받거나 서명을 하는 이용자를 말합니다.
						</AgreementText>
					</AgreementBox>
					<AgreementBox>
						<AgreementTitle>2. 전자문서의 법적 효력</AgreementTitle>
						<AgreementText>
							1) 전자서명에 사용되는 전자문서는 전자문서및전자거래기본법 제4조 제1항에 의해 전자적 형태로 되어 있다는 이유로 문서로서의 효력이 부인되지 않습니다.{"\n"}
							2) 다른 법령에 특별한 규정이 있을 경우 전자문서의 법적 효력이 인정되지 않을 수 있습니다.{"\n"}
							3) 서명 요청자는 전자서명에 사용하는 전자문서가 다른 법령의 특별한 규정에 의해 법적 효력이 인정되지 않는지 확인하고 서명을 요청해야 합니다. 만약 해당 사실을 인지하지 못해 문제가 발생할 경우 회사는 책임지지 않습니다.{"\n"}
							4) 서명 참여자는 전자서명에 사용하는 전자문서가 관련 법령의 특별한 규정에 의해 법적 효력이 인정되지 않는지 확인하고 서명해야 합니다. 만약 해당 사실을 인지하지 못해 문제가 발생할 경우 회사는 책임지지 않습니다.
						</AgreementText>
						<AgreementText>
							1) 전자서명에 사용되는 전자문서는 전자문서및전자거래기본법 제4조 제1항에 의해 전자적 형태로 되어 있다는 이유로 문서로서의 효력이 부인되지 않습니다.{"\n"}
							2) 다른 법령에 특별한 규정이 있을 경우 전자문서의 법적 효력이 인정되지 않을 수 있습니다.{"\n"}
							3) 서명 요청자는 전자서명에 사용하는 전자문서가 다른 법령의 특별한 규정에 의해 법적 효력이 인정되지 않는지 확인하고 서명을 요청해야 합니다. 만약 해당 사실을 인지하지 못해 문제가 발생할 경우 회사는 책임지지 않습니다.{"\n"}
							4) 서명 참여자는 전자서명에 사용하는 전자문서가 관련 법령의 특별한 규정에 의해 법적 효력이 인정되지 않는지 확인하고 서명해야 합니다. 만약 해당 사실을 인지하지 못해 문제가 발생할 경우 회사는 책임지지 않습니다.
						</AgreementText>
					</AgreementBox>
					<AgreementBox>
						<AgreementTitle>3. 전자서명의 법적 효력</AgreementTitle>
						<AgreementText>
							1) 서비스에 사용되는 전자서명은 반드시 서명 참여자의 동의가 있어야 가능하며, 전자서명법 제3조 제2항에 의해 당사자간의 약정에 따른 서명, 서명날인 또는 기명날인으로서의 효력을 가집니다.{"\n"}
							2) 서비스에 사용되는 전자서명은 다른 법령에 특별한 규정이 있을 경우 서명의 법적 효력이 인정되지 않을 수 있습니다.
						</AgreementText>
					</AgreementBox>
			
				<Controller
					control={control} name='c_service_agreement1' defaultValue={true} rules={{required:{value:true, message:`온라인 전자계약 이용약관에 동의해주세요.`}}}
					render={({field})=>(
						<AgreementChkBox>
							<ChkBtnBox title={`서명 참여자는 전자서명을 진행하며 '동의하고 서명 완료'를 함으로써 위 내용에 동의합니다.`} checked={field.value} onPress={()=>field.onChange(!field.value)}/>
						</AgreementChkBox>
					)}
				/>
			</Common.ScrollContainer>
	
			<Common.FloatBtn onPress={handleSubmit(onValid, onInvalid)}>
				<Common.TextSemiBold18>다음</Common.TextSemiBold18>
			</Common.FloatBtn>
		
		</Common.ZipandaSafeView>
	</>)
}

export default ContractAgreementScreen