import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from "react-redux";

import { TextLight11, TextLight12 } from '../../styled/commonStyle';
import { ChatContMenu, TitBox, TitUnderLine, ChatMenu, OptionListBtn } from '../../styled/chatStyle/chatHeaderStyle';
import { showAlertMessage } from '../../reducers/commonReducer';

const ChatHeaderMenu = ({s_id}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const dispatch = useDispatch()

	return(
		<ChatContMenu>
			<TitBox>
				<TextLight11><TitUnderLine>박*수(trot***@gmail.com)</TitUnderLine>님과의 채팅입니다.</TextLight11>
			</TitBox>
			<ChatMenu horizontal={true} contentContainerStyle={{paddingHorizontal: 8}}>	
				<OptionListBtn onPress={() => {dispatch(showAlertMessage('준비중입니다 ~2021/06'))}}>
					<TextLight12>전화번호 공개요청</TextLight12> 
				</OptionListBtn>
				<OptionListBtn onPress={() => {dispatch(showAlertMessage('준비중입니다 ~2021/06'))}}>
					<TextLight12>방문요청</TextLight12> 
				</OptionListBtn>
				<OptionListBtn  onPress={() => {dispatch(showAlertMessage('준비중입니다 ~2021/06'))}}>
					<TextLight12>체크리스트</TextLight12> 
				</OptionListBtn>
				<OptionListBtn  onPress={() => {dispatch(showAlertMessage('준비중입니다 ~2021/06'))}}>
					<TextLight12>가계약</TextLight12> 
				</OptionListBtn>
				<OptionListBtn  onPress={() => {dispatch(showAlertMessage('준비중입니다 ~2021/06'))}}>
					<TextLight12>계약</TextLight12> 
				</OptionListBtn>
				<OptionListBtn  onPress={() => {dispatch(showAlertMessage('준비중입니다 ~2021/06'))}}>
					<TextLight12>등기</TextLight12> 
				</OptionListBtn>
			</ChatMenu>
		</ChatContMenu>
	)
}
export default ChatHeaderMenu;


