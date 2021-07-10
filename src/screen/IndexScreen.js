/* COMMON */
import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

/* ENVIRONMENT */
import { API_URL } from "@env";

/* UTILS & REDUCER */
import { getMember } from '../reducers/memberReducer';
import { handleAuthorization, signout } from '../reducers/authReducer';

/* UI COMPONENTS */
import Colors from '../../assets/colors';
import * as Common from '../styled/commonStyle';
import { AlertModal } from "../container/centralContainer";
import { FloatingWrap, BtnCenterBar, FloatingBtn, ZipRecommendWrap, ZipRecommendList, ZipRecommendHeader, StepListBox, ZipImgBox, ZipImg, ZzimIconBtn, RecommendInfo } from '../styled/mainStyle/mainScreenStyle'
import { MainTopWrap, MainHeader, HeaderBg, MainYTit, StepCont, StepHeader, StepHBtn, StepItemListActive, StepNumBox } from '../styled/mainStyle/mainTopStyle';
import { ZipandaLogoIconML } from '../components/common/header'; //로고 컴포넌트
import { NoticeIconOn , NoticeIconOff, MenuIcon} from '../components/common/header'
import { ZzimIconActive, ZzimIcon } from "../components/sales/ZzimIcon";
import { Button } from 'react-native';

const IndexScreen = ({ }) => {

	//GET ROUTE & NAVIGATION & REDUX STATE
	const route = useRoute(), navigation = useNavigation()
	const member = useSelector(state=>state.memberReducer.member)
	const {loading, needGoBack, navigateTo} = useSelector(state=>state.centralReducer)
	const dispatch = useDispatch()

	//HANDLE EFFECTS
	useEffect(()=>{
		dispatch(handleAuthorization())
		navigation.setOptions({
			headerTitle: "",
			headerStyle: { backgroundColor: Colors.mainColor, shadowColor: 'transparent', elevation:0 },
			headerLeft: props => <ZipandaLogoIconML {...props} />,
			headerRight: () => (
				<Common.FlexRowBox marginR={20}>
					<Common.TouchableOpacity marginR={8} onPress={()=>{navigation.navigate('alarmList')}}>
						{ false ? <NoticeIconOn/> : <NoticeIconOff/>}
					</Common.TouchableOpacity>
					<Common.TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
						<MenuIcon/>
					</Common.TouchableOpacity>
				</Common.FlexRowBox>
			)
		})
	},[])

	//UI COMPONENTS
	const MoreViewIcon = () => (<Common.Image size={10} source={require('../../assets/img/drawable-xhdpi/icon_arrow_b.png')}/>);

	return(<>
		<Common.ZipandaSafeView>
			{/* <Button title="TEST" onPress={()=>{console.log(`loading, needGoBack, navigateTo: `, loading, needGoBack, navigateTo);}}/> */}
			<AlertModal/>
			<FloatingWrap>
				<FloatingBtn onPress={()=>{navigation.navigate('salesRegistration')}} >
					<Common.Image size={24} marginR={5} source={require('../../assets/img/drawable-xhdpi/icon_housesell.png')}/>
					<Common.TextSemiBold16>집 내놓기</Common.TextSemiBold16>
				</FloatingBtn>
				<BtnCenterBar/>
				<FloatingBtn onPress={()=>{navigation.navigate('chatlist')}} >
					<Common.Image size={24} marginR={5} source={require('../../assets/img/drawable-xhdpi/icon_talk.png')}/>
					<Common.TextSemiBold16>직거래톡</Common.TextSemiBold16>
				</FloatingBtn>
			</FloatingWrap>
			<Common.ScrollContainer paddingN>
				<MainTopWrap>
					<MainHeader>
						<HeaderBg source={ require('../../assets/img/drawable-xhdpi/img_main.png')} />
						<Common.TextUltraLight22>집판다는</Common.TextUltraLight22>
						<Common.FlexRowBox>
							<MainYTit> 수수료가 없다! </MainYTit>
						</Common.FlexRowBox>
						<Common.TextUltraLight14 pragraph>
							부동산중개수수료 없는 안전한 부동산{"\n"}직거래 서비스를 이용하세요.
						</Common.TextUltraLight14>
					</MainHeader>
					<StepCont>
						<StepHeader>
							<StepHBtn color={Colors.blackColor} onPress={()=>navigation.navigate('salesList')}  >
								<Common.TextSemiBold14 color={Colors.mainColor}>집 구하기</Common.TextSemiBold14>
							</StepHBtn>
							<StepHBtn  onPress={()=>navigation.navigate('registerContainer')}  >
								<Common.TextSemiBold14>집 내놓기</Common.TextSemiBold14>
							</StepHBtn>
						</StepHeader>
						<FlatList
							horizontal={true}
							contentContainerStyle={{ paddingHorizontal: 19 }}
							data={[
								{ id : 1, title: '매물 검색', s_id:360 },
								{ id : 2, title: '매물 확인', s_id:360 }
							]}
							keyExtractor={ item=> item.id }
							renderItem ={ ({item})=>(
								<StepItemListActive>
									<StepNumBox>
										<Common.TextMedium10>Step 0{item.id} </Common.TextMedium10>
										<MoreViewIcon/>
									</StepNumBox>
									<Common.TextBold16>{item.title}</Common.TextBold16>
								</StepItemListActive>
							)}
						/>
					</StepCont>
				</MainTopWrap>
				<Common.View>
					<Image style={{width: '100%', height: 500}} source={require('../../assets/img/sample/sample_map.png')} />
				</Common.View>
				<ZipRecommendWrap>
					<ZipRecommendHeader>
						<Common.TextBold18>추천매물</Common.TextBold18>
						<Common.FlexRowBtn  onPress={()=>navigation.navigate('salesList')}  >
							<Common.TextLight12 color={Colors.greyColor}>전체보기</Common.TextLight12>
							<Common.Image size={8} marginL={8} source={require('../../assets/img/drawable-xhdpi/icon_arrow_01.png')} />
						</Common.FlexRowBtn>
					</ZipRecommendHeader>
					<FlatList
						horizontal={true}
						contentContainerStyle={{ paddingHorizontal: 20 }}
						data={ [] }
						renderItem ={({item})=>{
							return(<>
								<ZipRecommendList onPress={()=>navigation.navigate('salesDetail')}>
									<ZipImgBox>
										<ZipImg source={ {uri: API_URL+imgURI } }/>
										<ZzimIconBtn onPress={()=>{handleZZim(item)}}>
											{false ?<ZzimIconActive /> : <ZzimIcon />}
										</ZzimIconBtn>
									</ZipImgBox>
									<RecommendInfo>
										<Common.TextLight12 numberOfLines={1}>{address}</Common.TextLight12>
										<Common.TextBold18 numberOfLines={1}>{priceTag}</Common.TextBold18>
									</RecommendInfo>
								</ZipRecommendList>
							</>)
						}}
					/>
				</ZipRecommendWrap>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	</>)
}

export default IndexScreen

