import React, { useEffect, useState } from 'react';

import * as Common from '../../styled/commonStyle';
import Colors from '../../../assets/colors';
import AutoHeightImage from 'react-native-auto-height-image';
import { Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { API_URL} from "@env";

const {width, height} = Dimensions.get('screen');
const ScreenWidth = (Dimensions.get('window').width);

import{EventHeader,SnsBoxS,EventTextBox,SubHeaderBox,EventLabel}from"../../styled/eventStyle/eventStyle";
import HTML from "react-native-render-html";

const EventViewScreen = ({getEventDetail, eventDetail}) => {
	console.log("eventDetail===================================================");
	console.log(eventDetail)
	const route = useRoute();
	const navigation = useNavigation()
	useEffect((props)=>{
		getEventDetail({id:route.params.ted_id});
		// const handleEffect = async (props) => {
		// 	//...
		// }
		// handleEventDetail({id:route.params.ted_id})
		// handleEffect()
	},[])


	const SnsBox = () => (
		<SnsBoxS>
			<Common.TouchableOpacity><Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_kakao.png')} /></Common.TouchableOpacity>
			<Common.TouchableOpacity><Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_naver.png')} /></Common.TouchableOpacity>
			<Common.TouchableOpacity><Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_facebook.png')} /></Common.TouchableOpacity>
		</SnsBoxS>
	)
	
	const EventStatus = (props) =>{
		if (props.isOn == "on") {
			return (
				<EventLabel Active><Common.TextLight12>진행중</Common.TextLight12></EventLabel>
			)
		}else {
			return (
				<EventLabel><Common.TextLight12 color={Colors.whiteColor}>종료</Common.TextLight12></EventLabel>
			)
		}
	}

	return (

		<Common.ZipandaSafeView>
			<Common.ScrollContainer paddingN>
	
			{(eventDetail.length > 0 )&& 
			
				<Common.View>
					<EventHeader>
						<Common.TextBold14 paragraph numberOfLines={2}>{eventDetail[0].teb_title}</Common.TextBold14>
						<SubHeaderBox eventList>
							<Common.FlexRowBox>
							<EventStatus isOn={eventDetail[0].is_on}/>
								<Common.TextMedium14>{`${eventDetail[0].event_start} ~ ${eventDetail[0].event_end}`}</Common.TextMedium14>
							</Common.FlexRowBox>
							<SnsBox/>
						</SubHeaderBox>
					</EventHeader>
					<AutoHeightImage width={ScreenWidth} source={{uri:API_URL+eventDetail[0].ted_image_unique_nm}}/>
					<EventTextBox>
						<Common.TextLight14>
							<HTML source={{html:(eventDetail[0].teb_content)}} />

						</Common.TextLight14>
					</EventTextBox>
				</Common.View>

			}
			</Common.ScrollContainer>
			<Common.FloatBtn  onPress={() => navigation.navigate('eventList')}>
				<Common.TextSemiBold18>목록</Common.TextSemiBold18>
			</Common.FloatBtn>
		</Common.ZipandaSafeView>

	);
};
export default EventViewScreen;
