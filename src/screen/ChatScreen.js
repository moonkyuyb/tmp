/* COMMON */
import React, { useEffect, useState } from "react";
import { View, ScrollView, TextInput, SafeAreaView, Text, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ENVIRONMENTS */
import { ADMIN_URL } from "@env";

/* UTILS & REDUCER */
import _ from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getMember } from "../reducers/memberReducer";
import { getSale } from "../reducers/salesReducer";

/* UI COMPONENTS */
import Colors from '../../assets/colors';
import * as Common from './../styled/commonStyle';
import { ChatInputWrap, ChatInputBox, ChatInput, ChatSendBtn, ChatAddBtn, ChatWrap, ChatScroll, ChatR, ChatTopBox, ChatTime, ChatBox, ChatM, ChatTriR, ChatL, ChatLinner,
	Profile, ProfileTit, ChatTriL, ChatPopup, PopupTextBox, PopupText, PopupBtn, InfoIcon, ScrollUpBtn, ScrollDownBtn } from '../styled/chatStyle/chatStyle';
import { ChatHeaderContainer, ChatSaleBtnBox, SaleBtn, TitBox, TitUnderLine, ChatMenu, OptionListBtn, OptionListText, ChatContMenu, ChatSaleTop,
	BuildingPriceText, BuildingInfoText } from '../styled/chatStyle/chatHeaderStyle';
import { SaleList, SaleImg } from '../styled/chatStyle/chatCommonStyle';

import ChatTutorial from './../screen/Tutorial/chatTutorial';
import { ModalPopup } from "../container/commonContainer";
import { GiftedChat } from "react-native-gifted-chat";

/* CONSTANTS */
const NO_IMAGE_URI = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'

const ChatScreen = ({
	chatroom, partner, messages, setChatState, getMessages, getPartner, postMessage
}) => {

	//GET ROUTE & NAVIGATION & REDUX STATE
	const route = useRoute(), navigation = useNavigation()
	const member = useSelector(state=>state.memberReducer.member)
	const m_id = useSelector(state=>state.memberReducer.m_id)
	const s_id = useSelector(state=>state.salesReducer.s_id)
	const sale = useSelector(state=>state.salesReducer.sale)
	const dispatch = useDispatch()

	//UI STATE
	const [inputMessage, setInputMessage] = useState('')

	//HANDLE EFFECTS
	useEffect(()=>{
		// console.log(`💬USE EFFECT chatroom.partner:`,chatroom.partner);
		getPartner({chatroom: chatroom})
		getMessages({chatroom: chatroom})
		dispatch(getSale({s_id: chatroom.sale.s_id}))
	},[])

	//UI COMPONENTS
	const ChatNewOn = () => (<Common.Image size={17} source={require('../../assets/img/drawable-xhdpi/icon_chat_on.png')} />)
	const ChatNewOff = () => (<Common.Image size={17} source={require('../../assets/img/drawable-xhdpi/icon_chat_off.png')} />)
	const InfoClockIcon = () => (<InfoIcon source={require('../../assets/img/drawable-xhdpi/icon_time.png')} />)
	const InfoTelIcon = () => (<InfoIcon source={require('../../assets/img/drawable-xhdpi/icon_chat_call.png')} />)
	const ChatMessageR = ({text, createdAt}) => (
		<ChatR>
			<ChatTopBox><ChatTime>{createdAt}</ChatTime><ChatNewOff />{/* <ChatNewOn /> */}</ChatTopBox>
			<ChatBox><ChatTriR /><ChatM>{text}</ChatM></ChatBox>
		</ChatR>
	)
	const ChatMessageL = ({text, createdAt, name, avatar}) => (
		<ChatL>
			<Profile style={{backgroundColor: avatar?'#FFF':Colors.profileColor01 }}>
				{avatar?(<Common.Image size={28} source={{uri:avatar}} style={{width:28, height:28}}/>):(<ProfileTit></ProfileTit>)}
			</Profile>
			<ChatLinner>
				<ChatTopBox><Common.TextSemiBold16>{name}</Common.TextSemiBold16><ChatTime>{createdAt}</ChatTime></ChatTopBox>
				<ChatBox chatLeft><ChatTriL/><ChatM>{text}</ChatM></ChatBox>
			</ChatLinner>
		</ChatL>
	)

	//UI FUNCTION
	function handlePostMessage(message){
		postMessage({text:message, chatroom: chatroom})
		setInputMessage('')
	}

	return(<>
		{/* <Button title="TEST" onPress={()=>{console.log(messages);}}/> */}
		<Common.ZipandaSafeView>
			<ChatHeaderContainer>
				<ChatSaleTop>
					<SaleList>
						<SaleImg source={{uri:(sale?.thumbURI)?sale.thumbURI:NO_IMAGE_URI}} />
						<Common.View>
							<BuildingPriceText>{sale?.price}</BuildingPriceText>
							<BuildingInfoText>{sale?.infoTit01}</BuildingInfoText>
							<BuildingInfoText>{sale?.infoTit02}</BuildingInfoText>
						</Common.View>
					</SaleList>
					<ChatSaleBtnBox>
						<SaleBtn first onPress={()=>{navigation.goBack()}}>
							<Common.Image size={14} source={require('../../assets/img/drawable-xhdpi/icon_outdoor_g.png')} /><Common.TextMedium11>나가기</Common.TextMedium11>
						</SaleBtn>
						<SaleBtn onPress={()=>{navigation.goBack()}}>
							<Common.Image size={14} source={require('../../assets/img/drawable-xhdpi/icon_cutout_g.png')} /><Common.TextMedium11>차단</Common.TextMedium11>
						</SaleBtn>
					</ChatSaleBtnBox>
				</ChatSaleTop>
				<ChatContMenu>
					<TitBox>
						{partner&&(<Common.TextLight14><TitUnderLine>{partner?.m_name}({partner?.m_mail})</TitUnderLine>님과의 채팅입니다.</Common.TextLight14>)}
					</TitBox>
					{sale?.m_id == member?.m_id?(
					<ChatMenu horizontal={true} contentContainerStyle={{paddingHorizontal: 8}}>
						<OptionListBtn onPress={() => {}}>
							<OptionListText >전화번호 공개요청</OptionListText>
						</OptionListBtn>
						<OptionListBtn Active={false} onPress={()=>{}}>
							<OptionListText Active={false}>전자계약</OptionListText>
						</OptionListBtn>
						<OptionListBtn onPress={() => {}}>
							<OptionListText>등기</OptionListText>
						</OptionListBtn>
					</ChatMenu>
					):(
					<ChatMenu horizontal={true} contentContainerStyle={{paddingHorizontal: 8}}>
						<OptionListBtn onPress={() => {}}>
							<OptionListText >전화번호 공개요청</OptionListText>
						</OptionListBtn>
						<OptionListBtn Active={false} onPress={()=>{}}>
							<OptionListText Active={false}>체크리스트</OptionListText>
						</OptionListBtn>
						<OptionListBtn Active={false} onPress={()=>{}}>
							<OptionListText Active={false}>전자계약</OptionListText>
						</OptionListBtn>
						<OptionListBtn onPress={() => {}}>
							<OptionListText>등기</OptionListText>
						</OptionListBtn>
					</ChatMenu>
					)}
				</ChatContMenu>
			</ChatHeaderContainer>
			<ChatWrap>
				<GiftedChat style={{flex:1}} messages={messages} user={{_id: member?.m_id}}
					renderMessage={item=>{
						const {text,user,createdAt} = item.currentMessage
						const createdAtStr = moment(createdAt).format('YYYY-MM-DD HH:mm')
						// console.log(`💬CURRENT MESSAGE: text=${text}, user._id=${user._id}, user.name=${user.name}, myMessage=${user._id == member?.m_id}`);

						if(user._id == member?.m_id){
							return(<ChatMessageR text={text} createdAt={createdAtStr}/>)
						}else{
							return(<ChatMessageL text={text} createdAt={createdAtStr} name={partner?.m_name} avatar={partner?.mf_thumb_nm?`${ADMIN_URL}${partner.mf_thumb_nm}`:``}/>)
						}
					}}
					minInputToolbarHeight={0}
					renderInputToolbar={()=>(<></>)}
				/>
			</ChatWrap>
			<ChatInputWrap>
				<ChatInputBox>
					<ChatAddBtn onPress={()=>{}}>
						<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_icon_attachment.png')} />
					</ChatAddBtn>
					<ChatInput multiline={true} placeholder={'메시지를 입력해주세요.'} value={inputMessage} onChangeText={setInputMessage}/>
				</ChatInputBox>
				<ChatSendBtn onPress={()=>{handlePostMessage(inputMessage)}} disabled={!inputMessage}>
					<Common.Image size={48} source={require('../../assets/img/drawable-xhdpi/bt_talk.png')} />
				</ChatSendBtn>
			</ChatInputWrap>
		</Common.ZipandaSafeView>
	</>)
}

export default ChatScreen;