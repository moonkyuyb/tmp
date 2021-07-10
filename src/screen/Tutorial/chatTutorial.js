import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from './../../styled/commonStyle';
import Colors from './../../../assets/colors';

import Modal from "react-native-modal";
import { TutorialWrap, TutorialCont, TopCloseWrap, CloseBtn } from './../../styled/tutorialStyle/tutorialCommonStyle' ;
import { TutorialChatContMenu, ArrowIcon, ContTextWrap, ContText, ChatPopupWrap } from './../../styled/tutorialStyle/chatTutorials' ;

import { ChatPopup, PopupTextBox, PopupText, PopupBtn } from '../../styled/chatStyle/chatStyle';
import { TitBox, TitUnderLine, ChatMenu, OptionListBtn, OptionListText } from '../../styled/chatStyle/chatHeaderStyle';

const IndexTutorial = () => {

	return(
		<Modal isVisible={ true  } style={{justifyContent:'center',alignItems:'center',  margin: 0}}>
			<TutorialWrap>
				<TutorialCont>

					<TopCloseWrap>
						<CloseBtn onPress={()=>{ console.log('') }}>
							<Common.TextBold18>다시보지않기</Common.TextBold18>
						</CloseBtn>
						<CloseBtn left onPress={()=>{ console.log('')  }}>
							<Common.TextBold18>닫기</Common.TextBold18>
						</CloseBtn>
					</TopCloseWrap>

					<TutorialChatContMenu>
						<TitBox>
							<Common.TextLight14><TitUnderLine>박*수</TitUnderLine>님과의 채팅입니다.</Common.TextLight14>
						</TitBox>
						<ChatMenu horizontal={true} contentContainerStyle={{paddingHorizontal: 8}}>
							<OptionListBtn><OptionListText>전화번호 공개요청</OptionListText></OptionListBtn>
							<OptionListBtn><OptionListText>방문요청</OptionListText></OptionListBtn>
							<OptionListBtn><OptionListText>체크리스트</OptionListText></OptionListBtn>
							<OptionListBtn><OptionListText>가계약</OptionListText></OptionListBtn>
							<OptionListBtn><OptionListText>계약</OptionListText></OptionListBtn>
							<OptionListBtn><OptionListText>등기</OptionListText></OptionListBtn>
						</ChatMenu>
					</TutorialChatContMenu>

					<Common.VerticalCenter>
						<ArrowIcon source={require('./../../../assets/img/drawable-xhdpi/img_tut_arrow_03.png')}/> 
						<ContTextWrap>
							<ContText>
								진행을 원하시는 메뉴를 선택하시면{'\n'}집판다가 방문부터 계약까지 모든{'\n'}과정을 도와드립니다.
							</ContText>
						</ContTextWrap>
						<ArrowIcon source={require('./../../../assets/img/drawable-xhdpi/img_tut_arrow_04.png')}/> 
					</Common.VerticalCenter>

					<ChatPopupWrap>
						<ChatPopup>
							<PopupTextBox>
								<Common.Image size={20} source={require('../../../assets/img/drawable-xhdpi/icon_contract.png')} />
								<PopupText>전화번호 공개 요청이 왔습니다.{"\n"}
								<PopupText Bold>승인하시겠습니까?</PopupText></PopupText>
							</PopupTextBox>
							<PopupBtn Yellow><Common.TextLight13>승락</Common.TextLight13></PopupBtn>
							<PopupBtn><Common.TextLight13>거절</Common.TextLight13></PopupBtn>
						</ChatPopup>
					</ChatPopupWrap>
				</TutorialCont>
			</TutorialWrap>
		</Modal>
	)
}

export default IndexTutorial;


