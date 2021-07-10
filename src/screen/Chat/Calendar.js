import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Dimensions } from 'react-native';

// calendar
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import * as Common from "../../styled/commonStyle";
import {CalendarBox,CalendarTimeWrap,TimeSetBox,TimeSelectBox,SelectTit	,CalendarYellowBox,TimeSetInfoBox,TimeSetInfoTit,YellowTitBox,CalendarHeaderBg,CHeaderBtnR,CHeaderBtnL} from '../../styled/chatStyle/calendarStyle.js';


const ProContract = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {
			
		}
		handleEffect()
	},[])

	const ArrowIcon = () => (<Common.InputIconS source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')} />)
	const CalendarPrevIcon = () => (<Common.Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back_02.png')} />)
	const CalendarNextIcon = () => (<Common.Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back.png')} />)
	
	const CWidth = (Dimensions.get('window').width);
	
	LocaleConfig.locales['fr'] = {
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['01.','02.','03','04','05','06','07.','08','09.','10.','11.','12.'],
		dayNames: ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'],
		dayNamesShort: ['월','화','수','목','금','토','일'],
		today: 'Aujourd\'hui'
	};

	LocaleConfig.defaultLocale = 'fr';
	return(
		<Common.Container>
			<Common.ScrollContainerB>
				<CalendarBox>
					<CalendarHeaderBg>
						<CHeaderBtnR><CalendarPrevIcon /></CHeaderBtnR>
						<CHeaderBtnL><CalendarNextIcon /></CHeaderBtnL>
					</CalendarHeaderBg>
					<CalendarList
						style={{marginBottom: 10,}}
						theme={{
							backgroundColor: 'rgba(0,0,0,0)',
							calendarBackground: 'rgba(0,0,0,0)',
							textDisabledColor: '#d5d5d5',
							textSectionTitleColor: '#000',
							selectedDayBackgroundColor: '#ffe800',
							dayTextColor: '#000',
							arrowColor: '#000',
							monthTextColor: '#000',
							monthTextFontSize: 20,
						}}
						horizontal = { true }
						pagingEnabled = { true }
						calendarWidth = { CWidth } 
						minDate = { '2021-04-11' } 
						monthFormat = { 'yyyy년 MM월' } 
						// Collection of dates that have to be colored in a special way. Default = {}
						markedDates={{
							'2021-04-14': {startingDay: true, color: '#f3f3f3', textColor:'#000', endingDay: true}, //오늘날짜
							'2021-04-23': {disabled: true, startingDay: true, color: '#ffe800' ,textColor: '#000', endingDay: true}, //예약가능
							'2021-05-31': {disabled: true, startingDay: true, color: '#ffe800' ,textColor: '#000', endingDay: true}, //예약가능
						}}
						// Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
						markingType={'period'}
						/>
				</CalendarBox>
				<CalendarTimeWrap>
					<Common.Title>예약시간</Common.Title>
					<TimeSetBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<ArrowIcon />
							</TimeSelectBox>
							<SelectTit>시</SelectTit>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<TimeSelectBox>
								<ArrowIcon />
							</TimeSelectBox>
							<SelectTit>분</SelectTit>
						</Common.FlexRowBox>
					</TimeSetBox>
					<TimeSetInfoBox>
						<Common.Image20 source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_y.png')} />
						<TimeSetInfoTit>
							방문시간 선택은 오전 9:00 부터 오후 9:00 까지 가능합니다.{"\n"}
							이 외의 시간에 방문하시려면 매도인과 채팅으로 별도 협의하시기 바랍니다.
						</TimeSetInfoTit>
					</TimeSetInfoBox>
				</CalendarTimeWrap>
				<CalendarYellowBox>
					<Common.Image32 source={require('../../../assets/img/drawable-xhdpi/icon_reservation.png')} />
					<YellowTitBox>
						<Common.TextBold12>2021-03-24  09:00</Common.TextBold12>
						<Common.TextBold12>박*수님<Common.TextLight12>이 방문 요청을 하였습니다.</Common.TextLight12></Common.TextBold12>
					</YellowTitBox>
				</CalendarYellowBox>
			</Common.ScrollContainerB>
			<Common.Common.BottomBtn2Box>
				<Common.BottomBtn2 >
					<Common.TextBold16>방문요청</Common.TextBold16>
				</Common.BottomBtn2>
				<Common.BottomBtn2 balck>
					<Common.TextBold16 whiteTit>취소</Common.TextBold16>
				</Common.BottomBtn2>
			</Common.Common.BottomBtn2Box>
		</Common.Container>
	)
}
export default ProContract;
