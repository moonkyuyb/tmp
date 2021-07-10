import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';

// calendar
import * as Common from './../styled/commonStyle';
import Colors from '../../assets/colors';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

import { TimeSetBox,TimeSelectBox,SelectTit,TimeSetInfoBox,TimeSetInfoTit,RequestTimeWrap,
	CalendarBox, CalendarYellowBox, YellowTitBox, CalendarHeaderBg, CalendarLabel,
	CHeaderBtnR, CHeaderBtnL } from "./../styled/chatStyle/calendarStyle.js";

import { FromArrowIcon } from './../components/common/ArrowIcon';

import RNPickerSelect from "react-native-picker-select";

const ProContractCalendar = ({ availableDate, selectedDate, handleInit, handleOnCalendarSelect, selectedList }) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const week = ['일', '월', '화', '수', '목', '금', '토'];

	const [today, setToday] = useState("");
	const todayDate = new Date();
	const [selHours, setSelHours] = useState([]);
	const [selMin, setSelMin] = useState([]);


	useEffect(() => {
		const handleEffect = async (props) => {
			handleInit(sID);
			setToday(`${todayDate.getFullYear()}-${pad(range(1, 13)[todayDate.getMonth()])}-${pad(todayDate.getDate())}`);
		}
		handleEffect()
	}, [])

	const CalendarPrevIcon = () => (<Common.Image size={24} source={require('./../../assets/img/drawable-xhdpi/bt_sub_back_02.png')} />)
	const CalendarNextIcon = () => (<Common.Image size={24} source={require('./../../assets/img/drawable-xhdpi/bt_sub_back.png')} />)

	const CWidth = (Dimensions.get('window').width);

	LocaleConfig.locales['fr'] = {
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['01.', '02.', '03', '04', '05', '06', '07.', '08', '09.', '10.', '11.', '12.'],
		dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
		dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
		today: 'Aujourd\'hui'
	};

	LocaleConfig.defaultLocale = 'fr';
	return (
		<Common.ZipandaSafeView>
			<Common.ScrollContainer paddingN>
				<CalendarBox>
					<CalendarHeaderBg>
						<CHeaderBtnR><CalendarPrevIcon /></CHeaderBtnR>
						<CHeaderBtnL><CalendarNextIcon /></CHeaderBtnL>
					</CalendarHeaderBg>
					<CalendarList
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
						horizontal={true}
						pagingEnabled={true}
						calendarWidth={CWidth}
						minDate={today}
						monthFormat={'yyyy년 MM월'}
						onDayPress={(day) => { console.log(day); handleOnCalendarSelect({ 'sID': sID, date: day.year + "-" + pad(day.month) + "-" + pad(day.day) }); }}
						current={today}
						// Collection of dates that have to be colored in a special way. Default = {}
						// markedDates={allDate}
						// Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
						markingType={'period'}
					>

					</CalendarList>
				</CalendarBox>
				<RequestTimeWrap>
					<Common.Title>예약시간</Common.Title>
					<TimeSetBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								
									<RNPickerSelect
										placeholder={{ label: '시간 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={selHours}
										style={pickerStyle}
									/>
							</TimeSelectBox>
							<SelectTit>시</SelectTit>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<FromArrowIcon />
								
									<RNPickerSelect
										placeholder={{ label: '분 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={selMin}
										style={pickerStyle}
									/>
							</TimeSelectBox>
							<SelectTit setS>분 까지</SelectTit>
						</Common.FlexRowBox>
					</TimeSetBox>
					<TimeSetInfoBox>
						<Common.Image size={20} source={require('./../../assets/img/drawable-xhdpi/img_regist_bullit_y.png')} />
						<TimeSetInfoTit>
							방문시간 선택은 오전 9:00 부터 오후 9:00 까지 가능합니다.{"\n"}
							이 외의 시간에 방문하시려면 매도인과 채팅으로 별도 협의하시기 바랍니다.
						</TimeSetInfoTit>
					</TimeSetInfoBox>
				</RequestTimeWrap>
				
				<CalendarYellowBox>
					<Common.Image size={32} source={require('./../../assets/img/drawable-xhdpi/icon_reservation.png')} />
					<YellowTitBox>
						<Common.TextSemiBold14 marginB={4}>2021-03-24 09:00</Common.TextSemiBold14>
						<Common.TextLight16><Common.TextSemiBold16>박*수님</Common.TextSemiBold16>이 방문 요청을 하였습니다.</Common.TextLight16>
					</YellowTitBox>
				</CalendarYellowBox>
				
			</Common.ScrollContainer>

			<Common.FloatBtnBox>
				<Common.FloatBtnsss>
					<Common.TextSemiBold18>방문요청</Common.TextSemiBold18>
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
export default ProContractCalendar;
