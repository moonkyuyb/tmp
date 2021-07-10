import React, { useEffect, useState } from 'react';
import { FlatList,} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_URL } from "@env";

/* COMMON COMPONENTS */
import * as Common from './../../styled/commonStyle';
import Colors from '../../../assets/colors';
import { FloatingWrap, BtnCenterBar, FloatingBtn,
	ZipRecommendWrap, ZipRecommendList, ZipRecommendHeader, StepListBox, ZipImgBox, ZipImg, ZzimIconBtn, RecommendInfo} from './../../styled/mainStyle/mainScreenStyle'
import MainTop from './MainTop';

import { ZipandaLogoIconML } from './../../components/common/header';
import { ArrowIcon } from '../../components/common/ArrowIcon';
import { NoticeIconOn , NoticeIconOff, MenuIcon} from './../../components/common/header'
import { ZzimIconActive, ZzimIcon } from "../../components/sales/ZzimIcon";

import MapContainer from '../../container/mapContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from "react-native-modal";
import IndexTutorial from './../Tutorial/indexTutorial';
import SaleListTutorial from './../Tutorial/saleListTutorial';

import { ModalBtn, ModalBtnBox, ModalContainer, ModalHeader, ModalTextCont } from './../../styled/modal/modalStyle';
import {getPriceTag} from '../../utils/common/calculator';
//import PushHandler from '../../utils/common/pushHandler'

import messaging from '@react-native-firebase/messaging';
import { firebase } from '@react-native-firebase/firestore';

const MainScreen = ({myContract, isSigned, filter, salesList, zipList, zipProcess,  handleLike, handleInitMain})  => {
	 //const pushHandler = new PushHandler(navigation);
	 //pushHandler.init(navigation);
	//firebase.initializeApp();
	

	const route = useRoute(), navigation = useNavigation()
	const [isVisible, setVisible] = useState(false);

	
	const [ZzimBtn, setZzimBtn] = useState(false)
	const [notice, setNotice] = useState(false)
	//list active
	const [currentId, setCurrentId] = useState(1)

	const [tutorialShow, setTutorialShow] = useState(true);
	
	
	//PushHandler(navigation)

	const [mID, setMID] = useState(0);
	AsyncStorage.getItem("mID")
	.then((result)=>{
		if (result != null) {
			setMID(result);
		}
	})

	AsyncStorage.getItem("indexTutorial")
	.then((result)=>{
		if (result != null) {
			setTutorialShow(false)
		}
	})

	useEffect(()=>{
		const handleEffect = async (props) => {
			//navigation
			AsyncStorage.getItem("mID")
			.then((result)=>{
				if (result != null) {
					handleInitMain({m_id:result});
				}
			})
			navigation.setOptions({
				drawerLabel: 'About',
				headerStyle: {
					backgroundColor: Colors.mainColor,	
					shadowColor: 'transparent', elevation:0
				},
				headerTitle: "" ,
				headerLeft: props => <ZipandaLogoIconML {...props} />,
				headerRight: () => (
					<Common.FlexRowBox  marginR={20}>
						<Common.TouchableOpacity marginR={8} onPress={()=>{navigation.navigate('alarmList');}}>
							{ notice ? <NoticeIconOn/> : <NoticeIconOff/>}
						</Common.TouchableOpacity>
						<Common.TouchableOpacity onPress={()=>navigation.openDrawer()}>
							<MenuIcon/>
						</Common.TouchableOpacity>
					</Common.FlexRowBox>
				),
			})
			
		
			/*
			setZipStepData01([
				{ id : 1, title: '매물 검색' }, { id : 2, title: '매물 확인' }, { id : 3, title: '가계약 진행' }, { id : 4, title: '계약금 납입' }, { id : 5, title: '전자 계약 진행' }, { id : 6, title: '잔금 납입' }, { id : 7, title: '계약 완료' }
			])
			setZipStepData02([
				{ id : 1, title: '매물 등록' }, { id : 2, title: '가계약 진행' }, { id : 3, title: '계약금 납입' }, { id : 4, title: '전자 계약 진행' }, { id : 5, title: '잔금 납입 확인' }, { id : 6, title: '계약 완료' }
			])
			*/
			
		}
		handleEffect()
	},[])

	// 집구하기 , 집 내놓기 list
	const ZipStepItem=({item}) => {
		if(currentId == item.id){
			return(
				<StepListBox active>
					<Common.FlexRowBox>
						<Common.TextMedium10>Step 0{item.id} </Common.TextMedium10>
						{[currentId == item.id ? <ArrowIcon /> : <></>]}
					</Common.FlexRowBox>
					<Common.TextBold16 marginT={4}>{item.title}</Common.TextBold16>
				</StepListBox>
			)
		}
		else{
			return(
				<StepListBox>
					<Common.FlexRowBox>
						<Common.TextMedium10>Step 0{item.id} </Common.TextMedium10>
						{[currentId == item.id ? <ArrowIcon /> : <></>]}
					</Common.FlexRowBox>
					<Common.TextBold16 marginT={4}>{item.title}</Common.TextBold16>
				</StepListBox>
			)
		}
        
    }
	// 추천 매물 리스트
	const ZipListItem=({item}) => {
		//console.log("list itme img==============================");
		//console.log( item.sf_thumb_nm );

		var imgURI ='';
		if (item.sf_original_nm != null ) {
			imgURI = item.sf_thumb_nm.toString().split(",")[0];
		}
		var address 	= `${item.location1} ${item.location2} ${item.location3}`;
		var priceTypeStr 	= item.price_type;
		var priceTypeCode		= item.s_price_type;
		
		var deposit 		= item.s_deposit;
		var monthlyRent 	= item.s_monthly_rent;
		var tradingPrice	= item.s_trading_price;

		var priceTag = getPriceTag(priceTypeStr, priceTypeCode, deposit, monthlyRent, tradingPrice);
		return(
			<ZipRecommendList onPress={()=>navigation.navigate('salesDetail',{s_id:item.s_id, mode:"view"})}>
				<ZipImgBox>
					<ZipImg source={ {uri: API_URL+imgURI } }/>
					<ZzimIconBtn
					onPress={() => {
						AsyncStorage.getItem("mID")
						.then((result)=>{
							if(result!= null){
								handleLike(item.key);  
								setZzimBtn(!ZzimBtn);
							}else {
								setVisible(true);
							}
						});
					}} >
						{ZzimBtn ?<ZzimIconActive /> : <ZzimIcon />}
					</ZzimIconBtn>
				</ZipImgBox>
				<RecommendInfo>
					{/* <Common.Text>{item.like}</Common.Text> */}
					<Common.TextLight12 numberOfLines={1}>{address}</Common.TextLight12>
					<Common.TextBold18 numberOfLines={1}>{priceTag}</Common.TextBold18>
				</RecommendInfo>
			</ZipRecommendList>
		)
	}

	
	return(
		<Common.ZipandaSafeView>
			<Modal isVisible={isVisible}>
				<ModalContainer>
					<ModalHeader>
						<Common.TextSemiBold14>{''}</Common.TextSemiBold14>
						<Common.TouchableOpacity onPress={()=>{ }}><Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_menu_close.png')}/></Common.TouchableOpacity>
					</ModalHeader>
					<ModalTextCont>
						<Common.TextBold14>{"로그인 후 이용 가능합니다." }</Common.TextBold14>
					</ModalTextCont>
					<ModalBtnBox>
						{/*
						<ModalBtn onPress={()=>{ setVisible(false); navigation.navigate("signIn"); }}><Common.TextSemiBold14>확인</Common.TextSemiBold14></ModalBtn>
						*/}
						<ModalBtn onPress={()=>{ setVisible(false); }}><Common.TextSemiBold14 color={Colors.whiteColor}>확인</Common.TextSemiBold14></ModalBtn>
					</ModalBtnBox>
				</ModalContainer>
			</Modal>

			{tutorialShow &&
				<IndexTutorial setTutorialShow={setTutorialShow} />
			}
			{/*tutorialShow &&
				<SaleListTutorial setTutorialShow={setTutorialShow} />
			*/}

			<FloatingWrap>
				<FloatingBtn onPress={()=>navigation.navigate('registerContainer')} >
					<Common.Image size={24} marginR={5} source={require('../../../assets/img/drawable-xhdpi/icon_housesell.png')}/>
					<Common.TextSemiBold16>집 내놓기</Common.TextSemiBold16>
				</FloatingBtn>
				<BtnCenterBar/>
				<FloatingBtn onPress={()=>{ AsyncStorage.getItem("mID").then( (result)=>{ if (result!=null){navigation.navigate('transactionStatus')}else{setVisible(true)}   } ).catch((err)=>{}) } } >
					<Common.Image size={24} marginR={5} source={require('../../../assets/img/drawable-xhdpi/icon_talk.png')}/>
					<Common.TextSemiBold16>직거래톡</Common.TextSemiBold16>
				</FloatingBtn>
			</FloatingWrap>
			<Common.ScrollContainer paddingN>
				
				<MainTop data={myContract} isSigned={isSigned} />
				
				{/* 지도 
				<Image style={{width: '100%', height: '100%'}} source={require('../../../assets/img/sample/sample_map.png')} />
				*/}
				<Common.View>
				{ 	
					<MapContainer page={"main"} filter={filter} salesList={salesList} danjiList={[]} tabIndex={0} />
				}
				</Common.View>	
					
				<ZipRecommendWrap>
					<ZipRecommendHeader>
						<Common.TextBold18>추천매물</Common.TextBold18>
						<Common.FlexRowBtn  onPress={()=>navigation.navigate('salesList')}  >
							<Common.TextLight12 color={Colors.greyColor}>전체보기</Common.TextLight12>
							<Common.Image size={8} marginL={8} source={require('../../../assets/img/drawable-xhdpi/icon_arrow_01.png')} />
						</Common.FlexRowBtn>
					</ZipRecommendHeader>
					<FlatList
						horizontal={true}
						contentContainerStyle={{ paddingHorizontal: 20 }}
						data={ salesList.slice(0,10) } 
						renderItem ={ ZipListItem } 
					/>
				</ZipRecommendWrap>

			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	)
}
export default MainScreen;








