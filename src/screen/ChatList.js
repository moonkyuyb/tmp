import React, { useEffect, useState } from 'react';
import { Text, FlatList  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from './../styled/commonStyle';
import Colors from './../../assets/colors';
import {TextBold12} from './../styled/commonStyle';
import {ChatListNum,PreViewImg,ChatItemBox,ChatInfoBox,ChatImgBox,ChatImg,ChatTit,ChatUserNameWrap,ChatUserName,ChatUserNameText,ChatBtnBox,ChatBtn,ChatPriceText} from './../styled/chatStyle/chatListStyle';
import { NonWrap, NoneBox } from "./../styled/chatStyle/chatNoneStyle";
import { BuildingInfoBox, BuildingInfoText } from "./../styled/sales/saleListItemStyle";
	
const ChatList = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [ChatData, setChatData] = useState([])

	useEffect(()=>{
		const handleEffect = async (props) => {
			setChatData([
				{ active : 'Active', img: require('./../../assets/img/sample/sample_room_01.jpg'), price : '월세 2500/90', infoTit01 : '오피스텔 / 4층 / 69.42m² / 관리비 7만', infoTit02: '서울시 강남구 논현동', chatName : '박*수' },
				{ active : '', img: require('./../../assets/img/sample/sample_room_02.jpg'), price : '월세 2500/90', infoTit01 : '오피스텔 / 4층 / 69.42m² / 관리비 7만', infoTit02: '서울시 강남구 논현동', chatName : '김*수' },
				{ active : '', img: require('./../../assets/img/sample/sample_room_03.jpg'), price : '월세 2500/90', infoTit01 : '오피스텔 / 4층 / 69.42m² / 관리비 7만', infoTit02: '서울시 강남구 논현동', chatName : '이*수' }
			])
		}
		handleEffect()
	},[])
	
	const salesImageItem=({item})=>{
        return(
            <PreViewImg source={item.img}/>
        );
    }
	const ChatNewIcon = () => (<Common.Image size={17} source={require('./../../assets/img/drawable-xhdpi/icon_chat_on.png')} />)
	const ChatBtn01 = () => (<Common.Image size={14} source={require('./../../assets/img/drawable-xhdpi/icon_outdoor_b.png')} />)
	const ChatBtn02 = () => (<Common.Image size={14} source={require('./../../assets/img/drawable-xhdpi/icon_cutout_b.png')} />)

	// list
	const ChatItem=({item})=>{
		return(
			<ChatItemBox /*Active*/ onPress={() => navigation.navigate('chat')}>
				<ChatInfoBox>
					<ChatImgBox>
						<ChatImg source={item.img} />
					</ChatImgBox>
					<ChatTit>
						<ChatPriceText>{item.price}</ChatPriceText>
						<BuildingInfoBox marginTN>
							<BuildingInfoText numberOfLines={1}>{item.infoTit01}</BuildingInfoText>
							<BuildingInfoText numberOfLines={1}>{item.infoTit02}</BuildingInfoText>
						</BuildingInfoBox>

						<ChatUserNameWrap>
							<ChatUserName>
								<ChatUserNameText>{item.chatName}</ChatUserNameText>
							</ChatUserName>
							{item.active == 'Active' ? <ChatNewIcon/> : <Text/>}
						</ChatUserNameWrap>
					</ChatTit>
				</ChatInfoBox>
				<ChatBtnBox>
					<ChatBtn><ChatBtn01 /></ChatBtn>
					<ChatBtn><ChatBtn02 /></ChatBtn>
					{/* <ChatBtn Active><ChatBtn01 /></ChatBtn>
						<ChatBtn Active><ChatBtn02 /></ChatBtn> */}
				</ChatBtnBox>
			</ChatItemBox>
		);
	}
	const ChatNon=()=>{
		return(
			<NonWrap>
				<NoneBox>
					<Common.Image size={76} marginB={23}  source={require('./../../assets/img/drawable-xhdpi/icon_talk_non.png')} />
					<Common.TextSemiBold18>직거래톡 매물이 없습니다.</Common.TextSemiBold18>
					<Common.TextLight14 paragraph align={'center'} marginT={11}>
						매물 상세페이지에서 <TextBold12>직거래톡 버튼을 클릭</TextBold12>하면{"\n"}
						나의 채팅 리스트로 등록됩니다.
					</Common.TextLight14>
					<Common.GoHomeBox onPress={() => navigation.navigate('map')}>
						<Common.Image size={20} source={require('./../../assets/img/drawable-xhdpi/icon_sale_search.png')}/>
						<Common.GoHomeText>매물 보러가기</Common.GoHomeText>
					</Common.GoHomeBox>
				</NoneBox>
			</NonWrap>
		)
	}
	return(
		<Common.ZipandaSafeView>
			{/* 채팅 있을때 */}
			<Common.ScrollContainer paddingN>
				<ChatListNum>
					<Common.TextLight14><Common.TextSemiBold14>전체 3개 </Common.TextSemiBold14>직거래톡 리스트</Common.TextLight14>
				</ChatListNum>
				<FlatList
					data={ ChatData } 
					renderItem ={ ChatItem } 
					keyExtractor={ item=> item.id }
				/>

				

			</Common.ScrollContainer>
			{/* 채팅 없을때 */}
			<ChatNon/>
		</Common.ZipandaSafeView>
	)
}
export default ChatList;


