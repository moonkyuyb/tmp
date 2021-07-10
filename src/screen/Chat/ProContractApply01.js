import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../../assets/colors';
import RNPickerSelect from "react-native-picker-select";

import Modal from 'react-native-modal';
import ModalWrap from '../Modal/ModalCommon';
import AddressModal from '../Chat/AddressModal';
import PickerStyle from './../../styled/pickerStyle';

import {Container,ScrollContainer20B,TitleBox,Title,SubTitle,ViewBorder,TextLight12,TextBold12,TextBold16,InputBorder,BottomBtnYello,ViewBorderBtn,Image24,InputIconS,TextMedium12} from '../../styled/commonStyle';
import {ContractInfoHeader,InfoAert,ViewBorderY,YellowLabel,BorderYInnerBox,YTextInput,Btn01Box,Contract01Btn,ContractBtnText} from '../../styled/chatStyle/proContractcApplyStyle';

const ArrowIcon = () => (<InputIconS source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')} />)
const ProContractApply01 = () => {

	const [pickerBank, setPickerBank] = useState([])
	
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {
			setPickerBank([
				{label:'국민은행', value:'a'},
				{label:'신한은행', value:'a'},
				{label:'기업은행', value:'a'},
				{label:'하나은행', value:'a'},
				{label:'산업은행', value:'a'},
				{label:'한국시티', value:'a'},
				{label:'SC제일은행', value:'a'},
				{label:'농협', value:'a'},
				{label:'수협', value:'a'},
				{label:'신협', value:'a'},
				{label:'카카오뱅크', value:'a'},
				{label:'케이뱅크', value:'a'},
				{label:'제주은행', value:'a'},
				{label:'경남은행', value:'a'},
				{label:'광주은행', value:'a'},
				{label:'대구은행', value:'a'},
				{label:'부산은행', value:'a'},
				{label:'전북은행', value:'a'},
				{label:'새마을금고', value:'a'},
				{label:'우체국', value:'a'},
				{label:'저축은행', value:'a'},
				{label:'지역농.축협', value:'a'},
			])
		}
		handleEffect()
	},[])

	
	return(
		<Container>
			<ScrollContainer20B>
				<TitleBox><Title>임대인 정보 입력</Title></TitleBox>
				<TextMedium12>선택하신 매물로 가 계약을 진행하시겠습니까?</TextMedium12>
				<ContractInfoHeader>
					<InfoAert source={require('../../../assets/img/drawable-xhdpi/icon_alert.png')} />
					<TextLight12 whiteTit>전자계약은 반드시 매수자(임차인)와사전에 합의를 하신 후 진행하셔야 합니다.</TextLight12>
				</ContractInfoHeader>
				
				<SubTitle>임대인 이름</SubTitle>
				<ViewBorder><TextLight12>홍길동</TextLight12></ViewBorder>

				<SubTitle>주소</SubTitle>
				<ViewBorderBtn onPress={toggleModal}><TextLight12>서울시 강남구 신사동</TextLight12></ViewBorderBtn>
				<InputBorder placeholder={'상세주소 입력'}></InputBorder>

				<SubTitle>휴대전화 번호</SubTitle>
				<ViewBorder><TextLight12>010-1234-5678</TextLight12></ViewBorder>

				<SubTitle>주민등록번호</SubTitle>
				<ViewBorder><YTextInput placeholder={'주민등록번호 입력'}/></ViewBorder>

				<SubTitle>계좌번호</SubTitle>
				<ViewBorderY>
					<YellowLabel><TextLight12>은행</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<ArrowIcon />
						<RNPickerSelect
							onValueChange={(value) => console.log(value)}
							placeholder={{  label: '은행 선택',}}
							style={PickerStyle}
							items={pickerBank}
							useNativeAndroidPickerStyle={false}
						/>
					</BorderYInnerBox>
				</ViewBorderY>
				
				<ViewBorderY>
					<YellowLabel><TextLight12>예금주</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'예금주 입력'}/>
					</BorderYInnerBox>
				</ViewBorderY>
				
				<ViewBorderY>
					<YellowLabel><TextLight12>계좌번호</TextLight12></YellowLabel>
					<BorderYInnerBox>
						<YTextInput  placeholder={'계좌번호 입력'}/>
					</BorderYInnerBox>
				</ViewBorderY>

				<Btn01Box>
					<TextBold12>명의가 여러 명일 경우에는 모든 임차인의 정보를 입력해 주십시오</TextBold12>
					<Contract01Btn>
						<Image24 source={require('../../../assets/img/drawable-xhdpi/icon_attachment_b.png')} />
						<ContractBtnText>임대인 추가 등록</ContractBtnText>
					</Contract01Btn>
				</Btn01Box>
			</ScrollContainer20B>
			<BottomBtnYello onPress={() => navigation.navigate('apply02')}>
				<TextBold16>다음</TextBold16>
			</BottomBtnYello>

			{/* <AddressModal /> */}
			<Modal isVisible={isModalVisible}>
				<ModalWrap toggleModal={toggleModal} title='주소입력'>
					<AddressModal />
				</ModalWrap>
			</Modal>
		</Container>
	)
}
export default ProContractApply01;

