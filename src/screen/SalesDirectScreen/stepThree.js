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
					<Common.TitleBox><Common.Title>?????? ??????</Common.Title></Common.TitleBox>
					<Controller
						control={control}
						name="s_individual_cost_yn"
						defaultValue={false}
						value={getValues("s_individual_cost_yn")}
						render={({ field }) => (
							/*
							<Common.FlexBetweenBox marginT={18}>
								<Common.SubTitle marginTN>?????? ?????????</Common.SubTitle>
								<RadioTitleBox>
									<RadioBox  onPress={() => { setValue("s_individual_cost_yn", '1'); field.onChange }} >
										{field.value==true?<RadioBtnActive/>:<RadioBtn/>}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
									</RadioBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '0'); setValue("indiFeeList", []); field.onChange }} >
										{field.value==false?<RadioBtnActive/>:<RadioBtn/>}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
									</RadioBox>
								</RadioTitleBox>
							</Common.FlexBetweenBox>
							*/
							
							<Common.FlexBetweenBox marginT={18}>
								<Common.SubTitle marginTN>?????? ?????????</Common.SubTitle>
								<RadioTitleBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '1'); field.onChange }} >
										{field.value==true?<RadioBtnActive/>:<RadioBtn/>}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
									</RadioBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '0'); setValue("indiFeeList", []); field.onChange }} >
										{field.value==false?<RadioBtnActive/>:<RadioBtn/>}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
									</RadioBox>
								</RadioTitleBox>
							</Common.FlexBetweenBox>

							/*
							<RadioTitleBox>
								<SubTitle>?????? ?????????</SubTitle>
								<FlexRowBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '1'); field.onChange }}>
										{field.value == true ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { setValue("s_individual_cost_yn", '0'); setValue("indiFeeList", []); field.onChange }}>
										{field.value == false ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
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
							<SubTitle>?????? ????????? ??????</SubTitle>
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
									<Common.SubTitle>?????? ????????? ??????</Common.SubTitle>
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
							<SubTitle>?????? ??????</SubTitle>
							<ViewBorder>
								<FromArrowIcon />
								<RNPickerSelect
									value={field.value}
									onValueChange={(value) => { field.onChange(value); /*setContractType(value)* }}
									placeholder={{ label: '?????? ?????? ??????' }}
									useNativeAndroidPickerStyle={false}
									fixAndroidTouchableBug={false}
									style={pickerStyle}
									items={[
										{ label: '????????? ??????', value: 'NonLoan' },
										{ label: '?????? ?????? 30% ??????', value: '30Below' },
										{ label: '?????? ?????? 30% ??????', value: '30More' },
									]}
								/>
							</ViewBorder>
						</>*/
						<>
							<Common.SubTitle>?????? ??????</Common.SubTitle>
							<Common.ViewBorder marginBN>
								<FromArrowIcon/>
								<RNPickerSelect
									value={field.value}
									onValueChange={(value) => { field.onChange(value); /*setContractType(value)*/ } }
									placeholder={{label: '?????? ?????? ??????'}}
									useNativeAndroidPickerStyle={false}
									fixAndroidTouchableBug={false}
									style={pickerStyle}
									items={[
										{label:'????????? ??????', value:'n'},
										{label:'?????? ?????? 30% ??????', value:'b'},
										{label:'?????? ?????? 30% ??????', value:'a'},
									]}
								/>
							</Common.ViewBorder>
						</>
						)}
					/>
					<Common.SubTitle>?????? ?????????</Common.SubTitle>
					<Common.FlexBetweenBox>
						<Controller
							control={control} name="s_move_in_type"
							render={({ field }) => (
							<>
								<RadioBox onPress={() => { field.onChange(0); setDateInType(0); setValue('dateInDate', '') }} >
									{dateInType == 0 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"????????????"}</Common.ViewBorderText>
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
												<DateTextTextL>{field.value ? field.value : '?????? ??????'}</DateTextTextL>
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
										<Common.ViewBorderText>{field.value?field.value:'?????? ??????'}</Common.ViewBorderText>
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
									{field.value ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>????????? ?????? ??????</Common.ViewBorderText>
								</GreyChkBtn>
							</GreyBox2>
							*/
							<GreyBox2>
								<RadioBox onPress={() => { field.onChange(!field.value) }}>
									{field.value ? <ChkActive/> : <ChkBtn/>}<Common.ViewBorderText>????????? ?????? ??????</Common.ViewBorderText>
								</RadioBox>
							</GreyBox2>
						)}
					/>
					<Controller
						control={control} name="s_floor_exps"
						render={({ field }) => (
						/*<>
							<RoomItemList2Box>
								<SubTitle>??? ??????</SubTitle>
								<FlexRowBox>
									<RadioBox onPress={() => { field.onChange(true) }} >
										{field.value == true ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"???"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange(false) }} >
										{field.value == false ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"?????????"}</RadioLable>
									</RadioBox>
									<FloorText>(??? ???/??? ???/??? ??? ??????)</FloorText>
								</FlexRowBox>

							</RoomItemList2Box>
						</>*/
						<>
							<Common.FlexBetweenBox marginT={18}>
								<Common.SubTitle marginTN>??? ??????</Common.SubTitle>
								<RadioTitleBox>
									<RadioBox onPress={() => { field.onChange(true) }} >
										{field.value==true? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"???"}</Common.ViewBorderText> 
									</RadioBox>
									<RadioBox onPress={()=>{ field.onChange(false) }} >
										{field.value==false? <RadioBtnActive/> : <RadioBtn/>}
										<Common.ViewBorderText>{"?????????"}<Common.ViewBorderText color={Colors.textNonColors}>(??? ???/??? ???/??? ??? ??????)</Common.ViewBorderText></Common.ViewBorderText>
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
								<SubTitle>???, ?????? ??????</SubTitle>
								<FlexRowBox >
									<RadioBox onPress={() => { field.onChange("1"); }} >
										{field.value == "1" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"?????????"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange("2"); }} >
										{field.value == "2" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"?????????"}</RadioLable>
									</RadioBox>
								</FlexRowBox>
							</RoomItemList2Box>
						</>*/
						<>
						<Common.FlexBetweenBox marginT={18}>
							<Common.SubTitle marginTN>???, ?????? ??????</Common.SubTitle>
							<RadioTitleBox >
								<RadioBox onPress={()=>{ field.onChange("1"); }} >
									{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"?????????"}</Common.ViewBorderText>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange("2"); }} >
									{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"?????????"}</Common.ViewBorderText>
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
								<SubTitle>?????? ?????? ??????</SubTitle>
								<FlexRowBox >
									<RadioBox onPress={() => { field.onChange("1"); }} >
										{field.value == "1" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange("2"); }} >
										{field.value == "2" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
									</RadioBox>

								</FlexRowBox>
							</RoomItemList2Box>
						</>*/
						<>
						<Common.FlexBetweenBox marginT={18}>
							<Common.SubTitle marginTN>?????? ?????? ??????</Common.SubTitle>
							<RadioTitleBox >
								<RadioBox onPress={()=>{ field.onChange("1"); }} >
									{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange("2"); }} >
									{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
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
								<Common.TextBold12>?????? ??????</Common.TextBold12>
								<RoomBorderView>
									<FromArrowIcon />
									<RNPickerSelect
										value={field.value}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										onValueChange={(value) => { field.onChange(value) }}
										placeholder={{ label: '??????' }}
										style={pickerStyle}
										items={[
											{ label: '???', value: '1' },
											{ label: '???', value: '2' },
											{ label: '???', value: '3' },
											{ label: '???', value: '4' },
											{ label: '??????', value: '5' },
											{ label: '??????', value: '6' },
											{ label: '??????', value: '7' },
											{ label: '??????', value: '8' },
										]}
									/>
								</RoomBorderView>
							</RoomItemList2Box>
						</>*/
						<>
						<InputBorder70Wrap>
							<Common.SubTitle  marginTN marginBN>?????? ??????</Common.SubTitle>
							<ViewBorder70Btn>
								<FromArrowIcon />
								<RNPickerSelect
									value={field.value}
									useNativeAndroidPickerStyle={false}
									fixAndroidTouchableBug={false}
									onValueChange={(value) => { field.onChange(value) } }
									placeholder={{label: '??????'}}
									style={pickerStyle}
									items={[
										{label:'???', value:'1'},
										{label:'???', value:'2'},
										{label:'???', value:'3'},
										{label:'???', value:'4'},
										{label:'??????', value:'5'},
										{label:'??????', value:'6'},
										{label:'??????', value:'7'},
										{label:'??????', value:'8'},
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
								<SubTitle>?????? ??????</SubTitle>
								<FlexRowBox>

									<RadioBox onPress={() => { field.onChange("1"); }} >
										{field.value == "1" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"?????????"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange("2"); }} >
										{field.value == "2" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"?????????"}</RadioLable>
									</RadioBox>
									<RadioBox onPress={() => { field.onChange("3"); }} >
										{field.value == "3" ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"?????????"}</RadioLable>
									</RadioBox>


								</FlexRowBox>
							</RoomItemList2Box>
						</>*/
						<>
						<Common.FlexBetweenBox marginT={18}>
							<Common.SubTitle marginTN>?????? ??????</Common.SubTitle>
							<RadioTitleBox>
								
								<RadioBox onPress={()=>{ field.onChange("1"); }} >
									{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"?????????"}</Common.ViewBorderText>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange("2"); }} >
									{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"?????????"}</Common.ViewBorderText>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange("3"); }} >
									{field.value=="3"? <RadioBtnActive/> : <RadioBtn/>}<Common.ViewBorderText>{"?????????"}</Common.ViewBorderText>
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
								<Common.TextBold12>??? ?????????</Common.TextBold12>
								<RoomView>
									<InputBorder placeholder={'????????? ??????'} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />
									<ItemTextR>???</ItemTextR>
								</RoomView>
							</RoomItemList2Box>
						</>*/
						<>
						<InputBorder70Wrap>
							<Common.SubTitle marginTN marginBN>??? ?????????</Common.SubTitle>
							<Common.View>
								<InputBorder70 placeholder={'????????? ??????'} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />
								<UnitTit bold>???</UnitTit>
							</Common.View>
						</InputBorder70Wrap>
						</>
						)}
					/>
					{/*
					<Controller
						control={control} name="s_total_"
						rules={{required:{value:true,message:'??????????????? ??????????????????'}}}
						render={({field})=>(<>
						<RoomItemList2Box>
							<Common.TextBold12>??? ????????????</Common.TextBold12>
							<RoomView>
								<InputBorder placeholder={'???????????? ??????'} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />
								<ItemTextR>???</ItemTextR>
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
								<Common.TextBold12>????????? ??????</Common.TextBold12>
								<RoomViewBtn onPress={() => { setShowBuildPicker(true) }} >
									<InputBorder placeholder={'????????? ??????'} editable={false} value={field.value} onChangeText={field.onChange} />
									<DatePickerIcons source={require('../../../assets/img/drawable-xhdpi/bt_calendar.png')} />
								</RoomViewBtn>
							</RoomItemList2Box>
						</>*/
						<>
							<InputBorder70Wrap>
								<Common.SubTitle marginTN marginBN>????????? ??????</Common.SubTitle>
									<Common.View
										onPress={() => {
											setValue('s_move_in_type', 1);
											setDateInType(1)
											//setTargetValue('dateInDate'); 
											setShowDatePicker(true)
										}}>
										<ViewBorder70Btn  onPress={()=>{setShowBuildPicker(true)}}  placeholder={'????????? ??????'}  value={field.value}  >
											<Common.ViewBorderText>{field.value?field.value:'?????? ??????'}</Common.ViewBorderText>
										</ViewBorder70Btn>
										<DateIcon/>
									</Common.View>
									{/*
									<Common.View >
										<ViewBorder70Btn  onPress={()=>{setShowBuildPicker(true)}}  placeholder={'????????? ??????'}  value={field.value}  />
										<DateIcon/>
									</Common.View>*/}
							</InputBorder70Wrap>
						</>
						)}
					/>
					<Common.TitleBox marginT={20}><Common.Title>?????? ??? ??????</Common.Title></Common.TitleBox>
					<Controller
						control={control} name="heatingOpt"
						defaultValue={getValues("heatingOpt")}
						value={getValues("heatingOpt")}
						render={({ field }) => (/*<>
							<SubTitle>???????????? / ????????????</SubTitle>
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
						<Common.SubTitle>???????????? / ????????????</Common.SubTitle>
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
							<SubTitle>????????????</SubTitle>
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
						<Common.SubTitle>????????????</Common.SubTitle>
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
							<SubTitle>????????????</SubTitle>
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
						<Common.SubTitle>????????????</Common.SubTitle>
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
							<SubTitle>????????????</SubTitle>
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
						<Common.SubTitle>????????????</Common.SubTitle>
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
					<Common.SubTitle>????????????</Common.SubTitle>
					<Common.View>
						<Controller
							control={control} name="tagText"
							defaultValue={""}
							value={""}
							render={({ field }) => (
								<Common.InputBorder placeholder={'????????????(???, #?????????, #???????????? ???)'} onChangeText={(value) => { setValue('tagText', value) }} />
							)}
						/>
						<TagAddBtn onPress={() => {
							console.log("??????");
							const valueArr = getValues("tags");
							valueArr.push(getValues("tagText"));
							console.log(valueArr);
							setSelTags([...valueArr]);
							setValue('tagText', '')
						}} >
							<Common.TextSemiBold12>??????</Common.TextSemiBold12>
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
							<SubTitle>????????????</SubTitle>
							<RoomTextArea
								alue={field.value}
								placeholder={"???????????? ??????"}
								multiline={true}
								onChangeText={field.onChange}
							/>
						</>*/
						<>
							<Common.SubTitle>????????????</Common.SubTitle>
							<RoomTextArea
								alue={field.value}
								placeholder={"???????????? ??????"}
								multiline = {true}
								onChangeText={field.onChange}
							/>
						</>
						)}
					/>
					<Common.TextLight13>??? ????????? ?????? ?????? ????????? ???????????? ??????????????????.</Common.TextLight13>

			</KeyboardAvoidingView>
		</Common.ScrollContainer>
			<Common.FloatBtnBox>
				{mode == "new" &&
					<Common.FloatBtnsss onPress={() => { showAlertMessage('??????????????????.') }} >
						<Common.TextBold16>?????? ??????</Common.TextBold16>
					</Common.FloatBtnsss>
				}
				<Common.FloatBtnsss btnColor={Colors.mainColor} onPress={() => { prevPage(); }}>
					<Common.TextBold16>?????? ??????</Common.TextBold16>
				</Common.FloatBtnsss>

				<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={handleSubmit(onValid, onInvalid)} >
					<Common.TextBold16 color={Colors.whiteColor}  >?????? ??????</Common.TextBold16>
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