/* COMMON */
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from "react-native-picker-select";

/* UI COMPONENTS */
import * as Common from '../../styled/commonStyle';
import {  RadioTitleBox, RadioBox, UnitTit} from '../../styled/sales/salesDirectCommonStyle';
import { GreyBox2, TagBox, Tag, TagText, RoomTextArea, OptionItemBox, Options, InputBorder70Wrap, 
	InputBorder70, ViewBorder70Btn, View70, ViewBorderFlexBtn, TagAddBtn } from "../../styled/sales/salesDirectStyle";
import {FromArrowIcon} from "../../components/common/ArrowIcon";
import Colors from "../../../assets/colors";
import Modal from "react-native-modal";

/* UTILS */
import { Controller } from "react-hook-form";
import _ from "lodash";

import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateIcon } from "../../components/common/DateIcon";

const StepThreeScreen = ({
	sID,
	mode,
	s_id,
	basicInfo, propInfo, detailInfo, imgs,
	saveStepThree,
	isComplete,
	submitComplete,
	commonFeeList, indiFeeList,
	optHeat, optLife, optSecure, optEtc,
	getOptionHeatList, getOptionLifeList, getOptionSecureList, getOptionEtcList,
	prevPage, nextPage, getCommonFeeList, getIndiFeeList, showAlertMessage
}) => {
	const { control, handleSubmit, getValues, setValue, clearErrors } = useForm()
	console.log("step three sID==========================================");
	console.log(sID);
	//UI Components
	const RadioBtn = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_radio_off.png')} />)
	const RadioBtnActive = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_radio_on.png')} />)
	const ChkBtn = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkActive = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const CencelImg = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_search_cencel_g.png')} />)

	//UI STATE
	const [contractType, setContractType] = useState('')
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [showBuildPicker, setShowBuildPicker] = useState(false)
	const [pickedDate, setPickedDate] = useState(new Date())
	const [targetValue, setTargetValue] = useState('contractStart') //contractStart, contractEnd
	const [commonFeeYN, setCommonFeeYN] = useState(false)
	const [indiFeeYN, setIndiFeeYN] = useState(false)
	const [dateInType, setDateInType] = useState(0)
	const [trigger, setTrigger] = useState(true)

	const [selIndiFee, setSelIndiFee] = useState([]);

	const [selHeating, setSelHeating] = useState([]);
	const [selLiving, setSelLiving] = useState([]);
	const [selSecurity, setSelSecurity] = useState([]);
	const [selEtc, setSelEtc] = useState([]);
	const [selTags, setSelTags] = useState([]);

	const [mID, setMID] = useState("");

	const [builtDate, setBuildDate] = useState("");

	useEffect(()=>{
		console.log("builtDate============================================================");
		console.log(builtDate)
		
	},[builtDate])


	//REACT HOOK FORM
	const onValid = (data) => {
		console.log("onValid============================================================");
		console.log(data)
		saveStepThree(data);

		//nextPage()
	}

	useEffect(() => {
		console.log("selIndiFee============================================================");
		console.log(selIndiFee)
		setValue("indiFeeList", selIndiFee);
	}, [selIndiFee])

	/*
		useEffect(()=>{
			console.log("complete============================================================");
			console.log(detailInfo);
			console.log("iscomplete: "+isComplete);
			if (isComplete) {
				
				var stepOneData = basicInfo[0]
				var stepTwoData = propInfo;
				var stepThreeData = detailInfo[0];
	
				var basicProp = Object.assign(stepOneData, stepTwoData);
				var totalInfo = Object.assign(basicProp, stepThreeData);
				totalInfo['imgs'] = imgs;
				totalInfo['s_id'] = s_id;
				
				submitComplete(totalInfo, mID);
			}
	
		},[isComplete])
		*/
	const onInvalid = (err) => {
		if (err.contractType) { showAlertMessage(err.contractType.message) }
		else if (err.depositAmt) { showAlertMessage(err.depositAmt.message) }
		else if (err.monthAmt) { showAlertMessage(err.monthAmt.message) }
		else if (err.contractStart) { showAlertMessage(err.contractStart.message) }
		else if (err.contractEnd) { showAlertMessage(err.contractEnd.message) }
		else if (err.commonFeeAmt) { showAlertMessage(err.commonFeeAmt.message) }
		else { showAlertMessage(err.toString()) }
	}

	useEffect(() => {
		const initData = detailInfo[0];

		setValue("s_individual_cost_yn", initData.s_individual_cost_yn);
		setValue("indiFeeList", initData.indiFeeList);
		setValue("s_loan", initData.s_loan);
		setValue("s_move_in_type", initData.s_move_in_type);
		setValue("s_move_in_date", initData.s_move_in_date);
		setValue("s_date_nego", initData.s_date_nego);
		setValue("s_floor_exps", initData.s_floor_exps);
		setValue("s_room_type", initData.s_room_type);
		setValue("s_room_direction_from", initData.s_room_direction_from);
		setValue("s_room_direction", initData.s_room_direction);
		setValue("s_door_type", initData.s_door_type);
		setValue("s_total_house_cnt", initData.s_total_house_cnt);
		setValue("s_build_year", initData.s_build_year);
		setValue("heatingOpt", initData.heatingOpt);
		setValue("livingOpt", initData.livingOpt);
		setValue("securityOpt", initData.securityOpt);
		setValue("etcOpt", initData.etcOpt);
		setValue("tags", initData.tags);
		setValue("s_content", initData.s_content);
		setSelTags(initData.tags);

		if (isComplete) {
			console.log("complete!!!! submit");
			var stepOneData = basicInfo[0]
			var stepTwoData = propInfo;
			var stepThreeData = detailInfo[0];

			var basicProp = Object.assign(stepOneData, stepTwoData);
			var totalInfo = Object.assign(basicProp, stepThreeData);
			totalInfo['imgs'] = imgs;
			totalInfo['s_id'] = sID;
			console.log("save!!!!!========!!!!!========!!!!!========!!!!!========!!!!!========!!!!!========!!!!!========!!!!!========");
			console.log(totalInfo);
			submitComplete(totalInfo, mID);
		}


	}, [detailInfo])

	//USE EFFECT
	useEffect(() => {

		AsyncStorage.getItem('mID')
			.then((result) => {
				setMID(result);
			})
			.catch((err) => {

			})
		if (trigger) {
			getCommonFeeList()
			getIndiFeeList()
			setTrigger(false)

			getOptionHeatList()
			getOptionLifeList()
			getOptionSecureList()
			getOptionEtcList()

		}
	}, [])

	return (<>
		<Common.ScrollContainer>

			<Modal isVisible={showDatePicker}>
				<View style={{ backgroundColor: '#ffffff' }}>
					<RNDateTimePicker
						value={pickedDate}
						mode={"date"} is24Hour={true} display="default" testID="dateTimePicker"
						onChange={(event, selectedDate) => {
							const resultString = selectedDate.getFullYear().toString() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate()
							setShowDatePicker(false);
							setValue('s_move_in_date', resultString)
						}}
					/>
				</View>
			</Modal>
			<Modal isVisible={showBuildPicker} >
				<View style={{ backgroundColor: '#ffffff' }} >
					<RNDateTimePicker
						value={pickedDate}
						mode={"date"} is24Hour={true} display="default" testID="dateTimePicker"
						onChange={(event, selectedDate) => {
							console.log("build picker");
							const resultString = selectedDate.getFullYear().toString() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate()
							setShowBuildPicker(false);
							setBuildDate(resultString);
							setValue('s_build_year', resultString)
						}}
					/>
				</View>
			</Modal>

			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
					<Common.TitleBox><Common.Title>상세 정보</Common.Title></Common.TitleBox>
					<Controller
						control={control}
						name="s_individual_cost_yn"
						defaultValue={false}
						value={getValues("s_individual_cost_yn")}
						render={({ field }) => (
							/*
							<Common.FlexBetweenBox marginT={18}>
								<Common.SubTitle marginTN>개별 사용료</Common.SubTitle>
								<RadioTitleBox>
									<RadioBox  onPress={() => { setValue("s_individual_cost_yn", '1'); field.onChange }} >
										{field.value==true?<RadioBtnActive/>:<RadioBtn/>}<Common.ViewBorderText>{"있음"}</Common.ViewBorderText>
									</RadioBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '0'); setValue("indiFeeList", []); field.onChange }} >
										{field.value==false?<RadioBtnActive/>:<RadioBtn/>}<Common.ViewBorderText>{"없음"}</Common.ViewBorderText>
									</RadioBox>
								</RadioTitleBox>
							</Common.FlexBetweenBox>
							*/
							
							<Common.FlexBetweenBox marginT={18}>
								<Common.SubTitle marginTN>개별 사용료</Common.SubTitle>
								<RadioTitleBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '1'); field.onChange }} >
										{field.value==true?<RadioBtnActive/>:<RadioBtn/>}<Common.ViewBorderText>{"있음"}</Common.ViewBorderText>
									</RadioBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '0'); setValue("indiFeeList", []); field.onChange }} >
										{field.value==false?<RadioBtnActive/>:<RadioBtn/>}<Common.ViewBorderText>{"없음"}</Common.ViewBorderText>
									</RadioBox>
								</RadioTitleBox>
							</Common.FlexBetweenBox>

							/*
							<RadioTitleBox>
								<SubTitle>개별 사용료</SubTitle>
								<FlexRowBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '1'); field.onChange }}>
										{field.value == true ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"있음"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '0'); setValue("indiFeeList", []); field.onChange }}>
										{field.value == false ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"없음"}</RadioLable>
									</RadioBox>
								</FlexRowBox>
							</RadioTitleBox>
							*/
						)}
					/>
					<Controller
						control={control}
						name="indiFeeList"
						defaultValue={getValues("indiFeeList")}
						value={getValues("indiFeeList")}
						render={({ field }) => (/*<>
							<SubTitle>개별 사용료 항목</SubTitle>
							<OptionItemBox>
								{indiFeeList.map((item) => {
									return (
										<OptionList key={item.value} active={(_.find(getValues("indiFeeList"), i => i == item.value)) ? true : false}
											onPress={() => {

												//const newValueArr = Object.assign([],field.value)
												const valueArr = getValues("indiFeeList");

												if (_.find(valueArr, i => i == item.value)) {
													_.remove(valueArr, i => i == item.value)
													setSelIndiFee([...valueArr]);

												} else {
													valueArr.push(item.value)
													setSelIndiFee([...valueArr]);
												}
											}}>
											<OptionTit>{item.label}</OptionTit>
										</OptionList>)
								})}
							</OptionItemBox>
						</>*/
								<>
									<Common.SubTitle>개별 사용료 항목</Common.SubTitle>
									<OptionItemBox>
										{indiFeeList.map((item)=>(
											<Options key={item.value} active={(_.find(getValues("indiFeeList"), i => i == item.value)) ? true : false}
												onPress={()=>{
													
													//const newValueArr = Object.assign([],field.value)
													const valueArr = getValues("indiFeeList");

													if (_.find(valueArr, i => i == item.value)) {
														_.remove(valueArr, i => i == item.value)
														setSelIndiFee([...valueArr]);

													} else {
														valueArr.push(item.value)
														setSelIndiFee([...valueArr]);
													}
												}}>
												<Common.TextLight14>{item.label}</Common.TextLight14>
											</Options>
										))}
									</OptionItemBox>
								</>
						
						)}
					/>


					<Controller
						control={control}
						name="s_loan"
						defaultValue={getValues('s_loan')}
						value={getValues('s_loan')}
						render={({ field }) => (/*<>
							<SubTitle>융자 여부</SubTitle>
							<ViewBorder>
								<FromArrowIcon />
								<RNPickerSelect
									value={field.value}
									onValueChange={(value) => { field.onChange(value); /*setContractType(value)* }}
									placeholder={{ label: '융자 여부 선택' }}
									useNativeAndroidPickerStyle={false}
									fixAndroidTouchableBug={false}
									style={pickerStyle}
									items={[
										{ label: '융자금 없음', value: 'NonLoan' },
										{ label: '시세 대비 30% 미만', value: '30Below' },
										{ label: '시세 대비 30% 이상', value: '30More' },
									]}
								/>
							</ViewBorder>
						</>*/
						<>
							<Common.SubTitle>융자 여부</Common.SubTitle>
							<Common.ViewBorder marginBN>
								<FromArrowIcon/>
								<RNPickerSelect
									value={field.value}
									onValueChange={(value) => { field.onChange(value); /*setContractType(value)*/ } }
									placeholder={{label: '융자 여부 선택'}}
									useNativeAndroidPickerStyle={false}
									fixAndroidTouchableBug={false}
									style={pickerStyle}
									items={[
										{label:'융자금 없음', value:'n'},
										{label:'시세 대비 30% 미만', value:'b'},
										{label:'시세 대비 30% 이상', value:'a'},
									]}
								/>
							</Common.ViewBorder>
						</>
						)}
					/>
					<Common.SubTitle>입주 가능일</Common.SubTitle>
					<Common.FlexBetweenBox>
						<Controller
							control={control} name="s_move_in_type"
							render={({ field }) => (
							<>
								<RadioBox onPress={() => { field.onChange(0); setDateInType(0); setValue('dateInDate', '') }} >
									{dateInType == 0 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"즉시입주"}</Common.ViewBorderText>
								</RadioBox>
							</>
							)}
						/>
						<Controller
							control={control} name="s_move_in_date"

							render={({ field }) => (
								/*<>
									<OccupancyRadioBox>
										<RadioBoxMarginN onPress={() => { setValue('dateInType', 1); setDateInType(1); setTargetValue('dateInDate'); setShowDatePicker(true) }} >
											{dateInType == 1 ? (<RadioBtnActive />) : (<RadioBtn />)}
										</RadioBoxMarginN>
										<OccupancyDateSel>
											<TouchableOpacity style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}
												onPress={() => {
													setValue('s_move_in_type', 1);
													setDateInType(1)
													//setTargetValue('dateInDate'); 
													setShowDatePicker(true)
												}}>
												<DateTextTextL>{field.value ? field.value : '날짜 선택'}</DateTextTextL>
											</TouchableOpacity>
											<DatePickerIcons source={require('../../../assets/img/drawable-xhdpi/bt_calendar.png')} />
										</OccupancyDateSel>
									</OccupancyRadioBox>
								</>*/
								<>
								<View70>
									<RadioBox marginLN onPress={() => { setValue('dateInType', 1); setDateInType(1); setTargetValue('dateInDate'); setShowDatePicker(true) }} >
										{dateInType == 1 ? ( <RadioBtnActive/> ) : (<RadioBtn/>)}
									</RadioBox>
									
									<ViewBorderFlexBtn
										onPress={() => {
											setValue('s_move_in_type', 1);
											setDateInType(1)
											//setTargetValue('dateInDate'); 
											setShowDatePicker(true)
										}}>
										<Common.ViewBorderText>{field.value?field.value:'날짜 선택'}</Common.ViewBorderText>
										<DateIcon/>
									</ViewBorderFlexBtn>
										
								</View70>
							</>
							)}
						/>
					</Common.FlexBetweenBox>

					<Controller
						control={control} name="s_date_nego" defaultValue={false}
						render={({ field }) => (
							/*
							<GreyBox2>
								<GreyChkBtn onPress={() => { field.onChange(!field.value) }}>
									{field.value ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>입주일 협의 가능</Common.ViewBorderText>
								</GreyChkBtn>
							</GreyBox2>
							*/
							<GreyBox2>
								<RadioBox onPress={() => { field.onChange(!field.value) }}>
									{field.value ? <ChkActive/> : <ChkBtn/>}<Common.ViewBorderText>입주일 협의 가능</Common.ViewBorderText>
								</RadioBox>
							</GreyBox2>
						)}
					/>
					<Controller
						control={control} name="s_floor_exps"
						render={({ field }) => (
						/*<>
							<RoomItemList2Box>
								<SubTitle>층 노출</SubTitle>
								<FlexRowBox>
									<RadioBox onPress={() => { field.onChange(true) }} >
										{field.value == true ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"예"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange(false) }} >
										{field.value == false ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"아니오"}</RadioLable>
									</RadioBox>
									<FloorText>(고 층/중 층/고 층 노출)</FloorText>
								</FlexRowBox>

							</RoomItemList2Box>
						</>*/
						<>
							<Common.FlexBetweenBox marginT={18}>
								<Common.SubTitle marginTN>층 노출</Common.SubTitle>
								<RadioTitleBox>
									<RadioBox onPress={() => { field.onChange(true) }} >
										{field.value==true? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"예"}</Common.ViewBorderText> 
									</RadioBox>
									<RadioBox onPress={()=>{ field.onChange(false) }} >
										{field.value==false? <RadioBtnActive/> : <RadioBtn/>}
										<Common.ViewBorderText>{"아니오"}<Common.ViewBorderText color={Colors.textNonColors}>(고 층/중 층/고 층 노출)</Common.ViewBorderText></Common.ViewBorderText>
									</RadioBox>
									
								</RadioTitleBox>

							</Common.FlexBetweenBox>
						</>
						
						)}
					/>

					<Controller
						control={control} name="s_room_type"
						render={({ field }) => (/*<>
							<RoomItemList2Box>
								<SubTitle>방, 거실 형태</SubTitle>
								<FlexRowBox >
									<RadioBox onPress={() => { field.onChange("1"); }} >
										{field.value == "1" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"오픈형"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange("2"); }} >
										{field.value == "2" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"분리형"}</RadioLable>
									</RadioBox>
								</FlexRowBox>
							</RoomItemList2Box>
						</>*/
						<>
						<Common.FlexBetweenBox marginT={18}>
							<Common.SubTitle marginTN>방, 거실 형태</Common.SubTitle>
							<RadioTitleBox >
								<RadioBox onPress={()=>{ field.onChange("1"); }} >
									{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"오픈형"}</Common.ViewBorderText>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange("2"); }} >
									{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"분리형"}</Common.ViewBorderText>
								</RadioBox>
							</RadioTitleBox>
						</Common.FlexBetweenBox>
						</>
						)}
					/>
					<Controller
						control={control} name="s_room_direction_from"
						render={({ field }) => (/*<>
							<RoomItemList2Box>
								<SubTitle>주실 방향 기준</SubTitle>
								<FlexRowBox >
									<RadioBox onPress={() => { field.onChange("1"); }} >
										{field.value == "1" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"안방"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange("2"); }} >
										{field.value == "2" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"거실"}</RadioLable>
									</RadioBox>

								</FlexRowBox>
							</RoomItemList2Box>
						</>*/
						<>
						<Common.FlexBetweenBox marginT={18}>
							<Common.SubTitle marginTN>주실 방향 기준</Common.SubTitle>
							<RadioTitleBox >
								<RadioBox onPress={()=>{ field.onChange("1"); }} >
									{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"안방"}</Common.ViewBorderText>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange("2"); }} >
									{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"거실"}</Common.ViewBorderText>
								</RadioBox>
							</RadioTitleBox>
						</Common.FlexBetweenBox>
						</>
						
						)}
					/>
					<Controller
						control={control} name="s_room_direction"
						render={({ field }) => (/*<>
							<RoomItemList2Box>
								<Common.TextBold12>주실 방향</Common.TextBold12>
								<RoomBorderView>
									<FromArrowIcon />
									<RNPickerSelect
										value={field.value}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										onValueChange={(value) => { field.onChange(value) }}
										placeholder={{ label: '방향' }}
										style={pickerStyle}
										items={[
											{ label: '동', value: '1' },
											{ label: '서', value: '2' },
											{ label: '남', value: '3' },
											{ label: '북', value: '4' },
											{ label: '남동', value: '5' },
											{ label: '남서', value: '6' },
											{ label: '북서', value: '7' },
											{ label: '북동', value: '8' },
										]}
									/>
								</RoomBorderView>
							</RoomItemList2Box>
						</>*/
						<>
						<InputBorder70Wrap>
							<Common.SubTitle  marginTN marginBN>주실 방향</Common.SubTitle>
							<ViewBorder70Btn>
								<FromArrowIcon />
								<RNPickerSelect
									value={field.value}
									useNativeAndroidPickerStyle={false}
									fixAndroidTouchableBug={false}
									onValueChange={(value) => { field.onChange(value) } }
									placeholder={{label: '방향'}}
									style={pickerStyle}
									items={[
										{label:'동', value:'1'},
										{label:'서', value:'2'},
										{label:'남', value:'3'},
										{label:'북', value:'4'},
										{label:'남동', value:'5'},
										{label:'남서', value:'6'},
										{label:'북서', value:'7'},
										{label:'북동', value:'8'},
									]}
								/>
							</ViewBorder70Btn>
						</InputBorder70Wrap>
						</>
						)}
					/>
					<Controller
						control={control} name="s_door_type"
						render={({ field }) => (/*<>
							<RoomItemList2Box>
								<SubTitle>현관 유형</SubTitle>
								<FlexRowBox>

									<RadioBox onPress={() => { field.onChange("1"); }} >
										{field.value == "1" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"계단식"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange("2"); }} >
										{field.value == "2" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"복도식"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange("3"); }} >
										{field.value == "3" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"복합식"}</RadioLable>
									</RadioBox>


								</FlexRowBox>
							</RoomItemList2Box>
						</>*/
						<>
						<Common.FlexBetweenBox marginT={18}>
							<Common.SubTitle marginTN>현관 유형</Common.SubTitle>
							<RadioTitleBox>
								
								<RadioBox onPress={()=>{ field.onChange("1"); }} >
									{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"계단식"}</Common.ViewBorderText>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange("2"); }} >
									{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"복도식"}</Common.ViewBorderText>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange("3"); }} >
									{field.value=="3"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"복합식"}</Common.ViewBorderText>
								</RadioBox>
								

							</RadioTitleBox>
						</Common.FlexBetweenBox>
						</>
						)}
					/>
					<Controller
						control={control} name="s_total_house_cnt"
						render={({ field }) => (/*<>
							<RoomItemList2Box>
								<Common.TextBold12>총 세대수</Common.TextBold12>
								<RoomView>
									<InputBorder placeholder={'세대수 입력'} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />
									<ItemTextR>개</ItemTextR>
								</RoomView>
							</RoomItemList2Box>
						</>*/
						<>
						<InputBorder70Wrap>
							<Common.SubTitle marginTN marginBN>총 세대수</Common.SubTitle>
							<Common.View>
								<InputBorder70 placeholder={'세대수 입력'} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />
								<UnitTit bold>개</UnitTit>
							</Common.View>
						</InputBorder70Wrap>
						</>
						)}
					/>
					{/*
					<Controller
						control={control} name="s_total_"
						rules={{required:{value:true,message:'주차대수를 입력해주세요'}}}
						render={({field})=>(<>
						<RoomItemList2Box>
							<Common.TextBold12>총 주차대수</Common.TextBold12>
							<RoomView>
								<InputBorder placeholder={'주차대수 입력'} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />
								<ItemTextR>개</ItemTextR>
							</RoomView>
						</RoomItemList2Box>
						</>)}
					/>
						*/}
					<Controller
						control={control} name="s_build_year"
						value={builtDate}
						render={({ field }) => (/*<>
							<RoomItemList2Box>
								<Common.TextBold12>준공일 선택</Common.TextBold12>
								<RoomViewBtn onPress={() => { setShowBuildPicker(true) }} >
									<InputBorder placeholder={'준공일 선택'} editable={false} value={field.value} onChangeText={field.onChange} />
									<DatePickerIcons source={require('../../../assets/img/drawable-xhdpi/bt_calendar.png')} />
								</RoomViewBtn>
							</RoomItemList2Box>
						</>*/
						<>
							<InputBorder70Wrap>
								<Common.SubTitle marginTN marginBN>준공일 선택</Common.SubTitle>
									<Common.View
										onPress={() => {
											setValue('s_move_in_type', 1);
											setDateInType(1)
											//setTargetValue('dateInDate'); 
											setShowDatePicker(true)
										}}>
										<ViewBorder70Btn  onPress={()=>{setShowBuildPicker(true)}}  placeholder={'준공일 선택'}  value={field.value}  >
											<Common.ViewBorderText>{field.value?field.value:'날짜 선택'}</Common.ViewBorderText>
										</ViewBorder70Btn>
										<DateIcon/>
									</Common.View>
									{/*
									<Common.View >
										<ViewBorder70Btn  onPress={()=>{setShowBuildPicker(true)}}  placeholder={'준공일 선택'}  value={field.value}  />
										<DateIcon/>
									</Common.View>*/}
							</InputBorder70Wrap>
						</>
						)}
					/>
					<Common.TitleBox marginT={20}><Common.Title>시설 및 옵션</Common.Title></Common.TitleBox>
					<Controller
						control={control} name="heatingOpt"
						defaultValue={getValues("heatingOpt")}
						value={getValues("heatingOpt")}
						render={({ field }) => (/*<>
							<SubTitle>난방방식 / 냉방시설</SubTitle>
							<OptionItemBox>
								{optHeat.map((item) => (
									<OptionList key={item.value} active={(_.find(getValues("heatingOpt"), i => i == item.value)) ? true : false}
										onPress={() => {

											const valueArr = getValues("heatingOpt");

											if (_.find(valueArr, i => i == item.value)) {
												_.remove(valueArr, i => i == item.value)
												setSelHeating([...valueArr]);

											} else {
												valueArr.push(item.value)
												setSelHeating([...valueArr]);
											}

										}}>
										<OptionTit>{item.label}</OptionTit>
									</OptionList>
								))}
							</OptionItemBox>
						</>*/
						<>
						<Common.SubTitle>난방방식 / 냉방시설</Common.SubTitle>
						<OptionItemBox>
							{optHeat.map((item) => (
								<Options key={item.value} active={(_.find(getValues("heatingOpt"), i => i == item.value)) ? true : false}
									onPress={()=>{
										const valueArr = getValues("heatingOpt");

											if (_.find(valueArr, i => i == item.value)) {
												_.remove(valueArr, i => i == item.value)
												setSelHeating([...valueArr]);

											} else {
												valueArr.push(item.value)
												setSelHeating([...valueArr]);
											}
										}}>

									<Common.TextLight14>{item.label}</Common.TextLight14>
								</Options>
							))}
						</OptionItemBox>
						</>
						)}
					/>
					<Controller
						control={control} name="livingOpt"
						defaultValue={getValues("livingOpt")}
						value={getValues("livingOpt")}
						render={({ field }) => (/*<>
							<SubTitle>생활시설</SubTitle>
							<OptionItemBox>
								{optLife.map((item) => (
									<OptionList key={item.value} active={(_.find(getValues("livingOpt"), i => i == item.value)) ? true : false}
										onPress={() => {

											const valueArr = getValues("livingOpt");
											if (_.find(valueArr, i => i == item.value)) {
												_.remove(valueArr, i => i == item.value)
												setSelLiving([...valueArr]);
											} else {
												valueArr.push(item.value)
												setSelLiving([...valueArr]);
											}

										}}>
										<OptionTit>{item.label}</OptionTit>
									</OptionList>
								))}
							</OptionItemBox>
						</>*/
						<>
						<Common.SubTitle>생활시설</Common.SubTitle>
						<OptionItemBox>
							{optLife.map((item) => (
								<Options key={item.value} active={(_.find(getValues("livingOpt"), i => i == item.value)) ? true : false}
									onPress={()=>{
										
										const valueArr = getValues("livingOpt");
										if (_.find(valueArr, i => i == item.value)) {
											_.remove(valueArr, i => i == item.value)
											setSelLiving([...valueArr]);
										} else {
											valueArr.push(item.value)
											setSelLiving([...valueArr]);
										}
										
									}}>
									<Common.TextLight14>{item.label}</Common.TextLight14>
								</Options>
							))}
						</OptionItemBox>
						</>
						
						)}
					/>
					<Controller
						control={control} name="securityOpt"
						defaultValue={getValues("securityOpt")}
						value={getValues("securityOpt")}
						render={({ field }) => (/*<>
							<SubTitle>보안시설</SubTitle>
							<OptionItemBox>
								{optSecure.map((item) => (
									<OptionList key={item.value} active={(_.find(getValues("securityOpt"), i => i == item.value)) ? true : false}
										onPress={() => {

											const valueArr = getValues("securityOpt");
											if (_.find(valueArr, i => i == item.value)) {
												_.remove(valueArr, i => i == item.value)
												setSelSecurity([...valueArr]);
											} else {
												valueArr.push(item.value)
												setSelSecurity([...valueArr]);
											}
											
										}}>
										<OptionTit>{item.label}</OptionTit>
									</OptionList>
								)
								
								
								)}
							</OptionItemBox>
						</>*/
						<>
						<Common.SubTitle>보안시설</Common.SubTitle>
						<OptionItemBox>
							{optSecure.map((item) => (
								<Options key={item.value} active={(_.find(getValues("securityOpt"), i => i == item.value)) ? true : false}
									onPress={()=>{
									
										const valueArr = getValues("securityOpt");
										if (_.find(valueArr, i => i == item.value)) {
											_.remove(valueArr, i => i == item.value)
											setSelSecurity([...valueArr]);
										} else {
											valueArr.push(item.value)
											setSelSecurity([...valueArr]);
										}
										
									}}>
									<Common.TextLight14>{item.label}</Common.TextLight14>
								</Options>
							))}
						</OptionItemBox>
						</>
						
						)}
					/>
					<Controller
						control={control} name="etcOpt"
						defaultValue={getValues("etcOpt")}
						value={getValues("etcOpt")}
						render={({ field }) => (/*<>
							<SubTitle>기타옵션</SubTitle>
							<OptionItemBox>
								{optEtc.map((item) => (
									<OptionList key={item.value} active={(_.find(getValues("etcOpt"), i => i == item.value)) ? true : false}
										onPress={() => {

											const valueArr = getValues("etcOpt");
											if (_.find(valueArr, i => i == item.value)) {
												_.remove(valueArr, i => i == item.value)
												setSelEtc([...valueArr]);
											} else {
												valueArr.push(item.value)
												setSelEtc([...valueArr]);
											}
											}}>
										<OptionTit>{item.label}</OptionTit>
									</OptionList>
								))}
							</OptionItemBox>
						</>*/
						<>
						<Common.SubTitle>기타옵션</Common.SubTitle>
						<OptionItemBox>
							{optEtc.map((item) => (
								<Options key={item.value} active={(_.find(getValues("etcOpt"), i => i == item.value)) ? true : false}
									onPress={()=>{
										
										const valueArr = getValues("etcOpt");
										if (_.find(valueArr, i => i == item.value)) {
											_.remove(valueArr, i => i == item.value)
											setSelEtc([...valueArr]);
										} else {
											valueArr.push(item.value)
											setSelEtc([...valueArr]);
										}
									}}>
									<Common.TextLight14>{item.label}</Common.TextLight14>
								</Options>
							))}
						</OptionItemBox>
						</>
						)}
					/>
					<Common.SubTitle>태그등록</Common.SubTitle>
					<Common.View>
						<Controller
							control={control} name="tagText"
							defaultValue={""}
							value={""}
							render={({ field }) => (
								<Common.InputBorder placeholder={'태그입력(예, #풀옵션, #전망좋음 등)'} onChangeText={(value) => { setValue('tagText', value) }} />
							)}
						/>
						<TagAddBtn onPress={() => {
							console.log("등록");
							const valueArr = getValues("tags");
							valueArr.push(getValues("tagText"));
							console.log(valueArr);
							setSelTags([...valueArr]);
							setValue('tagText', '')
						}} >
							<Common.TextSemiBold12>등록</Common.TextSemiBold12>
						</TagAddBtn>
					</Common.View>



					<TagBox>
						{
							selTags.map((el, index) => {
								return (
									<Tag>
										<Common.TouchableOpacity onPress={() => {
											const valueArr = getValues("tags");

											console.log(valueArr);
											valueArr.splice(index, 1);
											setSelTags([...valueArr]);

										}}><CencelImg /></Common.TouchableOpacity>
										<TagText>#{el}</TagText>
									</Tag>
								)
							})
						}

					</TagBox>
					<Controller
						control={control} name="s_content" defaultValue=""
						render={({ field }) => (/*<>
							<SubTitle>상세설명</SubTitle>
							<RoomTextArea
								alue={field.value}
								placeholder={"상세설명 입력"}
								multiline={true}
								onChangeText={field.onChange}
							/>
						</>*/
						<>
							<Common.SubTitle>상세설명</Common.SubTitle>
							<RoomTextArea
								alue={field.value}
								placeholder={"상세설명 입력"}
								multiline = {true}
								onChangeText={field.onChange}
							/>
						</>
						)}
					/>
					<Common.TextLight13>※ 매물에 대한 추가 설명을 자유롭게 작성해주세요.</Common.TextLight13>

			</KeyboardAvoidingView>
		</Common.ScrollContainer>
			<Common.FloatBtnBox>
				{mode == "new" &&
					<Common.FloatBtnsss onPress={() => { showAlertMessage('준비중입니다.') }} >
						<Common.TextBold16>임시 저장</Common.TextBold16>
					</Common.FloatBtnsss>
				}
				<Common.FloatBtnsss btnColor={Colors.mainColor} onPress={() => { prevPage(); }}>
					<Common.TextBold16>이전 단계</Common.TextBold16>
				</Common.FloatBtnsss>

				<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={handleSubmit(onValid, onInvalid)} >
					<Common.TextBold16 color={Colors.whiteColor}  >등록 완료</Common.TextBold16>
				</Common.FloatBtnsss>

			</Common.FloatBtnBox>
	</>)
}

const pickerStyle = {
	placeholderColor: '#000',
	inputIOS: { color: '#000', height: 34, fontSize: 12, },
	inputAndroid: { color: '#000', height: 34, fontSize: 12, paddingVertical: 0 },
}
export default StepThreeScreen