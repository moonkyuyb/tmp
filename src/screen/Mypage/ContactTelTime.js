import React, { useEffect, useState } from 'react';
import { View, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select";

import * as Common from './../../styled/commonStyle';
import Colors from '../../../assets/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import FlexRowCheckBox from '../../components/common/FlexRowCheckBox';
import { FromArrowIcon } from '../../components/common/ArrowIcon';
import _ from  "lodash";

import { Modal } from 'react-native';
import { Button } from 'react-native';
import { Platform } from 'react-native';

/* REACT HOOK FORM */
import { Controller, useForm } from "react-hook-form";
import authReducer from '../../reducers/authReducer';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

	
const ContactTelTime = ({myData, showAlertMessage, handleSubmitContactTime}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	console.log("contact tel time ==========================================================");
	console.log(myData);
	const {control, handleSubmit, setValue } = useForm();

	const [isEnabled, setIsEnabled] = useState(true);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	const [pushTimeStart, setPushTimeStart] = useState([])
	const [pushTimeEnd, setPushTimeEnd] = useState([])

	const [pickerRegister, setPickerRegister] = useState([])
	const [timePickerm, setTimePicker] 		= useState([]);

	const [showTime, setShowTime] 		= useState(false);
	const [date, setDate] = useState(new Date(1598051730000));
	const [mode, setMode] = useState('time');

	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [startTimeHoli, setStartTimeHoli] = useState('');
	const [endTimeHoli, setEndTimeHoli] = useState('');
	const [selectedTime, setSelectedTime] = useState("");

	const [userInfo, setUserInfo] = useState("");

	useEffect(()=>{
		const handleEffect = async (props) => {
			setPickerRegister([
				{label:'토요일', value:'sat'},
				{label:'일요일', value:'sun'},
				{label:'주말∙공휴일', value:'holiday'},
			])

			
			AsyncStorage.multiGet(["token", "mID"])
			.then((result)=>{
				setValue("user_info", {token:result[0][1], mID:result[1][1]})
			})
			setValue('mc_id', myData.mc_id)
			setValue('mc_weekday_from_time', `${myData.mc_weekday_from_hour}:${myData.mc_weekday_from_minute}`);
			setValue('mc_weekday_end_time', `${myData.mc_weekday_to_hour}:${myData.mc_weekday_to_minute}`);
			setValue('mc_holiday_from_time',  `${myData.mc_holiday_from_hour}:${myData.mc_holiday_from_minute}`);
			setValue('mc_holiday_end_time',   `${myData.mc_holiday_to_hour}:${myData.mc_holiday_to_minute}`);

			setValue('mc_pattern_holiday',   `${myData.mc_pattern_holiday}`);
			setValue('mc_is_weekday_all',   `${myData.mc_is_weeday_all}`);
			setValue('mc_is_weekend_all',   `${myData.mc_is_weeend_all}`);
		}
		handleEffect()
	},[])

	const onValid = async (data) =>  {
		//console.log("on valid");
		console.log(data);
		handleSubmitContactTime(data);
		navigation.navigate("account");
	};
	const onInvalid = err => {
		console.log("on invalid");

			if(err.username) showAlertMessage(err.username.message)
		else if(err.password) showAlertMessage(err.password.message)
		else showAlertMessage(err.toString())
	}


	const setTime = (pickedTime) =>{

		if (selectedTime== "setStartTime") {
			//setStartTime(pickedTime);
			setValue('mc_weekday_from_time', pickedTime);
		}else if (selectedTime=="setEndTime") {
			//setEndTime(pickedTime);
			setValue('mc_weekday_end_time', pickedTime);
		}
		else if (selectedTime== "setStartTimeHoli") {
			setValue('mc_holiday_from_time', pickedTime);
		}else if (selectedTime=="setEndTimeHoli") {
			setValue('mc_holiday_end_time', pickedTime);
		}

	}


	return(
		<Common.ZipandaSafeView>
			{ showTime && (
				<View style={{height:'100%', width:'100%'}} >
					<DateTimePicker
						value={date}
						mode={mode}
						is24Hour={true}
						display="spinner"
						onChange={(event, value)=>{ if (value != undefined) { setDate(value); setTime(value.getHours()+":"+value.getMinutes() ); }if(Platform.OS=="android") { setShowTime(false); }  }  }
					/>
					<Button title={"done"} onPress={()=>{setShowTime(false)}}/>
				</View>
			)}
			<Common.ScrollContainer>
				<Common.TitleBox paddingBNone>
					<Common.Title>월~금 <Common.TextLight16>(평일)</Common.TextLight16></Common.Title>
					<FlexRowCheckBox title='종일' name="mc_is_weekday_all" />
				</Common.TitleBox>

				<Common.SubTitle>연락시간 선택</Common.SubTitle>
				<Common.FlexSpaceWrap>
					<Common.ViewBorderHalfBtn onPress={()=>{setSelectedTime("setStartTime"); setShowTime(true);}} >
						<Controller
							control={control} name="mc_weekday_from_time"  
							render= {({field})=>(
								<TextInput editable={false} style={pickerStyle.timeText} onChangeText={ field.onChange } value={field.value}  />
							)}
						/>
						<FromArrowIcon />
					</Common.ViewBorderHalfBtn>	
					<Common.ViewBorderHalfBtn onPress={()=>{setSelectedTime("setEndTime"); setShowTime(true);}} >
						<Controller
							control={control} name="mc_weekday_end_time"  
							render= {({field})=>(
								<TextInput editable={false} style={pickerStyle.timeText} onChangeText={ field.onChange } value={field.value}  />
							)}
						/>							
						<FromArrowIcon />
					</Common.ViewBorderHalfBtn>
				</Common.FlexSpaceWrap>
				
				<Common.TitleBox marginT={36}>
					<Common.Title>추가시간</Common.Title>
					<FlexRowCheckBox title='종일' name="mc_is_weekend_all" />
				</Common.TitleBox>

				<Common.SubTitle>연락시간 선택</Common.SubTitle>
				 <Common.ViewBorder>
					<FromArrowIcon/>
					<Controller
						control={control} name="mc_pattern_holiday"
						defaultValue={myData.pattern_holiday}
						render= {({field})=>(
							<RNPickerSelect
								defaultValue={field.value}
								onValueChange={(value)=>{setValue("mc_pattern_holiday", value)}}
								value={myData.pattern_holiday}
								placeholder={{  label: '요일 선택',}}
								style={pickerStyle}
								items={pickerRegister}
								useNativeAndroidPickerStyle={false}
							/>
						)}
					/>
				</Common.ViewBorder>
				<Common.FlexSpaceWrap>
					<Common.ViewBorderHalfBtn onPress={()=>{setSelectedTime("setStartTimeHoli"); setShowTime(true);}} >
						<Controller
							control={control} name="mc_holiday_from_time"  
							render= {({field})=>(
								<TextInput editable={false} style={pickerStyle.timeText} onChangeText={ field.onChange } value={field.value}  />
							)}
						/>	
						<FromArrowIcon />
					</Common.ViewBorderHalfBtn>						
					<Common.ViewBorderHalfBtn  onPress={()=>{setSelectedTime("setEndTimeHoli"); setShowTime(true);}} >
						<Controller
							control={control} name="mc_holiday_end_time"
							render= {({field})=>(
								<TextInput editable={false} style={pickerStyle.timeText} onChangeText={ field.onChange } value={field.value}  />
							)}
						/>							
						<FromArrowIcon />
					</Common.ViewBorderHalfBtn>			

				</Common.FlexSpaceWrap>
			</Common.ScrollContainer>

			<Common.FloatBtn onPress={ handleSubmit(onValid, onInvalid) }>
				<Common.TextSemiBold18>완료</Common.TextSemiBold18>
			</Common.FloatBtn>
		
		</Common.ZipandaSafeView>
	)
}
export default ContactTelTime;

const pickerStyle = {
	inputIOS: {
		color: '#000000',
		height: 34,
		fontSize: 14,
		paddingHorizontal: 0,
	},
	timeText: {
		color: '#000000',
		height: 34,
		fontSize: 14,
		paddingHorizontal: 0,
		flex:1,
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
