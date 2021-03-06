import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from './../../styled/commonStyle';
import PointText from "../../components/common/PointText";
import Modal from "react-native-modal";
import {TutorialWrap, TutorialCont, TopCloseWrap, CloseBtn, NextPageBtnWrap, NextPageBtn, NextPageBtnText} from './../../styled/tutorialStyle/tutorialCommonStyle' ;
import {SaleTutorialBox01, ArrowIcon01,AppScreenImg,FilterBtnWrap,FilterBtn,ContText, SaleTutorialBox02, ArrowIcon02, CircleBox,
	SaleTutorialBox03, TutorialZipList, TutorialZipHeaderBtn , ArrowIcon03 } from './../../styled/tutorialStyle/saleListTutorials' ;
import { ZipItemList, ZipInfoBox, BuildingNameText, PriceText, BuildingInfoBox, BuildingInfoText,
	ZipTagBox, ZipTag, ZipTagText,  ZipImgBox, ZipImg, ZzimBtn } from "../../styled/sales/saleListItemStyle";
import { ZzimIconActive, ZzimIcon } from "../../components/sales/ZzimIcon";
import { ZipDot, ZipHeaderBtn, ZipHeaderText } from "../../styled/sales/salesListStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArrowIconW = () => ( <Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_menu_arrow_01_w.png')}/> )
const IndexTutorial = (props) => {
	
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	
	const [saleNextPageBtn01, setSaleNextPageBtn01] = useState(true)
	const [saleNextPageBtn02, setSaleNextPageBtn02] = useState(false)
	const [saleNextPageBtn03, setSaleNextPageBtn03] = useState(false)
	
	
	useEffect(()=>{
		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	},[])
	
	
	
	return(
		<Modal isVisible={ true  } style={{justifyContent:'center',alignItems:'center',  margin: 0}}>
			<TutorialWrap >
				
				{/* cont */}        
					{saleNextPageBtn01 ? 
						<TutorialCont center>
							<NextPageBtnWrap>
								<NextPageBtn onPress={() =>{ setSaleNextPageBtn01 (false), setSaleNextPageBtn02(true)}}>
									<NextPageBtnText>?????? ?????????</NextPageBtnText><ArrowIconW/>
								</NextPageBtn>
							</NextPageBtnWrap>
							<FilterBtnWrap>
								<FilterBtn>
									<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_filter.png')}/> 
									<Common.TextMedium13 marginT={2}>??????</Common.TextMedium13>
								</FilterBtn>
								<ArrowIcon01 source={require('./../../../assets/img/drawable-xhdpi/img_tut_arrow_leht.png')}/> 
							</FilterBtnWrap>
							<SaleTutorialBox01>
								<ContText>
									????????? ????????? ?????? ?????? ??????,{'\n'}?????? ??????, ????????? ???????????????.
								</ContText>
								<AppScreenImg source={require('./../../../assets/img/drawable-xhdpi/360_map_search_home_filter_open.png')}/> 
							</SaleTutorialBox01>
						</TutorialCont>
					: 
					<></>}
					{saleNextPageBtn02 ? 
						<TutorialCont center>
							<NextPageBtnWrap>
								<NextPageBtn onPress={() =>{ setSaleNextPageBtn02 (false), setSaleNextPageBtn03(true)}}>
									<NextPageBtnText>?????? ?????????</NextPageBtnText><ArrowIconW/>
								</NextPageBtn>
							</NextPageBtnWrap>
							<SaleTutorialBox02>
								<CircleBox>
									<Common.TextBold18>48</Common.TextBold18>
								</CircleBox>
								<ArrowIcon02 source={require('./../../../assets/img/drawable-xhdpi/img_tut_arrow_down.png')}/> 

								<ContText>
								?????? ????????? ?????? ????????? ???????????????.{'\n'}??????????????? ???????????? ???????????????.
								</ContText>
							</SaleTutorialBox02>
						</TutorialCont>
					: 
					<></>}
					{saleNextPageBtn03 ? 
						<TutorialCont center>
							<TopCloseWrap>
								<CloseBtn onPress={()=>{  AsyncStorage.setItem("salesTutorial","done"); props.setTutorialShow(false);  }}>
									<Common.TextBold18>??????????????????</Common.TextBold18>
								</CloseBtn>
								<CloseBtn left onPress={()=>{ props.setTutorialShow(false);}}>
									<Common.TextBold18>??????</Common.TextBold18>
								</CloseBtn>
							</TopCloseWrap>
							<SaleTutorialBox03>
								<Common.FlexCenter column>
									<ContText center>
										?????? ???????????? ????????? ????????? ??????{'\n'}???????????? ???????????????.
									</ContText>

									<ArrowIcon03 source={require('./../../../assets/img/drawable-xhdpi/img_tut_arrow_down.png')}/> 
								</Common.FlexCenter>
								<TutorialZipHeaderBtn>
									<ZipHeaderBtn active>
										<ZipHeaderText >?????? 55???</ZipHeaderText>
										<ZipDot/>
									</ZipHeaderBtn>
									<ZipHeaderBtn >
										<ZipHeaderText active>?????? 0???</ZipHeaderText>
									</ZipHeaderBtn>
								</TutorialZipHeaderBtn>
								<TutorialZipList>
									<ZipItemList>
										<ZipInfoBox>
											<BuildingNameText>?????????????????????</BuildingNameText>
											<PointText>
												<PriceText>?????? 2500/90</PriceText>
											</PointText>
											<BuildingInfoBox>
												<BuildingInfoText paragraph numberOfLines={1}>???????????? / 4??? / 69.42m?? / ????????? 7???</BuildingInfoText>
												<BuildingInfoText paragraph numberOfLines={1}>?????? ????????? ?????????</BuildingInfoText>
											</BuildingInfoBox>
											<ZipTagBox>
												<ZipTag><ZipTagText>??????</ZipTagText></ZipTag>
												<ZipTag><ZipTagText>?????????</ZipTagText></ZipTag>
											</ZipTagBox>
										</ZipInfoBox>
										<ZipImgBox>
											<ZzimBtn>
												<ZzimIconActive/>
											</ZzimBtn>
											<ZipImg source={require('./../../../assets/img/sample/sample_room_05.jpg')} />
										</ZipImgBox>
									</ZipItemList>
									<ZipItemList>
										<ZipInfoBox>
											<BuildingNameText>????????????</BuildingNameText>
											<PointText>
												<PriceText>?????? 4???5000/190</PriceText>
											</PointText>
											<BuildingInfoBox>
												<BuildingInfoText paragraph numberOfLines={1}>????????? / 23??? / 89.47m?? / ????????? 17???</BuildingInfoText>
												<BuildingInfoText paragraph numberOfLines={1}>?????? ????????? ?????????</BuildingInfoText>
											</BuildingInfoBox>
											<ZipTagBox>
												<ZipTag><ZipTagText>??????</ZipTagText></ZipTag>
												<ZipTag><ZipTagText>?????????</ZipTagText></ZipTag>
											</ZipTagBox>
										</ZipInfoBox>
										<ZipImgBox>
											<ZzimBtn>
												<ZzimIcon/>
											</ZzimBtn>
											<ZipImg source={require('./../../../assets/img/sample/sample_room_01.jpg')} />
										</ZipImgBox>
									</ZipItemList>
								</TutorialZipList>
							</SaleTutorialBox03>
						</TutorialCont>
					: 
					<></>}


			
			</TutorialWrap>
		</Modal>
	)
}

export default IndexTutorial;


