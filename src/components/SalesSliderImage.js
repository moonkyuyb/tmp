import React from 'react';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import Swiper from 'react-native-swiper'
import * as Common from './../styled/commonStyle';
import {SwiperContainer, SliderBox, SliderImg, PaginationBox, PaginationText, SwiperFullBtn, FullImg} from './../styled/sales/saleSliderImageStyle'
import Colors from './../../assets/colors';

import { API_URL } from "@env";

export const SalesSliderImage = (props) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//console.log("files=============================================================================");
	//console.log(props.files);

	let imgs = [];
	
	if (props.imgs != undefined) {
		imgs = props.imgs.split(",");
	}

	const renderPagination = (index, total, context) => {
		return (
			<PaginationBox>
				<Common.TextSemiBold13 color={Colors.whiteColor}>
					{index + 1}/{total}
				</Common.TextSemiBold13>
			</PaginationBox>
		)
	}
    return(
		<SwiperContainer>
            <SwiperFullBtn onPress={()=>{navigation.navigate('sliderImageView', {files:props.files}) }}>
                <Common.Image size={40} source={require('../../assets/img/drawable-xhdpi/bt_image_detail.png')} />
            </SwiperFullBtn>
			<Swiper
				renderPagination={renderPagination} 
				loop={true}
			>

				{props.files &&
					props.files.map((el)=>{
						console.log(API_URL+el.sf_unique_nm)
						return (
							<SliderBox>
								<SliderImg resizeMode={'cover'} source={{uri: API_URL+el.sf_unique_nm}} />
							</SliderBox>
						)	
					})
				}

				{/*
				imgs.length > 0 &&

					imgs.forEach((el) =>{
						return (
							<SliderBox>
								<SliderImg resizeMode={'cover'} source={{url: API_URL+el}} />
							</SliderBox>
						)	
					})
		
				
				
                <SliderBox>
                    <SliderImg resizeMode={'cover'} source={require('../../assets/img/sample/sample_room_01.jpg')} />
                </SliderBox>
				<SliderBox>
					<SliderImg resizeMode={'cover'} source={require('../../assets/img/sample/sample_room_02.jpg')} />
				</SliderBox>
				<SliderBox>
					<SliderImg resizeMode={'cover'} source={require('../../assets/img/sample/sample_room_03.jpg')} />
				</SliderBox>
						*/
					}


			</Swiper>

        </SwiperContainer>
    )

}



export default SalesSliderImage