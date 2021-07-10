import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select";
import { API_URL, ADMIN_URL } from "@env";

import Swiper from 'react-native-swiper'
import Colors from '../../../assets/colors';
import * as Common from './../../styled/commonStyle';
import PointText from '../../components/common/PointText'
import moment from "moment";
import _ from "lodash";

import { ZipItemList, ZipInfoBox, BuildingNameText, PriceText, BuildingInfoBox, BuildingInfoText, ZipTagBox, ZipTag, ZipTagText, ZipImgBox, ZipImg, DealingBgBox,  } from "../../styled/sales/saleListItemStyle";
import {  Slider, Header, StepHeader, TSSaleWrap, StepIcon, SliderButtonR, SliderButtonL, TsChatHeader, TsChatList, ChatIconS, TsName, TsDate, TsInfoTit } from "../../styled/mypageStyle/transactionStatusStyle";
import { Profile, ProfileTit } from "../../styled/chatStyle/chatStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getMyData } from '../../reducers/accountReducer';
import { pad } from '../../utils/common/calculator';
import { getPriceTag } from '../../utils/common/calculator';
import { Button } from 'react-native-elements';

/* CONSTANTS */
const sellerType = {'business':'임대사업자', 'lessor':'임대인', 'lessee':'기존세입자', 'etc':'기타' };

const TransactionStatus = ({ contractList, chatrooms, getContractList, getChatrooms }) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	AsyncStorage.getItem("mID").then((response) => {setMID(response)}).catch((err) => {})

	//UI STATES
	const [mID, setMID] = useState(0);
	const [isEnabled, setIsEnabled] = useState(true);
	const [pushTimeStart, setPushTimeStart] = useState([]);
	const [pushTimeEnd, setPushTimeEnd] = useState([]);
	const [sID, setSID] = useState(0);
	const [pageIdx, setPageIdx] = useState(0);

	//HANDLE EFFECTS
	useEffect(() => {
		const handleEffect = async (props) => {
			AsyncStorage.getItem("mID").then((result) => {
				getContractList({m_id: result})
			})
		}
		handleEffect();
	}, [])

	useEffect(()=>{
		// console.log("contractList==========================================================",contractList);
		if(contractList&&contractList.length>0){
			setSID(contractList[0].s_id);
			getChatrooms({s_id: contractList[0].s_id, m_id_from: mID})
		}
	},[contractList])

	useEffect(()=>{
		console.log("sid: "+sID);
	},[sID])

	//UI COMPONENTS
	const ButtonIconR 	= () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back.png')} />);
	const ButtonIconL 	= () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back_02.png')} />);
	const ChatIcon 		= () => (<ChatIconS source={require('./../../../assets/img/drawable-xhdpi/bt_in_chating.png')} />);
	const ChatIconNone  = () => (<ChatIconS None source={require('./../../../assets/img/drawable-xhdpi/bt_in_chating.png')} />);
	const StepHeader01 = (props) => {
		console.log("props================================================")
		console.log(props)
		return (<StepHeader>
			<StepIcon source={require('../../../assets/img/drawable-xhdpi/icon_common_sign.png')} />
			<Common.TextLight16>Step. 0{props.step} <Common.TextBold16>{props.process}</Common.TextBold16> 진행중입니다.</Common.TextLight16>
		</StepHeader>)
	}
	const StepHeader02 = () => (
		<StepHeader>
			<StepIcon source={require('../../../assets/img/drawable-xhdpi/icon_common_pay.png')} />
			<Common.TextLight16>Step. 03 <Common.TextBold16>계약금/잔금요청</Common.TextBold16> 진행중입니다.</Common.TextLight16>
		</StepHeader>
	)
	const StepHeader03 = () => (
		<StepHeader>
			<StepIcon source={require('../../../assets/img/drawable-xhdpi/icon_common_real_sign.png')} />
			<Common.TextLight16>Step. 04 <Common.TextBold16>전자계약</Common.TextBold16> 진행중입니다.</Common.TextLight16>
		</StepHeader>
	)
	const StepHeader04 = () => (
		<StepHeader>
			<StepIcon source={require('../../../assets/img/drawable-xhdpi/icon_common_registered.png')} />
			<Common.TextLight16>Step. 05 <Common.TextBold16>잔금 납입 및 계약완료</Common.TextBold16> 진행중입니다.</Common.TextLight16>
		</StepHeader>
	)

	//UI FUNCTION
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	const dateFormat = (dateStr) => {
		var date = new Date(dateStr);
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}. ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
	}

	return (
		<Common.ZipandaSafeView>
			{/* <Button title="TEST" onPress={()=>{console.log(`chatrooms`, chatrooms);}}/> */}
			<Common.ScrollContainer paddingN>
				<Swiper
					showsButtons={false} loop={false} showsPagination={false} index={pageIdx} horizontal={true} scrollEnabled={false}
					onIndexChanged={(index) => {
						setSID(contractList[index].s_id)
						getChatrooms({s_id: contractList[index].s_id, m_id_from: mID})
					}}
					onMomentumScrollEnd={(e, state, context) => {
						//console.log(state.index);
						//setPageIdx(pageIdx+1);
						//console.log('index:', pageIdx);
						//if(pageIdx<(contractList.length-1) ){  setPageIdx(pageIdx+1); }
					}}
				>
					{contractList && contractList.map((el, index) => {
						// console.log("contractList==========================================================");
						console.log(`💬IMG URI : ${ADMIN_URL + el.sf_thumb_nm.split(',')[0]}`);
						return (
							<Slider index={index} key={el=>el.c_id}>
								<Header index={index}>
									<SliderButtonR onPress={()=>{ if(pageIdx<(contractList.length-1) ){  setPageIdx(pageIdx+1); } }} ><ButtonIconR /></SliderButtonR>
									<SliderButtonL onPress={()=>{ if(pageIdx>0){  setPageIdx(pageIdx-1);  } }} ><ButtonIconL /></SliderButtonL>
									{(el.c_signing_status != "" && el.c_signing_status != null)&&(
										<StepHeader01 step={el.step} process={el.process}/>
									)}
									<TSSaleWrap>
										<ZipItemList topAlign >
											<ZipInfoBox transaction>
												<BuildingNameText>{el.s_building_name}</BuildingNameText>
												<PointText>
													<PriceText>{getPriceTag(el.price_type, el.s_price_type, el.s_deposit, el.s_monthly_rent, el.s_trading_price)} </PriceText>
												</PointText>
												<BuildingInfoBox>
													<BuildingInfoText numberOfLines={1}>{el.building_type.trim()}/ {el.s_floor}층 / {el.s_supply_area_m}m² {el.s_maintenance_cost > 0 ? '/ 관리비 ' + (el.s_maintenance_cost / 10000) + '만' : ''}</BuildingInfoText>
													<BuildingInfoText numberOfLines={1}>{`${el.location1} ${el.location2} ${el.location3}`}</BuildingInfoText>
												</BuildingInfoBox>
												<ZipTagBox>
													<Common.FlexRowBox>
														<ZipTag><ZipTagText>{sellerType[el.s_seller_type]}</ZipTagText></ZipTag>
														<Common.TextSemiBold14>{el.c_name_lessor}</Common.TextSemiBold14>
													</Common.FlexRowBox>
												</ZipTagBox>
											</ZipInfoBox>
											<ZipImgBox transactionImg>
												{el.sf_thumb_nm && (<ZipImg source={{ uri: ADMIN_URL + el.sf_thumb_nm.split(',')[0] }} />)}
											</ZipImgBox>
										</ZipItemList>
									</TSSaleWrap>
								</Header>
								<Common.View>
									<TsChatHeader>
										<Common.TextLight14>
											<Common.TextBold14>총 {chatrooms == undefined ? 0 : chatrooms.length}명</Common.TextBold14> 직거래톡으로 진행중입니다.
										</Common.TextLight14>
									</TsChatHeader>
									<Common.View>
										{chatrooms.map((item) => {
											// console.log(`💁‍♀️el.m_id: ${el.m_id}, chatroom.users: `, item.users, `m_id_from: ${_.find(item.users, i=>{return el.m_id==i})}  `);
											return(
											<TsChatList onPress={() => {navigation.navigate("chat", {  chatroom:item.chatroom, m_id_from: mID, s_id: item.s_id } ); } } >
												<Common.FlexRowBox>
													<Profile color={Colors.profileColor01}>
														<ProfileTit>안</ProfileTit>
													</Profile>
													<Common.View>
														<Common.FlexRowBox>
															<TsName>{`안*수`}</TsName>
															<TsDate>{item.createdAt}</TsDate>
														</Common.FlexRowBox>
														<TsInfoTit>{item.text}</TsInfoTit>
													</Common.View>
												</Common.FlexRowBox>
												<ChatIcon />
											</TsChatList>
											)
										})}
									</Common.View>
								</Common.View>
							</Slider>
						);
					})}
				</Swiper>
			</Common.ScrollContainer>
			{contractList && (contractList[0] != undefined) &&(
				<Common.FloatBtn onPress={() => navigation.navigate('contractCalendar', {s_id:sID})}>
					<Common.TextBold16>방문시간 보기</Common.TextBold16>
				</Common.FloatBtn>
			)}
		</Common.ZipandaSafeView>
	)
}

export default TransactionStatus;
