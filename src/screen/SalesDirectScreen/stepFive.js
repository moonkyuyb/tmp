/* COMMON */
import React from "react";
import { Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';

/* UI COMPONENTS */
import * as Common from '../../styled/commonStyle';
import { FooterButtonDivB, FooterButtonDivW, FooterButtonDivY, StepFooter, ImageUploadBox, ImageUploadBtn, ImageUploadCont, ImageUploadImg, ImageUploadText, UploadImg, UploadImgX, UploadImgXImg }from '../../styled/sales/salesDirectStyle';
import { StepInfoCont, InfoTitleBox, NoticeItem, NoticeList, ChkImg, NoticeTit, YellowBgText, InfoChkBox, InfoChkText } from '../../styled/sales/salesDirectTopInfoStyle';
import { StepCont, TitleBox, Title, SubTitle, InputBorder }from '../../styled/sales/salesDirectCommonStyle';
import Colors from "../../../assets/colors";

/* UTILS */
import { Controller } from "react-hook-form";

const StepFiveScreen = ({ control, handleSubmit, imgs, prevPage, nextPage, setImage, delImage }) => {

	//UI Components
	const ChkYIcon = () => (<Image style={{width:20, height:20}} source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_y.png')} />)
	const ChkBIcon = () => (<ChkImg source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')} />)

	//REACT HOOK FORM
	const onValid = (data) => {
		console.log(data)
		nextPage()
	}
	const onInvalid = (err) => { }

	//UI FUNCTION
	function handleImageUpload(field) {
		let options = {
			mediaType:'photo',
			includeBase64:true
		};
		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {
				setImage(response)
				const imgList = Object([],field.value)
				imgList.push(response)
				field.onChange(imgList)
			}
		})
	}

	function handleImageDelete(index){
		delImage(index)
	}

	return (<>
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex:1 }}>
		<ScrollView>
			<StepInfoCont>
				<InfoTitleBox>
					<Title>등록시 유의사항</Title>
				</InfoTitleBox>
				<NoticeItem>
					<NoticeList>
						<ChkBIcon />
						<NoticeTit>최소 3장 이상의 사진<YellowBgText>을 등록해주세요.</YellowBgText></NoticeTit>
					</NoticeList>
					<NoticeList>
						<ChkBIcon />
						<NoticeTit><YellowBgText>최대 20장까지 등록 가능하며, 한 장당 10MB </YellowBgText>를 초과할 수 없습니다.</NoticeTit>
					</NoticeList>
					<NoticeList>
						<ChkBIcon />
						<NoticeTit><YellowBgText>첫번째 사진이 대표 이미지</YellowBgText>로 보여지며, 순서를 변경할 수 있습니다.</NoticeTit>
					</NoticeList>
					<NoticeList>
						<ChkBIcon />
						<NoticeTit><YellowBgText>매물과 관련 없는 이미지, 홍보성 이미지, 워터마크 이미지</YellowBgText>는 등록하실 수 없습니다.</NoticeTit>
					</NoticeList>
					<NoticeList>
						<ChkBIcon />
						<NoticeTit><YellowBgText>YouTube 링크를 통해 동영상</YellowBgText>을 등록 할 수 있습니다.</NoticeTit>
					</NoticeList>
				</NoticeItem>
			</StepInfoCont>
			<StepCont>
				<TitleBox><Title>사진,동영상 등록</Title></TitleBox>
				<Controller
					control={control} name="imgs"
					render={({field})=>(<>
						<ImageUploadCont>
							<ImageUploadBtn onPress={()=>{handleImageUpload(field)}} >
							<ImageUploadImg source={require('../../../assets/img/drawable-xhdpi/icon-regist-image.png')} />
								<ImageUploadText>이미지 등록</ImageUploadText>
							</ImageUploadBtn>
							{imgs.map((el, index) =>(
								<ImageUploadBox key={el.uri}>
									<UploadImg resizemode={'cover'} source={ {uri:el.uri} } />
									<UploadImgX>
									<TouchableOpacity onPress={()=>{handleImageDelete(index)}}>
										<UploadImgXImg source={require('../../../assets/img/drawable-xhdpi/bt-search-cencel-w.png')}  />
									</TouchableOpacity>
									</UploadImgX>
								</ImageUploadBox>
							))}
						</ImageUploadCont>
					</>)}
				/>
				<Controller
					control={control} name="ytURL"
					render={({field})=>(<>
						<SubTitle>YouTube URL</SubTitle>
						<InputBorder placeholder={'URL 입력'}/>
						<InfoChkBox>
							<ChkYIcon />
							<InfoChkText>YouTube 동영상 링크가 아니거나 매물과 관련 없는 동영상일 경우 영상이 제외되고 매물이 등록됩니다.</InfoChkText>
						</InfoChkBox>
					</>)}
				/>
			</StepCont>
		</ScrollView>
		</KeyboardAvoidingView>
		<StepFooter>
			<FooterButtonDivW buttonColor="" onPress={()=>{ showAlertMessage('준비중입니다.') }} ><Common.TextBold>임시 저장</Common.TextBold></FooterButtonDivW>
			<FooterButtonDivY onPress={()=>{ prevPage() } }>
				<Common.TextBold>이전 단계</Common.TextBold>
			</FooterButtonDivY>
			<FooterButtonDivB onPress={handleSubmit(onValid,onInvalid)} >
				<Common.TextBold style={{color:Colors.whiteColor}}>등록완료</Common.TextBold>
			</FooterButtonDivB>
		</StepFooter>
	</>)
}

export default StepFiveScreen
