import React, { useEffect, useState } from 'react';
import {Collapse,CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

import * as Common from '../../styled/commonStyle';

import{FaqTagBox,FaqTagBtn,FaqHeader,FaqHeaderTit,FaqTitBox,GreyBox,GreyBoxTit}from"../../styled/faqStyle/faqStyle";
import { useNavigation } from "@react-navigation/core";
import HTML from "react-native-render-html";
import { boardCnt } from '../../reducers/boardReducer';

const FaqScreen = ({boardList,initBoardState,getBoard, clearBoard}) => {
	//console.log("========================faq list========================");
	//console.log(boardList);
	

	const [selectedIdx, setSelectedIdx] = useState();

	const navigation = useNavigation();

	const [faqList, setFaqList] = useState("");
	const [boarCnt, setBoardCnt] = useState(0);
	useEffect(()=>{
		setBoardCnt(0);
	},[faqList])

	useEffect((props)=>{
		const handleEffect = async (props) => {
			//...
			getBoard({division:'faq', page:0});
		}
		
		handleEffect()
	},[])

	const ArrowIconActive = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_select_drop.png')} />)
	const ArrowIcon = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')} />)
	const FaqQ = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/img_question.png')} />)
	const FaqA = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/img_answer.png')} />)
	

	const FaqTag = (props) => {

		if (faqList == props.cat) {
			return (
				<FaqTagBtn Active>
					<Common.TextLight14>{props.title ? props.title : ''}</Common.TextLight14>
				</FaqTagBtn>
			)
		} else {
			return (
				<FaqTagBtn onPress={() => { setFaqList(props.cat); }} >
					<Common.TextLight14>{props.title ? props.title : ''}</Common.TextLight14>
				</FaqTagBtn>
			)
		}


	}
	useEffect(
		
		() =>{
			
		  navigation.addListener('beforeRemove', (e) => {
			  	console.log("back press!!");
				//initWriting();
				handleClearNotice();
			  	return false;
				
		  		}
			)
		}
		,

		[navigation]
	);

	var cnt = 0;
	boardList.map((el) => {
		if (el.tcb_faq_division == faqList) {
			cnt++;
		}
	});
	
	return (
		<Common.ZipandaSafeView>
			<FaqTagBox>
				<Common.ScrollView horizontal={true} contentContainerStyle={{ paddingHorizontal: 8 }}>
					<FaqTag title="?????? ??? FAQ" 	cat={"freq"}/>
					<FaqTag title="??????" 			cat={"member"} />
					<FaqTag title="????????????" 		cat={"saleReg"}  />
					<FaqTag title="?????? ??????" 		cat={"saleFind"}  />
					<FaqTag title="????????????"  		cat={"contract"}  />
					<FaqTag title="??????" cat={"etc"}  />
				</Common.ScrollView>
			</FaqTagBox>
			<Common.ScrollContainer paddingN>
				<Common.YellowBox20>
					<Common.TextLight14>
						<Common.TextBold14>{cnt}??????</Common.TextBold14> FAQ??? ????????????????????????.
					</Common.TextLight14>
				</Common.YellowBox20>
				
				<Common.PaddingH20>
				
					{
						boardList.map((el, index) => {
							if (el.tcb_faq_division == faqList) {
								return(
									<Collapse isExpanded={selectedIdx==index} onToggle={(collapsed) => { setSelectedIdx(index); }}>
										<CollapseHeader>
											<FaqHeader>
												<FaqTitBox>
													<FaqQ /><FaqHeaderTit>{el.tcb_title}</FaqHeaderTit>
												</FaqTitBox>
												{selectedIdx==index ? <ArrowIconActive /> : <ArrowIcon />}
											</FaqHeader>
										</CollapseHeader>
										<CollapseBody>
											<GreyBox>
												<FaqA />
												<GreyBoxTit>
													<HTML source={{html:(el.tcb_content)}} />
												</GreyBoxTit>
											</GreyBox>
										</CollapseBody>
									</Collapse>
								)
							}
						})
					}
				</Common.PaddingH20>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	);
};
export default FaqScreen;
