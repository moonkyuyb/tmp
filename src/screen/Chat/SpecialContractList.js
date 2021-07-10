import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

import{Container,ScrollContainer20B,TextLight11,TextBold16,BottomBtn2Box,BottomBtn2,TextLight12,FlexRowBtn,Image24,FlexRowBox}from"../../styled/commonStyle";
import{HeaderBox,SpecialGreyBox,CollapseWrap,CollapseBox}from"../../styled/chatStyle/specialContractListStyle";

const SpecialContractList = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [specialDate, setSpecialDate] = useState([])
	const [active01, setActive01] = useState(false);
	const [active02, setActive02] = useState(false);
	const [active03, setActive03] = useState(false);
	const [active04, setActive04] = useState(false);
	const [active05, setActive05] = useState(false);
	const [active06, setActive06] = useState(false);
	const [active07, setActive07] = useState(false);

	useEffect(()=>{
		const handleEffect = async (props) => {
			setSpecialDate([
				{ title : '시설물 상태에 대한 특약', contTit : '시설물은 온전한 상태의 계약이며, 옵션 파손 시 원상 복구한다. 단 임차인의 책임 없는 노후 시설의 고장은 임대인이 적극 수리한다. '}, 
				{ title : '서명 완료 후 저장되는 전자문서를 원본으로 인정합니다.', contTit : 'a'},
				{ title : '애완동물에 대한 특약', contTit : 'b'},
				{ title : '대상 매물 대출 진행에 대한 특약', contTit : 'c'},
				{ title : '임대기간 만료에 대한 특약', contTit : 'd'},
				{ title : '가 계약금 포기에 대한 특약', contTit : 'e'},
			])
		}
		handleEffect()
	},[])

	const ChkBtn = () => (<Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkBtnActive = () => (<Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const ArrowIconActive = () => (<Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_select_drop.png')} />)
	const ArrowIcon = () => (<Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')} />)
	
	const ChkBtnBox = (props) => {
		const [active, setActive] = useState(props.isActive?props.isActive:false)
		return(
			<TouchableOpacity onPress={() => { setActive (!active)}}>
				{active ? <ChkBtnActive/> : <ChkBtn/>}
			</TouchableOpacity>	
		)
	}
	
	return(
		<Container>
			<ScrollContainer20B>
				<CollapseWrap>
					<CollapseBox>
						<Collapse isExpanded={false} onToggle={(collapsed)=>{setActive01(collapsed)}}>
							<CollapseHeader >
								<HeaderBox>
									<FlexRowBox>
										<ChkBtnBox/><TextLight12>시설물 상태에 대한 특약</TextLight12>
									</FlexRowBox>
									{active01 ? <ArrowIconActive/> : <ArrowIcon />}
								</HeaderBox>
							</CollapseHeader>
							<CollapseBody>
								<SpecialGreyBox>
									<TextLight11>시설물은 온전한 상태의 계약이며, 옵션 파손 시 원상 복구한다.{"\n"}단 임차인의 책임 없는 노후 시설의 고장은 임대인이 적극 수리한다. </TextLight11>
								</SpecialGreyBox>
							</CollapseBody>
						</Collapse>
					</CollapseBox>
					<CollapseBox>
						<Collapse isExpanded={false} onToggle={(collapsed)=>{setActive02(collapsed)}}>
							<CollapseHeader >
								<HeaderBox>
									<FlexRowBox>
										<ChkBtnBox/><TextLight12>서명 완료 후 저장되는 전자문서를 원본으로 인정합니다. </TextLight12>
									</FlexRowBox>
									{active02 ? <ArrowIconActive/> : <ArrowIcon />}
								</HeaderBox>
							</CollapseHeader>
							<CollapseBody>
								<SpecialGreyBox>
									<TextLight11>text1</TextLight11>
								</SpecialGreyBox>
							</CollapseBody>
						</Collapse>
					</CollapseBox>
					<CollapseBox>
						<Collapse isExpanded={false} onToggle={(collapsed)=>{setActive03(collapsed)}}>
							<CollapseHeader >
								<HeaderBox>
									<FlexRowBox>
										<ChkBtnBox/><TextLight12>애완동물에 대한 특약</TextLight12>
									</FlexRowBox>
									{active03 ? <ArrowIconActive/> : <ArrowIcon />}
								</HeaderBox>
							</CollapseHeader>
							<CollapseBody>
								<SpecialGreyBox>
									<TextLight11>text1</TextLight11>
								</SpecialGreyBox>
							</CollapseBody>
						</Collapse>
					</CollapseBox>
					<CollapseBox>
						<Collapse isExpanded={false} onToggle={(collapsed)=>{setActive04(collapsed)}}>
							<CollapseHeader >
								<HeaderBox>
									<FlexRowBox>
										<ChkBtnBox/><TextLight12>임대기간 내 목적물 매도에 대한 특약</TextLight12>
									</FlexRowBox>
									{active04 ? <ArrowIconActive/> : <ArrowIcon />}
								</HeaderBox>
							</CollapseHeader>
							<CollapseBody>
								<SpecialGreyBox>
									<TextLight11>text1</TextLight11>
								</SpecialGreyBox>
							</CollapseBody>
						</Collapse>
					</CollapseBox>
					<CollapseBox>
						<Collapse isExpanded={false} onToggle={(collapsed)=>{setActive05(collapsed)}}>
							<CollapseHeader >
								<HeaderBox>
									<FlexRowBox>
										<ChkBtnBox/><TextLight12>대상 매물 대출 진행에 대한 특약</TextLight12>
									</FlexRowBox>
									{active05 ? <ArrowIconActive/> : <ArrowIcon />}
								</HeaderBox>
							</CollapseHeader>
							<CollapseBody>
								<SpecialGreyBox>
									<TextLight11>text1</TextLight11>
								</SpecialGreyBox>
							</CollapseBody>
						</Collapse>
					</CollapseBox>
					<CollapseBox>
						<Collapse isExpanded={false} onToggle={(collapsed)=>{setActive06(collapsed)}}>
							<CollapseHeader >
								<HeaderBox>
									<FlexRowBox>
										<ChkBtnBox/><TextLight12>임대기간 만료에 대한 특약</TextLight12>
									</FlexRowBox>
									{active06 ? <ArrowIconActive/> : <ArrowIcon />}
								</HeaderBox>
							</CollapseHeader>
							<CollapseBody>
								<SpecialGreyBox>
									<TextLight11>text1</TextLight11>
								</SpecialGreyBox>
							</CollapseBody>
						</Collapse>
					</CollapseBox>
					<CollapseBox>
						<Collapse isExpanded={false} onToggle={(collapsed)=>{setActive07(collapsed)}}>
							<CollapseHeader >
								<HeaderBox>
									<FlexRowBox>
										<ChkBtnBox/><TextLight12>가 계약금 포기에 대한 특약</TextLight12>
									</FlexRowBox>
									{active07 ? <ArrowIconActive/> : <ArrowIcon />}
								</HeaderBox>
							</CollapseHeader>
							<CollapseBody>
								<SpecialGreyBox>
									<TextLight11>text1</TextLight11>
								</SpecialGreyBox>
							</CollapseBody>
						</Collapse>
					</CollapseBox>
				</CollapseWrap>
			</ScrollContainer20B>
			<BottomBtn2Box>
				<BottomBtn2 >
					<TextBold16>확인</TextBold16>
				</BottomBtn2>
				<BottomBtn2 balck>
					<TextBold16 whiteTit>취소</TextBold16>
				</BottomBtn2>
			</BottomBtn2Box>
		</Container>
	)
}
export default SpecialContractList;