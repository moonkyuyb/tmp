import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

import * as Common from './../../styled/commonStyle';
import PointText from '../../components/common/PointText'
import { ArrowIcon } from '../../components/common/ArrowIcon';
import { MypageHeader,EmailBox,MypageYellowBox,YellowBtn,MypageListBox,ListItem,} from '../../styled/mypageStyle/mypageStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mypage = ({myData, mainData, handleGetMyData, handleMainInit, }) => {
	console.log("mainData =========== =========== =========== =========== ===========");
	console.log(mainData);
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{

		AsyncStorage.multiGet(["token", "mID"])
		.then((result)=>{
			handleGetMyData({token:result[0][1], mID:result[1][1]});
			handleMainInit({mID:result[1][1]});
		})

		/*
		AsyncStorage.getItem("token")
		.then((result)=>{
			console.log("token=====================================================");
			console.log(result)
			handleGetMyData(result);
		})
		.catch((err)=>{

		})
		*/
		

		/*
		AsyncStorage.getItem("mID")
		.then((result)=>{
			handleGetMyData(result);
		})
		.catch((err)=>{

		})
		*/


		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	},[])
	
	return(
		<Common.ZipandaSafeView>
            <Common.ScrollContainer>
				<MypageHeader>
					<PointText>
						<Common.TextSemiBold22>{myData.m_name}</Common.TextSemiBold22>
						<Common.TextUltraLight22>님, 안녕하세요</Common.TextUltraLight22>
					</PointText>
					<EmailBox><Common.TextMedium16>{myData.m_username}</Common.TextMedium16></EmailBox>
				</MypageHeader>
				<MypageYellowBox>
					<YellowBtn onPress={()=>{navigation.navigate('zzimSaleList');}} >
						<Common.FlexRowBox>
							<Common.Image size={24} marginR={5} source={require('./../../../assets/img/drawable-xhdpi/icon_mypage_attention.png')}/>
							<Common.TextMedium16>관심 매물 ・ 단지</Common.TextMedium16>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<Common.TextBold16>{mainData.like_cnt}개 ･ {mainData.like_danji_cnt}개</Common.TextBold16>
							<ArrowIcon/>
						</Common.FlexRowBox>
					</YellowBtn>
					<YellowBtn  onPress={() => navigation.navigate('mySaleContainer')} >
						<Common.FlexRowBox>
							<Common.Image size={24} marginR={5} source={require('./../../../assets/img/drawable-xhdpi/icon_mypage_add.png')}/>
							<Common.TextMedium16>등록매물</Common.TextMedium16>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<Common.TextBold16>{mainData.sales_cnt}개</Common.TextBold16>
							<ArrowIcon/>
						</Common.FlexRowBox>
					</YellowBtn>
					<YellowBtn onPress={()=>{ navigation.navigate('transactionStatus') }}>
						<Common.FlexRowBox>
							<Common.Image size={24} marginR={5} source={require('./../../../assets/img/drawable-xhdpi/icon_mypage_deal.png')}/>
							<Common.TextMedium16>거래 현황</Common.TextMedium16>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<Common.TextBold16>{mainData.contract_cnt}개</Common.TextBold16>
							<ArrowIcon/>
						</Common.FlexRowBox>
					</YellowBtn>
				</MypageYellowBox>
				<MypageListBox>
					<ListItem onPress={() => navigation.navigate('account')} >
						<Common.FlexRowBox>
							<Common.Image size={20} marginR={10} source={require('./../../../assets/img/drawable-xhdpi/icon_managment.png')}/>
							<Common.TextMedium16>계정관리</Common.TextMedium16>
						</Common.FlexRowBox>
						<ArrowIcon/>
					</ListItem>
					{/* 					
					<ListItem>
						<Common.FlexRowBox>
							<Common.Image size={20} marginR={10} source={require('./../../../assets/img/drawable-xhdpi/icon_sign.png')}/>
							<Common.TextMedium16>서명 ・ 날인 관리</Common.TextMedium16>
						</Common.FlexRowBox>
						<ArrowIcon/>
					</ListItem>
					*/}
					<ListItem onPress={() => navigation.navigate('push')}>
						<Common.FlexRowBox>
							<Common.Image size={20} marginR={10} source={require('./../../../assets/img/drawable-xhdpi/icon_push.png')}/>
							<Common.TextMedium16>PUSH 설정</Common.TextMedium16>
						</Common.FlexRowBox>
						<ArrowIcon/>
					</ListItem>
					<ListItem borderN onPress={() => navigation.navigate('appVersion')}>
						<Common.FlexRowBox>
							<Common.Image size={20} marginR={10} source={require('./../../../assets/img/drawable-xhdpi/icon_vision.png')}/>
							<Common.TextMedium16>버전정보</Common.TextMedium16>
						</Common.FlexRowBox>
						<ArrowIcon/>
					</ListItem>
						
				</MypageListBox>

			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	)
}
export default Mypage;