/* COMMON */
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
/* UI COMPONENTS */
import { Dimensions } from 'react-native';
import Colors from './../../../assets/colors';
import * as Common from "./../../styled/commonStyle";
import { ZzimIconActive, ZzimIcon } from "../../components/sales/ZzimIcon";
import PointText from "../../components/common/PointText";
import { SearchWrap, FilterBtn, SearchBox, SearchContBox } from '../../styled/sales/SaleSearchStyle';
import { DealingImgBox, ZipDot, ZipHeaderBtn, ZipHeaderBtnBox, ZipHeaderText, ZipItemContainer, ZipViewBtnBox} from "../../styled/sales/salesListStyle";
import { ZipItemBox, ZipItemList, ZipInfoBox, BuildingNameText, PriceText, BuildingInfoBox, BuildingInfoText, DanjiContBox,
	ZipTagBox, ZipTag, ZipTagText, ZipTagLabel, DanjiNum, ZipImgBox, ZipImg, DealingBgBox, ZzimBtn } from "../../styled/sales/saleListItemStyle";

import { PrevIcon } from "../../components/common/header";
import  SaleListTutorial from "./../Tutorial/saleListTutorial";

import { API_URL } from "@env";
import ZipFilterOption from "./ZipFilterOption"
//import ZipMap from '../screen/Map/zipMap';
import MapContainer from '../../container/mapContainer';

import { HeaderLeft, HeaderRight } from "./../../styled/layoutStyle";

import SaleSearch from "./SaleSearch";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPriceTag } from "../../utils/common/calculator";
const SalesListScreen = ({
	salesList,
	danjiList,
	
	searchKeyword,
	filter,
	filterHandler,
	handleSetGeolocation,
	setFilterComplete,
	handleLikeClicked,
	handleLikeDanjiClicked,
}) => {

	//console.log("danji LIST==================================")
	//console.log(danjiList);
	
	//console.log(filter.geoLocation);

	const route = useRoute();
	const navigation = useNavigation()
	const ref = useRef();

	//console.log("sales list================================================");
	//console.log(route.params)

	const [geoLocation, setGeoLocation] = useState({});

	const [trigger, setTrigger] = useState(true)
	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const [listView, setListView] = useState(true)

	const ZipViewBtn = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_sub_down.png')} />)
	const ZipViewBtnActive = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_sub_up.png')} />)

	const [isOpen, setOpen] = useState(false);
	useEffect(() => {

		//console.log("filter-=-=-========================================================");
		//console.log(filter.geoLocation);
		setGeoLocation(filter.geoLocation);


		//필터에 사용될 데이터 받기
		if (trigger) {

			filterHandler.handleGetAllFilter();
			//getSalesList(filter)			
			setTrigger(false)
		}
	}, [])

	/*
	useEffect(() =>{
		if(filter.filterComplete) {
			//console.log(filter)
			//getSalesList(filter);
			setFilterComplete(false);
			
			//setFilterTrigger(false);
		}
		
	},[filter])
	*/



	//console.log("sales list route=======================================================");


	const modalHeader = (
		<Common.View>
			<HeaderLeft style={{ marginTop: 150, headerTintColor: Colors.blackColor, shadowColor: '#eaeaea', elevation: 1, }}>
				<Common.FlexRowBtn onPress={() => { setOpen(!isOpen) }}>
					<PrevIcon/><Common.TextSemiBold20>지도에서 매물찾기</Common.TextSemiBold20>
				</Common.FlexRowBtn>
			</HeaderLeft>
		</Common.View>
	)

    const SearchBar = () => (
		<SearchWrap>
			<FilterBtn onPress={()=>{/*setFilterTrigger(true);*/ navigation.navigate('filter');}}>
				<Common.Image size={24} marginB={3} source={require('./../../../assets/img/drawable-xhdpi/bt_filter.png')} />
				<Common.TextMedium13>필터</Common.TextMedium13>
			</FilterBtn>
		  	<SearchBox marginR>
				{
					<SearchContBox onPress={()=>{ navigation.navigate('search');}}>
						<Common.TextLight18>{route.params!=undefined ? route.params.mainText : "" }</Common.TextLight18>
					</SearchContBox>
				}
				<Common.TouchableOpacity onPress={()=>{ navigation.navigate('search');}}>
					<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_search_b.png')}/>
				</Common.TouchableOpacity>
		 	 </SearchBox>
			{/*
		  <SaleSearch/>
			*/}
		  <ZipFilterOption filter={filter} handler={filterHandler} />
		  {/*
		  <GooglePlacesInput/>			
		  */}
		</SearchWrap>
	);
	const [salesTutorialShow, setSalesTutorialShow] = useState(true);
	AsyncStorage.getItem("salesTutorial")
	.then((result)=>{
		if (result != null) {
			setSalesTutorialShow(false)
		}
	})
	return (
		<Common.ZipandaSafeView>
		
			{salesTutorialShow &&
				<SaleListTutorial setTutorialShow={setSalesTutorialShow} />
			}

			<SearchBar />
			{//salesList.length > 0 &&
				<MapContainer page={"search"} filter={filter} salesList={salesList} danjiList={danjiList} tabIndex={activeTabIndex} />
			}
			<ZipItemContainer  active={listView} style={listView ? styles.midHeight : styles.fullHeight} >
				<Common.FlexBetweenBox>
					<ZipHeaderBtnBox>
						<ZipHeaderBtn active={activeTabIndex == 0} onPress={()=>{setActiveTabIndex(0)}}>
							<ZipHeaderText active={activeTabIndex == 0}>전체 {salesList.length}개</ZipHeaderText>
							{activeTabIndex == 0 && (<ZipDot/>)}
						</ZipHeaderBtn>
						<ZipHeaderBtn active={activeTabIndex == 1} onPress={()=>{setActiveTabIndex(1)}}>
							<ZipHeaderText active={activeTabIndex == 1}>단지 {danjiList.length}개</ZipHeaderText>
							{activeTabIndex == 1 && (<ZipDot/>)}
						</ZipHeaderBtn>
					</ZipHeaderBtnBox>
					<ZipViewBtnBox active={listView} onPress={()=>{  setListView(!listView)}}>
						{listView ? (<ZipViewBtnActive/>):(<ZipViewBtn/>)}
					</ZipViewBtnBox>
				</Common.FlexBetweenBox>

				<ZipItemBox>
					<FlatList
						data={ activeTabIndex==0 ? salesList:danjiList}
						keyExtractor={(item, index) => { activeTabIndex==0 ? item.s_id.toString():item.d_code.toString() }}
						renderItem={({ item }) => (
					
						<ZipItemList topAlign onPress={() => { activeTabIndex==0 ? navigation.navigate('salesDetail', { s_id: item.s_id, mode:"view" }):navigation.navigate('danjiDetail', { d_code: item.d_code, mode:"danji" }) }}>
							{
									activeTabIndex==0 &&
								<>
									<ZipInfoBox>
										<BuildingNameText>{item.sl_building_name}</BuildingNameText>
										<PointText>
											<PriceText>{ getPriceTag(item.price_type,item.s_price_type,item.s_deposit, item.s_monthly_rent, item.s_trading_price) }</PriceText>
										</PointText>
										<BuildingInfoBox>
											<BuildingInfoText paragraph numberOfLines={1}>{item.building_type.trim()}/ {item.s_floor}층 / {item.s_supply_area_m}m² {item.s_maintenance_cost>0?'/ 관리비 '+(item.s_maintenance_cost/10000)+'만':''}</BuildingInfoText>
											<BuildingInfoText paragraph numberOfLines={1}>{`${item.location1} ${item.location2} ${item.location3}`}</BuildingInfoText>
										</BuildingInfoBox>
										<ZipTagBox>
											{
												item.st_title &&
												item.st_title.split(',').map((el)=>{
													return (<ZipTag><ZipTagText>{el}</ZipTagText></ZipTag>);
												})
											
											}
										</ZipTagBox>
									</ZipInfoBox>
									<ZipImgBox>
										<ZzimBtn onPress={() => {
											AsyncStorage.getItem("mID")
												.then((result) => {

													if (result != null && result != "") {
														handleLikeClicked({ m_id: result, s_id: item.s_id });
													}

												})
												.catch((err) => {

												})
										}}
											active={false}>
											{false ? <ZzimIconActive /> : <ZzimIcon />}
										</ZzimBtn>
										{
											item.sf_thumb_nm &&
											<ZipImg source={{ uri: API_URL + item.sf_thumb_nm.split(',')[0] }} />
										}
									</ZipImgBox>
								</>
							}
							{	//단지
									activeTabIndex==1 &&
								<>  
									<Common.View>
										<ZipInfoBox >
											<BuildingNameText>{item.kaptName}</BuildingNameText>
											<PriceText>{"매매 "+(item.sales_min==null?"":(item.sales_min+"~"+item.sales_max))}</PriceText>
											<PriceText>{"전세 "+(item.lease_min==null?"":(item.lease_min+"~"+item.lease_max))}</PriceText>
											<BuildingInfoBox>
												<BuildingInfoText numberOfLines={1}>{item.codeAptNm+" / "+item.hoCnt+"세대 / "+"총"+item.kaptDongCnt+"동 / "+item.kaptUsedate }</BuildingInfoText>
												<BuildingInfoText numberOfLines={1}>{}</BuildingInfoText>
											</BuildingInfoBox>
										</ZipInfoBox>
										<ZipTagBox danji>
											<ZipTag danji><ZipTagLabel>매매</ZipTagLabel><DanjiNum>{item.sales_cnt}</DanjiNum></ZipTag>
											<ZipTag danji><ZipTagLabel>전세</ZipTagLabel><DanjiNum>{item.lease_cnt}</DanjiNum></ZipTag>
											<ZipTag danji><ZipTagLabel>월세</ZipTagLabel><DanjiNum>{item.monthly_cnt}</DanjiNum></ZipTag>
											<ZipTag danji><ZipTagLabel>단기</ZipTagLabel><DanjiNum>{item.short_cnt}</DanjiNum></ZipTag>
										</ZipTagBox>
									</Common.View>
									
									<ZipImgBox danjiImg>
										<ZzimBtn onPress={() => {
											AsyncStorage.getItem("mID")
												.then((result) => {
													
													if (result != null && result != "") {
														handleLikeDanjiClicked({ m_id: result, d_code: item.d_code });
													}
													
												})
												.catch((err) => {
													
												})
											}}
											active={false}>
											{item.like_cnt > 0 ? <ZzimIconActive /> : <ZzimIcon />}
										</ZzimBtn>
										{
											item.sf_original_nm &&
											<ZipImg source={{ uri: API_URL + item.sf_original_nm.split(',')[0] }} />
										}
									</ZipImgBox>
								
									
								</>
							}
							
						</ZipItemList>
						
					)}
					/>
				</ZipItemBox>
			</ZipItemContainer>
		</Common.ZipandaSafeView>
	)
}

const styles = StyleSheet.create({
	midHeight: {
		height: '50%'
	},
	fullHeight: {
		height: Dimensions.get('window').height - 175
	},
});


// SAMPLE(거래중)
// <ZipItemList>
// <ZipInfoBox>
//     <Common.TextBold fontSize={10}>두산위브센티움</Common.TextBold>
//     <ZipPriceBox>
//         <PointText fontSize={18}>월세 2500/90</PointText>
//     </ZipPriceBox>
//     <ZipInfoTit numberOfLines={1}>오피스텔 / 4층 / 69.42m² / 관리비 7만</ZipInfoTit>
//     <ZipInfoTit numberOfLines={1}>서울 강남구 논현2동</ZipInfoTit>
//     <ZipTagBox>
//         <ZipTag>주차</ZipTag>
//         <ZipTag>풀옵션</ZipTag>
//     </ZipTagBox>
// </ZipInfoBox>
// <ZipImgBox>
//     <ZipImgInnerBox><ZipImg source={require('./../../../assets/img/sample/sample_room_02.jpg')} /></ZipImgInnerBox>
//     <ZzimBtn>
//         <ZzimIconActive/>
//     </ZzimBtn>
//     <DealingImgBox>
//         <Common.TextBold14>거래중</Common.TextBold14>
//     </DealingImgBox>
// </ZipImgBox>
// </ZipItemList>

export default SalesListScreen



