import React from 'react';
import { View  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { TextBold14, TextLight11 } from '../../styled/commonStyle';
import { SaleList, SaleImg } from '../../styled/chatStyle/chatCommonStyle';
import { ChatSaleTop } from '../../styled/chatStyle/chatHeaderStyle';

const ChatHeaderSale = (props) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	
	return(
		<ChatSaleTop {...this.props}>
			<SaleList>
				<SaleImg source={require('../../../assets/img/sample/sample_room_04.jpg')} />
				<View>
					<TextBold14>월세 2500/90</TextBold14>
					<TextLight11>오피스텔 / 4층 / 69.42m² / 관리비 7만</TextLight11>
					<TextLight11>서울 강남구 논현동(실제 정보가 아닙니다.)</TextLight11>
				</View>
			</SaleList>
			{/* <ChatSaleBtnBox>
				<SaleBtn first>
					<Image14 source={require('./../../../assets/img/drawable-xhdpi/icon_outdoor_g.png')} />
					<BtnText>나가기</BtnText>
				</SaleBtn>
				<SaleBtn>
					<Image14 source={require('./../../../assets/img/drawable-xhdpi/icon_cutout_g.png')} />
					<BtnText>차단</BtnText>
				</SaleBtn>
			</ChatSaleBtnBox> */}
			<View>{props.children}</View>
		</ChatSaleTop>
	)
}
export default ChatHeaderSale;