import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';

import { FlatList, Text } from 'react-native';

import * as Common from "../../styled/commonStyle";
import Colors from '../../../assets/colors';

import { SaleTypeBox, GreyListBox, GreyListLable, GreyListCont, DanjiHeader, SalesCont, CategoriesBox, CategoriesCont, CategoriesTab, CategoriesTabActive } from "./../../styled/sales/salesDetailStyle";
import { ZipItemList, ZipInfoBox, BuildingNameText, PriceText, BuildingInfoBox, BuildingInfoText, ZipTagBox, ZipTagText, ZipTag, ZzimBtn, ZipImg, ZipImgBox } from './../../styled/sales/saleListItemStyle';
import { ZzimImgActiveL, ZzimImgL, ZzimIconActive, ZzimIcon } from './../../components/sales/ZzimIcon';


import { SalesSliderImage } from './../../components/SalesSliderImage';
import { ModalPopup } from './../../container/commonContainer';
import { API_URL, API_URL_KYU, ADMIN_URL } from "@env";
import styled from 'styled-components/native';
import PointText from "../../components/common/PointText";
import { ArrowIconS, ArrowIconSY } from '../../components/common/ArrowIcon';

import SalesMapContainer from './SaleMap.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLike } from '../../reducers/salesReducer';

const DanjiDetailScreen = ({
    props,
	imgData,    
	isLike,     
	handleSetLike,       
	handleDelLike,
    listTab,
    //danjiDetail=======
    handleGetDanjiData,
    danjiData,
    salesList,
    handleGetDanjiSales,
	showAlertMessage
}) => {
    
	// //GET ROUTE & NAVIGATION
	 const route = useRoute(), navigation = useNavigation()
    // //console.log("d_code==========")
    // //console.log(route.params.d_code);

	console.log("danjiData=======================================");
	console.log(route.params.d_code);
	console.log(danjiData);
    // //UI STATE
    const [trigger, setTrigger] = useState(true)
    const [zzim, setZzim] = useState(false)
	const [sizeUnit, setSizeUnit] = useState(false)

    // //UI COMPONENTS
	const [mID, setMID] = useState();

    //USE EFFECT
    useEffect(()=>{
		//console.log(verifiedToken);
		AsyncStorage.getItem('mID')
		.then((result)=>{
			setMID(result)
		})
		.catch((err)=>{

		})
        handleGetDanjiData(route.params.d_code);
		//handleGetDanjiData("A13309404");
        if(trigger){
            //getSalesDetail(route.params.s_id)
            /*
			handleGetSaleDetail(route.params.s_id);
			handleGetSaleImages(route.params.s_id);
			handleGetOptions(route.params.s_id);
			handleGetTags(route.params.s_id);
			handleGetAvlTime(route.params.s_id);
			handleGetLike(route.params.s_id,2);
            */
            setTrigger(false)
        }
    },[])

    useEffect(()=>{
		if (danjiData[0].d_code != undefined) {
			handleGetDanjiSales({d_code:danjiData[0].d_code, contract_type:"sales"})
		}
    },[danjiData])

    const toDateForm = (str) =>{
        return str[0]+str[1]+str[2]+str[3]+"."+str[4]+str[5]+"."+str[6]+str[7] 
    }
    const toAreaRange = (one, two, three, four ) =>{
        console.log(one, two, three, four);
        var str= "";
        if (one != undefined) {
            str += "60m??~"
        }
        if (two != undefined) {
            if (three == undefined) {
                str += "80m??"
            }
        }
        if (three != undefined) {
            if (four == undefined) {
                str += "135m??"
            }
        }
        if (four != undefined) {
            str += "135m?? ??????,"
        }
        return str;
    }

	const CategoriesT = (props) => {
			if (listTab == props.contractType){
				return (
					<CategoriesTabActive first onPress={() => { handleGetDanjiSales({d_code:danjiData[0].d_code, contract_type: props.contractType }); }} >
						<Common.TextLight15 color={Colors.mainColor}>
							{props.title} <Common.TextBold15 color={Colors.mainColor}>{danjiData[0].cnt} </Common.TextBold15>
						</Common.TextLight15>
						<ArrowIconSY/>
					</CategoriesTabActive>
				)
			}else {
				return (
					<CategoriesTab first onPress={() => { handleGetDanjiSales({d_code:danjiData[0].d_code, contract_type: props.contractType }); }} >
						<Common.TextLight15>{props.title}<Common.TextBold15>{danjiData[0].cnt} </Common.TextBold15></Common.TextLight15><ArrowIconS/>
					</CategoriesTab>
				)
			}	
		
	}
	const CategoriesTB = (props) => {

		if (listTab == props.contractType){
			return (
				<CategoriesTabActive onPress={() => { handleGetDanjiSales({d_code:danjiData[0].d_code, contract_type: props.contractType }); }} >
					<Common.TextLight15>{props.title}<Common.TextBold15>{danjiData[0].cnt} </Common.TextBold15></Common.TextLight15><ArrowIconS/>
				</CategoriesTabActive>
			)
		}else {
			return (
				<CategoriesTab onPress={() => { handleGetDanjiSales({d_code:danjiData[0].d_code, contract_type: props.contractType }); }} >
					<Common.TextLight15>{props.title}<Common.TextBold15>{danjiData[0].cnt} </Common.TextBold15></Common.TextLight15><ArrowIconS/>
				</CategoriesTab>
			)
		}	
	
	}
	
    return (<>
		<ModalPopup/>
		<Common.ZipandaSafeView>
			<Common.ScrollContainer paddingN>
				{ //slider
				danjiData[0].sf_original_nm && 
					<SalesSliderImage files={danjiData[0].sf_original_nm} />
				}
				{/* cont */}
				<DanjiHeader>
					<Common.FlexBetweenBox ViewAlign={'flex-start'}>
						<Common.View>
							<SaleTypeBox danji><Common.TextMedium16>{"???????????????"}</Common.TextMedium16></SaleTypeBox>
							<Common.TextBold20 marginT={8}>{danjiData[0].kaptName}</Common.TextBold20>
						</Common.View>
                        <Common.TouchableOpacity onPress={() => { isLike ? handleDelLike(danjiData[0].d_code,mID):handleSetLike(danjiData[0].d_code,mID); setLike(!isLike) }}>
							{isLike ? <ZzimImgActiveL /> : <ZzimImgL />} 
                        </Common.TouchableOpacity>
                    </Common.FlexBetweenBox>
					<Common.TextLight14 marginT={8}>
						{danjiData[0].kaptdaCnt}????????????{danjiData[0].kaptDongCnt}??????{ danjiData[0].kaptUsedate !=undefined ? toDateForm(danjiData[0].kaptUsedate.toString()):"" }???{toAreaRange(danjiData[0].kaptMparea_60,danjiData[0].kaptMparea_85,danjiData[0].kaptMparea_135,danjiData[0].kaptMparea_136)}
					</Common.TextLight14>
				</DanjiHeader>
				
                <CategoriesCont>
{/*
					<CategoriesT contractType={'sales'} cnt={'sales_cnt'} title={'??????'}/>
					<CategoriesT contractType={'lease'} cnt={'lease_cnt'} title={'??????'}/>
					<CategoriesT contractType={'monthly'} cnt={'monthly_cnt'} title={'??????'}/>
					<CategoriesT contractType={'short'} cnt={'short_cnt'} title={'??????'}/>
*/				}
				</CategoriesCont>

				<SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>????????????</Common.Title></Common.TitleBox>
					<Common.FlexSpaceWrap>
                        <GreyListBox BlockBox>
							<GreyListLable>???????????????</GreyListLable>
							<GreyListCont>{danjiData[0].kaptAddr}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>{danjiData[0].codeSaleNm}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>{danjiData[0].codeHeatNm}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????????</GreyListLable>
							<GreyListCont>{danjiData[0].kaptTarea}m??</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>??????</GreyListLable>
							<GreyListCont>{danjiData[0].kaptDongCnt}???</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????????</GreyListLable>
							<GreyListCont>{danjiData[0].kaptdaCnt}??????</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>?????????</GreyListLable>
							<GreyListCont>{danjiData[0].kaptBcompany}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>??????</GreyListLable>
							<GreyListCont>{danjiData[0].hoCnt}???</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>???????????????</GreyListLable>
							<GreyListCont>{danjiData[0].kaptUsedate !=undefined ? toDateForm(danjiData[0].kaptUsedate.toString()):""}</GreyListCont>
						</GreyListBox>
                        <GreyListBox style={{height:100}} BlockBox>
							<GreyListLable>??????????????? ????????????</GreyListLable>
							<GreyListCont>
                                60m????????: {danjiData[0].kaptMparea_60>0 ? danjiData[0].kaptMparea_60:"0"}??????
                            </GreyListCont>
                            <GreyListCont>   
                                60m??~85m??: {danjiData[0].kaptMparea_85>0 ? danjiData[0].kaptMparea_85:"0"}??????
                            </GreyListCont>
                            <GreyListCont>
                                85m??~135m??: {danjiData[0].kaptMparea_135>0 ? danjiData[0].kaptMparea_135:"0"}??????
                            </GreyListCont>
                            <GreyListCont>  
                                135m????????:{danjiData[0].kaptMparea_136>0 ? danjiData[0].kaptMparea_136:"0"}??????
                            </GreyListCont>
						</GreyListBox>
					</Common.FlexSpaceWrap>
				</SalesCont>

                <SalesCont>
					<Common.TitleBox marginB={15}><Common.Title>????????????</Common.Title></Common.TitleBox>
					<Common.FlexSpaceWrap>
						<GreyListBox>
							<GreyListLable>??????????????????</GreyListLable>
							<GreyListCont>{danjiData[0].codeMgr}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>???????????? ????????????</GreyListLable>
							<GreyListCont>{danjiData[0].kaptCcompany}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>??????????????????</GreyListLable>
							<GreyListCont>{danjiData[0].codeSec}</GreyListCont>
						</GreyListBox>
						<GreyListBox>
							<GreyListLable>????????????</GreyListLable>
							<GreyListCont>{danjiData[0].codeStr}</GreyListCont>
						</GreyListBox>
                        <GreyListBox>
							<GreyListLable>????????????(??????)</GreyListLable>
							<GreyListCont>{danjiData[0].kaptdPcnt}</GreyListCont>
						</GreyListBox>
                        <GreyListBox>
							<GreyListLable>????????????(??????)</GreyListLable>
							<GreyListCont>{danjiData[0].kaptdPcntu}</GreyListCont>
						</GreyListBox>
                        <GreyListBox>
							<GreyListLable>CCTV??????</GreyListLable>
							<GreyListCont>{danjiData[0].kaptdCccnt}</GreyListCont>
						</GreyListBox>
                        <GreyListBox style={{height:100}} BlockBox>
							<GreyListLable>??????</GreyListLable>
                            <Common.TextBold12>
                                ???????????????: {danjiData[0].subwayLine}
                            </Common.TextBold12>
                            <Common.TextBold12>
                                ????????????: {danjiData[0].subwayStation}
                            </Common.TextBold12>
                            <Common.TextBold12>
                            ??????????????? ??????: {danjiData[0].kaptdWtimebus}
                            </Common.TextBold12>
                            <Common.TextBold12>
                            ???????????? ??????: {danjiData[0].kaptdWtimesub}
                            </Common.TextBold12>
						</GreyListBox>
                        <GreyListBox style={{height:80}} BlockBox>
							<GreyListLable>????????????</GreyListLable>
                            <Common.TextBold12>
                                {danjiData[0].convenientFacility}
                            </Common.TextBold12>
						</GreyListBox>
                        <GreyListBox style={{height:80}} BlockBox>
							<GreyListLable>????????????</GreyListLable>
                            <Common.TextBold12>
                                {danjiData[0].educationFacility}
                            </Common.TextBold12>
						</GreyListBox>
					</Common.FlexSpaceWrap>
				</SalesCont>
				<SalesCont paddingN>
					<SalesMapContainer address1={danjiData[0].kaptAddr} address2={danjiData[0].kaptAddr} lat={danjiData[0].d_lat} lng={danjiData[0].d_lng} />
				</SalesCont>

				<CategoriesBox>
					<CategoriesCont>
{/*
						<CategoriesTB contractType={'sales'} cnt={'sales_cnt'} title={'??????'}/>
						<CategoriesTB contractType={'lease'} cnt={'lease_cnt'} title={'??????'}/>
						<CategoriesTB contractType={'monthly'} cnt={'monthly_cnt'} title={'??????'}/>
						<CategoriesTB contractType={'short'} cnt={'short_cnt'} title={'??????'}/>
*/}
					</CategoriesCont>
				</CategoriesBox>
		
                <Common.View>
                	<FlatList
						data={ salesList}
						keyExtractor={(item, index) => {  item.s_id.toString() }}
						renderItem={({ item }) => (
							<ZipItemList onPress={() => {  navigation.navigate('salesDetail', { s_id: item.s_id, mode:"view" })}}>
								{
									<>
										<ZipInfoBox>
											<BuildingNameText>{item.sl_building_name}</BuildingNameText>
											<PointText>
												<PriceText>{item.price_type} {item.s_trading_price ? item.s_trading_price : item.s_deposit}{item.s_monthly_rent > 0 ? '/' + item.s_monthly_rent : ''}</PriceText>
											</PointText>
											<BuildingInfoBox>
												<BuildingInfoText numberOfLines={1}>{item.building_type.trim()}/ {item.s_floor}??? / {item.s_supply_area_m}m?? {item.s_maintenance_cost > 0 ? '/ ????????? ' + (item.s_maintenance_cost / 10000) + '???' : ''}</BuildingInfoText>
												<BuildingInfoText numberOfLines={1}>{`${item.location1} ${item.location2} ${item.location3}`}</BuildingInfoText>
											</BuildingInfoBox>
											<ZipTagBox>
												{
													item.st_title &&
													item.st_title.split(',').map((el) => {
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
												item.sf_original_nm &&
												<ZipImg source={{ uri: API_URL + item.sf_original_nm.split(',')[0] }} />
											}
										</ZipImgBox>
									</>
								}
								

							</ZipItemList>
						)}
						style={{ paddingHorizontal: 20 }}
					/>
                </Common.View>

            </Common.ScrollContainer>
            
        </Common.ZipandaSafeView>
    </>)
}


export default DanjiDetailScreen