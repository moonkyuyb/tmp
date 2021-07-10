import React, { useEffect, useState } from 'react';
import { Text, FlatList  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {Container, TextBold14,TextLight11,TextLight14,Image14,TextBold11,Image12,TextBold12,GoHomeBox,GoHomeText,Image20} from '../../styled/commonStyle';
import {ChatListNum,PreViewImg,ChatItemBox,ChatInfoBox,ChatImgBox,ChatImg,ChatTit,ChatUserNameWrap,ChatUserName,ChatBtnBox,ChatBtn,ChatNewIcons,ChatNoneBox,ChatNoneImg,ChatNoneTit,ChatNoneSubTit,} from '../../styled/chatStyle/chatListStyle';

const ChatList = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [ChatData, setChatData] = useState([])

	useEffect(()=>{
		const handleEffect = async (props) => {
			setChatData([
				{ active : 'Active', img: require('../../../assets/img/sample/sample_room_01.jpg'), price : '월세 2500/90', infoTit01 : '오피스텔 / 4층 / 69.42m² / 관리비 7만', infoTit02: '서울시 강남구 논현동', chatName : '박*수' },
				{ active : '', img: require('../../../assets/img/sample/sample_room_02.jpg'), price : '월세 2500/90', infoTit01 : '오피스텔 / 4층 / 69.42m² / 관리비 7만', infoTit02: '서울시 강남구 논현동', chatName : '김*수' },
				{ active : '', img: require('../../../assets/img/sample/sample_room_03.jpg'), price : '월세 2500/90', infoTit01 : '오피스텔 / 4층 / 69.42m² / 관리비 7만', infoTit02: '서울시 강남구 논현동', chatName : '이*수' }
			])
		}
		handleEffect()
	},[])
	
	const salesImageItem=({item})=>{
        return(
            <PreViewImg source={item.img}/>
        );
    }
	const ChatNewIcon = () => (<ChatNewIcons source={require('../../../assets/img/drawable-xhdpi/icon_chat_on.png')} />)
	const ChatBtn01 = () => (<Image14 source={require('../../../assets/img/drawable-xhdpi/icon_outdoor_b.png')} />)
	const ChatBtn02 = () => (<Image14 source={require('../../../assets/img/drawable-xhdpi/icon_cutout_b.png')} />)

	// list
	const ChatItem=({item})=>{
		return(
			<ChatItemBox onPress={() => navigation.navigate('chat')}>
			{/* <ChatItemBox Active> */}
				<ChatInfoBox>
					<ChatImgBox>
						<ChatImg source={item.img} />
					</ChatImgBox>
					<ChatTit>
						<TextBold14>{item.price}</TextBold14>
						<TextLight11 numberOfLines={1}>{item.infoTit01}</TextLight11>
						<TextLight11 numberOfLines={1}>{item.infoTit02}</TextLight11>
						<ChatUserNameWrap>
							<ChatUserName>
								<TextBold11>{item.chatName}</TextBold11>
								{item.active == 'Active' ? <ChatNewIcon/> : <Text/>}
							</ChatUserName>
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
			<ChatNoneBox>
				<ChatNoneImg source={require('../../../assets/img/drawable-xhdpi/icon_talk_non.png')} />
				<ChatNoneTit>직거래톡 매물이 없습니다.</ChatNoneTit>
				<ChatNoneSubTit>
					매물 상세페이지에서 <TextBold12>직거래톡 버튼을 클릭</TextBold12>하면{"\n"}
					나의 채팅 리스트로 등록됩니다.
				</ChatNoneSubTit>
				<GoHomeBox onPress={() => navigation.navigate('map')}>
					<Image20 source={require('../../../assets/img/drawable-xhdpi/icon_sale_search.png')}/>
					<GoHomeText>매물 보러가기</GoHomeText>
				</GoHomeBox>
			</ChatNoneBox>
		)
	}
	return(
		<Container>
			<ChatListNum>
				<TextLight14><TextBold14>전체 3개 </TextBold14>채팅 리스트</TextLight14>
			</ChatListNum>
			<FlatList
				data={ ChatData } 
				renderItem ={ ChatItem } 
				keyExtractor={ item=> item.id }
			/>

			{/* 채팅 없을때 */}
			{/* <ChatNon/> */}


		</Container>
	)
}
export default ChatList;


