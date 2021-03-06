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
	const TextRequired = () => (<TextRequiredS><Required /> ????????????</TextRequiredS>)
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
				showAlertMessage("???????????? ?????? ??? ?????????.");
			} else {
				uploadToServer(data, mID);
			}
		}
	}

	//?????? ??????
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

		//?????? ??????
		else if (err.s_contract_type) { showAlertMessage(err.s_contract_type.message) }

		else if (err.s_trading_price) { showAlertMessage(err.s_trading_price.message) }
		else if (err.s_deposit) { showAlertMessage(err.s_deposit.message) }
		else if (err.s_monthly_rent) { showAlertMessage(err.s_monthly_rent.message) }

		else if (err.s_contract_start) { showAlertMessage(err.s_contract_start.message) }
		else if (err.s_contract_end) { showAlertMessage(err.s_contract_end.message) }

		//?????????
		else if (err.s_bunyang_yn) { showAlertMessage(err.s_bunyang_yn.message) }
		else if (err.s_bunyang_type) { showAlertMessage(err.s_bunyang_type.message) }
		else if (err.s_bunyang_amt) { showAlertMessage(err.s_bunyang_amt.message) }
		else if (err.s_bunyang_premmium_amt) { showAlertMessage(err.s_bunyang_premmium_amt.message) }
		else if (err.s_bunyang_real_amt) { showAlertMessage(err.s_bunyang_real_amt.message) }

		// ??????
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
				<Button onClick={() => setModal(true)}>????????????</Button>
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
							rules={{ required: { value: true, message: '?????? ????????? ???????????????.' } }}
							render={({ field }) => (<>
								{/*
									<TitleBox><Title>?????? ??????</Title><TextRequired /></TitleBox>
									<RadioTitleBox>
								
										<SubTitle>?????? ?????? <Required /></SubTitle>
										<FlexRowBox>
											<RadioBox onPress={() => { setBldgTypeName("????????????"); field.onChange("BdType_1"); setValue('s_bld_name','????????????'); }}>
												{field.value == 'BdType_1' ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"????????????"}</RadioLable>
											</RadioBox>
											<RadioBox onPress={() => { setBldgTypeName("????????????"); field.onChange("BdType_2"); setValue('s_bld_name','????????????'); }}>
												{field.value == 'BdType_2' ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"????????????"}</RadioLable>
											</RadioBox>
										</FlexRowBox>
								
									</RadioTitleBox>
									<BtnBorder onPress={() => navigation.navigate('buildingType', { onChange: field.onChange, setValue:setValue, setBldgTypeName: setBldgTypeName, bldgType: field.value })}>
										<ItemText>{getValues('s_bld_name') ? getValues('s_bld_name') : '?????? ?????? ??????'}</ItemText><FromArrowIcon />
									</BtnBorder>
									*/}

								<Common.TitleBox><Common.Title>?????? ??????</Common.Title><TextRequired /></Common.TitleBox>
								<Common.FlexBetweenBox marginT={18}>
									<Common.SubTitle marginTN>?????? ?????? <Required /></Common.SubTitle>
									<RadioTitleBox>
										<RadioBox onPress={() => { setBldgTypeName("????????????"); field.onChange("BdType_1"); setValue('s_bld_name', '????????????'); }}>
											{field.value == 'BdType_1' ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"????????????"}</Common.ViewBorderText>
										</RadioBox>
										<RadioBox onPress={() => { setBldgTypeName("????????????"); field.onChange("BdType_2"); setValue('s_bld_name', '????????????'); }}>
											{field.value == 'BdType_2' ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"????????????"}</Common.ViewBorderText>
										</RadioBox>
									</RadioTitleBox>
								</Common.FlexBetweenBox>
								<Common.ViewBorderBtn marginBN onPress={() => navigation.navigate('buildingType', { onChange: field.onChange, setValue: setValue, setBldgTypeName: setBldgTypeName, bldgType: field.value })}>
									<Common.ViewBorderText>{bldgTypeName ? bldgTypeName : '?????? ?????? ??????'}</Common.ViewBorderText><FromArrowIcon />
								</Common.ViewBorderBtn>

							</>)}
						/>

						<Controller
							control={control} name="s_sale_type" defaultValue={getValues('s_sale_type')}
							rules={{ required: { value: true, message: '?????? ????????? ???????????????.' } }}
							render={({ field }) => (<>
								{/*<SubTitle>?????? ?????? <Required /></SubTitle>
									<BtnBorder onPress={() => navigation.navigate('saleType', { onChange: field.onChange, setValue:setValue, setBldgStyleName: setBldgStyleName, bldgStyle: field.value, setSaleType:setSaleType})}>
										<ItemText>{getValues('s_sale_name') ? getValues('s_sale_name') : '?????? ?????? ??????'}</ItemText><FromArrowIcon />
									</BtnBorder>*/}
								<Common.SubTitle>?????? ?????? <Required /></Common.SubTitle>
								<Common.ViewBorderBtn marginBN onPress={() => navigation.navigate('saleType', { onChange: field.onChange, setValue: setValue, setBldgStyleName: setBldgStyleName, bldgStyle: field.value, setSaleType: setSaleType })}>
									<Common.ViewBorderText>{getValues('s_sale_name') ? getValues('s_sale_name') : '?????? ?????? ??????'}</Common.ViewBorderText><FromArrowIcon />
								</Common.ViewBorderBtn>
							</>)}
						/>

						<Controller
							control={control} name="s_addr_type"
							value={getValues("s_addr_type")}
							rules={{ required: { value: 0, message: '?????? ????????? ???????????????.' } }}
							render={({ field }) => (<>
								{/*<RadioTitleBox>
										<SubTitle>?????? ??????<Required /></SubTitle>
										<FlexRowBox>
											<RadioBox onPress={() => {  field.onChange(0) }}>
												{field.value == 0 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
											</RadioBox>
											<RadioBox onPress={() => { field.onChange(1) }}>
												{field.value == 1 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"???"}</RadioLable>
											</RadioBox>
										</FlexRowBox>
									</RadioTitleBox>
									*/}
								<Common.FlexBetweenBox marginT={18}>
									<Common.SubTitle marginTN>?????? ??????<Required /></Common.SubTitle>
									<RadioTitleBox>
										<RadioBox onPress={() => { field.onChange(0) }}>
											{field.value == 0 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
										</RadioBox>
										<RadioBox onPress={() => { field.onChange(1) }}>
											{field.value == 1 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"???"}</Common.ViewBorderText>
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
										<SubTitle>???(??????) ?????? </SubTitle>
										<RadioBox onPress={() => {
											setTmpAddrYN(!tmpAddrYN);
											
											if (field.value) { setValue('s_tmp_address_yn',field.value==0 ? 1:0); setValue('s_unregister', 0); setValue('s_building_check', 0); setValue('s_no_division_register', 0); setValue("s_building_name","") }
											field.onChange(!field.value);
											initAddress();
										}}>
											{getValues('s_tmp_address_yn')==1 ? <ChkActive /> : <ChkBtn />}<RadioLable>{"??????"}</RadioLable>
										</RadioBox>
									</RadioTitleBox>
									*/}
								<RadioTitleBox>
									<Common.SubTitle>???(??????) ?????? </Common.SubTitle>
									<RadioBox onPress={() => {
										setTmpAddrYN(!tmpAddrYN);

										if (field.value) { setValue('s_tmp_address_yn', field.value == 0 ? 1 : 0); setValue('s_unregister', 0); setValue('s_building_check', 0); setValue('s_no_division_register', 0); setValue("s_building_name", "") }
										field.onChange(!field.value);
										initAddress();
									}}>
										{getValues('s_tmp_address_yn') == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
									</RadioBox>
								</RadioTitleBox>
							</>)}
						/>
						<GreyBox>
							<Controller
								control={control} name="s_unregister" render={({ field }) => (
									/*
								<GreyChkBtn onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
									{field.value == 1 ? <ChkActive /> : <ChkBtn />}<GreyBoxTit>?????????</GreyBoxTit>
									</GreyChkBtn>*/

									<RadioBox marginLN onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
										{field.value == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>?????????</Common.ViewBorderText>
									</RadioBox>

								)}
							/>
							{/*
								<Controller
									control={control} name="s_building_check" render={({ field }) => (
										<GreyChkBtn onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
											{field.value == 1 ? <ChkActive /> : <ChkBtn />}<GreyBoxTit>???????????? ??????</GreyBoxTit>
										</GreyChkBtn>
									)}
								/>
								<Controller
									control={control} name="s_no_division_register" render={({ field }) => (
										<GreyChkBtn onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
											{field.value == 1 ? <ChkActive /> : <ChkBtn />}<GreyBoxTit>??????????????? ?????? ?????? ??????</GreyBoxTit>
										</GreyChkBtn>
									)}
								/>
									*/}
							<Controller
								control={control} name="s_building_check" render={({ field }) => (
									<RadioBox marginLN onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
										{field.value == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>???????????? ??????</Common.ViewBorderText>
									</RadioBox>
								)}
							/>
							<Controller
								control={control} name="s_no_division_register" render={({ field }) => (
									<RadioBox marginLN onPress={() => { field.onChange(!field.value); if (!field.value) { setValue('tmpAddrYN', 1); setTmpAddrYN(true); } }}>
										{field.value == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>??????????????? ?????? ?????? ??????</Common.ViewBorderText>
									</RadioBox>
								)}
							/>
						</GreyBox>
						{/*
							<Controller
								control={control} name="s_location1" defaultValue={getValues("s_location1")}
								rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<SubTitle>????????? <Required /></SubTitle>
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
											placeholder={{ label: '???/??? ??????' }}
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
							rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
							render={({ field }) => (<>
								<Common.SubTitle>????????? <Required /></Common.SubTitle>
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
										placeholder={{ label: '???/??? ??????' }}
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
									rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
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
												placeholder={{ label: '???/???/??? ??????' }}
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
									rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
									render={({ field }) => (<>
										<SelectHalfBox>
											<FromArrowIcon />
											<RNPickerSelect
												value={field.value}
												onValueChange={(value) => { field.onChange(value);  setDong(value);  }}
												placeholder={{ label: '???/???/??? ??????' }}
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
								rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
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
											placeholder={{ label: '???/???/??? ??????' }}
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
								rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<Common.ViewBorderHalfBtn marginBN>
										<FromArrowIcon />
										<RNPickerSelect
											value={field.value}
											onValueChange={(value) => { field.onChange(value); setDong(value); }}
											placeholder={{ label: '???/???/??? ??????' }}
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
								control={control} name="s_address_zibun1" rules={{ required: { value: true, message: '??????????????? ???????????????.' } }} defaultValue="321-1"
								render={({ field }) => (
									<>
										<SubTitle>?????? <Required /></SubTitle>
										<ItemRowList >
											{ 	
												(getValues('s_tmp_address_yn')==0 ) &&
													<TouchableOpacity style={{ width: '100%' }} onPress={() => { setAddressModal(true); }}>
														<InputBorder pointerEvents="none" value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'????????????'} />
													</TouchableOpacity>
											}
											{ 	
												(getValues('s_tmp_address_yn')==1) &&
													<InputBorder value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'????????????'} />
											}
										</ItemRowList>
									</>)
								}
							/>
							*/}

						<Controller
							control={control} name="s_address_zibun1" rules={{ required: { value: true, message: '??????????????? ???????????????.' } }} defaultValue={getValues("s_address_zibun1")}
							render={({ field }) => (
								<>
									<Common.SubTitle>?????? <Required /></Common.SubTitle>
									<Common.View >
										{
											(getValues('s_tmp_address_yn') != 1) &&
											<Common.TouchableOpacity style={{ width: '100%' }} onPress={() => { setAddressModal(true); }}>
												<Common.InputBorder pointerEvents="none" value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'????????????'} />
											</Common.TouchableOpacity>
										}
										{
											(getValues('s_tmp_address_yn') == 1) &&
											<Common.InputBorder value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'????????????'} >
												<UnitTit bold>??????</UnitTit>
											</Common.InputBorder>
										}
									</Common.View>
								</>)}
						/>

						{getValues('s_sale_type') == "SaleType_1" &&

							<Common.FlexSpaceWrap>
								<Controller
									control={control} name="s_address_apt_dong" rules={{ required: { value: true, message: '??????????????? ???????????????.' } }} defaultValue=""
									render={({ field }) => (<Common.InputBorderHalf value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'??? ??????'} />)}
								/>
								<Controller
									control={control} name="s_address_apt_ho" rules={{ required: { value: true, message: '??????????????? ???????????????.' } }} defaultValue=""
									render={({ field }) => (<Common.InputBorderHalf value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'??? ??????'} />)}
								/>
							</Common.FlexSpaceWrap>
							/*
								<ItemList2Box>
									<Controller
										control={control} name="s_address_apt_dong" rules={{ required: { value: true, message: '??????????????? ???????????????.' } }} defaultValue="301"
										render={({ field }) => (<Item2RowBoxInput value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'??? ??????'} />)}
									/>
									<Controller
										control={control} name="s_address_apt_ho" rules={{ required: { value: true, message: '??????????????? ???????????????.' } }} defaultValue="1202"
										render={({ field }) => (<Item2RowBoxInput value={field.value} onChangeText={(value) => { field.onChange(value) }} placeholder={'??? ??????'} />)}
									/>
								</ItemList2Box>
								*/
						}

						<Controller
							control={control} name="s_address_zibun2" defaultValue=""
							render={({ field }) => (<Common.InputBorder placeholder={'?????? ?????? ?????? (???,?????? ??????)'} value={field.value} onChangeText={(value) => { field.onChange(value) }} />)}
						/>
						{
							(getValues('s_sale_type') == "SaleType_1" && danjitotalCount > 0 && getValues('s_tmp_address_yn') == 0) &&
							/*
						<Controller
							control={control} name="s_danji_code" defaultValue="????????????"
							rules={{ required: { value: true, message: '??????/???????????? ???????????????.' } }}
							render={({ field }) => (<>
								<SubTitle>??????/????????? <Required /></SubTitle>
								
								<ViewBorder>
									<FromArrowIcon/>
									<RNPickerSelect 
										value={field.value}
										onValueChange={(value, index) => { if (index>0){ console.log(danjiList[index-1]);  setValue("s_building_name", danjiList[index-1].label); setValue('s_danji_code',danjiList[index-1].value); }else {console.log("not selected");} field.onChange(value); setContractType(value) }}
										placeholder={{ label: '????????? ??????' }}
										useNativeAndroidPickerStyle={false}
										fixAndroidTouchableBug={false}
										style={pickerStyle}
										items={danjiList}
									/>
								</ViewBorder>
							</>)}
						/>*/

							<Controller
								control={control} name="s_danji_code" defaultValue="????????????"
								rules={{ required: { value: true, message: '??????/???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>??????/????????? <Required /></Common.SubTitle>
									<Common.ViewBorder marginBN>
										<FromArrowIcon />
										<RNPickerSelect
											value={field.value}
											onValueChange={(value, index) => { if (index > 0) { console.log(danjiList[index - 1]); setValue("s_building_name", danjiList[index - 1].label); setValue('s_danji_code', danjiList[index - 1].value); } else { console.log("not selected"); } field.onChange(value); setContractType(value) }}
											placeholder={{ label: '????????? ??????' }}
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
								rules={{ required: { value: true, message: '??????/???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<SubTitle>??????/????????? <Required /></SubTitle>
									<InputBorder defaultValue={''} onChangeText={(value) => {  field.onChange(value) }} placeholder={'???) ????????????'} value={field.value} />
								</>)}
							/>
							*/
							<Controller
								control={control} name="s_building_name" defaultValue=""
								rules={{ required: { value: true, message: '??????/???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>??????/????????? <Required /></Common.SubTitle>
									<Common.InputBorder marginBN defaultValue={''} onChangeText={(value) => { field.onChange(value) }} placeholder={'???) ????????????'} value={field.value} />
								</>)}
							/>

						}
						{
							(getValues('s_sale_type') == "SaleType_1" && getValues('s_tmp_address_yn') == 1) &&
							/*
							<Controller
								control={control} name="s_building_name" defaultValue={getValues("s_building_name")}
								rules={{ required: { value: true, message: '??????/???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<SubTitle>??????/????????? <Required /></SubTitle>
									<InputBorder defaultValue={''} onChangeText={(value) => {  field.onChange(value) }} placeholder={'???) ????????????'} value={field.value} />
								</>)}
							/>
							*/
							<Controller
								control={control} name="s_building_name" defaultValue=""
								rules={{ required: { value: true, message: '??????/???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>??????/????????? <Required /></Common.SubTitle>
									<Common.InputBorder marginBN defaultValue={''} onChangeText={(value) => { field.onChange(value) }} placeholder={'???) ????????????'} value={field.value} placeholder={'???) ????????????'} value={field.value} />
								</>)}
							/>
						}
						{
							(getValues('s_sale_type') != "SaleType_1" && getValues('s_tmp_address_yn') == 1) &&
							/*
							<Controller
								control={control} name="s_building_name" defaultValue={getValues("s_building_name")}
								rules={{ required: { value: true, message: '??????/???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<SubTitle>??????/????????? <Required /></SubTitle>
									<InputBorder defaultValue={''} onChangeText={(value) => {  field.onChange(value) }} placeholder={'???) ????????????'} value={field.value} />
								</>)}
							/>
							*/

							<Controller
								control={control} name="s_building_name" defaultValue=""
								rules={{ required: { value: true, message: '??????/???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>??????/????????? <Required /></Common.SubTitle>
									<Common.InputBorder marginBN defaultValue={''} onChangeText={(value) => { field.onChange(value) }} placeholder={'???) ????????????'} value={field.value} />
								</>)}
							/>
						}

						{//contractType != "sales" &&
							/*
								<Controller
									control={control} name="s_contract_type"
									rules={{ required: { value: true, message: '??????????????? ??????????????????.' } }}
									render={({ field }) => (<>
										<SubTitle>???????????? <Required /></SubTitle>
										<ViewBorder>
											<FromArrowIcon />
											<RNPickerSelect
												value={field.value}
												onValueChange={(value) => { field.onChange(value); setContractType(value); setValue("s_deposit","");setValue("s_monthly_rent","");setValue("s_trading_price","");}}
												placeholder={{ label: '?????? ?????? ??????' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												style={pickerStyle}
												items={[
													{ label: '??????', value: 'lease' },
													{ label: '??????', value: 'monthly' },
													{ label: '??????', value: 'sales' },
													{ label: '????????????', value: 'short' },
												]}
											/>
										</ViewBorder>
									</>)}
								/>
								*/
							<Controller
								control={control} name="s_contract_type"
								rules={{ required: { value: true, message: '??????????????? ??????????????????.' } }}
								render={({ field }) => (<>
									<Common.SubTitle>???????????? <Required /></Common.SubTitle>
									<Common.ViewBorder marginBN>
										<FromArrowIcon />
										<RNPickerSelect
											value={field.value}
											onValueChange={(value) => { field.onChange(value); setContractType(value); setValue("s_deposit", ""); setValue("s_monthly_rent", ""); setValue("s_trading_price", ""); }}
											placeholder={{ label: '?????? ?????? ??????' }}
											useNativeAndroidPickerStyle={false}
											fixAndroidTouchableBug={false}
											style={pickerStyle}
											items={[
												{ label: '??????', value: 'lease' },
												{ label: '??????', value: 'monthly' },
												{ label: '??????', value: 'sales' },
												{ label: '????????????', value: 'short' },
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
							rules={{ required: { value: true, message: '??????????????? ???????????????' } }}
							render={({ field }) => (<>
								<SubTitle>???????????? <Required /></SubTitle>
								<ItemRowList>
									<InputBorder placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(value)}} />
									<ItemTextR>??????</ItemTextR>
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
								rules={{ required: { value: getValues("s_deposit"), message: '???????????? ???????????????' } }}
								render={({ field }) => (<>
									<SubTitle>???????????? <Required /></SubTitle>
									<ItemRowList>
										<InputBorder placeholder={'????????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(Number(value))}} />
										<ItemTextR>??????</ItemTextR>
									</ItemRowList>
								</>)}
							/>
							*/
							<Controller
								control={control} name="s_deposit" defaultValue={getValues("s_deposit").toString()}
								rules={{ required: { value: true, message: '???????????? ???????????????' } }}
								render={({ field }) => (<>
									<Common.SubTitle>???????????? <Required /></Common.SubTitle>
									<Common.View>
										<Common.InputBorder marginBN placeholder={'????????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} />
										<UnitTit Bold>??????</UnitTit>
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
								rules={{ required: { value: (contractType == 'monthly' || contractType == 'short'), message: '????????? ???????????????' } }}
								render={({ field }) => {
									if ((contractType != 'monthly' && contractType != 'short')) return null;
									return (<>
										<ItemRowList>
											<InputBorder placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(Number(value)) } } />
											<ItemTextR>??????</ItemTextR>
										</ItemRowList>
									</>)
								}}
							/>
							*/
							<Controller
								control={control} name="s_monthly_rent"
								rules={{ required: { value: (contractType == 'monthly' || contractType == 'short'), message: '????????? ???????????????' } }}
								render={({ field }) => {
									if ((contractType != 'monthly' && contractType != 'short')) return null;
									return (<>
										<Common.View>
											<Common.InputBorder placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} />
											<UnitTit Bold>??????</UnitTit>
										</Common.View>
									</>)
								}}
							/>

						}
						{getValues("s_contract_type") != 'sales' &&
							<>
								<Common.SubTitle>???????????? <Required /></Common.SubTitle>
								{/*
							<Controller
								control={control} name="s_contract_start" defaultValue="2021-05-05"
								rules={{ required: { value: contractType != 'sales', message: '?????? ???????????? ???????????????' } }}
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
									rules={{ required: { value: contractType != 'sales', message: '?????? ???????????? ???????????????' } }}
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
								rules={{ required: { value: contractType != 'sales', message: '?????? ???????????? ???????????????' } }}
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
									rules={{ required: { value: contractType != 'sales', message: '?????? ???????????? ???????????????' } }}
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
								rules={{ required: { value: 0, message: '?????????????????? ???????????????.' } }}
								render={({ field }) => (<>
									<RadioTitleBox>
										<SubTitle>????????? <Required /></SubTitle>
										<FlexRowBox>
											<RadioBox onPress={() => { field.onChange(1); setBoon(true); }}>
												{field.value == 1 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
											</RadioBox>
											<RadioBox onPress={() => { 
												field.onChange(0); 
												setBoon(false); 
												setValue('s_bunyang_type','');
												setValue('s_bunyang_amt','');
												setValue('s_bunyang_premmium_amt','');
												setValue('s_bunyang_real_amt','');
												}}>
												{field.value == 0 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
											</RadioBox>
										</FlexRowBox>
									</RadioTitleBox>
								</>)}
							/>
							*/
							<Controller
								control={control} name="s_bunyang_yn" defaultValue={0}
								rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
								render={({ field }) => (<>
									<Common.FlexBetweenBox marginT={18}>
										<Common.SubTitle marginTN>????????? <Required /></Common.SubTitle>
										<RadioTitleBox>
											<RadioBox onPress={() => { field.onChange(0); setBoon(true); }}>
												{field.value == 0 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
											</RadioBox>
											<RadioBox onPress={() => { field.onChange(1); setBoon(false); }}>
												{field.value == 1 ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
											</RadioBox>
										</RadioTitleBox>
									</Common.FlexBetweenBox>
								</>)}
							/>




						}
						{(getValues("s_bunyang_yn") == 1) &&
							<>
								{/*
									<SubTitle>?????? ?????? <Required /></SubTitle>
									<ViewBorder>
										<Controller
											control={control} name="s_bunyang_type" defaultValue={1}
											rules={{ required: { value: '', message: '???????????? ???????????????.' } }}
											render={({ field }) => (<>
												<FromArrowIcon />
												<RNPickerSelect
													// value={field.value}
													onValueChange={(value) => { field.onChange(value); setContractType(value) }}
													placeholder={{ label: '?????? ?????? ??????' }}
													useNativeAndroidPickerStyle={false}
													fixAndroidTouchableBug={false}
													style={pickerStyle}
													items={[
														{ label: '????????????', value: 'common' },
														{ label: '???????????????', value: 'member' },
													]}
												/>
											</>)}
										/>
									</ViewBorder>
									*/}
								<Common.SubTitle>?????? ?????? <Required /></Common.SubTitle>
								<Common.ViewBorder>
									<Controller
										control={control} name="s_bunyang_type" defaultValue={1}
										rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
										render={({ field }) => (<>
											<FromArrowIcon />
											<RNPickerSelect
												// value={field.value}
												onValueChange={(value) => { field.onChange(value); setContractType(value) }}
												placeholder={{ label: '?????? ?????? ??????' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												style={pickerStyle}
												items={[
													{ label: '????????????', value: 'common' },
													{ label: '???????????????', value: 'member' },
												]}
											/>
										</>)}
									/>
								</Common.ViewBorder>


								{/*					
									<Controller
										control={control} name="s_bunyang_amt" defaultValue={1}
										rules={{ required: { value: '', message: '????????? ????????? ???????????????.' } }}
										render={({ field }) => (

											<ItemRowList>
												<InputBorder placeholder={'?????? ??????'} />
												<ItemTextR>??????</ItemTextR>
											</ItemRowList>

										)}
									/>
										*/}

								<Controller
									control={control} name="s_bunyang_amt" defaultValue={1}
									rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
									render={({ field }) => (

										<Common.View>
											<Common.InputBorder marginBN placeholder={'?????? ??????'} />
											<UnitTit>??????</UnitTit>
										</Common.View>

									)}
								/>


								{/*
									<Controller
										control={control} name="s_bunyang_premmium_amt" defaultValue={1}
										rules={{ required: { value: '', message: '???????????? ????????? ???????????????.' } }}
										render={({ field }) => (
											<>
												<SubTitle>???????????? ?????? <Required /></SubTitle>
												<ItemRowList>
													<InputBorder placeholder={'?????? ??????'} onChangeText={(value)=>{field.onChange(Number(value)) } }  />
													<ItemTextR>??????</ItemTextR>
												</ItemRowList>
											</>

										)}
									/>*/}
								<Controller
									control={control} name="s_bunyang_premmium_amt" defaultValue={1}
									rules={{ required: { value: true, message: '' } }}
									render={({ field }) => (
										<>
											<Common.SubTitle>???????????? ?????? <Required /></Common.SubTitle>
											<Common.View>
												<Common.InputBorder marginBN placeholder={'?????? ??????'} />
												<UnitTit>??????</UnitTit>
											</Common.View>
										</>

									)}
								/>

								{/*			
									<Controller
										control={control} name="s_bunyang_real_amt" defaultValue={1}
										rules={{ required: { value: true, message: '???????????? ???????????????.' } }}
										render={({ field }) => (
											<>
												<Common.SubTitle>??? ????????? <Required /></Common.SubTitle>
												<Common.View>
													<Common.InputBorder marginBN placeholder={'?????? ??????'} />
													<UnitTit>??????</UnitTit>
												</Common.View>
											</>

										)}
									/> 	
									*/}

								<Controller
									control={control} name="s_bunyang_real_amt" defaultValue={1}
									rules={{ required: { value: true, message: '??? ???????????? ???????????????.' } }}
									render={({ field }) => (
										<>
											<Common.SubTitle>??? ????????? <Required /></Common.SubTitle>
											<Common.View>
												<Common.InputBorder marginBN placeholder={'?????? ??????'} />
												<UnitTit>??????</UnitTit>
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
									rules={{ required: { value: true, message: "??? ????????? ??????????????????." } }}
									render={({ field }) => (<>
										<Item2RowBox>
											<SubTitle>??? ?????? <Required /></SubTitle>
											<InputBorder placeholder={'??? ?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(Number(value)) } }  />
										</Item2RowBox>
									</>)}
								/>
								<Controller
									control={control} name="s_bathrooms_cnt" defaultValue={getValues("s_bathrooms_cnt")}
									rules={{ required: { value: true, message: "?????? ????????? ??????????????????." } }}
									render={({ field }) => (
										<Item2RowBox>
											<SubTitle>?????? ?????? <Required /></SubTitle>
											<InputBorder placeholder={'?????? ?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{field.onChange(Number(value)) } }  />
										</Item2RowBox>
									)}
								/>
								{*/}
							<Controller
								control={control} name="s_rooms_cnt" defaultValue={getValues("s_rooms_cnt")}
								rules={{ required: { value: true, message: "??? ????????? ??????????????????." } }}
								render={({ field }) => (<>
									<Common.View>
										<Common.SubTitle marginL={4}>??? ?????? <Required /></Common.SubTitle>
										<Common.InputBorderHalf marginBN placeholder={'??? ?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} />
									</Common.View>
								</>)}
							/>
							<Controller
								control={control} name="s_bathrooms_cnt" defaultValue='2'
								rules={{ required: { value: true, message: "?????? ????????? ??????????????????." } }}
								render={({ field }) => (
									<Common.View>
										<Common.SubTitle marginL={4}>?????? ?????? <Required /></Common.SubTitle>
										<Common.InputBorderHalf marginBN placeholder={'?????? ?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} />
									</Common.View>
								)}
							/>
						</Common.FlexSpaceWrap>
						{/*
							<Controller
								control={control} name="s_admin_cost_yn" defaultValue={0}
								rules={{ required: { value: 0, message: "??????????????? ????????? ??????????????????." } }}
								render={({ field }) => (
									<RadioTitleBox>
										<SubTitle>?????? ????????? <Required /></SubTitle>
										<FlexRowBox>
											<RadioBox onPress={() => { field.onChange(1); setValue("s_admin_cost_yn",1); setAdminCostYN(1); }}>
												{getValues("s_admin_cost_yn")==1 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
											</RadioBox>
											<RadioBox onPress={() => { field.onChange(0); setValue("s_admin_cost_yn",0); setAdminCostYN(0); setValue("s_admin_cost_amt",0); setValue("s_maintenance_list",[])  }}>
												{getValues("s_admin_cost_yn")==0 ? <RadioBtnActive /> : <RadioBtn />}<RadioLable>{"??????"}</RadioLable>
											</RadioBox>
										</FlexRowBox>
									</RadioTitleBox>
								)}
							/>
								*/}
						<Controller
							control={control} name="s_admin_cost_yn" defaultValue={0}
							rules={{ required: { value: 0, message: "??????????????? ????????? ??????????????????." } }}
							render={({ field }) => (
								<Common.FlexBetweenBox marginT={18}>
									<Common.SubTitle marginTN>?????? ????????? <Required /></Common.SubTitle>
									<RadioTitleBox>
										<RadioBox onPress={() => { field.onChange(1); setValue("s_admin_cost_yn", 1); setAdminCostYN(1); }} >
											{field.value == true ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
										</RadioBox>
										<RadioBox onPress={() => { field.onChange(0); setValue("s_admin_cost_yn", 0); setAdminCostYN(0); setValue("s_admin_cost_amt", 0); setValue("s_maintenance_list", []) }} >
											{field.value == false ? <RadioBtnActive /> : <RadioBtn />}<Common.ViewBorderText>{"??????"}</Common.ViewBorderText>
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
									rules={{ required: { value: 0, message: '?????? ???????????? ??????????????????' } }}
									render={({ field }) => (<>
										<InputBorder value={field.value} keyboardType='numeric' onChangeText={(value)=>{field.onChange(Number(value)) } }  placeholder={'????????? ??????'} keyboardType='numeric'  />
										<ItemTextR>??????</ItemTextR>
									</>
									)}
								/>
							</ItemRowList>
							*/
							<Common.View>
								<Controller
									control={control} name="s_admin_cost_amt" defaultValue="0"
									rules={{ required: { value: commonFeeYN, message: '?????? ???????????? ??????????????????' } }}
									render={({ field }) => (<>
										<Common.InputBorder marginBN value={field.value} onChangeText={(value) => { field.onChange(Number(value)) }} placeholder={'????????? ??????'} keyboardType='numeric' editable={getValues("s_admin_cost_yn") == 1} />
										<UnitTit>??????</UnitTit>
									</>
									)}
								/>
							</Common.View>

						}
						{getValues("s_admin_cost_yn") == 1 &&
							/*
							<>
								<SubTitle>?????? ????????? ?????? <Required /></SubTitle>
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
								<Common.SubTitle>?????? ????????? ?????? <Required /></Common.SubTitle>
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
						<Common.SubTitle>?????? ??? <Required /></Common.SubTitle>
						<Common.FlexSpaceWrap>
							{/*}
								<Item2RowBox>
									<Controller
										control={control} name="s_floor" 
										rules={{ required: { value: getValues("s_floor"), message: '?????? ?????? ???????????????.' } }}
										render={({ field }) => (
											<>
												<InputBorder value={field.value} onChangeText={(value) => { field.onChange(Number(value)); setFloorCnt(value);  }} placeholder={'?????? ??? ??????'} />
												<ItemTextR>???</ItemTextR>
											</>
										)}
									/>
								</Item2RowBox>
										{*/}
							<Common.View>
								<Controller
									control={control} name="s_floor"
									rules={{ required: { value: floorCnt, message: '?????? ?????? ???????????????.' } }}
									render={({ field }) => (
										<>
											<Common.InputBorderHalf value={field.value} onChangeText={(value) => { field.onChange(Number(value)); setFloorCnt(value); }} placeholder={'?????? ??? ??????'} />
											<UnitTit>???</UnitTit>
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
													placeholder={{ label: '??? ??????' }}
													useNativeAndroidPickerStyle={false}
													fixAndroidTouchableBug={false}
													style={pickerStyle}
													items={[
														{ label: '??????', value: 1 },
														{ label: '??????', value: 2 },
														{ label: '?????????', value: 3 },
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
												placeholder={{ label: '??? ??????' }}
												useNativeAndroidPickerStyle={false}
												fixAndroidTouchableBug={false}
												style={pickerStyle}
												items={[
													{ label: '??????', value: 1 },
													{ label: '??????', value: 2 },
													{ label: '?????????', value: 3 },
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
								require={{ required: { value: true, message: '?????? ?????? ???????????????.' } }}
								render={({ field }) => (
									<>
										<SubTitle>?????? ??? <Required /></SubTitle>
										<ItemRowList>
											<InputBorder placeholder={'?????? ??? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {  setValue('s_total_floor',value); field.onChange(Number(value)) }} />
											<ItemTextR>???</ItemTextR>
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
								<Common.SubTitle>?????? ??? <Required /></Common.SubTitle>
								<Common.View>
									<Common.InputBorder placeholder={'?????? ??? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => { setValue('s_total_floor', value); field.onChange(Number(value)) }} />
									<UnitTit>???</UnitTit>
								</Common.View>
							</>)}
						/>
						<Common.SubTitle>???????????? <Required /></Common.SubTitle>
						{/*
							<ItemList2Box>
								<Controller
									control={control} name="s_supply_area_m" 
									value={getValues("s_supply_area_m")} 
									defaultValue={getValues("s_supply_area_m")}
									rules={{ required: { value: true, message: '??????????????? ??????????????????.' } }}
									render={({ field }) => (
										<Item2RowBox>
											<InputBorder placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
												setValue('s_supply_area_p', floor(MtoP(value), 2).toString());
												field.onChange(Number(value));
											}} />
											<ItemTextR>m??</ItemTextR>
										</Item2RowBox>
									)}
								/>
								<Controller
									control={control} name="s_supply_area_p"
									value={getValues("s_supply_area_p")} 
									defaultValue={getValues("s_supply_area_p")}
									rules={{ required: { value: true, message: '??????????????? ??????????????????.' } }}
									render={({ field }) => (
										<Item2RowBox>
											<InputBorder placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
												setValue('s_supply_area_m', floor(PtoM(value), 2).toString())
												field.onChange(Number(value));
											}} />
											<ItemTextR>???</ItemTextR>
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
								rules={{ required: { value: true, message: '??????????????? ??????????????????.' } }}
								render={({ field }) => (
									<Common.View>
										<Common.InputBorderHalf placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
											setValue('s_supply_area_p', floor(MtoP(value), 2).toString());
											field.onChange(Number(value));
										}} />
										<UnitTit>m??</UnitTit>
									</Common.View>
								)}
							/>
							<Controller
								control={control} name="s_supply_area_p"
								value={getValues("s_supply_area_p")}
								defaultValue={getValues("s_supply_area_p")}
								rules={{ required: { value: true, message: '??????????????? ??????????????????.' } }}
								render={({ field }) => (
									<Common.View>
										<Common.InputBorderHalf placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
											setValue('s_supply_area_m', floor(PtoM(value), 2).toString())
											field.onChange(Number(value));
										}} />
										<UnitTit>???</UnitTit>
									</Common.View>
								)}
							/>
						</Common.FlexSpaceWrap>



						<Common.SubTitle>???????????? <Required /></Common.SubTitle>
						{/*
							<ItemList2Box>
								<Controller
									control={control} name="s_use_area_m" 
									value={getValues("s_use_area_m")} 
									defaultValue={getValues("s_use_area_m")}
									rules={{ required: { value: getValues("s_use_area_m"), message: '??????????????? ??????????????????.' } }}
									render={({ field }) => (
										<Item2RowBox>
											<InputBorder placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
												setValue('s_use_area_p', floor(MtoP(value), 2).toString())
												field.onChange(Number(value));
											}} />
											<ItemTextR>m??</ItemTextR>
										</Item2RowBox>
									)}
								/>
								<Controller
									control={control} name="s_use_area_p"
									value={getValues("s_use_area_p")} 
									defaultValue={getValues("s_use_area_p")}
									rules={{ required: { value: getValues("s_use_area_p"), message: '??????????????? ??????????????????.' } }}
									render={({ field }) => (
										<Item2RowBox>
											<InputBorder placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
												setValue('s_use_area_m', floor(PtoM(value), 2).toString())
												field.onChange(Number(value));
											}} />
											<ItemTextR>???</ItemTextR>
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
								rules={{ required: { value: true, message: '??????????????? ??????????????????.' } }}
								render={({ field }) => (
									<Common.View>
										<Common.InputBorderHalf placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
											setValue('s_use_area_p', floor(MtoP(value), 2).toString())
											field.onChange(Number(value));
										}} />
										<UnitTit>m??</UnitTit>
									</Common.View>
								)}
							/>
							<Controller
								control={control} name="s_use_area_p"
								value={getValues("s_use_area_p")}
								defaultValue={getValues("s_use_area_p")}
								rules={{ required: { value: true, message: '??????????????? ??????????????????.' } }}
								render={({ field }) => (
									<Common.View>
										<Common.InputBorderHalf placeholder={'?????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => {
											setValue('s_use_area_m', floor(MtoP(value), 2).toString())
											field.onChange(Number(value));
										}} />
										<UnitTit>???</UnitTit>
									</Common.View>
								)}
							/>
						</Common.FlexSpaceWrap>



						{/*					
							<Controller
								control={control} name="s_total_parking_cnt"
								value={getValues("s_total_parking_cnt")} 
								defaultValue={getValues("s_total_parking_cnt")}
								rules={{ required: { value: getValues("s_total_parking_cnt"), message: '??? ??????????????? ??????????????????' } }}
								render={({ field }) => (<>

									<SubTitle>??? ???????????? <Required /></SubTitle>
									<ItemRowList>
										<InputBorder placeholder={'???????????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value)=>{ setValue('s_total_parking_cnt',value); field.onChange(Number(value))}} />
										<ItemTextR>???</ItemTextR>
									</ItemRowList>

								</>)}
							/>
							*/}

						<Controller
							control={control} name="s_total_parking_cnt"
							value={getValues("s_total_parking_cnt")}
							defaultValue={getValues("s_total_parking_cnt")}
							rules={{ required: { value: true, message: '??????????????? ??????????????????' } }}
							render={({ field }) => (<>

								<Common.SubTitle>??? ???????????? <Required /></Common.SubTitle>
								<Common.View>
									<Common.InputBorder placeholder={'???????????? ??????'} keyboardType='numeric' value={field.value} onChangeText={(value) => { setValue('s_total_parking_cnt', value); field.onChange(Number(value)) }} />
									<UnitTit>???</UnitTit>
								</Common.View>

							</>)}
						/>
					</StepCont >

					<StepCont>
						<Common.TitleBox><Common.Title>??????,????????? ??????</Common.Title></Common.TitleBox>
						<NoticeItem>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph>?????? 3??? ????????? ??????<Common.TextSemiBold14 paragraph>??? ??????????????????.</Common.TextSemiBold14></Common.TextLight14>
							</NoticeList>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph><Common.TextSemiBold14 paragraph>?????? 20????????? ?????? ????????????, ??? ?????? 10MB </Common.TextSemiBold14>??? ????????? ??? ????????????.</Common.TextLight14>
							</NoticeList>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph><Common.TextSemiBold14 paragraph>????????? ????????? ?????? ?????????</Common.TextSemiBold14>??? ????????????, ????????? ????????? ??? ????????????.</Common.TextLight14>
							</NoticeList>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph><Common.TextSemiBold14 paragraph>????????? ?????? ?????? ?????????, ????????? ?????????, ???????????? ?????????</Common.TextSemiBold14>??? ???????????? ??? ????????????.</Common.TextLight14>
							</NoticeList>
							<NoticeList>
								<ChkBIcon />
								<Common.TextLight14 paragraph><Common.TextSemiBold14 paragraph>YouTube ????????? ?????? ???????????? ?????? ??? ??? ????????????.</Common.TextSemiBold14></Common.TextLight14>
							</NoticeList>
						</NoticeItem>
						<Controller
							control={control} name="imgs"
							render={({ field }) => (<>
								<ImageUploadCont>
									<ImageUploadBtn onPress={() => { handleImageUpload(field) }} >
										<ImageUploadImg source={require('../../../assets/img/drawable-xhdpi/icon-regist-image.png')} />
										<ImageUploadText>????????? ??????</ImageUploadText>
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

						{/*  ??????????????? mypage ????????? ?????? ?????? */}
						<Controller
							control={control} name="s_yt_url"
							render={({ field }) => (<>
								<Common.SubTitle>YouTube URL</Common.SubTitle>
								<Common.InputBorder marginBN placeholder={'URL ??????'} />
								<AlertWrap>
									<ChkYIcon />
									<AlertText>YouTube ????????? ????????? ???????????? ????????? ?????? ?????? ???????????? ?????? ????????? ???????????? ????????? ???????????????.</AlertText>
								</AlertWrap>
							</>)}
						/>
					</StepCont>

					<StepCont color={Colors.bgColor}>
						<Common.TitleBox marginB={16}>
							<Common.Title>???????????? ???????????? ?????? ??? ?????? <Required /></Common.Title>
						</Common.TitleBox>
						<Common.View>
							<InfoList>
								<InfoNum>1.</InfoNum>
								<InfoText>??????????????? ????????? ?????? ?????? ??? ???????????? ?????? ??????????????? ???????????? ????????????.</InfoText>
							</InfoList>
							<InfoList>
								<InfoNum>2.</InfoNum>
								<InfoText>??????????????? ???????????? ?????? ?????? ??????????????? ?????? ??? ????????? ???????????????.</InfoText>
							</InfoList>
							<InfoList>
								<InfoNum>3.</InfoNum>
								<InfoText>?????? ??? ?????? ???????????? ?????? ????????? ????????? ?????? ????????? ????????? ????????? ?????? ?????? ???????????????.</InfoText>
							</InfoList>
							<InfoList>
								<InfoNum>4.</InfoNum>
								<InfoText>?????? ?????? ????????? ????????? ???????????? ?????????, ????????? ??????, ?????? ????????? ?????? ???(??????)????????? ??????????????????.</InfoText>
							</InfoList>
							<InfoList>
								<InfoNum>???</InfoNum>
								<InfoText>???/??? ????????? ????????? ??????????????????. ???????????? ???????????? ???/?????? ????????? ????????? ??????????????????.</InfoText>
							</InfoList>

							<InfoList>
								<InfoNumS>-</InfoNumS>
								<InfoTextS>??? ????????? ?????? ?????? ????????? ???????????? ?????? ?????? ????????? ??????????????? ??????????????????.</InfoTextS>
							</InfoList>
							<InfoList>
								<InfoNumS>-</InfoNumS>
								<InfoTextS>?????? ????????? ??????????????? ?????? ????????????, ??????????????? ????????? ???????????? ?????? ????????? ??????????????? ??????????????? ????????? ??????????????????.</InfoTextS>
							</InfoList>
							<InfoList>
								<InfoNumS>-</InfoNumS>
								<InfoTextS>????????? ????????? ?????????, ?????? ?????????, ???0??? ?????????, ???A??????, ???????????? ????????? ???????????? ??????????????????.</InfoTextS>
							</InfoList>
							<InfoList>
								<InfoNumS>-</InfoNumS>
								<InfoTextS>???????????? ????????? ??????????????? ?????? ????????? ???????????? ????????? ??????????????? ????????? ????????? ?????? ????????? ???????????????.</InfoTextS>
							</InfoList>

						</Common.View>
						<Controller
							control={control} name="s_agreement_yn"
							rules={{ required: { value: 0, message: '???????????? ??????????????? ??????????????????.' } }}
							defaultValue={getValues('s_agreement_yn')}
							value={getValues('s_agreement_yn')}
							render={({ field }) => (
								<TouchableOpacity onPress={() => { field.onChange(field.value == 0 ? 1 : 0) }}>
									<AgreedChkBtn>
										{getValues('s_agreement_yn') == 1 ? <ChkActive /> : <ChkBtn />}<Common.ViewBorderText>??? ???????????? ??????????????? ???????????????.</Common.ViewBorderText>
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
						<Common.TextSemiBold18>?????? ??????</Common.TextSemiBold18>
					</Common.FloatBtnsss>
				}
				<Common.FloatBtnsss btnColor={Colors.mainColor} onPress={() => { prevPage(); }}>
					<Common.TextSemiBold18>?????? ??????</Common.TextSemiBold18>
				</Common.FloatBtnsss>
				{
					mode == "new" &&
					<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={handleSubmit(onValid, onInvalid)} >
						<Common.TextSemiBold18 color={Colors.whiteColor} >????????????</Common.TextSemiBold18>
					</Common.FloatBtnsss>
				}
				{
					mode == "modi" &&
					<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={handleSubmit(onValid, onInvalid)}>
						<Common.TextSemiBold18 btnColor={Colors.whiteColor}  >?????? ??????</Common.TextSemiBold18>
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