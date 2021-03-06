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
				showAlertMessage('?????????????????????')
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
							<Common.TextSemiBold14 lineHeight>{saleData?.building_type}{saleData?.sl_building_name ? '???' + saleData?.sl_building_name : ''}</Common.TextSemiBold14>
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
							<Common.TextMedium14>????????????</Common.TextMedium14>
							<Common.TextBold24>{saleData.s_use_area_m}<Common.TextUltraLight22>???</Common.TextUltraLight22></Common.TextBold24>
						</Common.View>
						<Common.TouchableOpacity onPress={() => { setSizeUnit(!sizeUnit) }}>
							{sizeUnit ? <SizeUnitA /> : <SizeUnitP />}
						</Common.TouchableOpacity>
					</SaleHeaderInner>
					<SaleHeaderInner>
						<Common.View>
							<Common.TextMedium14>?????? ?????? ?????????</Common.TextMedium14>
							{// ??????, ?????? == ?????? + ?????????
								// ??????. ?????? == ?????????
							}
							<Common.TextBold24>{saleData?.monthly_cost}??? <Common.TextUltraLight22>?????+ </Common.TextUltraLight22>??</Common.TextBold24>
						</Common.View>
					</SaleHeaderInner>
				</SaleHeader02>
				<SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>????????????</Common.Title></Common.TitleBox>
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
					<Common.TitleBox marginB={15}><Common.Title>????????????</Common.Title></Common.TitleBox>
					<Common.FlexSpaceWrap>
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>{saleData.price_type_str}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>{saleData.price_tbl_str} </GreyListLable>
							<GreyListCont>{(saleData.deposit > 0 ? saleData.deposit + "??????" : "")}{(saleData.trading_price > 0 ? saleData.trading_price + "??????" : "")}{(saleData.s_monthly_rent > 0 ? "/" + saleData.s_monthly_rent + "??????" : "")}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>???????????????</GreyListLable>
							<GreyListCont>{saleData.m_cost}??????</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????? ????????? ??????</GreyListLable>
							<GreyListCont>{saleData.admin_cost}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>??????????????? ??????</GreyListLable>
							<GreyListCont>{saleData.indi_cost_yn}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>{saleData.loan_amt}</GreyListCont>
						</GreyListBox>
					</Common.FlexSpaceWrap>
				</SalesCont>
				<SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>?????????</Common.Title></Common.TitleBox>
					<Common.FlexSpaceWrap>
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>{saleData.building_type}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>{saleData.sale_type}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????????</GreyListLable>
							<GreyListCont>{saleData.building_name}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>???/?????? ??????</GreyListLable>
							<GreyListCont>{saleData.s_rooms_cnt}???/{saleData.s_bathrooms_cnt}???</GreyListCont>
						</GreyListBox>
						<GreyListBox BlockBox>
							<GreyListLable>??????/????????????</GreyListLable>
							<GreyListCont>{saleData.s_supply_area_m}m??/{saleData.s_use_area_m}m?? ({saleData.s_supply_area_p}P/{saleData.s_use_area_p}P)</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????????/?????????</GreyListLable>
							<GreyListCont>{saleData.s_floor}???/{saleData.s_total_floor}???</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>??? ?????? ??????</GreyListLable>
							<GreyListCont>{saleData.room_type}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????? ??????</GreyListLable>
							<GreyListCont>{saleData.room_direction_from}/{saleData.room_direction}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????? ??????</GreyListLable>
							<GreyListCont>{saleData.door_type}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>{saleData.s_total_house_cnt} ??????</GreyListCont>
						</GreyListBox>
						{/*
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>????????????</GreyListCont>
						</GreyListBox>
						*/}
						<GreyListBox>
							<GreyListLable>?????? ??? ?????? ??????</GreyListLable>
							<GreyListCont>{saleData.s_total_parking_cnt}??? ??????</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????? ?????? ??????</GreyListLable>
							<GreyListCont>{saleData.s_parking}???</GreyListCont>
						</GreyListBox>
					</Common.FlexSpaceWrap>
				</SalesCont>
				<SalesCont>
					<Common.TitleBox marginB={15}>
						<Common.Title>???????????? <Common.TextLight11 color={Colors.textNonColors}>?????????????????? ????????? ???????????????.</Common.TextLight11></Common.Title>
					</Common.TitleBox>
					<Common.View>
						<Common.TextLight14>
							{saleData.s_content}
						</Common.TextLight14>

					</Common.View>
				</SalesCont>
				<SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>????????????</Common.Title></Common.TitleBox>
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
							<Common.TextMedium15>?????????({saleData.m_name}) ???????????? ??????</Common.TextMedium15>
						</Common.FlexRowBox>
						<LessorTextBox>
							<Common.TextSemiBold16 paragraph>??????, ????????? {saleData.mc_holiday_from_hour}:{saleData.mc_holiday_from_minute}~{saleData.mc_holiday_to_hour}:{saleData.mc_holiday_to_minute}</Common.TextSemiBold16>
							<Common.TextSemiBold16 paragraph>???~??? {saleData.mc_weekday_from_hour}:{saleData.mc_weekday_from_minute}~{saleData.mc_weekday_to_hour}:{saleData.mc_weekday_to_minute}</Common.TextSemiBold16>
						</LessorTextBox>
						<Common.FlexRowBox>
							<Common.Image size={32} source={require('./../../../assets/img/drawable-xhdpi/icon-mobile-visit.png')} />
							<Common.TextMedium15>?????????({saleData.m_name}) ???????????? ??????</Common.TextMedium15>
						</Common.FlexRowBox>
						<LessorTextBox>
							<Common.TextSemiBold16 paragraph>??????, ????????? {saleData.sa_from_hour}:{saleData.sa_from_minute}~{saleData.sa_to_hour}:{saleData.sa_to_minute}</Common.TextSemiBold16>
							<Common.TextSemiBold16 paragraph>???~??? {saleData.sad_from_hour}:{saleData.sad_from_minute}~{saleData.sad_to_hour}:{saleData.sad_to_minute}</Common.TextSemiBold16>
						</LessorTextBox>
					</LessorInfoBox>
				</SalesCont>
				<SalesCont paddingN>
					<SalesMapContainer address1={saleData.address1} address2={saleData.address2} lat={saleData.s_lat} lng={saleData.s_lng} />
				</SalesCont>

				<TalkTitBox>
					<Common.TextLight11 color={Colors.mainColor} align={'center'}><Common.TextBold11 color={Colors.mainColor}>????????????</Common.TextBold11>?????? ??????????????? ?????? ?????? ????????? ?????? ????????? ??? ??? ?????????.</Common.TextLight11>
				</TalkTitBox>
			</Common.ScrollContainer>




			{
				(mID != saleData.m_id && route.params.mode == "view") &&

				<Common.FloatBtn onPress={() => { onFloatClick() }}>
					<Common.FlexRowBox>
						<Common.TextBold18>???????????? ??????</Common.TextBold18><ArrowIcon />
					</Common.FlexRowBox>
				</Common.FloatBtn>

			}
			{
				mID == saleData.m_id && route.params.mode == "modi" &&
				(saleData.s_approval_status == null || saleData.s_approval_status == 0) &&
				<Common.FloatBtn onPress={() => { onFloatClick() }}>

					<Common.FlexRowBox>
						<Common.TextBold18>????????????</Common.TextBold18><ArrowIcon />
					</Common.FlexRowBox>
				</Common.FloatBtn>

			}
			{
				(mID == saleData.m_id && route.params.mode == "modi" &&
					saleData.s_approval_status == 1) &&
				<Common.FloatBtn onPress={() => { onFloatClick() }}>

					<Common.FlexRowBox>
						<Common.TextBold18>?????? ???????????? ??????</Common.TextBold18><ArrowIcon />
					</Common.FlexRowBox>
				</Common.FloatBtn>

			}





		</Common.ZipandaSafeView>
	</>)
}


export default SalesDetailScreen
