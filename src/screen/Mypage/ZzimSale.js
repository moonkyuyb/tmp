import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Modal from 'react-native-modal';
import ModalWrap from '../Modal/ModalCommon';
import ModalStyle from './../../styled/modal/modalStyle';

import PointText from '../../components/common/PointText';
import * as Common from './../../styled/commonStyle';
import Colors from './../../../assets/colors';

import { ZipItemBox, ZipItemList, BuildingNameText, PriceText, BuildingInfoBox, BuildingInfoText,
	ZipTagBox, ZipTag, ZipTagText, ZipImgBox, ZipImg, DealingBgBox, ZzimBtn } from "../../styled/sales/saleListItemStyle";

import { ZzimHeaderBtn, DanjiItemBox, DanjiTitBox, DanjiTitleBox, DanjiList, DanjiName, DanjiInfo, ZzimEditBox,
	ChkBtn, DanjiModifyWrap, DanjiItemWrap, DanjiModifyList, ListModifyBox, ModifyBtn, BtnBorder } from "../../styled/mypageStyle/zzimSaleStyle";
import { NonWrap, NoneBox } from "../../styled/mypageStyle/nonSaleStyle";
import { ZzimIcon, ZzimIconActive} from './../../components/sales/ZzimIcon';

import ZzimDanjiI01Modal from './ZzimDanjiI01Modal';
import ZzimDanjiI02Modal from './ZzimDanjiI02Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, API_URL_KYU, ADMIN_URL } from "@env";
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Controller, useForm } from "react-hook-form";

import {isCloseToBottom} from "../../utils/common/scrollFunction";
import { nextPage } from '../../reducers/salesReducer';
import { getPriceTag } from '../../utils/common/calculator';

const ZzimSale = ({props, zzimList,zzimDanjiList,checked_danji, total_cnt, danji_total_cnt, current_page, next_page, checked_item, handleInitZzim, handleLikeClicked, handleDeleteLikeClicked, handleGetTotalZZim, handleOnCheckItem, handleGetZzim, handleGetLikeDanji,handleOnCheckDanji,handleDeleteDanji }) => {
	
	
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [listHeaderBtn01, setListHeaderBtn01] = useState(true)
	const [listHeaderBtn02, setListHeaderBtn02] = useState(false)
	const [listViewBtn, setListViewBtn] = useState(false)
	const [saleListModify, setSaleListModify] = useState(false)

	const [danjiData, setDanjiData] = useState([])

	const [ZzimBtn01, setZzimBtn01] = useState(true)
	const [ZzimBtn02, setZzimBtn02] = useState(true)

	const [Danji01, setDanji01] = useState(true)
	const { control, handleSubmit, setValue, getValues } = useForm()


	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => { setModalVisible(!isModalVisible) };

	const [mID, setMID] = useState(0);


	useEffect(()=>{
		if (mID != 0) {
			if (listHeaderBtn02) {
				handleGetLikeDanji(mID);
			} else {
				handleGetZzim({ cat: "sales", mID: mID, page: 1 });

			}
		}
	},[listHeaderBtn02])

	useEffect(()=>{
		console.log("danji data===================================")
		//console.log(danjiData);
		if (mID != 0) {
			if (danjiData.length > 0) {
				setSelectedDanji(danjiData[0].danjiName);
				handleGetZzim({ cat: "danji", mID: mID, page: 1, dCode: danjiData[0].d_code })
			} else {
				setSelectedDanji("");
				//handleGetZzim({cat:"danji", mID:mID, page:1, dCode:danjiData[0].d_code})	
			}
		}
	},[danjiData])


	const [danjiCnt, setDanjiCnt] = useState(0);
	
	useEffect(() => {
		const handleEffect = async (props) => {
			
			AsyncStorage.getItem("mID")
			.then((result) => {
				setMID(result);
				//handleInitZzim({ cat: "sales", mID: result, page: 1 });
				handleGetZzim({ cat: "sales", mID: result, page: 1});
				handleGetTotalZZim({ mID: result });
			})
			.catch((err) => {
			})

		}
		handleEffect()
	}, [])

	const ModifyBtn01 		 = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_search_cencel_w.png')} />)
	const ModifyBtn02 		 = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_mypage_edit.png')} />)

	const ChkIcon 			 = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkIconActive 	 = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const DanjiChkIcon 		 = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const DanjiChkIconActive = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const DealingIcon 		 = () => (<Common.Image size={16} source={require('./../../../assets/img/drawable-xhdpi/icon_list_deal.png')} />)
	const DanjiIcon 		 = () => (<Common.Image size={26} marginR={11} source={require('./../../../assets/img/drawable-xhdpi/icon_text_search_title_buiding.png')} />)
	const HeartIcon 		 = () => (<Common.Image size={18} source={require('./../../../assets/img/drawable-xhdpi/img_mypage_heart.png')} />)
	const ListModifyIconUp 	 = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_mypagr_arrow_up_w.png')} />)
	const ListModifyIconDown = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_mypagr_arrow_down_w.png')} />)
	const SmallArrowIcon	 = () => (<Common.Image size={15} source={require('./../../../assets/img/drawable-xhdpi/bt_sub_back.png')} />)

	const [selectedDanji, setSelectedDanji] = useState("");

	const DanjiItem = ({ item }) => {
		return (
			<DanjiList onPress={() => {console.log("d_code"+item.d_code); setSelectedDanji(item.danjiName); handleGetZzim({cat:"danji", mID:mID, page:1, dCode:item.d_code}) }}>
				<DanjiIcon />
				<Common.View>
					<DanjiName numberOfLines={1}>{item.danjiName}</DanjiName>
					<DanjiInfo>
						<ZipTag marginT={3} yellow danjiTag><Common.TextLight12>{item.tit01}</Common.TextLight12><SmallArrowIcon/></ZipTag>
						{/*
						<ZipTag marginT={3} yellow danjiTag><Common.TextLight12>{item.tit02}</Common.TextLight12><SmallArrowIcon/></ZipTag>
						danji - 전체 면적 클릭시  ZzimDanjiI01Modal 
						<ZipTag marginT={3} yellow danjiTag><Common.TextLight12>{item.tit03}</Common.TextLight12><SmallArrowIcon/></ZipTag>
						danji - 동 클릭시  ZzimDanjiI02Modal */}
					</DanjiInfo>
				</Common.View>
			</DanjiList>
		);
	}
	const DanJiCont = () => {
		return (
			<Common.View>
				<DanjiItemBox>
					<FlatList
						horizontal={true}
						contentContainerStyle={{ paddingLeft: 12, paddingRight: 2 }}
						data={danjiData}
						onPress={() =>{console.log("dfdfdfd");}}
						renderItem={DanjiItem}
						keyExtractor={item => item.id}
					/>
				</DanjiItemBox>
				<DanjiTitleBox>
					<Common.TextLight14><Common.TextBold14>{selectedDanji}에 총 {danjiData.length}개</Common.TextBold14>의 단지가 있습니다.</Common.TextLight14>
				</DanjiTitleBox>
			</Common.View>
		)
	}

	const [checkedList, setCheckedList] = useState([]);

	var checkedItem = []

	const clickUnlike=()=>{

		var sids= "";
		checkedList.forEach((el, index)=>{
			sids += el+(index<(checkedList.length-1)?",":"");
		})
		if (listHeaderBtn02) {
			handleDeleteDanji({m_id:mID, danji_list:checked_danji});
			setSaleListModify(false);
		}else {
			handleDeleteLikeClicked({s_id:sids, m_id:mID},0);
		}
	}

	const SaleModifyBtn = () => {
		return (
			
			<Common.FloatBtnBox>
				<Common.FloatBtnsss onPress={()=>{  checkAll(); } }>
					<Common.TextSemiBold18>전체선택</Common.TextSemiBold18>
				</Common.FloatBtnsss>
				<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={()=>{  if (listHeaderBtn02){clickUnlike(); } else {if (checkedList.length <= 0){  }else { clickUnlike(); } }}}>
					<Common.TextSemiBold18 color={Colors.whiteColor} >선택삭제</Common.TextSemiBold18>
				</Common.FloatBtnsss>
			</Common.FloatBtnBox>
						
		)
	}


	const checkAll = () =>{
		zzimList.map((item, index) => {
			checkedItem[index] = item.s_id
		});
		setCheckedList(checkedItem);
	}


	const ChkBtnBox = (props) => {
		//console.log(`check sid: ${props.s_id}`)
		const [active, setActive] = useState(props.isActive ? props.isActive : false)
		return (
			<ChkBtn 
				key={`chk_${props.s_id}`}
				keyExtractor={this.keyExtractor}
				onPress={() => { 
					setActive(!active);
					var tmpCheck = checked_item;
					if (checked_item.indexOf(props.s_id) >=0 ) {
						tmpCheck.splice(checked_item.indexOf(props.s_id), 1) ;
					}else {
						tmpCheck.push(props.s_id) ;
					}
					setCheckedList(checked_item);
					handleOnCheckItem(tmpCheck);

				}}
			>
				
				{checkedList.indexOf(props.s_id)>=0 ? <ChkIconActive key={`chk_atv_${props.s_id}`} /> : <ChkIcon key={`chk_atv_${props.s_id}`}  />}

			</ChkBtn>
		)
	}
	const NonCont = () => {
		return (
			<NonWrap>
				<NoneBox>
					<Common.Image size={76} marginB={23} source={require('../../../assets/img/drawable-xhdpi/icon_like_for_sale.png')} />
					<Common.TextSemiBold18>관심 매물이 없습니다.</Common.TextSemiBold18>
					<Common.TextLight14 paragraph align={'center'} marginT={11}>
						매물 상세페이지에서 <HeartIcon /> 버튼을 클릭하면{"\n"}
						관심 매물로 등록됩니다.
					</Common.TextLight14>
					<Common.GoHomeBox onPress={() => navigation.navigate('salesList')}>
						<Common.Image size={20} marginR={9} source={require('../../../assets/img/drawable-xhdpi/icon_sale_search.png')} />
						<Common.TextSemiBold14>매물 보러가기</Common.TextSemiBold14>
					</Common.GoHomeBox>
				</NoneBox>
			</NonWrap>
		)
	}

	const hasUnsavedChanges = Boolean(false);
	useEffect(
		() =>{
		  navigation.addListener('beforeRemove', (e) => {

			handleInitZzim();
			  	return false;
					
		  		}
			)
		}
		,
		[navigation, hasUnsavedChanges]
	  );
	useEffect(()=>{
		console.log(checkList);
	},[checkList])
	const [checkList, setCheckList] = useState([]);

	useEffect(()=>{
		var danjiArray= [];
		zzimDanjiList.forEach((el, index) =>{
			danjiArray.push({danjiName: el.kaptName, tit01: '전체거래유형', doroJuso:el.doroJuso, d_code:el.d_code, isChecked:(checked_danji.indexOf(el.d_code) < 0)})
		})
		setDanjiData(danjiArray)
	},[zzimDanjiList])
	
	const onCheck=(d_code)=>{

		var tmpList = checked_danji;
		if ( tmpList.indexOf(d_code) >=0 ) {
			tmpList.splice(tmpList.indexOf(d_code), 1); 
		}else {
			tmpList.push(d_code);
		}
		console.log("onCheck data===================================")
		var tmpDanjiData = [];
		zzimDanjiList.forEach((el, index)=>{
			console.log(el)
			tmpDanjiData.push( {danjiName:el.kaptName, tit01:'전체거래유형', doroJuso:el.doroJuso,d_code:el.d_code, isChecked:(checked_danji.indexOf(el.d_code) < 0)} )
			
		})
		setDanjiData(tmpDanjiData);

		console.log("checked danji")
		console.log(tmpList);
		handleOnCheckDanji(tmpList)

	}

	return (
		<Common.ZipandaSafeView>
			<Common.FlexBetweenBox>
				<ZzimHeaderBtn  active={listHeaderBtn01} onPress={() => { setListHeaderBtn01(true), setListHeaderBtn02(false), setSaleListModify(false) }} >
					{
						listHeaderBtn01 &&
						<Common.TextSemiBold16>관심 매물 {total_cnt}개</Common.TextSemiBold16>
					}
					{
						!listHeaderBtn01 &&
						<Common.TextUltraLight16>관심 매물 {total_cnt}개</Common.TextUltraLight16>
					}
				
				</ZzimHeaderBtn>
				<ZzimHeaderBtn active={listHeaderBtn02} onPress={() => {  setListHeaderBtn02(true), setListHeaderBtn01(false), setSaleListModify(false) }}>
					{
						listHeaderBtn02&&
						<Common.TextSemiBold16>관심 단지 {danji_total_cnt}개</Common.TextSemiBold16>
					}
					{
						!listHeaderBtn02&&
						<Common.TextUltraLight16>관심 단지 {danji_total_cnt}개</Common.TextUltraLight16>
					}
				</ZzimHeaderBtn>
			</Common.FlexBetweenBox>
			<ZzimEditBox>
				<Common.TextLight14><Common.TextBold14>총 {total_cnt}개</Common.TextBold14>의 매물이 있습니다.</Common.TextLight14>
				<Common.FlexRowBtn onPress={() => { setSaleListModify(!saleListModify) }}>
					<Common.TextSemiBold14>편집{saleListModify ? ' 완료' : ''}</Common.TextSemiBold14>
					{saleListModify ? <ModifyBtn01 /> : <ModifyBtn02 />}
				</Common.FlexRowBtn>
			</ZzimEditBox>
			

			{/* 관심단지 편집 눌렀을때 */}
			{ 
				(listHeaderBtn02 && saleListModify ) &&

				<DanjiModifyWrap>
					{
						danjiData.map((el)=>{

							return(
								<DanjiItemWrap>

									<Common.TouchableOpacity onPress={() => {onCheck(el.d_code);}}>
										{console.log(checked_danji.indexOf(el.d_code) ) }
										{el.isChecked ? <DanjiChkIcon /> : <DanjiChkIconActive/>}
										
									</Common.TouchableOpacity>
									<DanjiModifyList>
										<Common.FlexRowBox>
											<DanjiIcon />
											<DanjiTitBox>
												<DanjiName>{el.danjiName}</DanjiName>
												<DanjiInfo numberOfLines={1}>
													<Common.TextSemiBold16>{el.doroJuso}</Common.TextSemiBold16>
												</DanjiInfo>
											</DanjiTitBox>
										</Common.FlexRowBox>
										<ListModifyBox>
											<ModifyBtn Inactive><ListModifyIconUp /></ModifyBtn>
											<ModifyBtn><ListModifyIconDown /></ModifyBtn>
											<BtnBorder />
										</ListModifyBox>
									</DanjiModifyList>
								</DanjiItemWrap>
							)

						})

					}
				</DanjiModifyWrap> 
			}

			{/* cont */}
			<Common.ScrollContainer paddingN
				alwaysBounceHorizontal={false}
				alwaysBounceVertical={false}
				bounces={false}
				onScroll={({nativeEvent})=>{
					if (isCloseToBottom(nativeEvent)) {
						if (next_page > 0) { 
							handleGetZzim({ cat: "sales", mID: mID, page: next_page});
						}
					}
				}}
			>
				
				{ (listHeaderBtn02 && !saleListModify) ? <DanJiCont /> : <Common.View />}

				{ (listHeaderBtn01)&&
					<ZipItemBox>
						{zzimList.length > 0 &&
							zzimList.map((item, index) => {
								return (
									<ZipItemList >
										<Common.View>
											{saleListModify ? <ChkBtnBox s_id={item.s_id} isOn={checked_item.indexOf(item.s_id)>=0 } /> : <Common.View />}
											
											
											
											{/*props.isOn ? <ChkIconActive key={`chk_atv_${props.s_id}`} /> : <ChkIcon key={`chk_atv_${props.s_id}`}  />*/}
							

											<Common.TouchableOpacity onPress={() => navigation.navigate('salesDetail', { s_id: item.s_id, mode:"view" })} >
												<BuildingNameText marginB={4}>{item.sl_building_name}</BuildingNameText>
												<PointText>
													<PriceText>{getPriceTag(item.price_type, item.s_price_type, item.s_deposit, item.s_monthly_rent, item.s_trading_price)} </PriceText>
												</PointText>
												<BuildingInfoBox>
													<BuildingInfoText numberOfLines={1}>{item.building_type.trim()}/ {item.s_floor}층 / {item.s_supply_area_m}m² {item.s_maintenance_cost > 0 ? '/ 관리비 ' + (item.s_maintenance_cost / 10000) + '만' : ''}</BuildingInfoText>
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
											</Common.TouchableOpacity>
										</Common.View>
										<ZipImgBox>
											<ZzimBtn onPress={() => {
													AsyncStorage.getItem("mID")
													.then((result) => {
														if (result != null && result != "") {
															if (item.like_cnt > 0) {
																handleDeleteLikeClicked({ m_id: result, s_id: item.s_id }, index);
															} else {
																handleLikeClicked({ m_id: result, s_id: item.s_id }, index);
															}
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
												<Common.TouchableOpacity onPress={() => navigation.navigate('salesDetail', { s_id: item.s_id, mode:"view" })} >
													<ZipImg source={{ uri: API_URL + item.sf_original_nm.split(',')[0] }} />
												</Common.TouchableOpacity>
											}
										</ZipImgBox>
									</ZipItemList>
								)
							})
						}

					</ZipItemBox>
				}
			</Common.ScrollContainer>
			{saleListModify ? <SaleModifyBtn /> : <Common.View />}
			{/* 관심 매물 없을때 */}
			{ (listHeaderBtn02 && danjiData.length <= 0 && !saleListModify)&&
				<NonCont />
			}
			{ (listHeaderBtn01 && zzimList.length <= 0 && !saleListModify)&&
				<NonCont />
			}
			{/* <Modal />
				{ 
				<Modal isVisible={isModalVisible}  onPress={()=>{console.log("dfdfdre");}} >
					<ModalWrap toggleModal={toggleModal} title='단지 동 선택' onPress={()=>{console.log("dfdfdre");}} >
						<ZzimDanjiI01Modal />
					</ModalWrap>
				</Modal> 
				}

				<Modal isVisible={isModalVisible} style={ModalStyle.Modal}>
					<ModalWrap toggleModal={toggleModal} title='면적' onPress={()=>{console.log("dfdfdre");}} >
						<ZzimDanjiI02Modal />
					</ModalWrap>
				</Modal>
 			*/}


		</Common.ZipandaSafeView>
	)
}
export default ZzimSale;
