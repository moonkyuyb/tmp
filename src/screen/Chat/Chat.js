import React, { useEffect, useState } from 'react';
import {Linking} from 'react-native';
import { View, Platform, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../../assets/colors';

import * as Common from "../../styled/commonStyle";
import {ChatHeaderContainer} from '../../styled/chatStyle/chatHeaderStyle';
import {ChatContainer,PandaChat,ChatPandaImg,PandaChatCont,PandaChatHeader,PandaText,ItemBox,ItemList,TextDot,ChatInputWrap,ChatInputBox,ChatInput,ChatSendBtn,ChatAddBtn,ChatWrap,ChatScrollBox,ChatScroll,ChatR,
	ChatTopBox,ChatTime,ChatBox,ChatM,ChatTriR,ChatL,ChatLinner,Profile,ProfileTit,ChatTriL,ChatPopup,PopupTextBox,PopupText,ChatInfoBox,PopupBtn,InfoIcon,ScrollUpBtn,ScrollDownBtn} from '../../styled/chatStyle/chatStyle';
import {ChatSaleBtnBox,SaleBtn,BtnText,} from '../../styled/chatStyle/chatHeaderStyle';

import ChatHeaderSale from './../../components/chat/ChatHeaderSale';
import ChatHeaderMenu from './../../components/chat/ChatHeaderMenu';


const Chat = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {
	
		}
		handleEffect()
	},[])
	
	const ChatNewOn = () => (<Common.Image12 source={require('../../../assets/img/drawable-xhdpi/icon_chat_on.png')} />)
	const ChatNewOff = () => (<Common.Image12 source={require('../../../assets/img/drawable-xhdpi/icon_chat_off.png')} />)
	const InfoClockIcon = () => (<InfoIcon source={require('../../../assets/img/drawable-xhdpi/icon_time.png')} />)
	const InfoTelIcon = () => (<InfoIcon source={require('../../../assets/img/drawable-xhdpi/icon_chat_call.png')} />)
	const ScrollUpIcon = () => (<Common.Image34 source={require('../../../assets/img/drawable-xhdpi/bt_chat_up.png')} />)
	const ScrollDownIcon = () => (<Common.Image34 source={require('../../../assets/img/drawable-xhdpi/bt_chat_down.png')} />)

	const PandaChatMessage = (props) => {
		return(
			<PandaChat {...props}>
				<ChatPandaImg source={require('../../../assets/img/drawable-xhdpi/image_panda_thumbnail.png')} />
				<PandaChatCont>
					<PandaChatHeader>
						<PandaTag>?????????</PandaTag><ChatTime>2021-02-15  14:25:23</ChatTime>
					</PandaChatHeader>
					<Common.View>{props.children}</Common.View>
				</PandaChatCont>
			</PandaChat>
		)
	}
	const ChatMessageR = (props) => {
		return(
			<ChatR>
				<ChatTopBox>
					<ChatTime>2021-02-15  14:25:23</ChatTime>
					<ChatNewOff />{/* <ChatNewOn /> */}
				</ChatTopBox>
				<ChatBox>
					<ChatTriR />{props.children}
				</ChatBox>
			</ChatR>
		)
	}
	const ChatMessageL = (props) => {
		return(
			<ChatL>
				<Profile style={{backgroundColor: Colors.profileColor01 }}>
					<ProfileTit>???</ProfileTit>
				</Profile>
				<ChatLinner>
					<ChatTopBox>
						<Common.TextBold12>???*???</Common.TextBold12><ChatTime>2021-02-15  14:25:23</ChatTime>
					</ChatTopBox>
					<ChatBox chatLeft>
						<ChatTriL />{props.children}
					</ChatBox>
				</ChatLinner>
			</ChatL>
		)
	}

	const makeCall = () => {

		let phoneNumber = '';
	
		if (Platform.OS === 'android') {
		  phoneNumber = 'tel:${050-1234-5678}';
		} else {
		  phoneNumber = 'telprompt:${050-1234-5678}';
		}
	
		Linking.openURL(phoneNumber);

	  };
	
	return(
		<ChatContainer>
			{/* header */}
			<ChatHeaderContainer>
				<ChatHeaderSale>
					<ChatSaleBtnBox>
						<SaleBtn first>
							<Common.Image14 source={require('./../../../assets/img/drawable-xhdpi/icon_outdoor_g.png')} /><BtnText>?????????</BtnText>
						</SaleBtn>
						<SaleBtn>
							<Common.Image14 source={require('./../../../assets/img/drawable-xhdpi/icon_cutout_g.png')} /><BtnText>??????</BtnText>
						</SaleBtn>
					</ChatSaleBtnBox>
				</ChatHeaderSale>
				<ChatHeaderMenu/>
			</ChatHeaderContainer>
			<ChatWrap>			
				<ChatScrollBox>
					{/* top, bottom Btn */}
					<ScrollUpBtn Up onPress={() => this.scroll.scrollTo()}><ScrollUpIcon /></ScrollUpBtn>
					<ScrollDownBtn onPress={() => this.scroll.scrollToEnd()}><ScrollDownIcon /></ScrollDownBtn>

					<ChatScroll ref={ref => {
            this.scroll = ref;
          }}>
						{/* first panda chat */}
						<PandaChatMessage firstPanda>
							<ItemBox>
								<ItemList>
									<TextDot/><Common.TextLight11>???????????? ????????? ?????? ??? ????????? ???????????????.</Common.TextLight11>
								</ItemList>
								<ItemList>
									<TextDot/><Common.TextLight11>???????????? ???????????? ???, ?????????, ?????????, ?????? ????????? ?????? ????????? ??? ?????? ???????????? ?????? ????????? ??????????????? ??????????????? ?????? ????????? ??? ??? ????????????.</Common.TextLight11>
								</ItemList>
								<ItemList>
									<TextDot/><Common.TextLight11>?????? ???????????? ???????????? 3?????? ????????? ?????? ???????????????. </Common.TextLight11>
								</ItemList>
							</ItemBox>
						</PandaChatMessage>

						{/* ?????? ????????? */}
						<ChatMessageR>
							<ChatM>?????? ????????? ???????????? ????????????.</ChatM>
						</ChatMessageR>
						
						<ChatMessageL>
							<ChatM>???</ChatM>
						</ChatMessageL>
						
						{/* ???????????? ?????? ??????/?????? ????????? */}
						<ChatMessageR>
							<ChatM>???*????????? <Common.TextBold11>???????????? ????????? ??????</Common.TextBold11>???????????????.</ChatM>
						</ChatMessageR>

						<ChatMessageL>
							<ChatM>???*????????? <Common.TextBold11>???????????? ????????? ????????? ??????</Common.TextBold11>???????????????.</ChatM>
						</ChatMessageL>

						<ChatMessageL>
							<ChatM>???*????????? ???????????? ????????? ????????? ?????????????????????.</ChatM>
							<ChatInfoBox chatLeft onPress={makeCall}>
								<InfoTelIcon/><Common.TextBold11>050-1234-5678</Common.TextBold11>
							</ChatInfoBox>
						</ChatMessageL>

						{/* ???????????? ????????? */}
						<ChatMessageR>
							<ChatM>???*????????? ????????? ?????????????????????.</ChatM>
							<ChatInfoBox>
								<InfoClockIcon/><Common.TextBold11>2021-02-15  12:00</Common.TextBold11>
							</ChatInfoBox>
						</ChatMessageR>

						<ChatMessageL>
							<ChatM>???*????????? <Common.TextBold11>????????? ????????? ??????</Common.TextBold11>???????????????.</ChatM>
						</ChatMessageL>

						<ChatMessageL>
							<ChatM>???*????????? ?????? ????????? ?????????????????????.</ChatM>
							<ChatInfoBox chatLeft>
								<InfoClockIcon/><Common.TextBold11>2021-02-15  12:00</Common.TextBold11>
							</ChatInfoBox>
						</ChatMessageL>

						{/* panda chat */}
						<PandaChatMessage>
							<PandaText>????????? ?????? ????????? ?????????. ????????? ??????????????? ????????? ????????????.</PandaText>
							<ChatInfoBox>
								<InfoClockIcon/><Common.TextBold11>2021-02-15  12:00</Common.TextBold11>
							</ChatInfoBox>
						</PandaChatMessage>
					</ChatScroll>
				</ChatScrollBox>
				{/* chat bottom popup */}
				{/* ???????????? ?????? ?????? */}
				<ChatPopup>
					<PopupTextBox>
						<Common.Image14 source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
						<PopupText>???????????? ?????? ????????? ????????????.{"\n"}<Common.TextBold13 whiteTit>?????????????????????????</Common.TextBold13></PopupText>
					</PopupTextBox>
					<Common.FlexRowBox>
						<PopupBtn Yellow><Common.TextLight12>??????</Common.TextLight12></PopupBtn>
						<PopupBtn><Common.TextLight12>??????</Common.TextLight12></PopupBtn>
					</Common.FlexRowBox>
				</ChatPopup>
				{/* ???????????? ?????? ?????? */}
				{/* <ChatPopup>
					<PopupTextBox>
						<Image20 source={require('../../../assets/img/drawable-xhdpi/icon_visit.png')} />
						<PopupText>????????? ?????? ??????????????????. ????????? ??????????????? ????????? ????????????.{"\n"}<Common.TextBold13 whiteTit>2021-02-15  12:00</Common.TextBold13></PopupText>
					</PopupTextBox>
				</ChatPopup> */}
				{/* ??????????????? ?????? */}
				{/* <ChatPopup>
					<PopupTextBox>
						<Common.Image14 source={require('../../../assets/img/drawable-xhdpi/icon_contract.png')} />
						<PopupText>??? ????????? ????????? ?????????????????????.{"\n"}<Common.TextBold13 whiteTit>??????????????? ????????? ????????????</Common.TextBold13></PopupText>
					</PopupTextBox>
					<Common.FlexRowBox>
						<PopupBtn Yellow><Common.TextLight12>??? ????????? ??????</Common.TextLight12></PopupBtn>
					</Common.FlexRowBox>
				</ChatPopup> */}
				{/* ??????????????? ?????? ?????? ?????? */}
				{/* <ChatPopup>
					<PopupTextBox>
						<Common.Image14 source={require('../../../assets/img/drawable-xhdpi/icon_receipt.png')} />
						<PopupText>?????? ???????????? ?????????????????????.{"\n"}<Common.TextBold13 whiteTit>????????? ????????????</Common.TextBold13></PopupText>
					</PopupTextBox>
					<Common.FlexRowBox>
						<PopupBtn Yellow><Common.TextLight12>????????? ??????</Common.TextLight12></PopupBtn>
					</Common.FlexRowBox>
				</ChatPopup> */}
			</ChatWrap>
			<ChatInputWrap>
				<ChatInputBox>
					<ChatAddBtn>
						<Common.Image24 resizeMode={'cover'} source={require('./../../../assets/img/drawable-xhdpi/bt_icon_attachment.png')} />
					</ChatAddBtn>
					<ChatInput multiline={true} placeholder={'???????????? ??????????????????.'}/>
				</ChatInputBox>
				<ChatSendBtn>
					<Common.Image48 source={require('../../../assets/img/drawable-xhdpi/bt_talk.png')} />
				</ChatSendBtn>
			</ChatInputWrap>
		</ChatContainer>
	)
}
export default Chat;


