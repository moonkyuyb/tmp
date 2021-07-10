import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from './../../styled/commonStyle';
import Colors from './../../../assets/colors';

import Modal from "react-native-modal";
import {TutorialWrap, TutorialCont, TopCloseWrap, CloseBtn } from './../../styled/tutorialStyle/tutorialCommonStyle' ;
import {ZipSaleBtnWrap, ZipSaleBtn, ZipSaleBtnInner, ContText, ArrowIcon01, MapSearchBtn, SellBottomBtnWrap, SellBottomBtn, ArrowIcon02 } from './../../styled/tutorialStyle/IndexTutorials' ;
import AsyncStorage from '@react-native-async-storage/async-storage';

const Housesell = () => ( <Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/icon_housesell.png')}/> )
const Housesearch = () => ( <Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/icon_housesearch.png')}/> )

const IndexTutorial = (props) => {
	
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	
	const [zipSaleBtn01, setZipSaleBtn01] = useState(false)
	const [zipSaleBtn02, setZipSaleBtn02] = useState(false)
	
	useEffect(()=>{
		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	},[])
	
	
	
	return(
		<Modal isVisible={ true  } style={{justifyContent:'center',alignItems:'center',  margin: 0}}>
			<TutorialWrap>
				<TutorialCont >
					<TopCloseWrap>
						<CloseBtn onPress={()=>{  AsyncStorage.setItem("indexTutorial","done"); props.setTutorialShow(false);   }}>
							<Common.TextBold18>다시보지않기</Common.TextBold18>
						</CloseBtn>
						<CloseBtn left onPress={()=>{props.setTutorialShow(false); }}>
							<Common.TextBold18>닫기</Common.TextBold18>
						</CloseBtn>
					</TopCloseWrap>
				
					<ZipSaleBtnWrap >
						<ZipSaleBtn onPress={() => { setZipSaleBtn01 (!zipSaleBtn01), setZipSaleBtn02 (false)}} >
							{zipSaleBtn01 ? 
								<ZipSaleBtnInner active>
									<Housesearch/><Common.TextSemiBold18>집 보러 왔어요!</Common.TextSemiBold18>
								</ZipSaleBtnInner>
								: 
								<ZipSaleBtnInner>
									<Housesearch/><Common.TextSemiBold18>집 보러 왔어요!</Common.TextSemiBold18>
								</ZipSaleBtnInner>
							} 
						</ZipSaleBtn>
						<ZipSaleBtn onPress={() => { setZipSaleBtn02 (!zipSaleBtn02), setZipSaleBtn01 (false)}} >
							{zipSaleBtn02 ? 
								<ZipSaleBtnInner active>
									<Housesell/><Common.TextSemiBold18>집 팔러 왔어요!</Common.TextSemiBold18>
								</ZipSaleBtnInner>
								: 
								<ZipSaleBtnInner>
									<Housesell/><Common.TextSemiBold18>집 팔러 왔어요!</Common.TextSemiBold18>
								</ZipSaleBtnInner>
							} 
						</ZipSaleBtn>
					</ZipSaleBtnWrap>

					{/* cont */}        
						{zipSaleBtn01 ? 
							<>
								<ArrowIcon01 source={require('./../../../assets/img/drawable-xhdpi/img_tut_arrow_down.png')}/> 
								<MapSearchBtn >
									<Common.TextSemiBold14 color={Colors.mainColor}>지도에서 찾기</Common.TextSemiBold14>
									<Common.Image size={20} source={require('./../../../assets/img/drawable-xhdpi/icon_search_y.png')}/>
								</MapSearchBtn>
								<ContText>
									지도, 맞춤 필터를 활용해서 원하시는 동네의 다양한 매물을 볼 수 있어요.
									마음에 드는 매물을 찾으면 매도인과 직거래톡을 시작해보세요.
								</ContText>
							</>
						: 
						<></>}
						{zipSaleBtn02 ? 
							<>
								<ContText>
									중고거래처럼 편하게 임대∙매매{'\n'}부동산 매물을 등록해보세요. {'\n'}
									직접 등록이 어려우신 분들을 위한 {'\n'}대리 등록 서비스도 준비되어 있습니다.
								</ContText>
								<SellBottomBtnWrap>
									<ArrowIcon02 source={require('./../../../assets/img/drawable-xhdpi/img_tut_arrow_down_2.png')}/> 
									<SellBottomBtn>
										<Housesell/><Common.TextSemiBold14 marginL={4}>집 내놓기</Common.TextSemiBold14>
									</SellBottomBtn>
								</SellBottomBtnWrap>
							</>
						: 
						<></>}


				</TutorialCont>
			</TutorialWrap>
		</Modal>
	)
}

export default IndexTutorial;


