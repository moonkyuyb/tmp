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
						<PandaTag>집판다</PandaTag><ChatTime>2021-02-15  14:25:23</ChatTime>
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
					<ProfileTit>박</ProfileTit>
				</Profile>
				<ChatLinner>
					<ChatTopBox>
						<Common.TextBold12>박*수</Common.TextBold12><ChatTime>2021-02-15  14:25:23</ChatTime>
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
							<Common.Image14 source={require('./../../../assets/img/drawable-xhdpi/icon_outdoor_g.png')} /><BtnText>나가기</BtnText>
						</SaleBtn>
						<SaleBtn>
							<Common.Image14 source={require('./../../../assets/img/drawable-xhdpi/icon_cutout_g.png')} /><BtnText>차단</BtnText>
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
									<TextDot/><Common.TextLight11>메시지를 보내는 즉시 앱 푸시로 발송됩니다.</Common.TextLight11>
								</ItemList>
								<ItemList>
									<TextDot/><Common.TextLight11>직거래를 유도하는 글, 음란성, 광고성, 범죄 위험이 있는 게시물 및 경우 관리자에 의해 임의로 삭제되거나 수사기관에 고발 조치가 될 수 있습니다.</Common.TextLight11>
								</ItemList>
								<ItemList>
									<TextDot/><Common.TextLight11>채팅 메시지는 거래종료 3개월 이후에 자동 삭제됩니다. </Common.TextLight11>
								</ItemList>
							</ItemBox>
						</PandaChatMessage>

						{/* 일반 메시지 */}
						<ChatMessageR>
							<ChatM>직접 전화로 협의하고 싶습니다.</ChatM>
						</ChatMessageR>
						
						<ChatMessageL>
							<ChatM>넵</ChatM>
						</ChatMessageL>
						
						{/* 전화번호 공개 요청/수락 메시지 */}
						<ChatMessageR>
							<ChatM>홍*동님이 <Common.TextBold11>전화번호 공개를 요청</Common.TextBold11>하였습니다.</ChatM>
						</ChatMessageR>

						<ChatMessageL>
							<ChatM>홍*동님의 <Common.TextBold11>전화번호 공개를 요청을 거절</Common.TextBold11>하였습니다.</ChatM>
						</ChatMessageL>

						<ChatMessageL>
							<ChatM>홍*동님의 전화번호 공개를 요청을 승낙하였습니다.</ChatM>
							<ChatInfoBox chatLeft onPress={makeCall}>
								<InfoTelIcon/><Common.TextBold11>050-1234-5678</Common.TextBold11>
							</ChatInfoBox>
						</ChatMessageL>

						{/* 방문요청 메시지 */}
						<ChatMessageR>
							<ChatM>홍*동님이 방문을 요청하였습니다.</ChatM>
							<ChatInfoBox>
								<InfoClockIcon/><Common.TextBold11>2021-02-15  12:00</Common.TextBold11>
							</ChatInfoBox>
						</ChatMessageR>

						<ChatMessageL>
							<ChatM>홍*동님의 <Common.TextBold11>방문을 요청을 거절</Common.TextBold11>하였습니다.</ChatM>
						</ChatMessageL>

						<ChatMessageL>
							<ChatM>홍*동님의 방문 요청을 승낙하였습니다.</ChatM>
							<ChatInfoBox chatLeft>
								<InfoClockIcon/><Common.TextBold11>2021-02-15  12:00</Common.TextBold11>
							</ChatInfoBox>
						</ChatMessageL>

						{/* panda chat */}
						<PandaChatMessage>
							<PandaText>오늘은 매물 방문일 입니다. 시간을 확인하시고 방문해 주십시오.</PandaText>
							<ChatInfoBox>
								<InfoClockIcon/><Common.TextBold11>2021-02-15  12:00</Common.TextBold11>
							</ChatInfoBox>
						</PandaChatMessage>
					</ChatScroll>
				</ChatScrollBox>
				{/* chat bottom popup */}
				{/* 전화번호 공개 요청 */}
				<ChatPopup>
					<PopupTextBox>
						<Common.Image14 source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
						<PopupText>전화번호 공개 요청이 왔습니다.{"\n"}<Common.TextBold13 whiteTit>승인하시겠습니까?</Common.TextBold13></PopupText>
					</PopupTextBox>
					<Common.FlexRowBox>
						<PopupBtn Yellow><Common.TextLight12>승락</Common.TextLight12></PopupBtn>
						<PopupBtn><Common.TextLight12>거절</Common.TextLight12></PopupBtn>
					</Common.FlexRowBox>
				</ChatPopup>
				{/* 가계약서 날인 요청 */}
				{/* <ChatPopup>
					<PopupTextBox>
						<Image20 source={require('../../../assets/img/drawable-xhdpi/icon_visit.png')} />
						<PopupText>오늘은 매물 방문일입니다. 시간을 확인하시고 방문해 주십시오.{"\n"}<Common.TextBold13 whiteTit>2021-02-15  12:00</Common.TextBold13></PopupText>
					</PopupTextBox>
				</ChatPopup> */}
				{/* 매물방문일 안내 */}
				{/* <ChatPopup>
					<PopupTextBox>
						<Common.Image14 source={require('../../../assets/img/drawable-xhdpi/icon_contract.png')} />
						<PopupText>가 계약서 작성이 완료되었습니다.{"\n"}<Common.TextBold13 whiteTit>확인하시고 날인해 주십시오</Common.TextBold13></PopupText>
					</PopupTextBox>
					<Common.FlexRowBox>
						<PopupBtn Yellow><Common.TextLight12>가 계약서 날인</Common.TextLight12></PopupBtn>
					</Common.FlexRowBox>
				</ChatPopup> */}
				{/* 잔금영수증 발행 확인 요청 */}
				{/* <ChatPopup>
					<PopupTextBox>
						<Common.Image14 source={require('../../../assets/img/drawable-xhdpi/icon_receipt.png')} />
						<PopupText>잔금 영수증이 발행되었습니다.{"\n"}<Common.TextBold13 whiteTit>확인해 주십시오</Common.TextBold13></PopupText>
					</PopupTextBox>
					<Common.FlexRowBox>
						<PopupBtn Yellow><Common.TextLight12>영수증 확인</Common.TextLight12></PopupBtn>
					</Common.FlexRowBox>
				</ChatPopup> */}
			</ChatWrap>
			<ChatInputWrap>
				<ChatInputBox>
					<ChatAddBtn>
						<Common.Image24 resizeMode={'cover'} source={require('./../../../assets/img/drawable-xhdpi/bt_icon_attachment.png')} />
					</ChatAddBtn>
					<ChatInput multiline={true} placeholder={'메시지를 입력해주세요.'}/>
				</ChatInputBox>
				<ChatSendBtn>
					<Common.Image48 source={require('../../../assets/img/drawable-xhdpi/bt_talk.png')} />
				</ChatSendBtn>
			</ChatInputWrap>
		</ChatContainer>
	)
}
export default Chat;


