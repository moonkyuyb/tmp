import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';

// calendar
import * as Common from './../../styled/commonStyle';
import Colors from '../../../assets/colors';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

import { CalendarBox, CalendarYellowBox, YellowTitBox, CalendarHeaderBg, CalendarLabel, Label01, Label02, CHeaderBtnR, CHeaderBtnL } from "../../styled/chatStyle/calendarStyle.js";

import { pad } from '../../utils/common/calculator'


const ProContractCalendar = ({ availableDate, selectedDate, handleInit, handleOnCalendarSelect, selectedList }) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const sID = route.params.s_id
	const week = ['일', '월', '화', '수', '목', '금', '토'];

	//console.log("sID===========================================================================================")
	//console.log(sID)
	var allDate = {};
	Object.assign(allDate, availableDate[0]);
	Object.assign(allDate, selectedDate[0]);

	const [today, setToday] = useState("");
	const todayDate = new Date();

	useEffect(() => {
		const handleEffect = async (props) => {
			handleInit(sID);
			setToday(`${todayDate.getFullYear()}-${pad(range(1, 13)[todayDate.getMonth()])}-${pad(todayDate.getDate())}`);
		}
		handleEffect()
	}, [])

	const CalendarPrevIcon = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back_02.png')} />)
	const CalendarNextIcon = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back.png')} />)

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
						markedDates={allDate}
						// Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
						markingType={'period'}
					>

					</CalendarList>
				</CalendarBox>
				<CalendarLabel>
					<Common.FlexRowBox>
						<Label01 /><Common.TextLight13>예약가능</Common.TextLight13>
					</Common.FlexRowBox>
					<Common.FlexRowBox>
						<Label02 /><Common.TextLight13>현재</Common.TextLight13>
					</Common.FlexRowBox>
				</CalendarLabel>
				{
					selectedList.length > 0 &&
					selectedList.map((el) => {
						return (
							<CalendarYellowBox>
								<Common.Image size={32} source={require('../../../assets/img/drawable-xhdpi/icon_reservation.png')} />
								<YellowTitBox>
									<Common.TextSemiBold14  marginB={4}>{el.sad_date} ({week[new Date(el.sad_date).getDay()]}) <Common.TextLight14>방문가능 시간</Common.TextLight14></Common.TextSemiBold14>
									<Common.TextSemiBold16>{`${el.sad_from_hour}:${el.sad_from_minute} ~ ${el.sad_to_hour}:${el.sad_to_minute}`}</Common.TextSemiBold16>
								</YellowTitBox>

							</CalendarYellowBox>

						)
					})

				}

			</Common.ScrollContainer>
			{/*
			<BottomBtn2Box>
				<BottomBtn2 >
					<TextBold16>방문요청</TextBold16>
				</BottomBtn2>
				<BottomBtn2 balck>
					<TextBold16 whiteTit>취소</TextBold16>
				</BottomBtn2>
			</BottomBtn2Box>
			*/}
		</Common.ZipandaSafeView>
	)
}
export default ProContractCalendar;
