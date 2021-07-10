import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Fragment, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import Colors from '../../../assets/colors';
import RNPickerSelect from "react-native-picker-select";
/* UTILS */
import { Controller, useForm } from "react-hook-form";
import {DayToDate} from "../../utils/common/calculator";
import ModalCommon from "../Modal/ModalCommon";
import Modal from "react-native-modal";
import { ModalBtn, ModalBtnBox, ModalContainer, ModalHeader, ModalTextCont } from '../../styled/modal/modalStyle';
import * as Common from '../../styled/commonStyle';
import { FromArrowIcon } from '../../components/common/ArrowIcon';

// calendar
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import {pad} from '../../utils/common/calculator'
import {CalendarBox,TimeSetBox,TimeSelectBox,SelectTit,TimeSetInfoBox,TimeSetInfoTit,CalendarHeaderBg,CHeaderBtnR,CHeaderBtnL,
	CalendarLabel,Label01,Label02,Label03,Label04,DatePickWrap,CalendarDatePick,DatePickTitle,CYellowBox,DayBtn,DayText} from '../../styled/chatStyle/calendarStyle.js';

import { range } from 'lodash';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showAlert } from '../../reducers/contactCalendarSetReducer';


const ProContract = ({ appt, submitResult, selectedDate, availableDate,  selectedDateStr, handleInit, handleOnDaySelect, handleOnDateSelect, handleOnAVSelect, handleSchdSubmit, handleInitSchd, handleSchdSubmitDetail, alertMsg, handleClear, handleShowAlert }) => {

	//GET ROUTE & NAVIGATION
	const {control, handleSubmit, getValues, setValue, clearErrors} = useForm()

	const dispatch = useDispatch();
	console.log("alertMsg========================================")
	console.log(alertMsg)

	const route = useRoute(), navigation = useNavigation()
	const [datePickerSet, setDatePickerSet] = useState(false)
	const [selHours, setSelHours] = useState([]);
	const [selMin, setSelMin] = useState([]);

	const [today, setToday] = useState("");
	const [blackDate, setBlackDate] = useState("");
	const [yellowDate, setYellowDate] = useState([]);
	const [saID, setSaID] = useState(0);
	const week = ['일', '월', '화', '수', '목', '금', '토'];
	const todayDate = new Date();

	const sID = route.params.s_id;

	console.log("selectedDate=================-=-=--=-=========");
	console.log(availableDate[0][selectedDateStr]);
	//console.log(availableDate[0]);
	var allDate = {};
	Object.assign(allDate, availableDate[0]);
	Object.assign(allDate, selectedDate);
	//console.log(allDate);

	useEffect(()=>{
		setSaID(appt.sa_id);
		handleInitSchd(appt.sa_id);
	},[appt])

	useEffect(()=>{
		console.log("날짜 선택");
		handleOnDateSelect({dateValue:blackDate, cssType:{startingDay: true, color: '#000', textColor:'#ffe800', endingDay: true} });
	},[blackDate])

	const onSelectedDateChange = (dateVal) => {
		setBlackDate(dateVal);
	}

	const [avDate, setAvDate] = useState({data:[]});


	const onAddAVDate = (dateVal, mode, weekOnOff=false, startHour=null,startMin=null,endHour=null, endMin=null) => {

		//if (startHour==null || startMin == null || endHour == null || endMin==null) {
		//	handleShowAlert("시간을 입력 해 주세요.");
		//}else {

			let tmpYellowDate = yellowDate;
			tmpYellowDate.push(dateVal);
			if (dateVal != "") {
				
				var tmpAvDate = avDate.data;
				if (mode=='week') {

					if (weekOnOff) {
						tmpAvDate.push(dateVal);
					}else {
						tmpAvDate.splice( tmpAvDate.indexOf(dateVal), 1 );
					}
					weekDateArray = tmpAvDate
				}else {
					if (tmpAvDate.indexOf(dateVal)>=0) {
						tmpAvDate.splice( tmpAvDate.indexOf(dateVal), 1 );
					}else {
						tmpAvDate.push(dateVal);
					}
				}
				setAvDate({data:tmpAvDate});
				handleOnAVSelect( {dateValue:dateVal, cssType: {disabled: true, startingDay: true, color: '#ffe800' ,textColor: '#000', endingDay: true, startHour:startHour, startMin:startMin, endHour:endHour, endMin:endMin  }, mode:mode, weekOnOff:weekOnOff} );
				setValue('regular_start_hour','');  
				setValue('regular_start_minute',''); 
				setValue('regular_end_hour','');
				setValue('regular_end_minute','');
			}
		//}
	}

	useEffect(()=>{

		var hours = [];
		for(var i=0; i<=12;i++) {
			hours[i] = {value:`${ pad(i+9) }`, label:`${i+9}`};
		}

		setSelHours(hours);
		setSelMin( [{value:'00',label:'00'},{value:'30',label:'30'}] );

		setToday(`${todayDate.getFullYear()}-${pad(range(1,13)[todayDate.getMonth()])}-${pad(todayDate.getDate())}`);
		handleOnAVSelect( {dateValue:`${todayDate.getFullYear()}-${pad(range(1,13)[todayDate.getMonth()])}-${pad(todayDate.getDate())}`, cssType: {startingDay: true, color: '#f3f3f3', textColor:'#000', endingDay: true} } );

		const handleEffect = async (props) => {
			handleInit(route.params.s_id);
			setValue('sa_pattern_mon',0);
			setValue('sa_pattern_tue',0);
			setValue('sa_pattern_wed',0);
			setValue('sa_pattern_thu',0);
			setValue('sa_pattern_fri',0);
			setValue('sa_pattern_sat',0);
			setValue('sa_pattern_sun',0);
		}
		handleEffect()
	},[]);

	const CalendarPrevIcon = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back_02.png')} />)
	const CalendarNextIcon = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back.png')} />)
	const ChkIcon =() => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkIconActive =() => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	
	const CWidth = (Dimensions.get('window').width);

	LocaleConfig.locales['fr'] = {
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['01.','02.','03','04','05','06','07.','08','09.','10.','11.','12.'],
		dayNames: ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'],
		dayNamesShort: ['월','화','수','목','금','토','일'],
		today: 'Aujourd\'hui'
	};
	useEffect(
		() =>{
		  navigation.addListener('beforeRemove', (e) => {

			handleClear();
			  	return false;
					
					/*
					if (!hasUnsavedChanges) {
					  // If we don't have unsaved changes, then we don't need to do anything
					  return;
					}
				
					// Prevent default behavior of leaving the screen
					e.preventDefault();
				
					// Prompt the user before leaving the screen
					Alert.alert(
					  'Discard changes?',
					  'You have unsaved changes. Are you sure to discard them and leave the screen?',
					  [
						{ text: "Don't leave", style: 'cancel', onPress: () => {} },
						{
						  text: 'Discard',
						  style: 'destructive',
						  // If the user confirmed, then we dispatch the action we blocked earlier
						  // This will continue the action that had triggered the removal of the screen
						  onPress: () => navigation.dispatch(e.data.action),
						},
					  ]
					);
					*/
		  		}
			)
		}
		,
		[navigation]
	  );
	
	const DaySelBox = () =>{
		return(
			<>
				<Common.TouchableOpacity  onPress={()=>{ DayToDate(todayDate.getMonth()+1, 0).forEach(el => { onAddAVDate(el, 'week', appt.sa_pattern_mon ==0, getValues('regular_start_hour'),  getValues('regular_start_minute'), getValues('regular_end_hour'), getValues('regular_end_minute') );}); handleOnDaySelect({key:'sa_pattern_mon', value:(appt.sa_pattern_mon ==0 ? 1:0), sa_from_hour:getValues('regular_start_hour'), sa_from_minute:getValues('regular_start_minute'), sa_to_hour:getValues('regular_end_hour'), sa_to_minute:getValues('regular_end_minute') }); }} >
					{appt.sa_pattern_mon ==0 ? <DayBtn><DayText>월</DayText></DayBtn>:<DayBtn active><DayText active>월</DayText></DayBtn>}
				</Common.TouchableOpacity>

				<Common.TouchableOpacity  onPress={()=>{ DayToDate(todayDate.getMonth()+1, 1).forEach(el => {onAddAVDate(el, 'week', appt.sa_pattern_tue ==0, getValues('regular_start_hour'),  getValues('regular_start_minute'), getValues('regular_end_hour'), getValues('regular_end_minute') );}); handleOnDaySelect({key:'sa_pattern_tue', value:(appt.sa_pattern_tue ==0 ? 1:0), sa_from_hour:getValues('regular_start_hour'), sa_from_minute:getValues('regular_start_minute'), sa_to_hour:getValues('regular_end_hour'), sa_to_minute:getValues('regular_end_minute')  });  }}  >
					{appt.sa_pattern_tue ==0 ? <DayBtn><DayText>화</DayText></DayBtn>:<DayBtn active><DayText active>화</DayText></DayBtn>}
				</Common.TouchableOpacity>
				
				<Common.TouchableOpacity  onPress={()=>{ DayToDate(todayDate.getMonth()+1, 2).forEach(el => {onAddAVDate(el, 'week', appt.sa_pattern_wed ==0, getValues('regular_start_hour'),  getValues('regular_start_minute'), getValues('regular_end_hour'), getValues('regular_end_minute') );}); handleOnDaySelect({key:'sa_pattern_wed', value: (appt.sa_pattern_wed ==0 ? 1:0), sa_from_hour:getValues('regular_start_hour'), sa_from_minute:getValues('regular_start_minute'), sa_to_hour:getValues('regular_end_hour'), sa_to_minute:getValues('regular_end_minute')  });    }} >
					{appt.sa_pattern_wed ==0 ? <DayBtn><DayText>수</DayText></DayBtn>:<DayBtn active><DayText active>수</DayText></DayBtn>}
				</Common.TouchableOpacity>
				
				<Common.TouchableOpacity  onPress={()=>{ DayToDate(todayDate.getMonth()+1, 3).forEach(el => {onAddAVDate(el, 'week', appt.sa_pattern_thu ==0, getValues('regular_start_hour'),  getValues('regular_start_minute'), getValues('regular_end_hour'), getValues('regular_end_minute') );}); handleOnDaySelect({key:'sa_pattern_thu', value: (appt.sa_pattern_thu ==0 ? 1:0), sa_from_hour:getValues('regular_start_hour'), sa_from_minute:getValues('regular_start_minute'), sa_to_hour:getValues('regular_end_hour'), sa_to_minute:getValues('regular_end_minute')  });   }} >
					{appt.sa_pattern_thu ==0 ? <DayBtn><DayText>목</DayText></DayBtn>:<DayBtn active><DayText active>목</DayText></DayBtn>}
				</Common.TouchableOpacity>
				
				<Common.TouchableOpacity  onPress={()=>{ DayToDate(todayDate.getMonth()+1, 4).forEach(el => {onAddAVDate(el, 'week', appt.sa_pattern_fri ==0, getValues('regular_start_hour'),  getValues('regular_start_minute'), getValues('regular_end_hour'), getValues('regular_end_minute') );}); handleOnDaySelect({key:'sa_pattern_fri', value: (appt.sa_pattern_fri ==0 ? 1:0), sa_from_hour:getValues('regular_start_hour'), sa_from_minute:getValues('regular_start_minute'), sa_to_hour:getValues('regular_end_hour'), sa_to_minute:getValues('regular_end_minute')  });   }} >
					{appt.sa_pattern_fri ==0 ? <DayBtn><DayText>금</DayText></DayBtn>:<DayBtn active><DayText active>금</DayText></DayBtn>}
				</Common.TouchableOpacity>
				
				<Common.TouchableOpacity  onPress={()=>{ DayToDate(todayDate.getMonth()+1, 5).forEach(el => {onAddAVDate(el, 'week', appt.sa_pattern_sat ==0, getValues('regular_start_hour'),  getValues('regular_start_minute'), getValues('regular_end_hour'), getValues('regular_end_minute') );}); handleOnDaySelect({key:'sa_pattern_sat', value: (appt.sa_pattern_sat ==0 ? 1:0), sa_from_hour:getValues('regular_start_hour'), sa_from_minute:getValues('regular_start_minute'), sa_to_hour:getValues('regular_end_hour'), sa_to_minute:getValues('regular_end_minute')  });   }} >
					{appt.sa_pattern_sat ==0 ? <DayBtn><DayText>토</DayText></DayBtn>:<DayBtn active><DayText active>토</DayText></DayBtn>}
				</Common.TouchableOpacity>
				
				<Common.TouchableOpacity  onPress={()=>{ DayToDate(todayDate.getMonth()+1, 6).forEach(el => {onAddAVDate(el, 'week', appt.sa_pattern_sun ==0, getValues('regular_start_hour'),  getValues('regular_start_minute'), getValues('regular_end_hour'), getValues('regular_end_minute') );}); handleOnDaySelect({key:'sa_pattern_sun', value: (appt.sa_pattern_sun ==0 ? 1:0), sa_from_hour:getValues('regular_start_hour'), sa_from_minute:getValues('regular_start_minute'), sa_to_hour:getValues('regular_end_hour'), sa_to_minute:getValues('regular_end_minute')  });   }} >
					{appt.sa_pattern_sun ==0 ? <DayBtn><DayText>일</DayText></DayBtn>:<DayBtn active><DayText active>일</DayText></DayBtn>}
				</Common.TouchableOpacity>
			</>
		)
	}

	LocaleConfig.defaultLocale = 'fr';	
	const [showPop, setShowPop] = useState(true)
	
	return(
		<Common.ZipandaSafeView>
			{alertMsg.length > 0 &&
			<Modal isVisible={showPop}>
				<ModalContainer>
					<ModalHeader>
						<Common.TextSemiBold14>{''}</Common.TextSemiBold14>
						<Common.Common.TouchableOpacity ><Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_menu_close.png')}/></Common.Common.TouchableOpacity>
					</ModalHeader>
					<ModalTextCont>
						<Common.TextBold14>{ alertMsg[0].msg }</Common.TextBold14>
					</ModalTextCont>
					<ModalBtnBox>
						<ModalBtn onPress={()=>{ setShowPop(false) }}><Common.TextSemiBold14 color={Colors.whiteColor}>확인</Common.TextSemiBold14></ModalBtn>
					</ModalBtnBox>
				</ModalContainer>
			</Modal>
			}

			<ModalCommon isVisible={submitResult.code!=undefined}/>
			<Common.ScrollContainer paddingN>
				<CYellowBox>
					<DaySelBox/>
				</CYellowBox>
				<DatePickWrap>
					<Common.Title>매주	 {appt.sa_pattern_mon==1 ? "월 / ":""}
								{appt.sa_pattern_tue==1 ? "화 / ":""}
								{appt.sa_pattern_wed==1 ? "수 / ":""}
								{appt.sa_pattern_thu==1 ? "목 / ":""}
								{appt.sa_pattern_fri==1 ? "금 / ":""}
								{appt.sa_pattern_sat==1 ? "토 / ":""}
								{appt.sa_pattern_sun==1 ? "일 / ":""}
					</Common.Title>
					<TimeSetBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								{selHours &&
									<Controller
										control={control}
										name="regular_start_hour"
										defaultValue={getValues("regular_start_hour")}
										render={({ field }) => (<>
											<RNPickerSelect
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												value={field.value}
												defaultValue={"09"}
												onValueChange={ (value) => {
													if (value) {
														setValue("regular_start_hour", value)
													}
												}}
												placeholder={{ label: '시간 선택' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												items={selHours}
												style={pickerStyle}
											/>
										</>)}
									/>
								}
							</TimeSelectBox>
							<SelectTit>시</SelectTit>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								<Controller
								control={control}
								name="regular_start_minute"
								defaultValue={getValues("regular_start_minute")}
								render={({ field }) => (<>
									<RNPickerSelect
										value={field.value}
										defaultValue={"00"}
										onValueChange={(value) => {
											if (value) {
												setValue("regular_start_minute", value)
											}
										}}
										placeholder={{ label: '분 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={selMin}
										style={pickerStyle}
									/>
								</>)}
								/>
							</TimeSelectBox>
							<SelectTit setS>분 까지</SelectTit>
						</Common.FlexRowBox>
					</TimeSetBox>
					<TimeSetBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								{
									<Controller
										control={control}
										name="regular_end_hour" 
										defaultValue={getValues("regular_end_hour")}
										items={selHours}
										render={({ field }) => (<>
											<RNPickerSelect
												value={field.value}
												defaultValue={"20"}
												onValueChange={ (value) => {
													if (value) {
														setValue("regular_end_hour", value)
													}
												}}
												placeholder={{ label: '시간 선택' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												items={selHours}
												style={pickerStyle}
											/>
										</>)}
									/>
								}
							</TimeSelectBox>
							<SelectTit>시</SelectTit>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								<Controller
								control={control}
								name="regular_end_minute" 
								defaultValue={getValues("regular_end_minute")}
								render={({ field }) => (<>
									<RNPickerSelect
										value={field.value}
										defaultValue={getValues("regular_end_minute")}
										onValueChange={(value) => {
											if (value) {
												setValue("regular_end_minute", value);
											}
										}}
										placeholder={{ label: '분 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={selMin}
										style={pickerStyle}
									/>
								</>)}
								/>
							</TimeSelectBox>
							<SelectTit setS>분 까지</SelectTit>
						</Common.FlexRowBox>
					</TimeSetBox>
					<TimeSetInfoBox>
						<Common.Image size={20} source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_y.png')} />
						<TimeSetInfoTit>
							방문시간 선택은 오전 9:00 부터 오후 9:00 까지 가능합니다.{"\n"}
							이 외의 시간에 방문하시려면 매도인과 채팅으로 별도 협의하시기 바랍니다.
						</TimeSetInfoTit>
					</TimeSetInfoBox>
				</DatePickWrap>
				<CalendarBox>
					<CalendarHeaderBg>
						<CHeaderBtnR><CalendarPrevIcon /></CHeaderBtnR>
						<CHeaderBtnL><CalendarNextIcon /></CHeaderBtnL>
					</CalendarHeaderBg>					
						<Calendar
							style={{marginBottom: 10,}}
							theme={{
								backgroundColor: 'rgba(0,0,0,0)',
								calendarBackground: 'rgba(0,0,0,0)',
								textDisabledColor: '#d5d5d5',
								textSectionTitleColor: '#000',
								selectedDayBackgroundColor: Colors.mainColor,
								dayTextColor: '#000',
								arrowColor: '#000',
								monthTextColor: '#000',
								monthTextFontSize: 20,
							}}
							renderArrow={(direction) => ( <CHeaderBtnR/>)}
							onDayPress={(day) => { onSelectedDateChange(`${day.year}-${pad(day.month)}-${pad(day.day)}`); }}
							markingType={'period'}
							current={ today }
							horizontal = { true }
							pagingEnabled = { true }
							calendarWidth = { CWidth } 
							minDate = { today } 
							monthFormat = { 'yyyy년 MM월' }
							
							// Collection of dates that have to be colored in a special way. Default = {}
							markedDates={ allDate }
							// Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
							/>
					
				</CalendarBox>
				<CalendarLabel>
					<Common.FlexRowBox>
						<Label03/><Common.TextLight13>예약 완료</Common.TextLight13>
					</Common.FlexRowBox>
					<Common.FlexRowBox>
						<Label01/><Common.TextLight13>예약 가능</Common.TextLight13>
					</Common.FlexRowBox>
					<Common.FlexRowBox>
						<Label04/><Common.TextLight13>예약 설정</Common.TextLight13>
					</Common.FlexRowBox>
					<Common.FlexRowBox>
						<Label02 /><Common.TextLight13>현재</Common.TextLight13>
					</Common.FlexRowBox>
				</CalendarLabel>
				<CalendarDatePick>
					<DatePickTitle>
						<Common.Title>{selectedDateStr} { selectedDateStr!=''? `(${week[new Date(selectedDateStr).getDay()]}요일)`:''}</Common.Title>
						<Common.FlexRowBtn onPress={() => {  onAddAVDate(selectedDateStr, 'date', false, getValues('regular_start_hour_date'), getValues('regular_start_minute_date'), getValues('regular_end_hour_date'), getValues('regular_end_minute_date')); } } >
							{
								availableDate[0][selectedDateStr]!=undefined ? 
								<ChkIconActive/> : <ChkIcon />
							}<Common.TextLight14>방문가능</Common.TextLight14>
						</Common.FlexRowBtn>
					</DatePickTitle>
					<TimeSetBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								<Controller
								control={control}
								name="regular_start_hour_date" defaultValue={11}
								defaultValue={getValues("regular_start_hour_date")}
								value={getValues("regular_start_hour_date")}
								render={({ field }) => (<>
									<RNPickerSelect
										value={ availableDate[0][selectedDateStr] != undefined ? availableDate[0][selectedDateStr].startHour:getValues("regular_start_hour_date") }
										onValueChange={(value) => {
											if (value) {
												setValue("regular_start_hour_date", value);
												
												//onAddAVDate(selectedDateStr, 'date', false, getValues('regular_start_hour_date'), getValues('regular_start_minute_date'), getValues('regular_end_hour_date'), getValues('regular_end_minute_date'));
											}
										}}
										placeholder={{ label: '시간 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={selHours}
										style={pickerStyle}
									/>
								</>)  }
								/>
								

							</TimeSelectBox>
							<SelectTit>시</SelectTit>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								<Controller
								control={control}
								name="regular_start_minute_date" defaultValue={11}

								defaultValue={getValues("regular_start_minute_date")}
								render={({ field }) => (<>
									<RNPickerSelect
										value={availableDate[0][selectedDateStr] != undefined ? availableDate[0][selectedDateStr].startMin:getValues("regular_start_minute_date")}
										onValueChange={(value) => {
											if (value) {
												setValue("regular_start_minute_date", value)
												//onAddAVDate(selectedDateStr, 'date', false, getValues('regular_start_hour_date'), getValues('regular_start_minute_date'), getValues('regular_end_hour_date'), getValues('regular_end_minute_date'));
											}
										}}
										placeholder={{ label: '분 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={selMin}
										style={pickerStyle}
									/>
								</>)}
								/>
							</TimeSelectBox>
							<SelectTit setS>분 까지</SelectTit>
						</Common.FlexRowBox>
					</TimeSetBox>
					<TimeSetBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								<Controller
								control={control}
								name="regular_end_hour_date" defaultValue={11}
								defaultValue={getValues("regular_end_hour_date")}
								render={({ field }) => (<>
									<RNPickerSelect
										value={availableDate[0][selectedDateStr] != undefined ? availableDate[0][selectedDateStr].endHour:getValues("regular_end_hour_date")}
										onValueChange={(value) => {
											if (value) {
												setValue("regular_end_hour_date", value)
												//onAddAVDate(selectedDateStr, 'date', false, getValues('regular_start_hour_date'), getValues('regular_start_minute_date'), getValues('regular_end_hour_date'), getValues('regular_end_minute_date'));
											}
										}}
										placeholder={{ label: '시간 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={selHours}
										style={pickerStyle}
									/>
								</>)}
								/>
							</TimeSelectBox>
							<SelectTit>시</SelectTit>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								<Controller
								control={control}
								name="regular_end_minute_date" defaultValue={11}
								defaultValue={getValues("regular_end_minute_date")}
								render={({ field }) => (
								<>
									<RNPickerSelect
										value={availableDate[0][selectedDateStr] != undefined ? availableDate[0][selectedDateStr].endMin:getValues("regular_end_minute_date")}
										onValueChange={(value) => {
											if (value) {
												setValue("regular_end_minute_date", value);
												//onAddAVDate(selectedDateStr, 'date', false, getValues('regular_start_hour_date'), getValues('regular_start_minute_date'), getValues('regular_end_hour_date'), getValues('regular_end_minute_date'));
											}
										}}
										placeholder={{ label: '분 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={selMin}
										style={pickerStyle}
									/>
								</>)}
								/>
							</TimeSelectBox>
							<SelectTit setS>분 까지</SelectTit>
						</Common.FlexRowBox>
					</TimeSetBox>
				</CalendarDatePick>
			</Common.ScrollContainer>
			<Common.FloatBtnBox>
				<Common.FloatBtnsss onPress={()=>{ AsyncStorage.getItem("mID").then((result)=>{handleSchdSubmit({s_id:sID, sa_id:saID, m_id:result, appointment:appt} );  handleSchdSubmitDetail({s_id:sID, sa_id:saID, m_id:result, avData: availableDate[0]}); }  ) } } >
					<Common.TextSemiBold18>저장</Common.TextSemiBold18>
				</Common.FloatBtnsss>
				<Common.FloatBtnsss btnColor={Colors.blackColor}>
					<Common.TextSemiBold18 color={Colors.whiteColor}>취소</Common.TextSemiBold18>
				</Common.FloatBtnsss>
			</Common.FloatBtnBox>
		</Common.ZipandaSafeView>
	)
}


const pickerStyle = {
	placeholderColor: '#000',
	inputIOS: { color: '#000', height: 38, fontSize: 14 },
	inputAndroid: { color: '#000', height: 38, fontSize: 14, paddingVertical: 0, },
}

export default ProContract;
