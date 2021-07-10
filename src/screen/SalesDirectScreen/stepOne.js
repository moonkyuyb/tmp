/* COMMON */
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

/* UI COMPONENTS */
import * as Common from "../../styled/commonStyle";
import { StepInfoCont, NoticeItem, NoticeList } from "../../styled/sales/salesDirectTopInfoStyle";
import { StepCont, TextRequiredS, RequiredS, AlertWrap, AlertText } from "../../styled/sales/salesDirectCommonStyle";
import { FromArrowIcon } from "../../components/common/ArrowIcon";
import Colors from "../../../assets/colors";

/* UTILS */
import { Controller } from "react-hook-form";
import { BaseNavigationContainer, useNavigation, useRoute } from "@react-navigation/core";
import { useForm } from "react-hook-form";

const StepOneScreen = ({mode, basicInfo, saveStepOne,   nextPage, showAlertMessage, getSalesDetail }) => {
	console.log("=basicInfobasicInfobasicInfobasicInfobasicInfobasicInfobasicInfo")
console.log(basicInfo);
	const route = useRoute();
	const {control, handleSubmit, getValues, setValue, clearErrors} = useForm()

	var sID = 0;
	if (route.params != undefined) {
		sID = route.params.s_id
	}
	
	//UI Components
	const TextRequired = () => (<TextRequiredS><Required/> 필수입력</TextRequiredS>)
	const Required = () => (<RequiredS>*</RequiredS>)
	const ChkYIcon = () => (<Common.Image size={20} marginR={4} source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_y.png')} />)
	const ChkBIcon = () => (<Common.Image size={20} source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')} />)

	//UI STATE
	const [sellerType, setSellerType] = useState(getValues('sellerType'))

	//REACT HOOK FORM
	const onValid = (data) => {
		console.log(data);
		saveStepOne(data);
		nextPage();
	}
	const onInvalid = (err) => {
		console.log("invalid");
		console.log(err)
			 if(err.s_seller_type)		{ showAlertMessage(err.s_seller_type.message) }
		else if(err.s_temp_name)		{ showAlertMessage(err.s_temp_name.message) }
		else if(err.s_temp_phone)	{ showAlertMessage(err.s_temp_phone.message) }
		else						{ showAlertMessage(err[0]?.message) }
	}

	useEffect(()=>{
console.log("route.paramsroute.paramsroute.paramsroute.paramsroute.paramsroute.params");
console.log(route.params);
		if (route.params != undefined) {
			sID = route.params.s_id
			getSalesDetail(sID);
		}
	

	},[])

	useEffect(()=>{
		console.log(basicInfo);
		setValue("s_seller_type", basicInfo[0].s_seller_type);
		setValue("s_temp_name", basicInfo[0].s_temp_name);
		setValue("s_temp_phone", basicInfo[0].s_temp_phone);

	},[basicInfo])


	return(<>
		
		<Common.ScrollContainer paddingN>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex:1 }}>
				<StepInfoCont>
					<Common.TitleBox>
						<Common.Title>등록시 유의사항</Common.Title>
					</Common.TitleBox>
					<NoticeItem>
						<NoticeList>
							<ChkBIcon/>
							<Common.TextLight14 paragraph>매물 등록 시 <Common.TextBold14 paragraph>매물 정보와 계정정보(가입된 ID, 등록자 이름)이 노출됩니다.</Common.TextBold14></Common.TextLight14>
						</NoticeList>
						<NoticeList>
							<ChkBIcon />
							<Common.TextLight14 paragraph>매도인의 연락처는 <Common.TextBold14 paragraph>매수인의 연락처 공개 요청과 매도인의 연락처 공개 승인</Common.TextBold14>이 된 경우에만 공개됩니다.</Common.TextLight14>
						</NoticeList>
						<NoticeList>
							<ChkBIcon />
							<Common.TextLight14 paragraph>최초 등록 시 <Common.TextBold14 paragraph>건물형태, 거래 정보, 주소(동/호 정보포함), 면적 정보, ‘최초등록가’ ±20%를 벗어나는 가격 (월세 제외)은 수정시 승인</Common.TextBold14>이 필요합니다.</Common.TextLight14>
						</NoticeList>
						<NoticeList>
							<ChkBIcon />
							<Common.TextLight14 paragraph><Common.TextBold14 paragraph>허위(계약 완료, 중복 등록, 허위 정보 기재) 등록 및 중개매물, 원룸텔, 쉐어하우스 등록 시 서비스 이용이 제한</Common.TextBold14>될 수 있습니다.</Common.TextLight14>
						</NoticeList>
					</NoticeItem>
				</StepInfoCont>
				<StepCont>
					<Common.TitleBox>
						<Common.Title>등록자 정보</Common.Title><TextRequired/>
					</Common.TitleBox>
					
					<Common.SubTitle>등록자 구분 <Required/></Common.SubTitle>
					<Controller
						control={control} name="s_seller_type" 
						defaultValue={basicInfo[0].s_seller_type}
						value={getValues("s_seller_type")}
						rules={{required:{value:true, message:'등록자 구분을 선택하세요.'}}}
						render={({field})=>(<>
							<Common.ViewBorder marginBN>
								<FromArrowIcon/>
								<RNPickerSelect
									value={field.value}
									onValueChange={(value) => {  field.onChange(value); setSellerType(value); } }
									placeholder={{label: '등록자 선택'}}
									useNativeAndroidPickerStyle={false}
									fixAndroidTouchableBug={false}
									items={[ {label:'임대사업자', value:'business'}, {label:'임대인', value:'lessor'}, {label:'기존세입자', value:'lessee'}, {label:'기타', value:'etc'} ]}
									style={pickerStyle}
								/>
							</Common.ViewBorder>
						</>)}
					/>
					<Controller
						control={control} name="s_temp_comments" 
						rules={{required:{value:sellerType=='etc',message:'등록자 구분을 입력하세요.'}}}
						render={({field})=>( sellerType=='etc' ? 
						<Common.InputBorder marginBN value={field.value} onChangeText={field.onChange} placeholder={'기타의 경우 입력'}/> : null )}
					/>
					<Controller
						control={control} name="s_temp_name" 
						defaultValue={basicInfo[0].s_temp_name}
						value={basicInfo[0].s_temp_name}
						rules={{required:{value:true, message:'임대인 이름을 입력하세요.'}}}
						render={({field})=>(<>
							<Common.SubTitle>임대인 이름 <Required/></Common.SubTitle>
							<Common.InputBorder marginBN value={field.value} onChangeText={field.onChange} placeholder={'이름 입력'} />
						
						</>)}
					/>
					<Controller
						control={control} name="s_temp_phone" 
						defaultValue={basicInfo[0].s_temp_phone}
						value={basicInfo[0].s_temp_phone}
						rules={{required:{value:true, message:'연락처를 입력하세요.'}}}
						render={({field})=>(<>
							<Common.SubTitle>연락처 <Required/></Common.SubTitle>
							<Common.InputBorder value={field.value} onChangeText={field.onChange}  placeholder={'연락처 입력'} keyboardType='numeric'/>
						</>)}
					/>
					<AlertWrap>
						<ChkYIcon/>
						<AlertText>
							<AlertText bold>실제임대인(집주인)의 이름과 연락처를 입력해주세요.</AlertText>{"\n"}
							(공동소유일 경우 임대인 중 한 명의 이름만 입력해주세요.)
						</AlertText>
					</AlertWrap>
				</StepCont>
			</KeyboardAvoidingView>
		</Common.ScrollContainer>
		<Common.FloatBtnBox>
		
			{mode == "new" &&
				<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={()=>{ }} >
					<Common.TextSemiBold18 color={Colors.whiteColor}>임시 저장</Common.TextSemiBold18>
				</Common.FloatBtnsss>
			}
			<Common.FloatBtnsss onPress={ handleSubmit(onValid,onInvalid) } >
				<Common.TextSemiBold18>다음 단계</Common.TextSemiBold18>
			</Common.FloatBtnsss>
		</Common.FloatBtnBox>
	</>)
}

const pickerStyle = {
	placeholderColor: '#000',
	inputIOS: { color: '#000', height: 38, fontSize: 14 },
	inputAndroid: { color: '#000', height: 38, fontSize: 14, paddingVertical: 0, },
}

export default StepOneScreen