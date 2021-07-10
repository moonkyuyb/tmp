/* COMMON */
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, View, TouchableOpacity, Image, Text, FlatList, } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from "react-native-picker-select";
import { launchImageLibrary } from 'react-native-image-picker';
import Postcode from '@actbase/react-daum-postcode';
import _ from "lodash";
/* UTILS */
import { Controller } from "react-hook-form";

/* UI COMPONENTS */
import * as Common from "../../styled/commonStyle";
import Colors from "../../../assets/colors";
import { RequiredS, TextRequiredS, RadioBox, RadioTitleBox, RadioLable, StepCont, UnitTit, AlertWrap, AlertText } from "../../styled/sales/salesDirectCommonStyle";
import {
	GreyBox, AgreedChkBtn, OptionItemBox, ImageUploadBox, ImageUploadBtn, ImageUploadCont, ImageUploadImg,
	ImageUploadText, UploadImg, UploadImgX, UploadImgXImg, Options, InfoList, InfoNum, InfoText, InfoNumS, InfoTextS,
} from "../../styled/sales/salesDirectStyle";
import { NoticeItem, NoticeList, ChkImg, } from '../../styled/sales/salesDirectTopInfoStyle';

import { FromArrowIcon } from "../../components/common/ArrowIcon";
import { DateIcon } from "../../components/common/DateIcon";
import { Button } from "react-native-elements/dist/buttons/Button";
import Modal from "react-native-modal";

import { MtoP, PtoM } from "../../utils/common/calculator";
import { floor } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Geocoder from 'react-native-geocoding';
import { GOOGLE_PLACES_API_KEY } from "@env"
import { Header } from "react-native/Libraries/NewAppScreen";
import { ScrollView } from "react-native";

import { useForm } from "react-hook-form";

const StepTwoScreen = ({
	mode,
	s_id,
	saveStepTwo, addressSi, addressGu, addressDong, propInfo, basicInfo,
	resetAddressList, getAddressSi, getAddressGu, getAddressDong, uploadToServer, requestDanji,
	nextPage, showAlertMessage, prevPage, getCommonFeeList,
	commonFeeList, setImage, delImage, imgs, danjiList, danjiListpageNo, danjitotalCount, danjitotalnumOfRows, getValue, requestSiGuDongDanji,
	delImageOnServer, submitTmp
}) => {
	//console.log("modemodemodemodemodemode-------===================-------===================-------===================-------===================");
	//console.log(mode);
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	Geocoder.init(GOOGLE_PLACES_API_KEY); // use a valid API key
	const { control, handleSubmit, getValues, setValue, clearErrors } = useForm()

	//UI Components
	const TextRequired = () => (<TextRequiredS><Required /> 필수입력</TextRequiredS>)
	const Required = () => (<RequiredS>*</RequiredS>)
	const RadioBtn = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_radio_off.png')} />)
	const RadioBtnActive = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_radio_on.png')} />)
	const ChkBtn = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkActive = () => (<Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const ChkYIcon = () => (<Common.Image size={20} source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_y.png')} />)
	const ChkBIcon = () => (<ChkImg source={require('../../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')} />)

	//UI STATE
	const [bldgTypeName, setBldgTypeName] = useState('')
	const [bldgStyleName, setBldgStyleName] = useState('')
	const [contractType, setContractType] = useState('')
	const [tmpAddrYN, setTmpAddrYN] = useState(false);
	const [isBoon, setBoon] = useState(false);


	const [showDatePicker, setShowDatePicker] = useState(false)
	const [pickedDate, setPickedDate] = useState(new Date())
	const [targetValue, setTargetValue] = useState('s_contract_start') //contractStart, contractEnd
	const [commonFeeYN, setCommonFeeYN] = useState(false)
	const [trigger, setTrigger] = useState(true)
	const [floorCnt, setFloorCnt] = useState(0);

	const [adminCostYN, setAdminCostYN] = useState(0);

	const [mID, setMID] = useState("");

	useEffect(() => {
		console.log("use effect");
		getCommonFeeList();
		AsyncStorage.getItem('mID')
			.then((result) => {
				setMID(result);
				setValue('m_id', Number(result))
			})
			.catch((err) => {

			})
	}, [])

	useEffect(() => {

		setValue("s_seller_type", basicInfo[0].s_seller_type);
		setValue("s_temp_name", basicInfo[0].s_temp_name);
		setValue("s_temp_phone", basicInfo[0].s_temp_phone);
	}, [basicInfo])

	useEffect(() => {

		setValue('s_building_type', propInfo.s_building_type);
		setValue('s_building_name', propInfo.s_building_name);
		setValue('s_sale_type', propInfo.s_sale_type);
		setValue('s_sale_name', propInfo.s_sale_name);
		setValue('s_location1', propInfo.s_location1);
		setValue('s_location2', propInfo.s_location2);
		setValue('s_location3', propInfo.s_location3);
		setValue('s_addr_type', Number(propInfo.s_addr_type));

		setValue('s_tmp_address_yn', Number(propInfo.s_tmp_address_yn));
		console.log("propInfo.s_tmp_address_ynpropInfo.s_tmp_address_ynpropInfo.s_tmp_address_ynpropInfo.s_tmp_address_ynpropInfo.s_tmp_address_ynpropInfo.s_tmp_address_yn")
		console.log(getValues('s_tmp_address_yn'));

		setValue('s_unregister', Number(propInfo.s_unregister));
		setValue('s_building_check', Number(propInfo.s_building_check));
		setValue('s_no_division_register', Number(propInfo.s_no_division_register));
		setValue('s_agreement_yn', Number(propInfo.s_agreement_yn));
		setValue('s_address_zibun1', propInfo.s_address_zibun1);
		setValue('s_address_zibun2', propInfo.s_address_zibun2);
		setValue('s_address_street1', propInfo.s_address_street1);
		setValue('s_address_street2', propInfo.s_address_street2);
		setValue('s_address_apt_dong', propInfo.s_address_apt_dong);
		setValue('s_address_apt_ho', propInfo.s_address_apt_ho);
		setValue('s_bld_name', propInfo.s_bld_name);
		setValue('s_apt_name', propInfo.s_apt_name);
		setValue('s_apt_code', propInfo.s_apt_code);
		setValue('s_contract_type', propInfo.s_contract_type);
		setValue('s_deposit', Number(propInfo.s_deposit));
		setValue('s_monthly_rent', Number(propInfo.s_monthly_rent));

		setValue('s_trading_price', Number(propInfo.s_trading_price));
		setValue('s_bunyang_yn', Number(propInfo.s_bunyang_yn));
		setValue('s_bunyang_type', propInfo.s_bunyang_type);
		setValue('s_bunyang_amt', Number(propInfo.s_bunyang_amt));
		setValue('s_bunyang_premmium', Number(propInfo.s_bunyang_premmium));
		setValue('s_bunyang_real_amt', Number(propInfo.s_bunyang_real_amt));

		setValue('s_admin_cost_yn', Number(propInfo.s_admin_cost_yn));
		setValue('s_admin_cost_amt', Number(propInfo.s_admin_cost_amt));

		//if (mode=="modi") {
		setValue('s_rooms_cnt', Number(propInfo.s_rooms_cnt));
		setValue('s_bathrooms_cnt', Number(propInfo.s_bathrooms_cnt));
		setValue('s_contract_start', propInfo.s_contract_start);
		setValue('s_contract_end', propInfo.s_contract_end);
		setValue('s_maintenance_cost', Number(propInfo.s_maintenance_cost));
		setValue('s_maintenance_list', propInfo.s_maintenance_list);
		setValue('s_floor', Number(propInfo.s_floor));
		setValue('s_floor_type', propInfo.s_floor_type);
		setValue('s_total_floor', Number(propInfo.s_total_floor));
		setValue('s_supply_area_m', Number(propInfo.s_supply_area_m));
		setValue('s_supply_area_p', Number(propInfo.s_supply_area_p));
		setValue('s_use_area_m', Number(propInfo.s_use_area_m));
		setValue('s_use_area_p', Number(propInfo.s_use_area_p));
		setValue('s_total_parking_cnt', Number(propInfo.s_total_parking_cnt));
		setValue('s_yt_url', propInfo.s_yt_url);
		setValue('s_lat', propInfo.s_lat);
		setValue('s_lng', propInfo.s_lng);

		//}
	}, [propInfo])
	useEffect(() => {
		setValue("s_id", s_id);
	}, [s_id])

	//REACT HOOK FORM
	const onValid = (data) => {

		data.imgs = imgs;

		if (mode == "modi") {
			saveStepTwo(data);
			nextPage();
		} else {
			if (imgs.length <= 0) {
				showAlertMessage("이미지를 선택 해 주세요.");
			} else {
				uploadToServer(data, mID);
			}
		}
	}

	//임시 저장
	const tmpSave = () => {
		var data = getValues();
		delete data['s_bld_name'];
		delete data['s_sale_name'];
		data['s_istmp'] = 1;
		console.log(data);
		submitTmp(data, mID);

	}

	const [supplyAreaM, setSupplyAreaM] = useState();
	const [supplyAreaP, setSupplyAreaP] = useState();

	const [netAreaM, setNetAreaM] = useState();
	const [netAreaP, setNetAreaP] = useState();



	const onInvalid = (err) => {

		if (err.s_building_type) { showAlertMessage(err.s_building_type.message) }
		else if (err.s_sale_type) { showAlertMessage(err.s_sale_type.message) }
		else if (err.s_location1) { showAlertMessage(err.s_location1.message) }
		else if (err.s_location2) { showAlertMessage(err.s_location2.message) }
		else if (err.s_location3) { showAlertMessage(err.s_location3.message) }

		else if (err.s_addr_type) { showAlertMessage(err.s_addr_type.message) }
		else if (err.s_address_zibun1) { showAlertMessage(err.s_address_zibun1.message) }
		else if (err.s_address_apt_dong) { showAlertMessage(err.s_address_apt_dong.message) }
		else if (err.s_address_apt_ho) { showAlertMessage(err.s_address_apt_ho.message) }
		else if (err.s_building_name) { showAlertMessage(err.s_building_name.message) }

		//계약 형태
		else if (err.s_contract_type) { showAlertMessage(err.s_contract_type.message) }

		else if (err.s_trading_price) { showAlertMessage(err.s_trading_price.message) }
		else if (err.s_deposit) { showAlertMessage(err.s_deposit.message) }
		else if (err.s_monthly_rent) { showAlertMessage(err.s_monthly_rent.message) }

		else if (err.s_contract_start) { showAlertMessage(err.s_contract_start.message) }
		else if (err.s_contract_end) { showAlertMessage(err.s_contract_end.message) }

		//분양권
		else if (err.s_bunyang_yn) { showAlertMessage(err.s_bunyang_yn.message) }
		else if (err.s_bunyang_type) { showAlertMessage(err.s_bunyang_type.message) }
		else if (err.s_bunyang_amt) { showAlertMessage(err.s_bunyang_amt.message) }
		else if (err.s_bunyang_premmium_amt) { showAlertMessage(err.s_bunyang_premmium_amt.message) }
		else if (err.s_bunyang_real_amt) { showAlertMessage(err.s_bunyang_real_amt.message) }

		// 기타
		else if (err.s_rooms_cnt) { showAlertMessage(err.s_rooms_cnt.message) }
		else if (err.s_bathrooms_cnt) { showAlertMessage(err.s_bathrooms_cnt.message) }
		else if (err.s_admin_cost_yn) { showAlertMessage(err.s_admin_cost_yn.message) }
		else if (err.commonFeeList) { showAlertMessage(err.commonFeeList.message) }
		else if (err.s_floor) { showAlertMessage(err.s_floor.message) }
		else if (err.s_floor_type) { showAlertMessage(err.s_floor_type.message) }
		else if (err.s_total_floor) { showAlertMessage(err.s_total_floor.message) }
		else if (err.s_supply_area_m) { showAlertMessage(err.s_supply_area_m.message) }

		else if (err.s_supply_area_p) { showAlertMessage(err.s_supply_area_p.message) }
		else if (err.s_use_area_m) { showAlertMessage(err.s_use_area_m.message) }
		else if (err.s_use_area_p) { showAlertMessage(err.s_use_area_p.message) }

		else if (err.s_total_parking_cnt) { showAlertMessage(err.s_total_parking_cnt.message) }

		else if (err.s_agreement_yn) { showAlertMessage(err.s_agreement_yn.message) }
		else { console.log(err); clearErrors('contractType') }




	}

	//USE EFFECT
	useEffect(() => {
		if (trigger) {
			getAddressSi()
			setTrigger(false)
		}
	}, [])

	//UI FUNCTION
	const [selectedImage, setSelectedImage] = useState([]);

	function handleImageUpload(field) {
		let options = {
			mediaType: 'photo',
			includeBase64: true
		};
		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {

				setImage(response)
				const imgList = Object([], field.value)
				imgList.push(response)
				field.onChange(imgList)

			}
		})
	}

	function handleImageDelete(field, index, sf_id) {
		delImage(index);
		if (sf_id != undefined) {
			delImageOnServer({ sf_id: sf_id });
		}
		const imgList = Object([], field.value)
		imgList.splice(index, 1);
		field.onChange(imgList);
	}

	function initAddress() {
		setValue("detailAddr1", "");
		setValue("detailAddr2", "");
		setValue("detailAddr3", "");
		setValue("detailAddr4", "");
		setValue("latitude", 0);
		setValue("longitude", 0);
	}


	const [isAddressModal, setAddressModal] = useState(false);

	const AddressView = () => {
		return (
			<>
				<Modal isVisible={isAddressModal} >
					<TouchableOpacity onPress={() => { setAddressModal(); }} >
						<Text style={{ fontSize: 25, color: '#ffffff', alignSelf: 'flex-end' }} >X</Text>
					</TouchableOpacity>
					<Postcode
						style={{ width: '100%', height: '80%' }}
						jsOptions={{ animated: true, hideMapBtn: true }}
						onSelected={data => {
							setValue("detailAddr1", data.address);
							setValue("s_address_zibun1", data.jibunAddress);
							setValue("s_address_street1", data.address);
							requestDanji(data.sigunguCode + data.roadnameCode);
							Geocoder.from(data.address)
								.then(json => {
									var location = json.results[0].geometry.location;
									setValue("s_lat", location.lat);
									setValue("s_lng", location.lng);
								})
								.catch(error => console.warn(error));
							setAddressModal(false);
						}}
					/>
				</Modal>
				<Button onClick={() => setModal(true)}>주소찾기</Button>
			</>
		);
	}
	const [isDanJiList, setDanJiList] = useState(false);
	const DanjiListItem = ({ item }) => {
		return (
			<View>
				<RadioBox onPress={() => { setValue("s_apt_name", item.kaptName); setValue("s_apt_code", item.kaptCode); setValue("s_building_name", item.kaptName); }} >
					{field.value == item.kaptCode ? <RadioBtnActive value={item.kaptCode} onPress={(value) => { setValue("s_building_name", value); }} /> : <RadioBtn value={item.kaptCode} onPress={(value) => { setValue("s_building_name", value); }} />}<RadioLable>{item.kaptName}</RadioLable>
				</RadioBox>
			</View>

		)
	}
	const DanJiListPop = (props) => {
		return (
			<Modal isVisible={props.isVisible}   >

				<TouchableOpacity onPress={() => { setDanJiList(false); }} >
					<Text style={{ fontSize: 25, color: '#ffffff', alignSelf: 'flex-end' }} >X</Text>
				</TouchableOpacity>
				<View style={{ backgroundColor: '#ffffff', width: '100%', height: '90%', overflow: 'scroll' }} >
					<ScrollView
						scrollEnabled={true}
					>
						<Controller
							control={control} name="s_apt_code"
							render={({ field }) => (

								danjiList.map((el) => {
									return (
										<View>
											<RadioBox onPress={() => { setValue("s_apt_name", el.kaptName); setValue("s_apt_code", el.kaptCode); setValue("s_building_name", el.kaptName); }} >
												{field.value == el.kaptCode ? <RadioBtnActive value={el.kaptCode} onPress={(value) => { setValue("s_building_name", value); }} /> : <RadioBtn value={el.kaptCode} onPress={(value) => { setValue("s_building_name", value); }} />}<RadioLable>{el.kaptName}</RadioLable>
											</RadioBox>
										</View>
									)
								})
							)}
						/>
					</ScrollView>
				</View>
			</Modal>
		)

	}

	useEffect(() => {

		if (danjitotalCount > 0) {
			setDanJiList(true);
		}
	}, [danjiList])

	const [saleType, setSaleType] = useState("");

	const [si, setSi] = useState(0);
	const [gu, setGu] = useState(0);
	const [dong, setDong] = useState(0);

	useState(() => {
		setValue("s_bld_name", "");
	}, [saleType])

	/*
	useState(()=>{

	},[tmpAddrYN]);
	*/

	return (
		<>
				<AddressView />

			<Common.ScrollContainer paddingN  >
				<Modal isVisible={showDatePicker}>
					<View style={{ backgroundColor: '#ffffff' }}>
						<RNDateTimePicker
							value={pickedDate}
							mode={"date"} is24Hour={true} display="default" testID="dateTimePicker"
							onChange={(event, selectedDate) => {
								setShowDatePicker(false);
								const resultString = selectedDate.getFullYear().toString() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate()
								setValue(targetValue, resultString)
							}}
						/>
					</View>
				</Modal>

				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
				
					<StepCont paddingTN borderB>

						<Controller
							control={control} name="s_building_type" defaultValue={getValues('s_building_type')}
							rules={{ required: { value: true, message: '건물 유형을 선택하세요.' } }}
							render={({ field }) => (<>
								{/*
									<TitleBox><Title>매물 정보</Title><TextRequired /></TitleBox>
									<RadioTitleBox>
								
										<SubTitle>건물 유형 <Required /></SubTitle>
										<FlexRowBox>
											<RadioBox onPress={() => { setBldgTypeName("단독주택"); field.onChange("BdType_1"); setValue('s_bld_name','단독주택'); }}>
												{field.value == 'BdType_1' ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"단독주택"}</RadioLable>
											</RadioBox>
											<RadioBox onPress={() => { setBldgTypeName("공동주택"); field.onChange("BdType_2"); setValue('s_bld_name','공동주택'); }}>
												{field.value == 'BdType_2' ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"공동주택"}</RadioLable>
											</RadioBox>
										</FlexRowBox>
								
									</RadioTitleBox>
									<BtnBorder onPress={() => navigation.navigate('buildingType', { onChange: field.onChange, setValue:setValue, setBldgTypeName: setBldgTypeName, bldgType: field.value })}>
										<ItemText>{getValues('s_bld_name') ? getValues('s_bld_name') : '건물 유형 선택'}</ItemText><FromArrowIcon />
									</BtnBorder>
									*/}

								<Common.TitleBox><Common.Title>매물 정보</Common.Title><TextRequired /></Common.TitleBox>
								<Common.FlexBetweenBox marginT={18}>
									<Common.SubTitle marginTN>건물 유형 <Required /></Common.SubTitle>
									<RadioTitleBox>
										<RadioBox onPress={() => { setBldgTypeName("단독주택"); field.onChange("BdType_1"); setValue('s_bld_name', '단독주택'); }}>
											{field.value == 'BdType_1' ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"단독주택"}</Common.ViewBorderText>
										</RadioBox>
										<RadioBox onPress={() => { setBldgTypeName("공동주택"); field.onChange("BdType_2"); setValue('s_bld_name', '공동주택'); }}>
											{field.value == 'BdType_2' ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"공동주택"}</Common.ViewBorderText>
										</RadioBox>
									</RadioTitleBox>
								</Common.FlexBetweenBox>
								<Common.ViewBorderBtn marginBN onPress={() => navigation.navigate('buildingType', { onChange: field.onChange, setValue: setValue, setBldgTypeName: setBldgTypeName, bldgType: field.value })}>
									<Common.ViewBorderText>{bldgTypeName ? bldgTypeName : '건물 유형 선택'}</Common.ViewBorderText><FromArrowIcon />
								</Common.ViewBorderBtn>

							</>)}
						/>

						<Controller
							control={control} name="s_sale_type" defaultValue={getValues('s_sale_type')}
							rules={{ required: { value: true, message: '건물 형태를 선택하세요.' } }}
							render={({ field }) => (<>
								{/*<SubTitle>건물 형태 <Required /></SubTitle>
									<BtnBorder onPress={() => navigation.navigate('saleType', { onChange: field.onChange, setValue:setValue, setBldgStyleName: setBldgStyleName, bldgStyle: field.value, setSaleType:setSaleType})}>
										<ItemText>{getValues('s_sale_name') ? getValues('s_sale_name') : '건물 형태 선택'}</ItemText><FromArrowIcon />
									</BtnBorder>*/}
								<Common.SubTitle>건물 형태 <Required /></Common.SubTitle>
								<Common.ViewBorderBtn marginBN onPress={() => navigation.navigate('saleType', { onChange: field.onChange, setValue: setValue, setBldgStyleName: setBldgStyleName, bldgStyle: field.value, setSaleType: setSaleType })}>
									<Common.ViewBorderText>{getValues('s_sale_name') ? getValues('s_sale_name') : '건물 형태 선택'}</Common.ViewBorderText><FromArrowIcon />
								</Common.ViewBorderBtn>
							</>)}
						/>

						<Controller
							control={control} name="s_addr_type"
							value={getValues("s_addr_type")}
							rules={{ required: { value: 0, message: '주소 구분을 선택하세요.' } }}
							render={({ field }) => (<>
								{/*<RadioTitleBox>
										<SubTitle>주소 구분<Required /></SubTitle>
										<FlexRowBox>
											<RadioBox onPress={() => {  field.onChange(0) }}>
												{field.value == 0 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"일반"}</RadioLable>
											</RadioBox>
											<RadioBox onPress={() => { field.onChange(1) }}>
												{field.value == 1 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"산"}</RadioLable>
											</RadioBox>
										</FlexRowBox>
									</RadioTitleBox>
									*/}
								<Common.FlexBetweenBox marginT={18}>
									<Common.SubTitle marginTN>주소 구분<Required /></Common.SubTitle>
									<RadioTitleBox>
										<RadioBox onPress={() => { field.onChange(0) }}>
											{field.value == 0 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"일반"}</Common.ViewBorderText>
										</RadioBox>
										<RadioBox onPress={() => { field.onChange(1) }}>
											{field.value == 1 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"산"}</Common.ViewBorderText>
										</RadioBox>
									</RadioTitleBox>
								</Common.FlexBetweenBox>
							</>)}
						/>
						<Controller
							control={control} name="s_tmp_address_yn"
							defaultValue={getValues('s_tmp_address_yn')}
							value={getValues('s_tmp_address_yn')}
							render={({ field }) => (<>
								{/*
									<RadioTitleBox>
										<SubTitle>가(임시) 주소 </SubTitle>
										<RadioBox onPress={() => {
											setTmpAddrYN(!tmpAddrYN);
											
											if (field.value) { setValue('s_tmp_address_yn',field.value==0 ? 1:0); setValue('s_unregister', 0); setValue('s_building_check', 0); setValue('s_no_division_register', 0); setValue("s_building_name","") }
											field.onChange(!field.value);
											initAddress();
										}}>
											{getValues('s_tmp_address_yn')==1 ? <ChkActive /> : <ChkBtn />}<RadioLable>{"적용"}</RadioLable>
										</RadioBox>
									</RadioTitleBox>
									*/}
								<RadioTitleBox>
									<Common.SubTitle>가(임시) 주소 </Common.SubTitle>
									<RadioBox onPress={() => {
										setTmpAddrYN(!tmpAddrYN);

										if (field.value) { setValue('s_tmp_address_yn', field.value == 0 ? 1 : 0); setValue('s_unregister', 0); setValue('s_building_check', 0); setValue('s_no_division_register', 0); setValue("s_building_name", "") }
										field.onChange(!field.value);
										initAddress();
									}}>
										{getValues('s_tmp_address_yn') == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>{"적용"}</Common.ViewBorderText>
									</RadioBox>
								</RadioTitleBox>
							</>)}
						/>
						<GreyBox>
							<Controller
								control={control} name="s_unregister" render={({ field }) => (
									/*
								<GreyChkBtn onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
									{field.value == 1 ? <ChkActive /> : <ChkBtn />}<GreyBoxTit>미등기</GreyBoxTit>
									</GreyChkBtn>*/

									<RadioBox marginLN onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
										{field.value == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>미등기</Common.ViewBorderText>
									</RadioBox>

								)}
							/>
							{/*
								<Controller
									control={control} name="s_building_check" render={({ field }) => (
										<GreyChkBtn onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
											{field.value == 1 ? <ChkActive /> : <ChkBtn />}<GreyBoxTit>구분등기 있음</GreyBoxTit>
										</GreyChkBtn>
									)}
								/>
								<Controller
									control={control} name="s_no_division_register" render={({ field }) => (
										<GreyChkBtn onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
											{field.value == 1 ? <ChkActive /> : <ChkBtn />}<GreyBoxTit>건축물대장 면적 확인 요청</GreyBoxTit>
										</GreyChkBtn>
									)}
								/>
									*/}
							<Controller
								control={control} name="s_building_check" render={({ field }) => (
									<RadioBox marginLN onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
										{field.value == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>구분등기 있음</Common.ViewBorderText>
									</RadioBox>
								)}
							/>
							<Controller
								control={control} name="s_no_division_register" render={({ field }) => (
									<RadioBox marginLN onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
										{field.value == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>건축물대장 면적 확인 요청</Common.ViewBorderText>
									</RadioBox>
								)}
							/>
						</GreyBox>
						{/*
							<Controller
								control={control} name="s_location1" defaultValue={getValues("s_location1")}
								rules={{ required: { value: true, message: '소재지를 선택하세요.' } }}
								render={({ field }) => (<>
									<SubTitle>소재지 <Required /></SubTitle>
									<ViewBorder>
										<FromArrowIcon />
										<RNPickerSelect
											value={field.value}
											onValueChange={(value) => {
												if (value) {
													field.onChange(value)
													getAddressGu(value)
													setSi(value);
												}
											}}
											placeholder={{ label: '시/도 선택' }}
											useNativeAndroidPickerStyle={false}
											fixAndroidTouchableBug={false}
											items={addressSi}
											style={pickerStyle}
										/>
									</ViewBorder>
								</>)}
							/>
										*/}
						<Controller
							control={control} name="s_location1" defaultValue={getValues("s_location1")}
							rules={{ required: { value: true, message: '소재지를 선택하세요.' } }}
							render={({ field }) => (<>
								<Common.SubTitle>소재지 <Required /></Common.SubTitle>
								<Common.ViewBorder>
									<FromArrowIcon />
									<RNPickerSelect
										value={field.value}
										onValueChange={(value) => {
											if (value) {
												field.onChange(value)
												getAddressGu(value)
												setSi(value);
											}
										}}
										placeholder={{ label: '시/도 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										items={addressSi}
										style={pickerStyle}
									/>
								</Common.ViewBorder>
							</>)}
						/>
						<Common.FlexSpaceWrap>
							{/*
								<Controller
									control={control} name="s_location2" defaultValue={getValues("s_location2")}
									rules={{ required: { value: true, message: '소재지를 선택하세요.' } }}
									render={({ field }) => (<>
										<SelectHalfBox>
											<FromArrowIcon />
											<RNPickerSelect
												value={field.value}
												onValueChange={(value) => {
													if (value) {
														field.onChange(value)
														getAddressDong({si:getValues("s_location1"), gu:getValues("s_location2") })
														setGu(value);
													}
												}}
												placeholder={{ label: '시/군/구 선택' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												items={addressGu}
												style={pickerStyle}
											/>
										</SelectHalfBox>
									</>)}
								/>

								<Controller
									control={control} name="s_location3" defaultValue={getValues("s_location3")}
									rules={{ required: { value: true, message: '소재지를 선택하세요.' } }}
									render={({ field }) => (<>
										<SelectHalfBox>
											<FromArrowIcon />
											<RNPickerSelect
												value={field.value}
												onValueChange={(value) => { field.onChange(value);  setDong(value);  }}
												placeholder={{ label: '읍/면/동 선택' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												items={addressDong}
												style={pickerStyle}
											/>
										</SelectHalfBox>
									</>)}
								/>
							*/}
							<Controller
								control={control} name="s_location2" defaultValue={getValues("s_location2")}
								rules={{ required: { value: true, message: '소재지를 선택하세요.' } }}
								render={({ field }) => (<>
									<Common.ViewBorderHalfBtn marginBN>
										<FromArrowIcon />
										<RNPickerSelect
											value={field.value}
											onValueChange={(value) => {
												if (value) {
													field.onChange(value)
													getAddressDong({ si: getValues("s_location1"), gu: getValues("s_location2") })
													setGu(value);
												}
											}}
											placeholder={{ label: '시/군/구 선택' }}
											useNativeAndroidPickerStyle={false}
											fixAndroidTouchableBug={false}
											items={addressGu}
											style={pickerStyle}
										/>
									</Common.ViewBorderHalfBtn>
								</>)}
							/>
							<Controller
								control={control} name="s_location3" defaultValue={getValues("s_location3")}
								rules={{ required: { value: true, message: '소재지를 선택하세요.' } }}
								render={({ field }) => (<>
									<Common.ViewBorderHalfBtn marginBN>
										<FromArrowIcon />
										<RNPickerSelect
											value={field.value}
											onValueChange={(value) => { field.onChange(value); setDong(value); }}
											placeholder={{ label: '읍/면/동 선택' }}
											useNativeAndroidPickerStyle={false}
											fixAndroidTouchableBug={false}
											items={addressDong}
											style={pickerStyle}
										/>
									</Common.ViewBorderHalfBtn>
								</>)}
							/>
						</Common.FlexSpaceWrap>
						{/*		
							<Controller
								control={control} name="s_address_zibun1" rules={{ required: { value: true, message: '상세주소를 입력하세요.' } }} defaultValue="321-1"
								render={({ field }) => (
									<>
										<SubTitle>주소 <Required /></SubTitle>
										<ItemRowList >
											{ 	
												(getValues('s_tmp_address_yn')==0 ) &&
													<TouchableOpacity style={{ width: '100%' }} onPress={() => { setAddressModal(true); }}>
														<InputBorder pointerEvents="none" value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'주소찾기'} />
													</TouchableOpacity>
											}
											{ 	
												(getValues('s_tmp_address_yn')==1) &&
													<InputBorder value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'번지입력'} />
											}
										</ItemRowList>
									</>)
								}
							/>
							*/}

						<Controller
							control={control} name="s_address_zibun1" rules={{ required: { value: true, message: '상세주소를 입력하세요.' } }} defaultValue={getValues("s_address_zibun1")}
							render={({ field }) => (
								<>
									<Common.SubTitle>주소 <Required /></Common.SubTitle>
									<Common.View >
										{
											(getValues('s_tmp_address_yn') != 1) &&
											<Common.TouchableOpacity style={{ width: '100%' }} onPress={() => { setAddressModal(true); }}>
												<Common.InputBorder pointerEvents="none" value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'주소찾기'} />
											</Common.TouchableOpacity>
										}
										{
											(getValues('s_tmp_address_yn') == 1) &&
											<Common.InputBorder value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'번지입력'} >
												<UnitTit bold>번지</UnitTit>
											</Common.InputBorder>
										}
									</Common.View>
								</>)}
						/>

						{getValues('s_sale_type') == "SaleType_1" &&

							<Common.FlexSpaceWrap>
								<Controller
									control={control} name="s_address_apt_dong" rules={{ required: { value: true, message: '상세주소를 입력하세요.' } }} defaultValue=""
									render={({ field }) => (<Common.InputBorderHalf value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'동 입력'} />)}
								/>
								<Controller
									control={control} name="s_address_apt_ho" rules={{ required: { value: true, message: '상세주소를 입력하세요.' } }} defaultValue=""
									render={({ field }) => (<Common.InputBorderHalf value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'호 입력'} />)}
								/>
							</Common.FlexSpaceWrap>
							/*
								<ItemList2Box>
									<Controller
										control={control} name="s_address_apt_dong" rules={{ required: { value: true, message: '상세주소를 입력하세요.' } }} defaultValue="301"
										render={({ field }) => (<Item2RowBoxInput value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'동 입력'} />)}
									/>
									<Controller
										control={control} name="s_address_apt_ho" rules={{ required: { value: true, message: '상세주소를 입력하세요.' } }} defaultValue="1202"
										render={({ field }) => (<Item2RowBoxInput value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'호 입력'} />)}
									/>
								</ItemList2Box>
								*/
						}

						<Controller
							control={control} name="s_address_zibun2" defaultValue=""
							render={({ field }) => (<Common.InputBorder placeholder={'기타 상세 주소 (동,호수 입력)'} value={field.value} onChangeText={(value) => { field.onChange(value) }} />)}
						/>
						{
							(getValues('s_sale_type') == "SaleType_1" && danjitotalCount > 0 && getValues('s_tmp_address_yn') == 0) &&
							/*
						<Controller
							control={control} name="s_danji_code" defaultValue="롯데타워"
							rules={{ required: { value: true, message: '건물/단지명을 입력하세요.' } }}
							render={({ field }) => (<>
								<SubTitle>건물/단지명 <Required /></SubTitle>
								
								<ViewBorder>
									<FromArrowIcon/>
									<RNPickerSelect 
										value={field.value}
										onValueChange={(value, index) => { if (index>0){ console.log(danjiList[index-1]);  setValue("s_building_name", danjiList[index-1].label); setValue('s_danji_code',danjiList[index-1].value); }else {console.log("not selected");} field.onChange(value); setContractType(value) }}
										placeholder={{ label: '단지명 선택' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										style={pickerStyle}
										items={danjiList}
									/>
								</ViewBorder>
							</>)}
						/>*/

							<Controller
								control={control} name="s_danji_code" defaultValue="롯데타워"
								rules={{ required: { value: true, message: '건물/단지명을 입력하세요.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>건물/단지명 <Required /></Common.SubTitle>
									<Common.ViewBorder marginBN>
										<FromArrowIcon />
										<RNPickerSelect
											value={field.value}
											onValueChange={(value, index) => { if (index > 0) { console.log(danjiList[index - 1]); setValue("s_building_name", danjiList[index - 1].label); setValue('s_danji_code', danjiList[index - 1].value); } else { console.log("not selected"); } field.onChange(value); setContractType(value) }}
											placeholder={{ label: '단지명 선택' }}
											useNativeAndroidPickerStyle={false}
											fixAndroidTouchableBug={false}
											style={pickerStyle}
											items={danjiList}
										/>
									</Common.ViewBorder>
								</>)}
							/>
						}

						{
							(getValues('s_sale_type') == "SaleType_1" && danjitotalCount <= 0 && getValues('s_tmp_address_yn') == 1) &&
							/*
							<Controller
								control={control} name="s_building_name" defaultValue=""
								rules={{ required: { value: true, message: '건물/단지명을 입력하세요.' } }}
								render={({ field }) => (<>
									<SubTitle>건물/단지명 <Required /></SubTitle>
									<InputBorder defaultValue={''} onChangeText={(value) => {  field.onChange(value) }} placeholder={'예) 롯데타워'} value={field.value} />
								</>)}
							/>
							*/
							<Controller
								control={control} name="s_building_name" defaultValue=""
								rules={{ required: { value: true, message: '건물/단지명을 입력하세요.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>건물/단지명 <Required /></Common.SubTitle>
									<Common.InputBorder marginBN defaultValue={''} onChangeText={(value) => { field.onChange(value) }} placeholder={'예) 롯데타워'} value={field.value} />
								</>)}
							/>

						}
						{
							(getValues('s_sale_type') == "SaleType_1" && getValues('s_tmp_address_yn') == 1) &&
							/*
							<Controller
								control={control} name="s_building_name" defaultValue={getValues("s_building_name")}
								rules={{ required: { value: true, message: '건물/단지명을 입력하세요.' } }}
								render={({ field }) => (<>
									<SubTitle>건물/단지명 <Required /></SubTitle>
									<InputBorder defaultValue={''} onChangeText={(value) => {  field.onChange(value) }} placeholder={'예) 롯데타워'} value={field.value} />
								</>)}
							/>
							*/
							<Controller
								control={control} name="s_building_name" defaultValue=""
								rules={{ required: { value: true, message: '건물/단지명을 입력하세요.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>건물/단지명 <Required /></Common.SubTitle>
									<Common.InputBorder marginBN defaultValue={''} onChangeText={(value) => { field.onChange(value) }} placeholder={'예) 롯데타워'} value={field.value} placeholder={'예) 롯데타워'} value={field.value} />
								</>)}
							/>
						}
						{
							(getValues('s_sale_type') != "SaleType_1" && getValues('s_tmp_address_yn') == 1) &&
							/*
							<Controller
								control={control} name="s_building_name" defaultValue={getValues("s_building_name")}
								rules={{ required: { value: true, message: '건물/단지명을 입력하세요.' } }}
								render={({ field }) => (<>
									<SubTitle>건물/단지명 <Required /></SubTitle>
									<InputBorder defaultValue={''} onChangeText={(value) => {  field.onChange(value) }} placeholder={'예) 롯데타워'} value={field.value} />
								</>)}
							/>
							*/

							<Controller
								control={control} name="s_building_name" defaultValue=""
								rules={{ required: { value: true, message: '건물/단지명을 입력하세요.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>건물/단지명 <Required /></Common.SubTitle>
									<Common.InputBorder marginBN defaultValue={''} onChangeText={(value) => { field.onChange(value) }} placeholder={'예) 롯데타워'} value={field.value} />
								</>)}
							/>
						}

						{//contractType != "sales" &&
							/*
								<Controller
									control={control} name="s_contract_type"
									rules={{ required: { value: true, message: '계약형태를 선택해주세요.' } }}
									render={({ field }) => (<>
										<SubTitle>계약형태 <Required /></SubTitle>
										<ViewBorder>
											<FromArrowIcon />
											<RNPickerSelect
												value={field.value}
												onValueChange={(value) => { field.onChange(value); setContractType(value); setValue("s_deposit","");setValue("s_monthly_rent","");setValue("s_trading_price","");}}
												placeholder={{ label: '계약 형태 선택' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												style={pickerStyle}
												items={[
													{ label: '전세', value: 'lease' },
													{ label: '월세', value: 'monthly' },
													{ label: '매매', value: 'sales' },
													{ label: '단기임대', value: 'short' },
												]}
											/>
										</ViewBorder>
									</>)}
								/>
								*/
							<Controller
								control={control} name="s_contract_type"
								rules={{ required: { value: true, message: '계약형태를 선택해주세요.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>계약형태 <Required /></Common.SubTitle>
									<Common.ViewBorder marginBN>
										<FromArrowIcon />
										<RNPickerSelect
											value={field.value}
											onValueChange={(value) => { field.onChange(value); setContractType(value); setValue("s_deposit", ""); setValue("s_monthly_rent", ""); setValue("s_trading_price", ""); }}
											placeholder={{ label: '계약 형태 선택' }}
											useNativeAndroidPickerStyle={false}
											fixAndroidTouchableBug={false}
											style={pickerStyle}
											items={[
												{ label: '전세', value: 'lease' },
												{ label: '월세', value: 'monthly' },
												{ label: '매매', value: 'sales' },
												{ label: '단기임대', value: 'short' },
											]}
										/>
									</Common.ViewBorder>
								</>)}
							/>
						}

						{
							/*
							getValues("s_contract_type") == "sales" &&
							<Controller
							control={control} name="s_trading_price" defaultValue={getValues("s_trading_price")}
							rules={{ required: { value: true, message: '매매금액을 입력하세요' } }}
							render={({ field }) => (<>
								<SubTitle>가격정보 <Required /></SubTitle>
								<ItemRowList>
									<InputBorder placeholder={'금액 입력'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(value)}} />
									<ItemTextR>만원</ItemTextR>
								</ItemRowList>
							</>)}

							/>
							*/
						}

						{(getValues("s_contract_type") == 'short' || getValues("s_contract_type") == 'monthly' || getValues("s_contract_type") == 'lease') &&
							/*
							<Controller
								control={control} name="s_deposit" defaultValue={getValues("s_deposit").toString() }
								value={getValues("s_deposit").toString()}
								rules={{ required: { value: getValues("s_deposit"), message: '보증금을 입력하세요' } }}
								render={({ field }) => (<>
									<SubTitle>가격정보 <Required /></SubTitle>
									<ItemRowList>
										<InputBorder placeholder={'보증금 입력'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(Number(value))}} />
										<ItemTextR>만원</ItemTextR>
									</ItemRowList>
								</>)}
							/>
							*/
							<Controller
								control={control} name="s_deposit" defaultValue={getValues("s_deposit").toString()}
								rules={{ required: { value: true, message: '보증금을 입력하세요' } }}
								render={({ field }) => (<>
									<Common.SubTitle>가격정보 <Required /></Common.SubTitle>
									<Common.View>
										<Common.InputBorder marginBN placeholder={'보증금 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} />
										<UnitTit Bold>만원</UnitTit>
									</Common.View>
								</>)}
							/>
						}
						{

							(getValues("s_contract_type") == 'short' || getValues("s_contract_type") == 'monthly') &&
							/*
							<Controller
								control={control} name="s_monthly_rent"
								defaultValue={getValues("s_monthly_rent").toString()}
								rules={{ required: { value: (contractType == 'monthly' || contractType == 'short'), message: '월세를 입력하세요' } }}
								render={({ field }) => {
									if ((contractType != 'monthly' && contractType != 'short')) return null;
									return (<>
										<ItemRowList>
											<InputBorder placeholder={'월세 입력'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(Number(value)) } } />
											<ItemTextR>만원</ItemTextR>
										</ItemRowList>
									</>)
								}}
							/>
							*/
							<Controller
								control={control} name="s_monthly_rent"
								rules={{ required: { value: (contractType == 'monthly' || contractType == 'short'), message: '월세를 입력하세요' } }}
								render={({ field }) => {
									if ((contractType != 'monthly' && contractType != 'short')) return null;
									return (<>
										<Common.View>
											<Common.InputBorder placeholder={'월세 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} />
											<UnitTit Bold>만원</UnitTit>
										</Common.View>
									</>)
								}}
							/>

						}
						{getValues("s_contract_type") != 'sales' &&
							<>
								<Common.SubTitle>계약기간 <Required /></Common.SubTitle>
								{/*
							<Controller
								control={control} name="s_contract_start" defaultValue="2021-05-05"
								rules={{ required: { value: contractType != 'sales', message: '계약 시작일을 선택하세요' } }}
								render={({ field }) => {
									if (contractType == 'sales') return null;
									return (<>
										<ViewBorder>	
											<TouchableOpacity style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} onPress={() => {
												setTargetValue('s_contract_start')
												setShowDatePicker(true)
											}}>
												<DateTextTextL>{field.value}</DateTextTextL>
											</TouchableOpacity>
											<DatePickerIcons source={require('../../../assets/img/drawable-xhdpi/bt_calendar.png')} />
										</ViewBorder>
									</>)
								}}
							/>
							*/}
								<Controller
									control={control} name="s_contract_start" defaultValue="2021-05-05"
									rules={{ required: { value: contractType != 'sales', message: '계약 시작일을 선택하세요' } }}
									render={({ field }) => {
										if (contractType == 'sales') return null;
										return (<>
											<Common.ViewBorderBtn onPress={() => {
												setTargetValue('s_contract_start')
												setShowDatePicker(true)
											}}>
												<Common.ViewBorderText>{field.value}</Common.ViewBorderText>
												<DateIcon />
											</Common.ViewBorderBtn>

										</>)
									}}
								/>
								{/*
							<Controller
								control={control} name="s_contract_end" defaultValue="2022-05-05"
								rules={{ required: { value: contractType != 'sales', message: '계약 시작일을 선택하세요' } }}
								render={({ field }) => {
									if (contractType == 'sales') return null;
									return (<>
										<ViewBorder>
											<TouchableOpacity style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} onPress={() => {
												setTargetValue('s_contract_end')
												setShowDatePicker(true)
											}}>
												<DateTextTextL>{field.value}</DateTextTextL>
											</TouchableOpacity>
											<DatePickerIcons source={require('../../../assets/img/drawable-xhdpi/bt_calendar.png')} />
										</ViewBorder>
									</>)
								}}
							/>
							*/}
								<Controller
									control={control} name="s_contract_end" defaultValue="2022-05-05"
									rules={{ required: { value: contractType != 'sales', message: '계약 시작일을 선택하세요' } }}
									render={({ field }) => {
										if (contractType == 'sales') return null;
										return (<>

											<Common.ViewBorderBtn marginBN onPress={() => {
												setTargetValue('s_contract_end')
												setShowDatePicker(true)
											}}>
												<Common.ViewBorderText>{field.value}</Common.ViewBorderText>
												<DateIcon />
											</Common.ViewBorderBtn>
										</>)
									}}
								/>
							</>
						}
						{getValues("s_contract_type") == 'sales' &&
							/*
							<Controller
								control={control} name="s_bunyang_yn" defaultValue={0}
								rules={{ required: { value: 0, message: '분양권여부를 선택하세요.' } }}
								render={({ field }) => (<>
									<RadioTitleBox>
										<SubTitle>분양권 <Required /></SubTitle>
										<FlexRowBox>
											<RadioBox onPress={() => { field.onChange(1); setBoon(true); }}>
												{field.value == 1 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"있음"}</RadioLable>
											</RadioBox>
											<RadioBox onPress={() => { 
												field.onChange(0); 
												setBoon(false); 
												setValue('s_bunyang_type','');
												setValue('s_bunyang_amt','');
												setValue('s_bunyang_premmium_amt','');
												setValue('s_bunyang_real_amt','');
												}}>
												{field.value == 0 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"없음"}</RadioLable>
											</RadioBox>
										</FlexRowBox>
									</RadioTitleBox>
								</>)}
							/>
							*/
							<Controller
								control={control} name="s_bunyang_yn" defaultValue={0}
								rules={{ required: { value: true, message: '분양권을 선택하세요.' } }}
								render={({ field }) => (<>
									<Common.FlexBetweenBox marginT={18}>
										<Common.SubTitle marginTN>분양권 <Required /></Common.SubTitle>
										<RadioTitleBox>
											<RadioBox onPress={() => { field.onChange(0); setBoon(true); }}>
												{field.value == 0 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"있음"}</Common.ViewBorderText>
											</RadioBox>
											<RadioBox onPress={() => { field.onChange(1); setBoon(false); }}>
												{field.value == 1 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"없음"}</Common.ViewBorderText>
											</RadioBox>
										</RadioTitleBox>
									</Common.FlexBetweenBox>
								</>)}
							/>




						}
						{(getValues("s_bunyang_yn") == 1) &&
							<>
								{/*
									<SubTitle>분양 금액 <Required /></SubTitle>
									<ViewBorder>
										<Controller
											control={control} name="s_bunyang_type" defaultValue={1}
											rules={{ required: { value: '', message: '분양권을 선택하세요.' } }}
											render={({ field }) => (<>
												<FromArrowIcon />
												<RNPickerSelect
													// value={field.value}
													onValueChange={(value) => { field.onChange(value); setContractType(value) }}
													placeholder={{ label: '분양 금액 선택' }}
													useNativeAndroidPickerStyle={false}
													fixAndroidTouchableBug={false}
													style={pickerStyle}
													items={[
														{ label: '일반분양', value: 'common' },
														{ label: '조합원분양', value: 'member' },
													]}
												/>
											</>)}
										/>
									</ViewBorder>
									*/}
								<Common.SubTitle>분양 금액 <Required /></Common.SubTitle>
								<Common.ViewBorder>
									<Controller
										control={control} name="s_bunyang_type" defaultValue={1}
										rules={{ required: { value: true, message: '분양권을 선택하세요.' } }}
										render={({ field }) => (<>
											<FromArrowIcon />
											<RNPickerSelect
												// value={field.value}
												onValueChange={(value) => { field.onChange(value); setContractType(value) }}
												placeholder={{ label: '분양 금액 선택' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												style={pickerStyle}
												items={[
													{ label: '일반분양', value: 'common' },
													{ label: '조합원분양', value: 'member' },
												]}
											/>
										</>)}
									/>
								</Common.ViewBorder>


								{/*					
									<Controller
										control={control} name="s_bunyang_amt" defaultValue={1}
										rules={{ required: { value: '', message: '분양권 금액을 입력하세요.' } }}
										render={({ field }) => (

											<ItemRowList>
												<InputBorder placeholder={'금액 입력'} />
												<ItemTextR>만원</ItemTextR>
											</ItemRowList>

										)}
									/>
										*/}

								<Controller
									control={control} name="s_bunyang_amt" defaultValue={1}
									rules={{ required: { value: true, message: '분양권을 선택하세요.' } }}
									render={({ field }) => (

										<Common.View>
											<Common.InputBorder marginBN placeholder={'금액 입력'} />
											<UnitTit>만원</UnitTit>
										</Common.View>

									)}
								/>


								{/*
									<Controller
										control={control} name="s_bunyang_premmium_amt" defaultValue={1}
										rules={{ required: { value: '', message: '프리미엄 금액을 입력하세요.' } }}
										render={({ field }) => (
											<>
												<SubTitle>프리미엄 금액 <Required /></SubTitle>
												<ItemRowList>
													<InputBorder placeholder={'금액 입력'} onChangeText={(value)=>{field.onChange(Number(value)) } }  />
													<ItemTextR>만원</ItemTextR>
												</ItemRowList>
											</>

										)}
									/>*/}
								<Controller
									control={control} name="s_bunyang_premmium_amt" defaultValue={1}
									rules={{ required: { value: true, message: '' } }}
									render={({ field }) => (
										<>
											<Common.SubTitle>프리미엄 금액 <Required /></Common.SubTitle>
											<Common.View>
												<Common.InputBorder marginBN placeholder={'금액 입력'} />
												<UnitTit>만원</UnitTit>
											</Common.View>
										</>

									)}
								/>

								{/*			
									<Controller
										control={control} name="s_bunyang_real_amt" defaultValue={1}
										rules={{ required: { value: true, message: '분양권을 선택하세요.' } }}
										render={({ field }) => (
											<>
												<Common.SubTitle>실 입주금 <Required /></Common.SubTitle>
												<Common.View>
													<Common.InputBorder marginBN placeholder={'금액 입력'} />
													<UnitTit>만원</UnitTit>
												</Common.View>
											</>

										)}
									/> 	
									*/}

								<Controller
									control={control} name="s_bunyang_real_amt" defaultValue={1}
									rules={{ required: { value: true, message: '실 입주금을 입력하세요.' } }}
									render={({ field }) => (
										<>
											<Common.SubTitle>실 입주금 <Required /></Common.SubTitle>
											<Common.View>
												<Common.InputBorder marginBN placeholder={'금액 입력'} />
												<UnitTit>만원</UnitTit>
											</Common.View>
										</>

									)}
								/>

							</>

						}

						<Common.FlexSpaceWrap>
							{/*}
								<Controller
									control={control} name="s_rooms_cnt" defaultValue={getValues("s_rooms_cnt")}
									value={getValues("s_rooms_cnt")}
									rules={{ required: { value: true, message: "방 개수를 입력해주세요." } }}
									render={({ field }) => (<>
										<Item2RowBox>
											<SubTitle>방 개수 <Required /></SubTitle>
											<InputBorder placeholder={'방 개수 입력'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(Number(value)) } }  />
										</Item2RowBox>
									</>)}
								/>
								<Controller
									control={control} name="s_bathrooms_cnt" defaultValue={getValues("s_bathrooms_cnt")}
									rules={{ required: { value: true, message: "욕실 개수를 입력해주세요." } }}
									render={({ field }) => (
										<Item2RowBox>
											<SubTitle>욕실 개수 <Required /></SubTitle>
											<InputBorder placeholder={'욕실 개수 입력'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(Number(value)) } }  />
										</Item2RowBox>
									)}
								/>
								{*/}
							<Controller
								control={control} name="s_rooms_cnt" defaultValue={getValues("s_rooms_cnt")}
								rules={{ required: { value: true, message: "방 개수를 입력해주세요." } }}
								render={({ field }) => (<>
									<Common.View>
										<Common.SubTitle marginL={4}>방 개수 <Required /></Common.SubTitle>
										<Common.InputBorderHalf marginBN placeholder={'방 개수 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} />
									</Common.View>
								</>)}
							/>
							<Controller
								control={control} name="s_bathrooms_cnt" defaultValue='2'
								rules={{ required: { value: true, message: "욕실 개수를 입력해주세요." } }}
								render={({ field }) => (
									<Common.View>
										<Common.SubTitle marginL={4}>욕실 개수 <Required /></Common.SubTitle>
										<Common.InputBorderHalf marginBN placeholder={'욕실 개수 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} />
									</Common.View>
								)}
							/>
						</Common.FlexSpaceWrap>
						{/*
							<Controller
								control={control} name="s_admin_cost_yn" defaultValue={0}
								rules={{ required: { value: 0, message: "공용관리비 여부를 입력해주세요." } }}
								render={({ field }) => (
									<RadioTitleBox>
										<SubTitle>공용 관리비 <Required /></SubTitle>
										<FlexRowBox>
											<RadioBox onPress={() => { field.onChange(1); setValue("s_admin_cost_yn",1); setAdminCostYN(1); }}>
												{getValues("s_admin_cost_yn")==1 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"있음"}</RadioLable>
											</RadioBox>
											<RadioBox onPress={() => { field.onChange(0); setValue("s_admin_cost_yn",0); setAdminCostYN(0); setValue("s_admin_cost_amt",0); setValue("s_maintenance_list",[])  }}>
												{getValues("s_admin_cost_yn")==0 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"없음"}</RadioLable>
											</RadioBox>
										</FlexRowBox>
									</RadioTitleBox>
								)}
							/>
								*/}
						<Controller
							control={control} name="s_admin_cost_yn" defaultValue={0}
							rules={{ required: { value: 0, message: "공용관리비 여부를 입력해주세요." } }}
							render={({ field }) => (
								<Common.FlexBetweenBox marginT={18}>
									<Common.SubTitle marginTN>공용 관리비 <Required /></Common.SubTitle>
									<RadioTitleBox>
										<RadioBox onPress={() => { field.onChange(1); setValue("s_admin_cost_yn", 1); setAdminCostYN(1); }} >
											{field.value == true ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"있음"}</Common.ViewBorderText>
										</RadioBox>
										<RadioBox onPress={() => { field.onChange(0); setValue("s_admin_cost_yn", 0); setAdminCostYN(0); setValue("s_admin_cost_amt", 0); setValue("s_maintenance_list", []) }} >
											{field.value == false ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"없음"}</Common.ViewBorderText>
										</RadioBox>
									</RadioTitleBox>
								</Common.FlexBetweenBox>
							)}
						/>
						{adminCostYN == 1 &&
							/*
							<ItemRowList>
								<Controller
									control={control} name="s_admin_cost_amt" defaultValue="0"
									rules={{ required: { value: 0, message: '공용 관리비를 입력해주세요' } }}
									render={({ field }) => (<>
										<InputBorder value={field.value} keyboardType='numeric' onChangeText={(value)=>{field.onChange(Number(value)) } }  placeholder={'관리비 입력'} keyboardType='numeric'  />
										<ItemTextR>만원</ItemTextR>
									</>
									)}
								/>
							</ItemRowList>
							*/
							<Common.View>
								<Controller
									control={control} name="s_admin_cost_amt" defaultValue="0"
									rules={{ required: { value: commonFeeYN, message: '공용 관리비를 입력해주세요' } }}
									render={({ field }) => (<>
										<Common.InputBorder marginBN value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} placeholder={'관리비 입력'} keyboardType='numeric' editable={getValues("s_admin_cost_yn") == 1} />
										<UnitTit>만원</UnitTit>
									</>
									)}
								/>
							</Common.View>

						}
						{getValues("s_admin_cost_yn") == 1 &&
							/*
							<>
								<SubTitle>공용 관리비 항목 <Required /></SubTitle>
								<OptionItemBox>
									<Controller
										control={control} name="s_maintenance_list"
										render={({ field }) => (
											<>
												{
													commonFeeList.map((item) => {
														return (
															<OptionList key={item.value} active={(_.find(field.value, i => i == item.value)) ? true : false}
																onPress={() => {
																	const newValueArr = Object.assign([], field.value)
																	if (_.find(newValueArr, i => i == item.value)) {
																		_.remove(newValueArr, i => i == item.value)
																	} else {
																		newValueArr.push(item.value)
																	}
																	field.onChange(newValueArr)
																}}>
																<OptionTit>{item.label}</OptionTit>
															</OptionList>
														)
													})
												}
											</>
										)}
									/>
								</OptionItemBox>
							</>
							*/
							<>
								<Common.SubTitle>공용 관리비 항목 <Required /></Common.SubTitle>
								<OptionItemBox>
									{
										<Controller
											control={control} name="s_maintenance_list"
											render={({ field }) => (
												<>
													{
														commonFeeList.map((item) => {
															return (
																<Options key={item.value} active={(_.find(field.value, i => i == item.value)) ? true : false}
																	onPress={() => {
																		const newValueArr = Object.assign([], field.value)
																		if (_.find(newValueArr, i => i == item.value)) {
																			_.remove(newValueArr, i => i == item.value)
																		} else {
																			newValueArr.push(item.value)
																		}
																		field.onChange(newValueArr)
																	}
																	}>
																	<Common.TextLight14>{item.label}</Common.TextLight14>
																</Options>
															)
														})
													}

												</>
											)}
										/>
									}
								</OptionItemBox>
							</>
						}
						<Common.SubTitle>해당 층 <Required /></Common.SubTitle>
						<Common.FlexSpaceWrap>
							{/*}
								<Item2RowBox>
									<Controller
										control={control} name="s_floor" 
										rules={{ required: { value: getValues("s_floor"), message: '해당 층을 입력하세요.' } }}
										render={({ field }) => (
											<>
												<InputBorder value={field.value} onChangeText={(value) => { field.onChange(Number(value)); setFloorCnt(value);  }} placeholder={'해당 층 입력'} />
												<ItemTextR>층</ItemTextR>
											</>
										)}
									/>
								</Item2RowBox>
										{*/}
							<Common.View>
								<Controller
									control={control} name="s_floor"
									rules={{ required: { value: floorCnt, message: '해당 층을 입력하세요.' } }}
									render={({ field }) => (
										<>
											<Common.InputBorderHalf value={field.value} onChangeText={(value) => { field.onChange(Number(value)); setFloorCnt(value); }} placeholder={'해당 층 입력'} />
											<UnitTit>층</UnitTit>
										</>
									)}
								/>
							</Common.View>
							{/*}
								<Item2RowBox>
									<Controller
										control={control} name="s_floor_type" defaultValue={""}
										render={({ field }) => (
											<ViewBorder>
												<FromArrowIcon />
												<RNPickerSelect
													value={field.value}
													onValueChange={(value) => { field.onChange(Number(value)); setContractType(value) }}
													placeholder={{ label: '층 선택' }}
													useNativeAndroidPickerStyle={false}
													fixAndroidTouchableBug={false}
													style={pickerStyle}
													items={[
														{ label: '복층', value: 1 },
														{ label: '옥탑', value: 2 },
														{ label: '반지하', value: 3 },
													]}
												/>
											</ViewBorder>
										)}
									/>


								</Item2RowBox>
												{*/}
							<Common.View>
								<Controller
									control={control} name="s_floor_type" defaultValue={""}
									render={({ field }) => (
										<Common.ViewBorderHalfBtn>
											<FromArrowIcon />
											<RNPickerSelect
												value={field.value}
												onValueChange={(value) => { field.onChange(Number(value)); setContractType(value) }}
												placeholder={{ label: '층 선택' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												style={pickerStyle}
												items={[
													{ label: '복층', value: 1 },
													{ label: '옥탑', value: 2 },
													{ label: '반지하', value: 3 },
												]}
											/>
										</Common.ViewBorderHalfBtn>
									)}
								/>


							</Common.View>



						</Common.FlexSpaceWrap>
						{/*							
							<Controller
								control={control} name="s_total_floor"
								value={getValues("s_total_floor")}
								defaultValue={getValues("s_total_floor")}
								require={{ required: { value: true, message: '전체 층을 입력하세요.' } }}
								render={({ field }) => (
									<>
										<SubTitle>전체 층 <Required /></SubTitle>
										<ItemRowList>
											<InputBorder placeholder={'전체 층 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {  setValue('s_total_floor',value); field.onChange(Number(value)) }} />
											<ItemTextR>층</ItemTextR>
										</ItemRowList>
									</>
								)
								}
							/>
							*/}
						<Controller
							control={control} name="s_total_floor"
							value={getValues("s_total_floor")}
							defaultValue={getValues("s_total_floor")}
							render={({ field }) => (<>
								<Common.SubTitle>전체 층 <Required /></Common.SubTitle>
								<Common.View>
									<Common.InputBorder placeholder={'전체 층 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => { setValue('s_total_floor', value); field.onChange(Number(value)) }} />
									<UnitTit>층</UnitTit>
								</Common.View>
							</>)}
						/>
						<Common.SubTitle>공급면적 <Required /></Common.SubTitle>
						{/*
							<ItemList2Box>
								<Controller
									control={control} name="s_supply_area_m" 
									value={getValues("s_supply_area_m")} 
									defaultValue={getValues("s_supply_area_m")}
									rules={{ required: { value: true, message: '공급면적을 입력해주세요.' } }}
									render={({ field }) => (
										<Item2RowBox>
											<InputBorder placeholder={'면적 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
												setValue('s_supply_area_p', floor(MtoP(value), 2).toString());
												field.onChange(Number(value));
											}} />
											<ItemTextR>m²</ItemTextR>
										</Item2RowBox>
									)}
								/>
								<Controller
									control={control} name="s_supply_area_p"
									value={getValues("s_supply_area_p")} 
									defaultValue={getValues("s_supply_area_p")}
									rules={{ required: { value: true, message: '공급면적을 입력해주세요.' } }}
									render={({ field }) => (
										<Item2RowBox>
											<InputBorder placeholder={'면적 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
												setValue('s_supply_area_m', floor(PtoM(value), 2).toString())
												field.onChange(Number(value));
											}} />
											<ItemTextR>평</ItemTextR>
										</Item2RowBox>
									)}
								/>
							</ItemList2Box>
							*/}
						<Common.FlexSpaceWrap>
							<Controller
								control={control} name="s_supply_area_m"
								value={getValues("s_supply_area_m")}
								defaultValue={getValues("s_supply_area_m")}
								rules={{ required: { value: true, message: '공급면적을 입력해주세요.' } }}
								render={({ field }) => (
									<Common.View>
										<Common.InputBorderHalf placeholder={'면적 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
											setValue('s_supply_area_p', floor(MtoP(value), 2).toString());
											field.onChange(Number(value));
										}} />
										<UnitTit>m²</UnitTit>
									</Common.View>
								)}
							/>
							<Controller
								control={control} name="s_supply_area_p"
								value={getValues("s_supply_area_p")}
								defaultValue={getValues("s_supply_area_p")}
								rules={{ required: { value: true, message: '공급면적을 입력해주세요.' } }}
								render={({ field }) => (
									<Common.View>
										<Common.InputBorderHalf placeholder={'면적 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
											setValue('s_supply_area_m', floor(PtoM(value), 2).toString())
											field.onChange(Number(value));
										}} />
										<UnitTit>평</UnitTit>
									</Common.View>
								)}
							/>
						</Common.FlexSpaceWrap>



						<Common.SubTitle>전용면적 <Required /></Common.SubTitle>
						{/*
							<ItemList2Box>
								<Controller
									control={control} name="s_use_area_m" 
									value={getValues("s_use_area_m")} 
									defaultValue={getValues("s_use_area_m")}
									rules={{ required: { value: getValues("s_use_area_m"), message: '전용면적을 입력해주세요.' } }}
									render={({ field }) => (
										<Item2RowBox>
											<InputBorder placeholder={'면적 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
												setValue('s_use_area_p', floor(MtoP(value), 2).toString())
												field.onChange(Number(value));
											}} />
											<ItemTextR>m²</ItemTextR>
										</Item2RowBox>
									)}
								/>
								<Controller
									control={control} name="s_use_area_p"
									value={getValues("s_use_area_p")} 
									defaultValue={getValues("s_use_area_p")}
									rules={{ required: { value: getValues("s_use_area_p"), message: '전용면적을 입력해주세요.' } }}
									render={({ field }) => (
										<Item2RowBox>
											<InputBorder placeholder={'면적 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
												setValue('s_use_area_m', floor(PtoM(value), 2).toString())
												field.onChange(Number(value));
											}} />
											<ItemTextR>평</ItemTextR>
										</Item2RowBox>
									)}
								/>
							</ItemList2Box>
										*/}
						<Common.FlexSpaceWrap>
							<Controller
								control={control} name="s_use_area_m"
								value={getValues("s_use_area_m")}
								defaultValue={getValues("s_use_area_m")}
								rules={{ required: { value: true, message: '전용면적을 입력해주세요.' } }}
								render={({ field }) => (
									<Common.View>
										<Common.InputBorderHalf placeholder={'면적 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
											setValue('s_use_area_p', floor(MtoP(value), 2).toString())
											field.onChange(Number(value));
										}} />
										<UnitTit>m²</UnitTit>
									</Common.View>
								)}
							/>
							<Controller
								control={control} name="s_use_area_p"
								value={getValues("s_use_area_p")}
								defaultValue={getValues("s_use_area_p")}
								rules={{ required: { value: true, message: '전용면적을 입력해주세요.' } }}
								render={({ field }) => (
									<Common.View>
										<Common.InputBorderHalf placeholder={'면적 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
											setValue('s_use_area_m', floor(MtoP(value), 2).toString())
											field.onChange(Number(value));
										}} />
										<UnitTit>평</UnitTit>
									</Common.View>
								)}
							/>
						</Common.FlexSpaceWrap>



						{/*					
							<Controller
								control={control} name="s_total_parking_cnt"
								value={getValues("s_total_parking_cnt")} 
								defaultValue={getValues("s_total_parking_cnt")}
								rules={{ required: { value: getValues("s_total_parking_cnt"), message: '총 주차대수를 입력해주세요' } }}
								render={({ field }) => (<>

									<SubTitle>총 주차대수 <Required /></SubTitle>
									<ItemRowList>
										<InputBorder placeholder={'주차대수 입력'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{ setValue('s_total_parking_cnt',value); field.onChange(Number(value))}} />
										<ItemTextR>개</ItemTextR>
									</ItemRowList>

								</>)}
							/>
							*/}

						<Controller
							control={control} name="s_total_parking_cnt"
							value={getValues("s_total_parking_cnt")}
							defaultValue={getValues("s_total_parking_cnt")}
							rules={{ required: { value: true, message: '주차대수를 입력해주세요' } }}
							render={({ field }) => (<>

								<Common.SubTitle>총 주차대수 <Required /></Common.SubTitle>
								<Common.View>
									<Common.InputBorder placeholder={'주차대수 입력'} keyboardType='numeric' value={field.value} onChangeText={(value) => { setValue('s_total_parking_cnt', value); field.onChange(Number(value)) }} />
									<UnitTit>개</UnitTit>
								</Common.View>

							</>)}
						/>
					</StepCont >

					<StepCont>
						<Common.TitleBox><Common.Title>사진,동영상 등록</Common.Title></Common.TitleBox>
						<NoticeItem>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph>최소 3장 이상의 사진<Common.TextSemiBold14 paragraph>을 등록해주세요.</Common.TextSemiBold14></Common.TextLight14>
							</NoticeList>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph><Common.TextSemiBold14 paragraph>최대 20장까지 등록 가능하며, 한 장당 10MB </Common.TextSemiBold14>를 초과할 수 없습니다.</Common.TextLight14>
							</NoticeList>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph><Common.TextSemiBold14 paragraph>첫번째 사진이 대표 이미지</Common.TextSemiBold14>로 보여지며, 순서를 변경할 수 있습니다.</Common.TextLight14>
							</NoticeList>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph><Common.TextSemiBold14 paragraph>매물과 관련 없는 이미지, 홍보성 이미지, 워터마크 이미지</Common.TextSemiBold14>는 등록하실 수 없습니다.</Common.TextLight14>
							</NoticeList>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph><Common.TextSemiBold14 paragraph>YouTube 링크를 통해 동영상을 등록 할 수 있습니다.</Common.TextSemiBold14></Common.TextLight14>
							</NoticeList>
						</NoticeItem>
						<Controller
							control={control} name="imgs"
							render={({ field }) => (<>
								<ImageUploadCont>
									<ImageUploadBtn onPress={() => { handleImageUpload(field) }} >
										<ImageUploadImg source={require('../../../assets/img/drawable-xhdpi/icon-regist-image.png')} />
										<ImageUploadText>이미지 등록</ImageUploadText>
									</ImageUploadBtn>
									{imgs.map((el, index) => {
										console.log("imgs" + index + "=================================================")
										console.log(el.uri);
										return (
											<ImageUploadBox key={index} >
												<UploadImg resizemode={'cover'} source={{ uri: el.uri }} />
												<UploadImgX>
													<TouchableOpacity onPress={() => { handleImageDelete(field, index, el.sf_id); }}>
														<UploadImgXImg source={require('../../../assets/img/drawable-xhdpi/bt-search-cencel-w.png')} />
													</TouchableOpacity>
												</UploadImgX>
											</ImageUploadBox>)
									})}
								</ImageUploadCont>
							</>)}
						/>

						{/*  유튜브링크 mypage 수정일 경우 보임 */}
						<Controller
							control={control} name="s_yt_url"
							render={({ field }) => (<>
								<Common.SubTitle>YouTube URL</Common.SubTitle>
								<Common.InputBorder marginBN placeholder={'URL 입력'} />
								<AlertWrap>
									<ChkYIcon />
									<AlertText>YouTube 동영상 링크가 아니거나 매물과 관련 없는 동영상일 경우 영상이 제외되고 매물이 등록됩니다.</AlertText>
								</AlertWrap>
							</>)}
						/>
					</StepCont>

					<StepCont color={Colors.bgColor}>
						<Common.TitleBox marginB={16}>
							<Common.Title>매물등록 유의사항 확인 및 동의 <Required /></Common.Title>
						</Common.TitleBox>
						<Common.View>
							<InfoList>
								<InfoNum>1.</InfoNum>
								<InfoText>상세주소는 검증과 지도 노출 시 사용되며 일반 사용자에게 노출되지 않습니다.</InfoText>
							</InfoList>
							<InfoList>
								<InfoNum>2.</InfoNum>
								<InfoText>상세주소가 정확하지 않은 경우 등기부등본 조회 시 등록이 반려됩니다.</InfoText>
							</InfoList>
							<InfoList>
								<InfoNum>3.</InfoNum>
								<InfoText>주소 및 면적 불일치로 검증 요청이 반려될 경우 변경된 정보로 새로운 매물 등록 가능합니다.</InfoText>
							</InfoList>
							<InfoList>
								<InfoNum>4.</InfoNum>
								<InfoText>택지 개발 등으로 지번이 부여되지 않거나, 도로명 주소, 블록 주소일 경우 가(임시)주소를 선택해주세요.</InfoText>
							</InfoList>
							<InfoList>
								<InfoNum>※</InfoNum>
								<InfoText>동/호 정보는 수정이 불가능합니다. 등기부에 나와있는 동/호수 정보를 정확히 입력해주세요.</InfoText>
							</InfoList>

							<InfoList>
								<InfoNumS>-</InfoNumS>
								<InfoTextS>한 주소지 내에 여러 호수가 등기되어 있는 경우 ‘해당 호수‘까지 입력해주세요.</InfoTextS>
							</InfoList>
							<InfoList>
								<InfoNumS>-</InfoNumS>
								<InfoTextS>등기 상으로 구분등기가 되지 않았으나, 실질적으로 나눠서 사용하고 있는 매물은 ‘일부‘를 상세주소에 추가로 입력해주세요.</InfoTextS>
							</InfoList>
							<InfoList>
								<InfoNumS>-</InfoNumS>
								<InfoTextS>건물은 ‘건물 전체‘, ‘층 전체’, ‘0층 전체’, ‘A동’, ‘가동’ 등으로 구분하여 입력해주세요.</InfoTextS>
							</InfoList>
							<InfoList>
								<InfoNumS>-</InfoNumS>
								<InfoTextS>상세주소 부분에 등기부등본 상의 부동산 소재지번 내용을 입력하시면 빠르고 정확한 매물 등록이 가능합니다.</InfoTextS>
							</InfoList>

						</Common.View>
						<Controller
							control={control} name="s_agreement_yn"
							rules={{ required: { value: 0, message: '매물등록 유의사항에 동의해주세요.' } }}
							defaultValue={getValues('s_agreement_yn')}
							value={getValues('s_agreement_yn')}
							render={({ field }) => (
								<TouchableOpacity onPress={() => { field.onChange(field.value == 0 ? 1 : 0) }}>
									<AgreedChkBtn>
										{getValues('s_agreement_yn') == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>위 매물등록 유의사항에 동의합니다.</Common.ViewBorderText>
									</AgreedChkBtn>
								</TouchableOpacity>
							)}
						/>
					</StepCont>

				</KeyboardAvoidingView>
			</Common.ScrollContainer>

			<Common.FloatBtnBox>
				{mode == "new" &&
					<Common.FloatBtnsss btnColor={Colors.whiteColor} onPress={() => { tmpSave() }} >
						<Common.TextSemiBold18>임시 저장</Common.TextSemiBold18>
					</Common.FloatBtnsss>
				}
				<Common.FloatBtnsss btnColor={Colors.mainColor} onPress={() => { prevPage(); }}>
					<Common.TextSemiBold18>이전 단계</Common.TextSemiBold18>
				</Common.FloatBtnsss>
				{
					mode == "new" &&
					<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={handleSubmit(onValid, onInvalid)} >
						<Common.TextSemiBold18 color={Colors.whiteColor} >등록완료</Common.TextSemiBold18>
					</Common.FloatBtnsss>
				}
				{
					mode == "modi" &&
					<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={handleSubmit(onValid, onInvalid)}>
						<Common.TextSemiBold18 btnColor={Colors.whiteColor}  >다음 단계</Common.TextSemiBold18>
					</Common.FloatBtnsss>
				}
			</Common.FloatBtnBox>
		</>)
}

const pickerStyle = {
	placeholderColor: '#000',
	inputIOS: { color: '#000', height: 34, fontSize: 12 },
	inputAndroid: { color: '#000', height: 34, fontSize: 12, paddingVertical: 0, },
}

export default StepTwoScreen