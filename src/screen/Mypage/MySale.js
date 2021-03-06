import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from '../../styled/commonStyle';
import Colors from './../../../assets/colors';
import { ZipItemBox, ZipItemList, ZipInfoBox, BuildingNameText, PriceText, BuildingInfoBox, BuildingInfoText,
	ZipTagBox, ZipTag, ZipTagText, ZipImgBox, ZipImg, DealingBgBox,  } from "../../styled/sales/saleListItemStyle";
import { RegistrationBtn, ModifyBtn, ModifyIconS, MySaleList } from "../../styled/mypageStyle/mySaleStyle";
import { ZzimEditBox } from "../../styled/mypageStyle/zzimSaleStyle";
import { NonWrap, NoneBox } from "../../styled/mypageStyle/nonSaleStyle";
import { ZzimIcon, ZzimIconActive} from './../../components/sales/ZzimIcon';
import PointText from '../../components/common/PointText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { result } from 'lodash';

import { API_URL, API_URL_KYU, ADMIN_URL} from "@env";
import {isCloseToBottom} from "../../utils/common/scrollFunction";
import {getPriceTag} from "../../utils/common/calculator";
const MySale = ({ salesList, totalCnt, current_page, next_page, handleTotalCount, handleInitMySale, handleLikeClicked, handleDeleteLikeClicked, handleClearData }) => {

	//GET ROUTE & NAVIGATION
	//console.log("salesList======================================================");
	//console.log(current_page);
	//console.log(next_page);

	const route = useRoute(), navigation = useNavigation();

	const [ZzimBtn01, setZzimBtn01] = useState(true)
	const [ZzimBtn02, setZzimBtn02] = useState(true)

	const [mID, setMID] = useState(0);

	useEffect(() => {
		const handleEffect = async (props) => {
			AsyncStorage.getItem("mID")
				.then((result) => {
					setMID(result);
					handleInitMySale(result, 1);
					handleTotalCount(result);
				})
				.catch((err) => {
				})
		}
		handleEffect()
	}, [])
	navigation.addListener('beforeRemove', (e) => {
		console.log("back press!!");
		handleClearData();
		return false;
		
		}
  	)

	const DealingIcon = () => (<Common.Image size={16} source={require('./../../../assets/img/drawable-xhdpi/icon_list_deal.png')} />)
	const ModifyIcon = () => (<ModifyIconS source={require('./../../../assets/img/drawable-xhdpi/icon_mypage_edit.png')} />)

	const NonCont = () => {
		return (
			<NonWrap MySale>
				<NoneBox>
					<Common.Image size={76} marginB={23} source={require('../../../assets/img/drawable-xhdpi/icon_add_for_sale.png')} />
					<Common.TextSemiBold18>?????? ????????? ????????????.</Common.TextSemiBold18>
					<Common.TextLight14 align={'center'} marginT={11}>
						?????? ????????????, ?????? ???????????? ????????? ??????{"\n"}??????????????? ?????????????????????!
					</Common.TextLight14>
					<Common.GoHomeBox onPress={() => navigation.navigate('map')}>
						<Common.Image size={20} source={require('../../../assets/img/drawable-xhdpi/icon_sale_for_add.png')} />
						<Common.TextSemiBold14>?????? ????????????</Common.TextSemiBold14>
					</Common.GoHomeBox>
				</NoneBox>
			</NonWrap>
		)
	}

	const navigateToDetail=(sID)=>{
		navigation.navigate('salesDetail', { s_id: sID, mode:"modi" });
	}
	const [isOn, setOn] = useState(false);

	return (
		<Common.ZipandaSafeView>
			<ZzimEditBox>
				<Common.TextLight14><Common.TextBold14>??? {totalCnt}???</Common.TextBold14>??? ????????? ????????????.</Common.TextLight14>
			</ZzimEditBox>
			{/* ????????? ?????? ?????? ?????? */}
			{
				salesList.length <= 0 &&
				<NonCont />

			}
			<Common.ScrollContainer paddingN
				onScroll={({nativeEvent})=>{
					if (isCloseToBottom(nativeEvent)) {
						if (next_page > 0) { 
							console.log("next page: "+next_page);
							handleInitMySale(mID, next_page);
						}
					}
				}}
			>

				<ZipItemBox>

					{
						salesList.length > 0 &&

						salesList.map((item, index) => {
							console.log(item)
							return (
								<MySaleList>
									<ZipItemList MySales onPress={() => { navigateToDetail(item.s_id); }} key={`mySale_${index}`}>
									{/* <Common.FlexBetweenBox ViewAlign={'flex-start'} > */}
										<ZipInfoBox>
											<BuildingNameText>{item.sl_building_name}</BuildingNameText>
											<PointText>
												<PriceText> {getPriceTag(item.price_type, item.s_contract_type, item.s_deposit, item.s_monthly_rent, item.s_trading_price)} {/*item.price_type} {item.s_trading_price ? item.s_trading_price : item.s_deposit}{item.s_monthly_rent > 0 ? '/' + item.s_monthly_rent : ''*/}</PriceText>
											</PointText>
											<BuildingInfoBox>
												<BuildingInfoText numberOfLines={1}>{item.building_type}/ {item.s_floor}??? / {item.s_supply_area_m}m?? {item.s_maintenance_cost > 0 ? '/ ????????? ' + (item.s_maintenance_cost / 10000) + '???' : ''}</BuildingInfoText>
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
											{
												item.sf_original_nm &&
												<ZipImg   source={{ uri: API_URL + item.sf_original_nm.split(',')[0] }} />
											
											}
										</ZipImgBox>
									</ZipItemList>
									{ item.s_approval_status == 1 &&
										<RegistrationBtn>
											<Common.TextMedium16 color={Colors.textNonColors}>????????????</Common.TextMedium16>
										</RegistrationBtn>
									}
									{ item.s_approval_status != 1 &&
										<RegistrationBtn active >
											<Common.TextMedium16>{item.s_istmp==1?"????????????":"????????????"}</Common.TextMedium16>
											<ModifyBtn onPress={ ()=>{ navigation.navigate("salesDirect",{s_id: item.s_id, mode:'modi'}); } } >
												<ModifyIcon marginR={2}/><Common.TextMedium14>??????</Common.TextMedium14>
											</ModifyBtn>
										</RegistrationBtn>
									}
								</MySaleList>

							)
						})
					}

					{/*
					<Common.TouchableOpacity onPress={()=>{ console.log(" more1!!!!"); handleInitMySale(mID, next_page); } } >
						<RegistrationBtn active  >
							<TextMedium14>?????????</TextMedium14>
						</RegistrationBtn>
					</Common.TouchableOpacity>
					
					<ZipItemList flexcolumn onPress={()=>navigation.navigate('sales',{id:'1'})} >
						<Common.FlexBetweenBox>
							<ZipInfoBox>
								<ZipName>?????????????????????</ZipName>
								<ZipPriceBox>
									<PointText style={{fontSize:18,}}>?????? 2500/90</PointText>
									<DealingIcon />
								</ZipPriceBox>
								<TextLight11 numberOfLines={1}>???????????? / 4??? / 69.42m?? / ????????? 7???</TextLight11>
								<TextLight11 numberOfLines={1}>?????? ????????? ??????2???</TextLight11>
								<ZipTagBox>
									<ZipTag yellow><TextLight10>??????</TextLight10></ZipTag>
									<ZipTag yellow><TextLight10>?????????</TextLight10></ZipTag>
								</ZipTagBox>
							</ZipInfoBox>
							<ZipImgBox>
								<ZzimBtnBox onPress={() => { setZzimBtn01(!ZzimBtn01)}}>
									{ ZzimBtn01 ? <ZzimIconActive /> : <ZzimIcon /> }
								</ZzimBtnBox>
								<ZipImg source={require('./../../../assets/img/sample/sample_room_01.jpg')} />
								<DealingBgBox>
									<TextBold14 whiteTit>?????????</TextBold14>
								</DealingBgBox>
							</ZipImgBox>
						</Common.FlexBetweenBox>
						<RegistrationBtn>
							<Common.TextSemiBold16>????????????</Common.TextSemiBold16>
						</RegistrationBtn>
					</ZipItemList>
					*/}


				</ZipItemBox>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	)
}
export default MySale;
