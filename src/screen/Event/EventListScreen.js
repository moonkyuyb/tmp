import React, { useEffect, useState } from 'react';

import * as Common from '../../styled/commonStyle';
import Colors from '../../../assets/colors';
import{EventListItem,EventHeader,SnsBoxS,EventImage,SubHeaderBox,EventLabel}from"../../styled/eventStyle/eventStyle";
import { API_URL} from "@env";
import { useNavigation } from '@react-navigation/native';

import { ShareDialog } from 'react-native-fbsdk-next';
import KakaoSDK from '@actbase/react-native-kakaosdk';

const EventListScreen = ({boardList,initBoardState,getBoard, page, nextPage }) => {
	const navigation = useNavigation()
	useEffect((props)=>{
		const handleEffect = async (props) => {
			//...
		}
		getBoard({division:'event', page:page});

		handleEffect()
	},[])

	const goKakaoShare = (teb_id, title, content, imgURL) =>{

		KakaoSDK.Link.sendFeed({
			content: {
				title: title,
				desc: content,
				imageURL: imgURL,
				link: {
					webURL: "http://1.227.192.243:8000/snsShare/"+teb_id,
					mobileWebURL: "http://1.227.192.243:8000/snsShare/"+teb_id,
				},
			},
			
			buttons: [{
				title: '앱에서 보기',
				webURL: "http://1.227.192.243:8000/snsShare/"+teb_id,
				mobileWebURL: "http://1.227.192.243:8000/snsShare/"+teb_id,
				androidExecutionParams: 'teb_id='+teb_id,
				iosExecutionParams: 'teb_id='+teb_id,
			}],
		})
		.then(r => console.log('success'))
		.catch(e => {
			console.log("err-===============")
			console.log(e)
		});
	
	}
	
	const SnsBox = (props) => {
		console.log(props)
		return(
			<SnsBoxS>
				<Common.TouchableOpacity onPress={()=>{goKakaoShare(props.teb_id, props.title, props.content, props.imgURL);}} marginR={4}><Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_kakao.png')} /></Common.TouchableOpacity>
				<Common.TouchableOpacity marginR={4}><Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_naver.png')} /></Common.TouchableOpacity>
				<Common.TouchableOpacity marginR={4} onPress={()=>{shareLinkWithShareDialog(props.teb_id)}} ><Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_facebook.png')} /></Common.TouchableOpacity>
			</SnsBoxS>
		)
	}
	const EventStatus = (props) =>{
		if (props.isOn == "on") {
			return (
				<EventLabel Active><Common.TextLight12>진행중</Common.TextLight12></EventLabel>
			)
		}else {
			return (
				<EventLabel><Common.TextLight12 color={Colors.whiteColor}>종료</Common.TextLight12></EventLabel>
			)
		}
	}

	const shareLinkContent = (teb_id) => {
		return (
			{
				contentType: 'link',
				contentUrl: "http://1.227.192.243:8000/snsShare/"+teb_id,
				contentDescription: '집판다 이벤트',
			}
		)
	}

	function shareLinkWithShareDialog(ted_id) {
		var tmp = this;
		console.log(shareLinkContent(ted_id))
		ShareDialog.canShow(shareLinkContent(ted_id)).then(
		  function(canShow) {
			if (canShow) {
			  return ShareDialog.show(shareLinkContent(ted_id));
			}
		  }
		).then(
		  function(result) {
			if (result.isCancelled) {
			  console.log('Share cancelled');
			} else {
			  console.log('Share success with postId: '
				+ result.postId);
			}
		  },
		  function(error) {
			console.log('Share fail with error: ' + error);
		  }
		);
	}

	return (
		<Common.ZipandaSafeView>
			

			<Common.YellowBox20>
				<Common.TextLight14>
					<Common.TextBold14>{boardList[0]!=null ? boardList[0].total_cnt:"0"}개의</Common.TextBold14> 이벤트가 등록되어있습니다.
					</Common.TextLight14>
				</Common.YellowBox20>
				
			<Common.ScrollContainer paddingN>
		
				{boardList.map((el)=> {
					return(
						<EventListItem onPress={() => navigation.navigate('eventView',{ted_id:el.teb_id})}>
							<EventHeader>
								<Common.TextSemiBold16 numberOfLines={1}>{el.teb_title}</Common.TextSemiBold16>
								<SubHeaderBox>
									<Common.FlexRowBox>
										<EventStatus isOn={el.is_on}/>
										<Common.TextMedium14>{`${el.event_start} ~ ${el.event_end}`}</Common.TextMedium14>
									</Common.FlexRowBox>
									<SnsBox teb_id={el.teb_id} title={el.teb_title} content={el.teb_content} imgURL={API_URL.split(":")[0]+el.ted_image_unique_nm} />
								</SubHeaderBox>
							</EventHeader>
							<EventImage source={{uri:API_URL.split(":")[0]+el.ted_image_unique_nm}}/>
						</EventListItem>
					)
				})}

			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	);
};
export default EventListScreen;
