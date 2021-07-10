import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
import RNDateTimePicker from '@react-native-community/datetimepicker';

import * as Common from '../../styled/commonStyle';
import Colors from '../../../assets/colors';
import {FromArrowIcon} from './../../components/common/ArrowIcon'

import {AccountSubHeader} from '../../styled/mypageStyle/CommonSubAccountStyle';
import { PushSetBox,PushIcon } from '../../styled/mypageStyle/pushStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pad } from '../../utils/common/calculator';
	
	

const Push = ({handleInit, handleUpdateData, pushState, updateState}) => {

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [pickedDate, setPickedDate] = useState(new Date())


	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation();

	const [mID, setMID] = useState(0);
	var [mpID, setMPID] = useState(0);

	
	if (updateState) {
		mpID = updateState.insertId
	}
	

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	const [pushTimeStart, setPushTimeStart] = useState([])
	const [pushTimeEnd, setPushTimeEnd] = useState([])
	const ArrowIcon = () => (<PushIcon source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')} />)



	useEffect(()=>{
		if (updateState.insertId != undefined ) {
			setMPID(updateState.insertId)
		}
	},[updateState])

	useEffect(()=>{
		const handleEffect = async (props) => {
			AsyncStorage.getItem("mID")
			.then((result)=>{
				setMID(result);
				handleInit(result);
			})
			.catch((err)=>{

			})
		}
		handleEffect()
	},[])

	useEffect(()=>{
		//if (isEnabled) {

			
		//}
	},[isEnabled])
	const [isStartTime, setStartTime] = useState("");
	const [startTimeStr, setStartTimeStr] = useState("");
	const [endTimeStr, setEndTimeStr] = useState("");
	useEffect(()=>{
		console.log("startTimeStr==================================================");
		console.log(startTimeStr);
	},[startTimeStr])

	useEffect(()=>{
		if (pushState.length>0) {
			console.log("pushState==================================================");
			console.log(pushState[0]);
			setMPID(pushState[0].mp_id);
			setIsEnabled(pushState[0].mp_push_yn==1);
			setStartTimeStr(pushState[0].mp_start_time);
			setEndTimeStr(pushState[0].mp_end_time);
		}
	},[pushState])


	return(
		<Common.ZipandaSafeView>
			<Modal isVisible={showDatePicker}>
					<RNDateTimePicker
						value={pickedDate}
						mode={"time"} is24Hour={true} display="default" testID="dateTimePicker"
						onChange={(event, selectedTime) => {
							console.log("get time=====================================");
							console.log({start_time:`${pad(selectedTime.getHours())}:${pad(selectedTime.getMinutes())}`, m_id:mID, mp_id: mpID });
							setShowDatePicker(false);
							//const resultString = selectedDate.getFullYear().toString() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate()
							if(isStartTime=="S") {
								handleUpdateData({start_time:`${pad(selectedTime.getHours())}:${pad(selectedTime.getMinutes())}`, m_id:mID, mp_id: mpID })
								setStartTimeStr(`${pad(selectedTime.getHours())}:${pad(selectedTime.getMinutes())}`)
							}else if(isStartTime=="S") {
								handleUpdateData({end_time:`${pad(selectedTime.getHours())}:${pad(selectedTime.getMinutes())}`, m_id:mID, mp_id: mpID })
								setEndTimeStr(`${pad(selectedTime.getHours())}:${pad(selectedTime.getMinutes())}`)
							}
						}}
					/>
			</Modal>
			<Common.ScrollContainer>
				<PushSetBox>
					<Common.TextSemiBold16>PUSH 알림 받기</Common.TextSemiBold16>
					<Common.FlexRowBox>
						<Common.TextLight14> {isEnabled ? '켜짐' : '꺼짐'} </Common.TextLight14>
						<Switch
							style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
							trackColor={{ false: Colors.borderColor , true: Colors.chatNoticeColors }}
							thumbColor={isEnabled ? Colors.whiteColor : "#f4f3f4"}
							ios_backgroundColor={Colors.borderColor}
							onValueChange={ (value) =>{ toggleSwitch; handleUpdateData({pusy_yn:isEnabled?1:0, m_id:mID, mp_id: mpID })  } }
							value={isEnabled}
						/>
					</Common.FlexRowBox>
				</PushSetBox>
				
				<AccountSubHeader>
					<Common.TextSemiBold16>아래 시간 동안 알림끄기</Common.TextSemiBold16>
				</AccountSubHeader>
				
				<Common.TextSemiBold14 marginB={8}>시작시간 설정</Common.TextSemiBold14>
				<TouchableOpacity onPress={() => {setStartTime("S"); setShowDatePicker(true) }} >
					<Common.ViewBorder>
						<Common.TextLight14>{ startTimeStr ? startTimeStr : '시작시간 선택' }</Common.TextLight14>
						<FromArrowIcon />
					</Common.ViewBorder>
				</TouchableOpacity>
			
				<Common.TextSemiBold14 marginB={8} marginT={16}>종료시간 설정</Common.TextSemiBold14>
				<TouchableOpacity onPress={() => {setStartTime("E"); setShowDatePicker(true) }} >
					<Common.ViewBorder>
						{/* <Common.TextLight14>{ endTimeStr }</Common.TextLight14> */}
						<Common.TextLight14>{ endTimeStr ? endTimeStr : '종료시간 선택' }</Common.TextLight14>
						<FromArrowIcon />
					</Common.ViewBorder>
				</TouchableOpacity>
				
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	)
}
export default Push;
