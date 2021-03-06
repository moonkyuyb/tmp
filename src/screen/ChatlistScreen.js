/* COMMON */
import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, ActivityIndicator  } from 'react-native';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

/* ENVIRONMENTS */
import { ADMIN_URL } from "@env";

/* UTILS & REDUCER */
import _ from "lodash";
import { getSale } from '../reducers/salesReducer';
import { getMember } from '../reducers/memberReducer';
import { setCentralState } from '../reducers/centralReducer';

/* UI COMPONENTS */
import Colors from '../../assets/colors';
import * as Common from './../styled/commonStyle';
import { AlertModal } from '../container/centralContainer';
import { ChatListNum, PreViewImg, ChatItemBox, ChatInfoBox, ChatImgBox, ChatImg, ChatTit, ChatUserNameWrap, ChatUserName, ChatUserNameText, ChatBtnBox, ChatBtn, ChatPriceText } from './../styled/chatStyle/chatListStyle';
import { NonWrap, NoneBox } from "./../styled/chatStyle/chatNoneStyle";
import { BuildingInfoBox, BuildingInfoText } from "./../styled/sales/saleListItemStyle";
import { handleAuthorization } from '../reducers/authReducer';

/* CONSTANTS */
const NO_IMAGE_URI = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'

const ChatlistScreen = ({
	chatrooms, setChatState, getChatrooms, getMessages, getPartner
})=>{

	//GET ROUTE & NAVIGATION & REDUX STATE
	const route = useRoute(), navigation = useNavigation()
	const {loading, needGoBack} = useSelector(state=>state.centralReducer)
	const dispatch = useDispatch()

	//HANDLE EFFECTS
	useEffect(()=>{
		dispatch(handleAuthorization())
		getChatrooms()
	},[])

	useEffect(() => {if(needGoBack){
		const goBackCount = needGoBack + 0
		dispatch(setCentralState({needGoBack: null}))
		navigation.dispatch(StackActions.pop(goBackCount))
	}}, [needGoBack])

	//UI COMPONENTS
	const ChatNewIcon = () => (<Common.Image size={17} source={require('./../../assets/img/drawable-xhdpi/icon_chat_on.png')} />)
	const ChatBtn01 = () => (<Common.Image size={14} source={require('./../../assets/img/drawable-xhdpi/icon_outdoor_b.png')} />)
	const ChatBtn02 = () => (<Common.Image size={14} source={require('./../../assets/img/drawable-xhdpi/icon_cutout_b.png')} />)

	//UI COMPONENTS
	function handleNavigateChat({chatroom}) {
		if(chatroom){
			setChatState({chatroom: chatroom})
			getMessages({chatroom: chatroom}) //User Experience
			getPartner({chatroom: chatroom}) //User Experience
			dispatch(getSale({s_id: chatroom.sale.s_id})) //User Experience
			navigation.navigate('chat')
		}
	}

	//RENDER SCREEN
	return(<>
	<Common.ZipandaSafeView>
		<AlertModal/>
		{(chatrooms?.length>0)?(<>
			<FlatList
			ListHeaderComponent = {(
				<ChatListNum>
					<Common.TextLight14><Common.TextSemiBold14>?????? {chatrooms?.length||0}??? </Common.TextSemiBold14>???????????? ?????????</Common.TextLight14>
				</ChatListNum>
			)}
			data = {chatrooms}
			renderItem = {({item: chatroom}) => {
				// console.log(`????item.partner: ${item.partner}`);
				return(
					<ChatItemBox /*Active*/ onPress={() => {handleNavigateChat({chatroom: chatroom})}}>
						<ChatInfoBox>
							<ChatImgBox>
								<ChatImg source={{uri:chatroom.sale?.thumbURI||NO_IMAGE_URI}}/>
							</ChatImgBox>
							<ChatTit>
								<ChatPriceText>{chatroom.sale?.price}</ChatPriceText>
								<BuildingInfoBox marginTN>
									<BuildingInfoText numberOfLines={1}>{chatroom.sale?.infoTit01}</BuildingInfoText>
									<BuildingInfoText numberOfLines={1}>{chatroom.sale?.infoTit02}</BuildingInfoText>
								</BuildingInfoBox>
							</ChatTit>
						</ChatInfoBox>
						<ChatBtnBox>
							<ChatBtn><ChatBtn01 /></ChatBtn>
							<ChatBtn><ChatBtn02 /></ChatBtn>
						</ChatBtnBox>
					</ChatItemBox>
				);
			} }
			keyExtractor = {item => `${item.id}`}
		/>
		</>):(<>
			{loading?(<>
				<View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
					<ActivityIndicator size={'large'} color={Colors.mainColor}/>
				</View>
			</>):(<>
				<NonWrap>
					<NoneBox>
						<Common.Image size={76} marginB={23}  source={require('./../../assets/img/drawable-xhdpi/icon_talk_non.png')} />
						<Common.TextSemiBold18>???????????? ????????? ????????????.</Common.TextSemiBold18>
						<Common.TextLight14 align={'center'} marginT={11} paragraph>
							?????? ????????????????????? <Common.TextBold14 paragraph>???????????? ????????? ??????</Common.TextBold14>??????{"\n"}
							?????? ?????? ???????????? ???????????????.
						</Common.TextLight14>
						<Common.GoHomeBox onPress={() => navigation.navigate('map')}>
							<Common.Image size={20} source={require('./../../assets/img/drawable-xhdpi/icon_sale_search.png')}/>
							<Common.GoHomeText>?????? ????????????</Common.GoHomeText>
						</Common.GoHomeBox>
					</NoneBox>
				</NonWrap>
			</>)
			}
		</>)}
	</Common.ZipandaSafeView>
	</>)

}

export default ChatlistScreen