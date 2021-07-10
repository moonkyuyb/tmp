/* COMMON */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';

/* REACT HOOK FORM */
import { Controller, useForm } from "react-hook-form";

/* UTILS & REDUCER */
import _ from 'lodash';
import { setCentralState } from '../reducers/centralReducer';

/* UI COMPONENTS */
import Colors from '../../assets/colors';
import * as Common from "../styled/commonStyle";
import { TermsCont, TermsListBox } from "../styled/signStyle/signUpStyle";
import { AlertModal } from '../container/centralContainer';
import FlexRowCheckBox from '../components/common/FlexRowCheckBox';

const SignUpScreen = ({signupMail}) => {

	//GET ROUTE & NAVIGATION & REDUX STATE
	const route = useRoute(), navigation = useNavigation()
	const {loading, navigateTo} = useSelector(state=>state.centralReducer)
	const dispatch = useDispatch()

	//UI STATES
	const MIN_PW_LENGTH = 8
	const [agreeEveryTerms, setAgreeEveryTerms] = useState(false)

	//REACT HOOK FORM
	const {control, handleSubmit ,getValues, setValue} = useForm()
	const onValid = async (data) => {
		// console.log(`[💬SIGNUP SCREEN] data`, data);
		if(data.m_password != data.m_password_re) {
			setCentralState({alertMsg:`입력하신 비밀번호가 서로 다릅니다`}); return;
		}
		dispatch(setCentralState({loading: true}))
		signupMail(data)
	}
	const onInvalid = err => {
		console.log(`[💬SIGNUP SCREEN] VALIDATON FAIL`)
		const errList = ['m_auth_provider', 'm_name', 'm_username', 'm_password', 'm_password_re', 'm_term_service', 'm_term_privacy', 'm_term_commercial']
		for (let i = 0; i < errList.length; i++) {
			if(err[errList[i]]) {
				setCentralState({alertMsg:err[errList[i]]['message']}); break;
			}else if(i==errList.length-1){
				setCentralState({alertMsg:`필수 입력 내용을 다시 확인해주세요`});
			}
		}
	}

	useEffect(() => {if(navigateTo){
		const targetScreen = navigateTo + ''
		dispatch(setCentralState({navigateTo: null}))
		navigation.navigate(targetScreen)
	}}, [navigateTo])

	//UI Functions
	function handleEveryTerms() {
		const val = !agreeEveryTerms
		setAgreeEveryTerms(val)
		setValue('m_term_service',val)
		setValue('m_term_privacy',val)
		setValue('m_term_commercial',val)
	}

	function handleOnChange(onChange, val){
		onChange(val)
		const values = getValues(['m_term_service','m_term_privacy','m_term_commercial'])
		setAgreeEveryTerms(_.every(values)) //모든 항목 동의 시 전체동의 체크
	}

	return(<>
		{/* <ModalPopup/> */}
		<Common.ZipandaSafeView>
			<AlertModal/>
			{/* <Button title="TEST" onPress={()=>{console.log(agreeEveryTerms);}}/> */}
			<Common.ScrollContainer>
				<Controller control={control} name="m_auth_provider" rules={{required:true}} defaultValue={'AP_EMAIL'} render={()=>(null)}/>
				<Common.TitleBox>
					<Common.Title>기본 정보</Common.Title>
				</Common.TitleBox>
				<Common.SubTitle>성명</Common.SubTitle>
				<Controller
					control={control} name="m_name" rules={{required:{value:true, message:'이름을 입력하세요'}}} defaultValue={'집판다씨'}
					render={({field})=>(<Common.InputBorder marginBN value={field.value} onChangeText={field.onChange} placeholder={'이름 입력'}/>)}
				/>
				<Common.SubTitle>아이디(이메일)</Common.SubTitle>
				<Controller
					control={control} name="m_username" rules={{required:{value:true, message:'이름을 입력하세요'}}} defaultValue={'zipanda@ybnet.works'}
					render={({field})=>(<Common.InputBorder marginBN value={field.value} onChangeText={field.onChange} placeholder={'아이디(이메일) 입력'}/>)}
				/>
				<Common.SubTitle>비밀번호</Common.SubTitle>
				<Controller /* XXX: 추후 비밀번호 조건 추가(영문,숫자 등) */
					control={control} name="m_password" defaultValue={'ybn2021!'}
					rules={{
						required:{value:true, message:'비밀번호를 입력하세요'},
						minLength:{value:MIN_PW_LENGTH, message:`비밀번호를 ${MIN_PW_LENGTH}자 이상 입력하세요`}
					}}
					render={({field})=>(<Common.InputBorder value={field.value} onChangeText={field.onChange} placeholder={'비밀번호 입력'} secureTextEntry={true}/>)}
				/>
				<Common.TextMedium14 marginT={4} color={Colors.blueColor}>✱ 비밀번호는 영문, 숫자 각 2회 이상 사용, {MIN_PW_LENGTH}자 이상 입력</Common.TextMedium14>
				<Common.SubTitle>비밀번호 확인</Common.SubTitle>
				<Controller
					control={control} name="m_password_re" defaultValue={'ybn2021!'}
					rules={{required:{value:true, message:'비밀번호를 한 번 더 입력해주세요'}}}
					render={({field})=>(<Common.InputBorder marginBN value={field.value} onChangeText={field.onChange} placeholder={'비밀번호 입력'} secureTextEntry={true}/>)}
				/>
				<TermsCont>
					<Common.TitleBox>
						<Common.Title>정보 동의</Common.Title>
						<Common.FlexRowBox>
							<FlexRowCheckBox title={"전체동의"} value={agreeEveryTerms} onPress={()=>{handleEveryTerms()}}/>
						</Common.FlexRowBox>
					</Common.TitleBox>
					<TermsListBox>
						<Common.FlexView paddingR={25}>
							<Controller
								control={control} name="m_term_service" rules={{required:{value:true, message:'서비스 이용약관에 동의해주세요'}}} defaultValue={true}
								render= {({field})=>(<FlexRowCheckBox value={field.value} onPress={()=>{handleOnChange(field.onChange,!field.value)}} title={'서비스 이용약관동의(필수)'}/>)}
							/>
						</Common.FlexView>
						<Common.SmallBtn onPress={() => navigation.navigate('terms')}><Common.TextSemiBold11>내용보기</Common.TextSemiBold11></Common.SmallBtn>
					</TermsListBox>
					<TermsListBox>
						<Common.FlexView paddingR={25}>
							<Controller
								control={control} name="m_term_privacy" rules={{required:{value:true, message:'개인정보 취급방침에 동의해주세요'}}} defaultValue={true}
								render= {({field})=>(<FlexRowCheckBox value={field.value} onPress={()=>{handleOnChange(field.onChange,!field.value)}} title={'개인정보 취급방침(필수)'}/>)}
							/>
						</Common.FlexView>
						<Common.SmallBtn onPress={() => navigation.navigate('terms')}><Common.TextSemiBold11>내용보기</Common.TextSemiBold11></Common.SmallBtn>
					</TermsListBox>
					<TermsListBox>
						<Common.FlexView paddingR={25}>
							<Controller
								control={control} name="m_term_commercial" defaultValue={false} 
								render= {({field})=>(<FlexRowCheckBox value={field.value} onPress={()=>{handleOnChange(field.onChange,!field.value)}} title={'이벤트 및 프로모션 안내 메일, SMS수신(선택)'}/>)}
							/>
						</Common.FlexView>
						<Common.SmallBtn onPress={() => navigation.navigate('terms')}><Common.TextSemiBold11>내용보기</Common.TextSemiBold11></Common.SmallBtn>
					</TermsListBox>
				</TermsCont>
			</Common.ScrollContainer>
			<Common.FloatBtn onPress={!loading ? handleSubmit(onValid, onInvalid) : null}>
				{loading ? (<ActivityIndicator size='small' color='#242424'/>):(<Common.TextSemiBold18>완료</Common.TextSemiBold18>)}
			</Common.FloatBtn>
		</Common.ZipandaSafeView>
	</>)
}

export default SignUpScreen
