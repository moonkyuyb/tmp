import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';

import Colors from './../../../assets/colors';
import * as Common from './../../styled/commonStyle';
import { GreyListBox, SaleHeaderInner, LessorInfoBox, LessorTextBox, GreyListLable, GreyListCont, SaleHeader, SalesCont, SaleHeader02, IconOptionView, SaleTypeBox, TalkTitBox } from "./../../styled/sales/salesDetailStyle";
import { FilterOptionBox, FilterIconOptionBox, IconOption } from "./../../styled/sales/filterStyle";
import { SalesSliderImage } from './../../components/SalesSliderImage';
import { OptionActiveView } from './../../components/filter/filterOption';
import { SizeUnitA, SizeUnitP } from './../../components/sales/SizeUnit';
import { ZzimImgActiveL, ZzimImgL } from './../../components/sales/ZzimIcon';
import { ArrowIcon } from './../../components/common/ArrowIcon';
import { ModalPopup } from './../../container/commonContainer';
import { API_URL, API_URL_KYU, ADMIN_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SalesMapContainer from './SaleMap.js';
import { getPriceTag } from '../../utils/common/calculator';
const SalesDetailScreen = ({
	verifiedToken, salesDetail, getSalesDetail,
	saleData,
	imgData,
	optData,
	tagData,
	avlTimeData,
	isLike,
	handleGetSaleDetail,
	handleGetSaleImages,
	handleGetOptions,
	handleGetTags,
	handleGetAvlTime,
	handleGetLike,
	handleSetLike,
	handleDelLike,
	showAlertMessage
}) => {
	console.log("saleData===============================");
	console.log(saleData);
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//UI STATE
	const [trigger, setTrigger] = useState(true)
	const [zzim, setZzim] = useState(false)
	const [sizeUnit, setSizeUnit] = useState(false)
	const [mID, setMID] = useState();

	//USE EFFECT
	useEffect(() => {
		//console.log(verifiedToken);
		if (trigger) {
			//getSalesDetail(route.params.s_id)\
			handleGetSaleDetail(route.params.s_id);
			handleGetSaleImages(route.params.s_id);
			handleGetOptions(route.params.s_id);
			handleGetTags(route.params.s_id);
			handleGetAvlTime(route.params.s_id);
			handleGetLike(route.params.s_id, 2);

			setTrigger(false)
		}

		AsyncStorage.getItem("mID")
			.then((result) => {
				setMID(result)
			})
			.catch((err) => {
			})

	}, [])

	const onFloatClick = () => {
		if (mID != saleData.m_id) {
			if (mID) {
				navigation.navigate('chat', { s_id: saleData.s_id, m_id_to: saleData?.m_id, m_id_from: verifiedToken.m_id })
			} else {
				showAlertMessage('로그인해주세요')
			}
		} else {
			if (route.params.mode == 'modi') {
				if (saleData.s_approval_status == null || saleData.s_approval_status == 0) {
					navigation.navigate("salesDirect", { s_id: saleData.s_id, mode: 'modi' });
				} else {
					navigation.navigate("contactCalendarSet", { s_id: saleData.s_id });
				}
			}
		}
	}

	return (<>
		<ModalPopup />
		<Common.ZipandaSafeView>
			<Common.ScrollContainer paddingN>
				{ //slider

					saleData.sf_thumb_nm &&
					<SalesSliderImage files={imgData} />

				}
				{/* cont */}
				<SaleHeader>
					<Common.FlexRowBox>
						<SaleTypeBox><Common.TextMedium16>{saleData?.price_type_str}</Common.TextMedium16></SaleTypeBox>
						<Common.View>
							<Common.TextSemiBold14 lineHeight>{saleData?.building_type}{saleData?.sl_building_name ? '﹒' + saleData?.sl_building_name : ''}</Common.TextSemiBold14>
							<Common.TextBold28>{getPriceTag(saleData.price_type_str, saleData.s_price_type, saleData.s_deposit, saleData.s_monthly_rent, saleData.s_trading_price)} </Common.TextBold28>
						</Common.View>
					</Common.FlexRowBox>
					<Common.TouchableOpacity onPress={() => { isLike ? handleDelLike(256, 2) : handleSetLike(route.params.s_id, 2) }}>
						{isLike ? <ZzimImgActiveL /> : <ZzimImgL />}
					</Common.TouchableOpacity>
				</SaleHeader>
				<SaleHeader02>
					<SaleHeaderInner first>
						<Common.View>
							<Common.TextMedium14>전용면적</Common.TextMedium14>
							<Common.TextBold24>{saleData.s_use_area_m}<Common.TextUltraLight22>㎡</Common.TextUltraLight22></Common.TextBold24>
						</Common.View>
						<Common.TouchableOpacity onPress={() => { setSizeUnit(!sizeUnit) }}>
							{sizeUnit ? <SizeUnitA /> : <SizeUnitP />}
						</Common.TouchableOpacity>
					</SaleHeaderInner>
					<SaleHeaderInner>
						<Common.View>
							<Common.TextMedium14>한달 예상 주거비</Common.TextMedium14>
							{// 월세, 단기 == 월세 + 관리비
								// 전세. 매매 == 관리비
							}
							<Common.TextBold24>{saleData?.monthly_cost}만 <Common.TextUltraLight22>원 + </Common.TextUltraLight22>α</Common.TextBold24>
						</Common.View>
					</SaleHeaderInner>
				</SaleHeader02>
				<SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>시설정보</Common.Title></Common.TitleBox>
					<FilterIconOptionBox marginLN>
						{
							optData.length > 0 &&

							optData.map((el, index) => {
								return (
									<IconOptionView key={`infoList_${index}`}>
										<IconOption><Common.Image size={45} source={{ uri: ADMIN_URL + el.icon_url }} /></IconOption>
										<Common.TextLight12 align={'center'}>{el.string}</Common.TextLight12>
									</IconOptionView>)
							})
						}
					</FilterIconOptionBox>
				</SalesCont>
				<SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>거래정보</Common.Title></Common.TitleBox>
					<Common.FlexSpaceWrap>
						<GreyListBox>
							<GreyListLable>계약형태</GreyListLable>
							<GreyListCont>{saleData.price_type_str}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>{saleData.price_tbl_str} </GreyListLable>
							<GreyListCont>{(saleData.deposit > 0 ? saleData.deposit + "만원" : "")}{(saleData.trading_price > 0 ? saleData.trading_price + "만원" : "")}{(saleData.s_monthly_rent > 0 ? "/" + saleData.s_monthly_rent + "만원" : "")}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>공용관리비</GreyListLable>
							<GreyListCont>{saleData.m_cost}만원</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>공용 관리비 항목</GreyListLable>
							<GreyListCont>{saleData.admin_cost}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>개별사용료 항목</GreyListLable>
							<GreyListCont>{saleData.indi_cost_yn}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>융자형태</GreyListLable>
							<GreyListCont>{saleData.loan_amt}</GreyListCont>
						</GreyListBox>
					</Common.FlexSpaceWrap>
				</SalesCont>
				<SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>방정보</Common.Title></Common.TitleBox>
					<Common.FlexSpaceWrap>
						<GreyListBox>
							<GreyListLable>건물유형</GreyListLable>
							<GreyListCont>{saleData.building_type}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>건물형태</GreyListLable>
							<GreyListCont>{saleData.sale_type}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>단지명</GreyListLable>
							<GreyListCont>{saleData.building_name}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>방/욕실 개수</GreyListLable>
							<GreyListCont>{saleData.s_rooms_cnt}개/{saleData.s_bathrooms_cnt}개</GreyListCont>
						</GreyListBox>
						<GreyListBox BlockBox>
							<GreyListLable>공급/전용면적</GreyListLable>
							<GreyListCont>{saleData.s_supply_area_m}m²/{saleData.s_use_area_m}m² ({saleData.s_supply_area_p}P/{saleData.s_use_area_p}P)</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>해당층/전체층</GreyListLable>
							<GreyListCont>{saleData.s_floor}층/{saleData.s_total_floor}층</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>방 거실 형태</GreyListLable>
							<GreyListCont>{saleData.room_type}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>주실 방향</GreyListLable>
							<GreyListCont>{saleData.room_direction_from}/{saleData.room_direction}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>현관 유형</GreyListLable>
							<GreyListCont>{saleData.door_type}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>총세대수</GreyListLable>
							<GreyListCont>{saleData.s_total_house_cnt} 세대</GreyListCont>
						</GreyListBox>
						{/*
						<GreyListBox>
							<GreyListLable>추가옵션</GreyListLable>
							<GreyListCont>전자계약</GreyListCont>
						</GreyListBox>
						*/}
						<GreyListBox>
							<GreyListLable>건물 총 주차 대수</GreyListLable>
							<GreyListCont>{saleData.s_total_parking_cnt}대 가능</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>가능 주차 대수</GreyListLable>
							<GreyListCont>{saleData.s_parking}대</GreyListCont>
						</GreyListBox>
					</Common.FlexSpaceWrap>
				</SalesCont>
				<SalesCont>
					<Common.TitleBox marginB={15}>
						<Common.Title>상세설명 <Common.TextLight11 color={Colors.textNonColors}>실제임대인이 작성한 성명입니다.</Common.TextLight11></Common.Title>
					</Common.TitleBox>
					<Common.View>
						<Common.TextLight14>
							{saleData.s_content}
						</Common.TextLight14>

					</Common.View>
				</SalesCont>
				<SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>기타태그</Common.Title></Common.TitleBox>
					<FilterOptionBox>
						{
							tagData.length > 0 &&
							tagData.map((el) => {
								return <OptionActiveView key={el.st_id}>{"#" + el.string}</OptionActiveView>
							})
						}
					</FilterOptionBox>
					<LessorInfoBox>
						<Common.FlexRowBox>
							<Common.Image size={32} source={require('./../../../assets/img/drawable-xhdpi/icon-mobile-call.png')} />
							<Common.TextMedium15>임대인({saleData.m_name}) 연락가능 시간</Common.TextMedium15>
						</Common.FlexRowBox>
						<LessorTextBox>
							<Common.TextSemiBold16 paragraph>주말, 공휴일 {saleData.mc_holiday_from_hour}:{saleData.mc_holiday_from_minute}~{saleData.mc_holiday_to_hour}:{saleData.mc_holiday_to_minute}</Common.TextSemiBold16>
							<Common.TextSemiBold16 paragraph>월~금 {saleData.mc_weekday_from_hour}:{saleData.mc_weekday_from_minute}~{saleData.mc_weekday_to_hour}:{saleData.mc_weekday_to_minute}</Common.TextSemiBold16>
						</LessorTextBox>
						<Common.FlexRowBox>
							<Common.Image size={32} source={require('./../../../assets/img/drawable-xhdpi/icon-mobile-visit.png')} />
							<Common.TextMedium15>임대인({saleData.m_name}) 방문가능 시간</Common.TextMedium15>
						</Common.FlexRowBox>
						<LessorTextBox>
							<Common.TextSemiBold16 paragraph>주말, 공휴일 {saleData.sa_from_hour}:{saleData.sa_from_minute}~{saleData.sa_to_hour}:{saleData.sa_to_minute}</Common.TextSemiBold16>
							<Common.TextSemiBold16 paragraph>월~금 {saleData.sad_from_hour}:{saleData.sad_from_minute}~{saleData.sad_to_hour}:{saleData.sad_to_minute}</Common.TextSemiBold16>
						</LessorTextBox>
					</LessorInfoBox>
				</SalesCont>
				<SalesCont paddingN>
					<SalesMapContainer address1={saleData.address1} address2={saleData.address2} lat={saleData.s_lat} lng={saleData.s_lng} />
				</SalesCont>

				<TalkTitBox>
					<Common.TextLight11 color={Colors.mainColor} align={'center'}><Common.TextBold11 color={Colors.mainColor}>직거래톡</Common.TextBold11>으로 매도인에게 집에 대한 문의나 방문 예약을 할 수 있어요.</Common.TextLight11>
				</TalkTitBox>
			</Common.ScrollContainer>




			{
				(mID != saleData.m_id && route.params.mode == "view") &&

				<Common.FloatBtn onPress={() => { onFloatClick() }}>
					<Common.FlexRowBox>
						<Common.TextBold18>직거래톡 하기</Common.TextBold18><ArrowIcon />
					</Common.FlexRowBox>
				</Common.FloatBtn>

			}
			{
				mID == saleData.m_id && route.params.mode == "modi" &&
				(saleData.s_approval_status == null || saleData.s_approval_status == 0) &&
				<Common.FloatBtn onPress={() => { onFloatClick() }}>

					<Common.FlexRowBox>
						<Common.TextBold18>수정하기</Common.TextBold18><ArrowIcon />
					</Common.FlexRowBox>
				</Common.FloatBtn>

			}
			{
				(mID == saleData.m_id && route.params.mode == "modi" &&
					saleData.s_approval_status == 1) &&
				<Common.FloatBtn onPress={() => { onFloatClick() }}>

					<Common.FlexRowBox>
						<Common.TextBold18>방문 가능날짜 설정</Common.TextBold18><ArrowIcon />
					</Common.FlexRowBox>
				</Common.FloatBtn>

			}





		</Common.ZipandaSafeView>
	</>)
}


export default SalesDetailScreen
