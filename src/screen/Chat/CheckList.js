import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import ChatHeaderSale from './../../components/chat/ChatHeaderSale';

import { Container,Image24,ScrollContainerB,TextBold12,TextBold16, TextMedium12,BottomBtn2Box,BottomBtn2,SubTitle} from '../../styled/commonStyle';
import {CheckListHeader,CheckListBox,ChkBoxBtn,ChkBoxTit,CheckInputBox,CheckTextArea} from '../../styled/chatStyle/checkListStyle';

const ChkOnIcon = () => (<Image24 source={require('../../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
const ChkOffIcon = () => (<Image24 source={require('../../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)

const ChkBox = (props) =>{
	const [active, setActive] = useState(props.isActive?props.isActive:false)
	return ( 
		<ChkBoxBtn onPress={() => { setActive (!active)}}>
			{ active ? <ChkOnIcon/> :  <ChkOffIcon />}
			{ active ? <TextMedium12>예</TextMedium12> : <ChkBoxTit>예</ChkBoxTit>}
		</ChkBoxBtn>
		)
}
const CheckItem=({item})=>{
	return(
		<CheckListBox>
			<TextMedium12>{item.title}</TextMedium12>
			<ChkBox />
		</CheckListBox>
	);
}

const CheckList = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [checkData, setCheckData] = useState([])

	useEffect(()=>{
		const handleEffect = async (props) => {
			setCheckData([
				{ title : '햇빛은 잘 들어오는가?'},
				{ title : '물이 샌(누수) 흔적은 없는가?'},
				{ title : '천장이나 벽, 장판 아래 곰팡이가 핀 곳은 없는가?'},
				{ title : '전기콘센트는 파손된 곳이 없는가?'},
				{ title : '수도는 잘 나오는가?'},
				{ title : '배수는 잘 되는가?'},
				{ title : '싱크대, 후드, 수납장 등 파손된 시설은 없는가?'},
				{ title : '냉장고를 놓을 수 있는 공간이 있는가?'},
				{ title : '욕실의 변기나 샤워기, 거울 등 파손된 시설은 없는가?'},
				{ title : '세탁기를 놓을 수 있는 공간은 있는가?'},
				{ title : '발코니는 있는가?'},
				{ title : '빨래를 건조할 수 있는 공간이 있는가?'},
				{ title : '방의 높이가 장롱이 들어갈 수 있을 만큼 높은가?'},
				{ title : '다용도실 같은 별도의 서비스 공간이 있는가?'},
				{ title : '방충망이나 방범창이 있는가?'},
				{ title : '환기가 잘되는가?'},
				{ title : '외풍이 심하지 않은가?'},
				{ title : '전기와 수도 계량기는 별도로 사용하는가?'},
				{ title : '주 출입구에 방범시설이 되어 있는가?'},
				{ title : '주차장은 있는가?'},
				{ title : '집 주변에 고물상, 공장 등 혐오시설은 없는가?'},
				{ title : '집 주변에 시장이나 할인마트가 있는가?'},
				{ title : '집 주변에 공원이나 놀이터 등이 있는가?'},
				{ title : '집에서 학교, 어린이집, 학원 등이 가까운가?'},
				{ title : '집에서 병원은 가까운가?'},
				{ title : '지하철역과 버스정류장이 도보로 10분 이내에 있는가?'},
				{ title : '집이 너무 외진 곳에 있지 않은가?'},
				{ title : '저당금액과 총 보증금의 합이 집값의 80%를 넘는가?'},
				{ title : '공부서류들의 내용이 서로 일치하는가?'},
				{ title : '집을 내놓았을 때 잘 나갈 수 있겠는가?'}
			])
		}
		handleEffect()
	},[])
	
	return(
		<Container>
			<ChatHeaderSale />
			<CheckListHeader>
				<TextBold12>체크리스트</TextBold12>
			</CheckListHeader>
			<ScrollContainerB>
				<FlatList
					data={ checkData } 
					renderItem ={ CheckItem } 
					keyExtractor={ item=> item.id }               
				/>
				<CheckInputBox>
					<SubTitle>기타메모</SubTitle>
					<CheckTextArea multiline={true} placeholder={'기타 메모내용을 입력해주세요.'}/>
				</CheckInputBox>
			</ScrollContainerB>
			<BottomBtn2Box>
				<BottomBtn2 >
					<TextBold16>저장</TextBold16>
				</BottomBtn2>
				<BottomBtn2 balck>
					<TextBold16 whiteTit>취소</TextBold16>
				</BottomBtn2>
			</BottomBtn2Box>
		</Container>
	)
}
export default CheckList;