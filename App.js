/* COMMON */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';

/* NAVIGATION */
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

/* REDUX STORE & LOCAL STORAGE */
import { Provider, useSelector } from 'react-redux';
import Store from './src/reducers/ReducerStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* SCREEN COMPONENTS */
import DrawerContent from './src/screen/DrawerContent';

/* REDUX CONATINER(SCREEN) */
import { IndexContainer } from "./src/container/IndexContainer";
import { SignupContainer, SignupSuccessContainer } from "./src/container/memberContainer";

/* REDUX CONATINER(SCREEN) @Ahn */
import { SampleContainer } from "./src/container/SampleContainer";
import { ChatlistContainer, ChatContainer } from "./src/container/chatContainer";

/* REDUX CONATINER(SCREEN) @Moon */
import { SigninContainer } from "./src/container/authContainer";
import { MemberInfoContainer } from "./src/container/memberInfoContainer";

/* UI COMPONENTS */
import Colors from "./assets/colors";
import { HeaderButton, HeaderLeft, HeaderRight } from "./src/styled/layoutStyle";
import { PrevIcon, ZipandaLogoIcon, CloseIcon, NoticeIconOff, NoticeIconOn, MenuIcon, ChatMenuIcon } from './src/components/common/header';

// 문규환: 게시판
import {NoticeContainer, FaqContainer, EventListContainer, EventViewContainer} from './src/container/boardContainer';

// 문규환: 비번찾기
import {findPWContainer} from './src/container/findPwContainer';

LogBox.ignoreAllLogs(true) //XXX: 노란 박스 안보기
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

/* APP내 모든 SCREEN COMPONENTS 처리 */
const AppStack = (props) => {
    
    const navigation = useNavigation();

	const HeaderLeftBack = () => (
		<HeaderLeft>
			<HeaderButton onPress={()=>{navigation.goBack()}}>
				<PrevIcon/>
			</HeaderButton>
		</HeaderLeft>
	)

	const HeaderLeftClose = () => (
		<HeaderLeft>
			<HeaderButton onPress={()=>{navigation.goBack()}}>
				<CloseIcon/>
			</HeaderButton>
		</HeaderLeft>
	)

	const HeaderRightMenu = () => (
		<HeaderRight>
			<HeaderButton onPress={()=>{navigation.openDrawer()}}>
				<MenuIcon/>
			</HeaderButton>
		</HeaderRight>
	)

	const HeaderRightChat = () => (
		<HeaderRight>
			<HeaderButton onPress={()=>{navigation.openDrawer()}}>
				<ChatMenuIcon/>
			</HeaderButton>
		</HeaderRight>
	)

    /* MAKE HEADER OPTIONS: 공통 */
    const headerOptions = {
        headerBackTitleVisible: false,
        headerTintColor: Colors.blackColor,
        headerStyle: {shadowColor: '#eaeaea', elevation: 1, },
        headerTitleStyle: { marginTop:-1, fontWeight:'bold', fontSize:19 },
    }

    /* MAKE HEADER OPTIONS: 뒤로가기, 왼쪽 타이틀, 서랍메뉴버튼 */
    const makeOptions01 = (title) => ({
        ...headerOptions,
        title:title, headerTitleAlign:'left',
        headerTitleStyle: {...headerOptions.headerTitleStyle, marginLeft: -20},
        headerLeft: HeaderLeftBack,
        headerRight: HeaderRightMenu,
        options:{gestureEnabled: false},
    })

    /* MAKE HEADER OPTIONS: 뒤로가기, 왼쪽 타이틀 */
    const makeOptions02 = (title) => ({
        ...headerOptions,
        title:title, headerTitleAlign:'left',
        headerTitleStyle: {...headerOptions.headerTitleStyle, marginLeft: -20},
        headerLeft: HeaderLeftBack,
    })

    /* MAKE HEADER OPTIONS: 뒤로가기, 중앙 타이틀 */
    const makeOptions03 = (title) => ({
        ...headerOptions,
        title:title, headerTitleAlign:'center',
        headerTitleStyle: {...headerOptions.headerTitleStyle, marginLeft: -20},
        headerLeft: HeaderLeftBack,
    })

	/* MAKE HEADER OPTIONS: 닫기(X)버튼, 중앙 타이틀 */
	const makeOptions04 = (title) => ({
		...headerOptions,
		title:title, headerTitleAlign:'center',
		headerTitleStyle: {...headerOptions.headerTitleStyle},
		headerLeft: HeaderLeftClose,
	})

	/* MAKE HEADER OPTIONS: 채팅목록 헤더 */
	const makeOptions05 = (title) => ({
		...headerOptions,
		title:title, headerTitleAlign:'center',
		headerTitleStyle: {...headerOptions.headerTitleStyle},
		headerLeft: HeaderLeftClose,
		headerRight: HeaderRightChat,
	})
    
    return(
        <Stack.Navigator initialRouteName='findPWScreen'>
			<Stack.Screen name='index' component={IndexContainer} options={()=>makeOptions01('INDEX')}/>

			{/* @Ahn */}
			<Stack.Screen name='chat' component={ChatContainer} options={()=>makeOptions05('채팅')}/>
			<Stack.Screen name='chatlist' component={ChatlistContainer} options={()=>makeOptions05('채팅목록')}/>

			{/* @Moon */}
			<Stack.Screen name='signin' component={SigninContainer} options={()=>makeOptions01('로그인')}/>
			<Stack.Screen name='signup' component={SignupContainer} options={()=>makeOptions01('회원가입')}/>
			<Stack.Screen name='signupSuccess' component={SignupSuccessContainer} options={()=>makeOptions01('가입완료')}/>
			<Stack.Screen name='memberInfo' component={MemberInfoContainer} options={()=>makeOptions01('마이페이지')}/>
			
			<Stack.Screen name='notice' 	component={NoticeContainer} options={()=>makeOptions01('공지사항')}/>
			<Stack.Screen name='faq' 		component={FaqContainer} options={()=>makeOptions01('FAQ')}/>
			<Stack.Screen name='eventList' 		component={EventListContainer} options={()=>makeOptions01('이벤트')}/>
			<Stack.Screen name='eventView' 		component={EventViewContainer} options={()=>makeOptions01('이벤트')}/>
			
			<Stack.Screen name='findPWScreen' 		component={findPWContainer} options={()=>makeOptions01('비밀번호 찾기')}/>

            {/* @SAMPLE */}
            <Stack.Screen name='sample' component={SampleContainer} options={()=>makeOptions01('샘플페이지')}/>
        </Stack.Navigator>
    )
}

const App = (props) => {

    return(
        <Provider store={Store}>
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props)=>DrawerContent({props: props, state: Store.getState(), dispatch: Store.dispatch})}
				drawerPosition='right' //햄버거 메뉴 방향(right || left)
                drawerStyle={{width:'100%'}} //사용자 지정 햄버거 메뉴 Style 지정
            >
                <Drawer.Screen name='AppStack' component={AppStack}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default App;
