/* COMMON */
import React from 'react';

/* UTILS & REDUCER */
import { signout } from '../reducers/authReducer';

/* UI COMPONENTS */
import Colors from './../../assets/colors';
import * as Common from '../styled/commonStyle';
import { DrawerColseBtn, Dot, MenuWrap, MenuBtn, ZzimLinkBtn, MenuItemListBtn, MenuItemList, ZipNotice, ZipandaMenuHeader} from './../styled/DrawerStyle/drawerStyle'
import PointText from './../components/common/PointText'
import { ArrowIcon } from './../components/common/ArrowIcon';
import { CloseIcon } from '../components/common/header';

/** 사용자 지정 햄버거메뉴 */
const DrawerContent = ({props, state, dispatch}) => {

	//GET ROUTE & NAVIGATION & REDUX STATE
	const member = state?.memberReducer?.member
	

	return(<>
		<Common.ZipandaSafeView>
			<Common.ScrollContainer>
				<DrawerColseBtn onPress={()=> {props.navigation.closeDrawer()}}>
					<CloseIcon/>
				</DrawerColseBtn>
				{member?(<>
					<Common.View>
						<Common.TextUltraLight20>{member?.m_name}님은</Common.TextUltraLight20>
						<Common.FlexRowBox onPress={{}}>
							<PointText style={{fontSize: 20}}>{"Step.0 서명진행중"}</PointText>
						</Common.FlexRowBox>
						<ZipNotice>
							<Common.Image size={28} marginR={10} source={require('./../../assets/img/drawable-xhdpi/icon_menu_alam.png')} />
							<Common.View>
								<Common.TextLight12>2021.02.16. 15:00</Common.TextLight12>
								<Common.TextSemiBold14>청담동 첨단빌라 집 보러 가는 날</Common.TextSemiBold14>
							</Common.View>
						</ZipNotice>
						<Common.FlexBetweenBox>
							<Common.FlexRowBox marginT={14}>
								<Common.TouchableOpacity onPress={()=>{props.navigation.navigate('memberInfo')}}>
									<Common.TextBold16>마이페이지</Common.TextBold16>
								</Common.TouchableOpacity>
								<Dot/>
								<Common.TouchableOpacity onPress={()=>{ dispatch(signout()); props.navigation.closeDrawer(); props.navigation.navigate('index') }}>
									<Common.TextMedium16 color={Colors.greyColor}>로그아웃</Common.TextMedium16>
								</Common.TouchableOpacity>
							</Common.FlexRowBox>
							<ZzimLinkBtn onPress={()=>{props.navigation.navigate('zzimSales')}}>
								<Common.TextBold14 marginR={4}>관심매물</Common.TextBold14>
								<Common.Image size={12} source={require('./../../assets/img/drawable-xhdpi/icon_menu_heart.png')} />
							</ZzimLinkBtn>
						</Common.FlexBetweenBox>
					</Common.View>
				</>):(<>
					<Common.View>
						<Common.TextUltraLight20>로그인하여 집판다의</Common.TextUltraLight20>
						<Common.TextSemiBold20>더 많은 정보를 확인해보세요.</Common.TextSemiBold20>

						<Common.FlexRowBox marginT={14}>
							<Common.TouchableOpacity onPress={() => props.navigation.navigate('signup')}>
								<Common.TextMedium16>회원가입</Common.TextMedium16>
							</Common.TouchableOpacity>
							<Dot/>
							<Common.TouchableOpacity onPress={() => props.navigation.navigate('signin')}>
								<Common.TextMedium16>로그인</Common.TextMedium16>
							</Common.TouchableOpacity>
						</Common.FlexRowBox>
					</Common.View>
				</>)}
				<Common.View>
					<MenuWrap>
						<MenuBtn onPress={()=>{ if(member){props.navigation.navigate('salesRegistration')}else{} }}>
							<Common.Image size={24} marginB={8} source={require('./../../assets/img/drawable-xhdpi/icon_housesell.png')} />
							<Common.TextSemiBold15>집 내놓기</Common.TextSemiBold15>
						</MenuBtn>
						<MenuBtn onPress={()=>{props.navigation.navigate('salesList')}}>
							<Common.Image size={24} marginB={8} source={require('./../../assets/img/drawable-xhdpi/icon_housesearch.png')} />
							<Common.TextSemiBold15>집 찾기</Common.TextSemiBold15>
						</MenuBtn>
						<MenuBtn onPress={()=>{props.navigation.navigate('chatlist')}}>
							<Common.Image size={24} marginB={8} source={require('./../../assets/img/drawable-xhdpi/icon_talk.png')} />
							<Common.TextSemiBold15>직거래톡</Common.TextSemiBold15>
						</MenuBtn>
					</MenuWrap>
				</Common.View>
				<Common.View>
					<ZipandaMenuHeader>
						<Common.Image size={20} marginR={4} source={require('./../../assets/img/drawable-xhdpi/icon_menulist.png')} />
						<Common.TextMedium13>집판다 메뉴</Common.TextMedium13>
					</ZipandaMenuHeader>
					<MenuItemList >
						<Common.TextMedium16>이용안내</Common.TextMedium16>
					</MenuItemList>
					<MenuItemListBtn onPress={()=>{props.navigation.navigate('tenanteGuide')}} >
						<Common.TextMedium15>･ 매수인 이용방법</Common.TextMedium15><ArrowIcon />
					</MenuItemListBtn>
					<MenuItemListBtn onPress={()=>{props.navigation.navigate('landloardGuide')}} >
						<Common.TextMedium15>･ 매도인 이용방법</Common.TextMedium15><ArrowIcon />
					</MenuItemListBtn>
					<MenuItemListBtn onPress={()=>{props.navigation.navigate('faq')}} >
						<Common.TextMedium15>･ FAQ</Common.TextMedium15><ArrowIcon />
					</MenuItemListBtn>
					<MenuItemList >
						<Common.TextMedium16>집판다소식</Common.TextMedium16>
					</MenuItemList>
					<MenuItemListBtn onPress={()=>props.navigation.navigate('notice')} >
						<Common.TextMedium15>･ 공지사항</Common.TextMedium15><ArrowIcon />
					</MenuItemListBtn>
					<MenuItemListBtn onPress={()=>props.navigation.navigate('eventList')} >
						<Common.TextMedium15>･ 이벤트</Common.TextMedium15><ArrowIcon />
					</MenuItemListBtn>
					<MenuItemList onPress={()=>{}} >
						<Common.TextMedium16>이용약관</Common.TextMedium16><ArrowIcon />
					</MenuItemList>
					<MenuItemList onPress={()=>{}} >
						<Common.TextMedium16>개인정보처리방침</Common.TextMedium16><ArrowIcon />
					</MenuItemList>
					<MenuItemList onPress={()=>{}} >
						<Common.TextMedium16>매물관리규정</Common.TextMedium16><ArrowIcon />
					</MenuItemList>
				</Common.View>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	</>)
}

export default DrawerContent
