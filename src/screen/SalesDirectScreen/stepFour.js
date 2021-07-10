/* COMMON */
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from "react-native-picker-select";

/* UI COMPONENTS */
import * as Common from '../../styled/commonStyle';
import { StepContBorder, TitleBox, Title, RadioBox, RadioLable, SubTitle, TextRequiredS, RequiredS, InputBorder, ItemTextR, ItemRowList, FlexRowBox, ItemList2Box, Item2RowBox, SelectHalfBox} from '../../styled/sales/salesDirectCommonStyle';
import { DatePickerIcons, FloorText, RoomBorderView, RoomItemList2Box, RoomTextArea, RowSubTitle, TextAreaInfo, OptionItem4Box, OptionList4, OptionTit, StepFooter, FooterButtonDivW, FooterButtonDivY, FooterButtonDivB} from '../../styled/sales/salesDirectStyle';
import ArrowIcon from "../../components/common/ArrowIcon";
import Colors from "../../../assets/colors";
import Modal from 'react-native-modal';

/* UTILS */
import { Controller } from "react-hook-form";
import _ from "lodash";

const StepFourScreen = ({
	control, handleSubmit, setValue, optHeat, optLife, optSecure, optEtc,
	nextPage, getOptionHeatList, getOptionLifeList, getOptionSecureList, getOptionEtcList, showAlertMessage
}) => {

	//UI STATE
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [pickedDate, setPickedDate] = useState(new Date())
	const [targetValue, setTargetValue] = useState('builtDate') //builtDate
	const [trigger, setTrigger] = useState(true)

	//UI Components
	const TextRequired = () => (<TextRequiredS><Required/> 필수입력</TextRequiredS>)
	const Required = () => (<RequiredS>*</RequiredS>)
	const RadioBtn = () => (<Image style={{width:24, height:24}} source={require('../../../assets/img/drawable-xhdpi/bt_radio_off.png')} />)
	const RadioBtnActive = () => (<Image style={{width:24, height:24}} source={require('../../../assets/img/drawable-xhdpi/bt_radio_on.png')} />)

	//REACT HOOK FORM
	const onValid = (data) => {
		console.log(data)
		nextPage()
	}
	const onInvalid = (err) => {
			 if(err.roomCnt)		{ showAlertMessage(err.roomCnt.message) }
		else if(err.bathCnt)		{ showAlertMessage(err.bathCnt.message) }
		else if(err.totalAreaM)		{ showAlertMessage(err.totalAreaM.message) }
		else if(err.totalAreaP)		{ showAlertMessage(err.totalAreaP.message) }
		else if(err.netAreaM)		{ showAlertMessage(err.netAreaM.message) }
		else if(err.netAreaP)		{ showAlertMessage(err.netAreaP.message) }
		else if(err.floorTotalCnt) 	{ showAlertMessage(err.floorTotalCnt.message) }
		else if(err.totalParkingCnt){ showAlertMessage(err.totalParkingCnt.message) }
		else if(err.builtDate)		{ showAlertMessage(err.builtDate.message) }
		else if(err.extraDetail) 	{ showAlertMessage(err.extraDetail.message) }
		else						{ showAlertMessage(err.toString()) }
	}

	//USE EFFECT
	useEffect(()=>{
		if(trigger){
			getOptionHeatList()
			getOptionLifeList()
			getOptionSecureList()
			getOptionEtcList()
			setTrigger(false)
		}
	},[])

	return(<>
		<Modal isVisible={showDatePicker}>
			<View style={ {backgroundColor:'#ffffff'} }>
				<RNDateTimePicker
					value={pickedDate}
					mode={"date"} is24Hour={true} display="default" testID="dateTimePicker"
					onChange={(event, selectedDate) => {
						setShowDatePicker(false)
						const resultString = selectedDate.getFullYear().toString()+"-"+(selectedDate.getMonth()+1)+"-"+selectedDate.getDate()
						setValue(targetValue, resultString)
					}}
				/>
			</View>
		</Modal>

		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex:1 }}>
		<ScrollView>
			<StepContBorder>
				<TitleBox><Title>매물 정보</Title><TextRequired /></TitleBox>
				<ItemList2Box>
					<Controller
						control={control} name="roomCnt" defaultValue='2'
						rules={{required:{value:true,message:"방 개수를 입력해주세요."}}}
						render={({field})=>(<>
						<Item2RowBox>
							<SubTitle>방 개수 <Required/></SubTitle>
							<InputBorder placeholder={'방 개수 입력'} keyboardType='numeric' value={field.value} onChangeText={field.onChange}/>
						</Item2RowBox>
						</>)}
					/>
					<Controller
						control={control} name="bathCnt" defaultValue='2'
						rules={{required:{value:true,message:"욕실 개수를 입력해주세요."}}}
						render={({field})=>(
						<Item2RowBox>
							<SubTitle>욕실 개수 <Required/></SubTitle>
							<InputBorder placeholder={'욕실 개수 입력'} keyboardType='numeric' value={field.value} onChangeText={field.onChange}/>
						</Item2RowBox>
						)}
					/>
				</ItemList2Box>
				<SubTitle>공급면적 <Required/></SubTitle>
				<ItemList2Box>
					<Controller
						control={control} name="totalAreaM" defaultValue='12.4'
						rules={{required:{value:true,message:'공급면적을 입력해주세요.'}}}
						render={({field})=>(
						<Item2RowBox>
							<InputBorder placeholder={'면적 입력'} keyboardType = 'numeric' value={field.value} onChangeText={(value)=>{
								setValue('totalAreaP', MtoP(value))
								field.onChange(value);
							}}/>
							<ItemTextR>m²</ItemTextR>
						</Item2RowBox>
						)}
					/>
					<Controller
						control={control} name="totalAreaP"
						rules={{required:{value:true,message:'공급면적을 입력해주세요.'}}}
						render={({field})=>(
						<Item2RowBox>
							<InputBorder placeholder={'면적 입력'} keyboardType = 'numeric' value={field.value} onChangeText={(value)=>{
								setValue('totalAreaM', PtoM(value))
								field.onChange(value);
							}}/>
							<ItemTextR>평</ItemTextR>
						</Item2RowBox>
						)}
					/>
				</ItemList2Box>
				<SubTitle>전용면적 <Required/></SubTitle>
				<ItemList2Box>
					<Controller
						control={control} name="netAreaM" defaultValue='12.4'
						rules={{required:{value:true,message:'전용면적을 입력해주세요.'}}}
						render={({field})=>(
						<Item2RowBox>
							<InputBorder placeholder={'면적 입력'} keyboardType = 'numeric' value={field.value} onChangeText={(value)=>{
								setValue('netAreaP', MtoP(value))
								field.onChange(value);
							}}/>
							<ItemTextR>m²</ItemTextR>
						</Item2RowBox>
						)}
					/>
					<Controller
						control={control} name="netAreaP"
						rules={{required:{value:true,message:'전용면적을 입력해주세요.'}}}
						render={({field})=>(
						<Item2RowBox>
							<InputBorder placeholder={'면적 입력'} keyboardType = 'numeric' value={field.value} onChangeText={(value)=>{
								setValue('netAreaM', PtoM(value))
								field.onChange(value);
							}}/>
							<ItemTextR>평</ItemTextR>
						</Item2RowBox>
						)}
					/>
				</ItemList2Box>
				<Controller
					control={control} name="floorTotalCnt" defaultValue='3'
					render={({field})=>(<>
					<SubTitle>전체 층 <Required/></SubTitle>
					<ItemRowList>
						<InputBorder placeholder={'전체 층 입력'} keyboardType = 'numeric' value={field.value} onChangeText={field.onChange}/>
						<ItemTextR>층</ItemTextR>
					</ItemRowList>
					</>)}
				/>
				<Controller
					control={control} name="floorExpsYN"
					render={({field})=>(<>
						<RoomItemList2Box>
							<SubTitle>층 노출</SubTitle>
							<FlexRowBox>
								<RadioBox onPress={()=>{ field.onChange(true) }} >
									{field.value==true? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"예"}</RadioLable>
								</RadioBox>
								<RadioBox onPress={()=>{ field.onChange(false) }} >
									{field.value==false? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"아니오"}</RadioLable>
								</RadioBox>
								<FloorText>(고 층/중 층/고 층 노출)</FloorText>
							</FlexRowBox>
						</RoomItemList2Box>
					</>)}
				/>
				<Controller
					control={control} name="roomType"
					render={({field})=>(<>
					<RoomItemList2Box>
						<SubTitle>방, 거실 형태</SubTitle>
						<FlexRowBox >
							<RadioBox onPress={()=>{ field.onChange("1"); }} >
								{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"오픈형"}</RadioLable>
							</RadioBox>
							<RadioBox onPress={()=>{ field.onChange("2"); }} >
								{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"분리형"}</RadioLable>
							</RadioBox>
						</FlexRowBox>
					</RoomItemList2Box>
					</>)}
				/>
				<Controller
					control={control} name="mainRoomType"
					render={({field})=>(<>
					<RoomItemList2Box>
						<SubTitle>주실 방향 기준</SubTitle>
						<FlexRowBox >
							<RadioBox onPress={()=>{ field.onChange("1"); }} >
								{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"안방"}</RadioLable>
							</RadioBox>
							<RadioBox onPress={()=>{ field.onChange("2"); }} >
								{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"거실"}</RadioLable>
							</RadioBox>
						</FlexRowBox>
					</RoomItemList2Box>
					</>)}
				/>
				<Controller
					control={control} name="mainRoomType"
					render={({field})=>(<>
					<RoomItemList2Box>
						<RowSubTitle>주실 방향</RowSubTitle>
						<SelectHalfBox>
							<ArrowIcon />
							<RNPickerSelect
								value={field.value}
								useNativeAndroidPickerStyle={false}
								fixAndroidTouchableBug={false}
								onValueChange={(value) => { field.onChange(value) } }
								placeholder={{label: '방향'}}
								style={pickerStyle}
								items={[
									{label:'동', value:'1'},
									{label:'서', value:'2'},
									{label:'남', value:'3'},
									{label:'북', value:'4'},
									{label:'남동', value:'5'},
									{label:'남서', value:'6'},
									{label:'북서', value:'7'},
									{label:'북동', value:'8'},
								]}
							/>
						</SelectHalfBox>
					</RoomItemList2Box>
					</>)}
				/>
				<Controller
					control={control} name="aisleType"
					render={({field})=>(<>
					<RoomItemList2Box>
						<SubTitle>현관 유형</SubTitle>
						<FlexRowBox>
							<RadioBox onPress={()=>{ field.onChange("1"); }} >
								{field.value=="1"? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"계단식"}</RadioLable>
							</RadioBox>
							<RadioBox onPress={()=>{ field.onChange("2"); }} >
								{field.value=="2"? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"복도식"}</RadioLable>
							</RadioBox>
							<RadioBox onPress={()=>{ field.onChange("3"); }} >
								{field.value=="3"? <RadioBtnActive/> : <RadioBtn/>}<RadioLable>{"복합식"}</RadioLable>
							</RadioBox>
						</FlexRowBox>
					</RoomItemList2Box>
					</>)}
				/>
				<Controller
					control={control} name="totalHouseCnt"
					render={({field})=>(<>
					<RoomItemList2Box>
						<RowSubTitle>총 세대수</RowSubTitle>
						<RoomBorderView>
									<InputBorder placeholder={'세대수 입력'} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />
							<ItemTextR>개</ItemTextR>
						</RoomBorderView>
					</RoomItemList2Box>
					</>)}
				/>
				<Controller
					control={control} name="totalParkingCnt"
					rules={{required:{value:true,message:'주차대수를 입력해주세요'}}}
					render={({field})=>(<>
					<RoomItemList2Box>
						<RowSubTitle>총 주차대수 <Required /></RowSubTitle>
						<RoomBorderView>
									<InputBorder placeholder={'주차대수 입력'} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />
							<ItemTextR>개</ItemTextR>
						</RoomBorderView>
					</RoomItemList2Box>
					</>)}
				/>
				<Controller
					control={control} name="builtDate"
					rules={{required:{value:true, message:'준공일을 입력해주세요.'}}}
					render={({field})=>(<>
					<RoomItemList2Box>
						<RowSubTitle>준공일 선택 <Required /></RowSubTitle>
						<TouchableOpacity style={ {width:'100%',flexDirection:'row', alignContent:'center', justifyContent:'center'}} onPress={()=>{setShowDatePicker(true)}} >
							<RoomBorderView >
								<InputBorder placeholder={'준공일 선택'} editable={false} value={field.value} onChangeText={field.onChange} />
								<DatePickerIcons source={require('../../../assets/img/drawable-xhdpi/bt_calendar.png')}/>
							</RoomBorderView>
						</TouchableOpacity>
					</RoomItemList2Box>
					</>)}
				/>
				<TitleBox><Title>시설 및 옵션</Title></TitleBox>
				<Controller
					control={control} name="heatingOpt" defaultValue={[]}
					render={({field})=>(<>
					<SubTitle>난방방식 / 냉방시설</SubTitle>
					<OptionItem4Box>
						{optHeat.map((item) => (
							<OptionList4 key={item.value} active={(_.find(field.value,i=>i==item.value)) ? true : false}
								onPress={()=>{
									const newValueArr = Object.assign([],field.value)
									if(_.find(newValueArr,i=>i==item.value)){
										_.remove(newValueArr, i=>i==item.value)
									}else{
										newValueArr.push(item.value)
									}
									field.onChange(newValueArr)
								}}>
								<OptionTit>{item.label}</OptionTit>
							</OptionList4>
						))}
					</OptionItem4Box>
					</>)}
				/>
				<Controller
					control={control} name="livingOpt" defaultValue={[]}
					render={({field})=>(<>
					<SubTitle>생활시설</SubTitle>
					<OptionItem4Box>
						{optLife.map((item) => (
							<OptionList4 key={item.value} active={(_.find(field.value,i=>i==item.value)) ? true : false}
								onPress={()=>{
									const newValueArr = Object.assign([],field.value)
									if(_.find(newValueArr,i=>i==item.value)){
										_.remove(newValueArr, i=>i==item.value)
									}else{
										newValueArr.push(item.value)
									}
									field.onChange(newValueArr)
								}}>
								<OptionTit>{item.label}</OptionTit>
							</OptionList4>
						))}
					</OptionItem4Box>
					</>)}
				/>
				<Controller
					control={control} name="securityOpt" defaultValue={[]}
					render={({field})=>(<>
					<SubTitle>보안시설</SubTitle>
					<OptionItem4Box>
						{optSecure.map((item) => (
							<OptionList4 key={item.value} active={(_.find(field.value,i=>i==item.value)) ? true : false}
								onPress={()=>{
									const newValueArr = Object.assign([],field.value)
									if(_.find(newValueArr,i=>i==item.value)){
										_.remove(newValueArr, i=>i==item.value)
									}else{
										newValueArr.push(item.value)
									}
									field.onChange(newValueArr)
								}}>
								<OptionTit>{item.label}</OptionTit>
							</OptionList4>
						))}
					</OptionItem4Box>
					</>)}
				/>
				<Controller
					control={control} name="etcOpt" defaultValue={[]}
					render={({field})=>(<>
					<SubTitle>기타옵션</SubTitle>
					<OptionItem4Box>
						{optEtc.map((item) => (
							<OptionList4 key={item.value} active={(_.find(field.value,i=>i==item.value)) ? true : false}
								onPress={()=>{
									const newValueArr = Object.assign([],field.value)
									if(_.find(newValueArr,i=>i==item.value)){
										_.remove(newValueArr, i=>i==item.value)
									}else{
										newValueArr.push(item.value)
									}
									field.onChange(newValueArr)
								}}>
								<OptionTit>{item.label}</OptionTit>
							</OptionList4>
						))}
					</OptionItem4Box>
					</>)}
				/>
				<Controller
					control={control} name="extraDetail" defaultValue=""
					rules={{required:{value:true,message:'상세설명을 입력해주세요'}}}
					render={({field})=>(<>
						<SubTitle>상세설명 <Required/></SubTitle>
						<RoomTextArea
							alue={field.value}
							placeholder={"상세설명 입력"}
							multiline = {true}
							onChangeText={field.onChange}
						/>
					</>)}
				/>
				<TextAreaInfo>※ 매물에 대한 추가 설명을 자유롭게 작성해주세요.</TextAreaInfo>
			</StepContBorder>
		</ScrollView>
		</KeyboardAvoidingView>
		<StepFooter>
			<FooterButtonDivW buttonColor="" onPress={()=>{ showAlertMessage('준비중입니다.') }} ><Common.TextBold>임시 저장</Common.TextBold></FooterButtonDivW>
			<FooterButtonDivY onPress={()=>{ showAlertMessage('수정예정'); } }>
				<Common.TextBold>이전 단계</Common.TextBold>
			</FooterButtonDivY>
			<FooterButtonDivB onPress={handleSubmit(onValid,onInvalid)} >
				<Common.TextBold style={{color:Colors.whiteColor}}>다음 단계</Common.TextBold>
			</FooterButtonDivB>
		</StepFooter>
	</>)
}

const pickerStyle = {
	placeholderColor: '#000',
	inputIOS: { color: '#000', height: 34, fontSize: 12 },
	inputAndroid: { color: '#000', height: 34, fontSize: 12 },
}

export const MtoP = (value) => {
	return Math.ceil(value/3.306).toString()
}

export const PtoM = (value) => {
   return Math.ceil(value*3.306).toString()
}

export default StepFourScreen
