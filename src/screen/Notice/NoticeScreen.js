import React, { useEffect, useState } from 'react';
import {Collapse,CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

import * as Common from '../../styled/commonStyle';

import{NoticeHeader,NoticeHeaderTit,GreyBox,GreyBoxTit,HeaderSubTit,AddMoreBox,AddMoreBtn,AddIconS}from"../../styled/noticeStyle/NoticeStyle";
import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/core";

const NoticeScreen = ({page, nextPage, boardList,initBoardState,getBoard, boardCnt, clearBoard }) => {
	const [CollapseList01, setCollapseList01] = useState(false)
	const [CollapseList02, setCollapseList02] = useState(false)
	const [CollapseList03, setCollapseList03] = useState(false)
	const [CollapseList04, setCollapseList04] = useState(false)

	//console.log("========================boardList========================");
	//console.log(boardList);
	const navigation = useNavigation();

	const ArrowIconActive = () => (<Common.Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_select_drop.png')} />);
	const ArrowIcon = () => (<Common.Image24 source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')} />);
	const AddIcon = () => (<AddIconS source={require('./../../../assets/img/drawable-xhdpi/icon_attachment_b.png')} />);
	const AddBtn =() => (
		<AddMoreBox>
			<AddMoreBtn onPress={()=>{getBoard({division:'notice', page:nextPage})}} >
				<AddIcon /><Common.TextMedium16>더 보기</Common.TextMedium16>
			</AddMoreBtn>
		</AddMoreBox>
	)

	useEffect((props)=>{
		const handleEffect = async (props) => {
			//...

			initBoardState();
			getBoard({division:'notice', page:page});
		
		}
		
		handleEffect()
	},[])

	useEffect(
		
		() =>{
			
		  navigation.addListener('beforeRemove', (e) => {
			  	console.log("back press!!");
				//initWriting();
				//ice();
				clearBoard();
			  	return false;
				
		  		}
			)
		}
		,

		[navigation]
	  );
	
	
	
	
	return (
		<Common.ZipandaSafeView>
			<Common.YellowBox20>
				<Common.TextLight14>
					<Common.TextBold14>{boardList.length > 0 ? boardList[0].total_cnt:"0"}개의</Common.TextBold14> 공지사항이 등록되어있습니다.
				</Common.TextLight14>
			</Common.YellowBox20>
			<Common.ScrollContainer paddingN>
				<Common.PaddingH20>
					{boardList.map((el) => {
						return (
							
							<Collapse isExpanded={false} onToggle={(collapsed)=>{ if (collapsed) {boardCnt({tcb_id:el.tcb_id})} setCollapseList01(collapsed)}}>
								<CollapseHeader>
									<NoticeHeader>
										<Common.FlexBetweenBox>
											<NoticeHeaderTit numberOfLines={1}>{el.tcb_title}</NoticeHeaderTit>
											{CollapseList01 ? <ArrowIconActive/> : <ArrowIcon/>}
										</Common.FlexBetweenBox>
										<HeaderSubTit>작성일 : {el.formatted_date} ･ 조회수 : {el.tcb_hit}</HeaderSubTit>
									</NoticeHeader>
								</CollapseHeader>
								<CollapseBody>
									<GreyBox>
										<GreyBoxTit>
											<HTML source={{html:(el.tcb_content)}} />
										</GreyBoxTit>
									</GreyBox>
								</CollapseBody>
							</Collapse>
							
						)
					})
					}
				</Common.PaddingH20>
				<AddBtn />
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	);
};

export default NoticeScreen;
