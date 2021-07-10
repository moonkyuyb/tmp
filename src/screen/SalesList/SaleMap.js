import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import Colors from './../../../assets/colors';
//import MapView, {Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
//import MapView, {Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-google-places';
//import RNGooglePlaces from 'react-native-google-places';
import { WebView } from 'react-native-webview';
import { API_URL, API_URL_KYU, ADMIN_URL } from "@env";

import * as Common from './../../styled/commonStyle';
import { 
	SaleInfoListBox,SaleInfoList,SaleIconN,MapContBorder,MapHeader,MapBtnBox,MapBtn,MapBtnText,MapContBox,Map,MapAdress,MapPickerImg,MapAdressImg,MapAdressText
} from './../../styled/detailMap/detailMap';

const SalesMapContainer = (props) => {
	console.log("sales detail data=======================================");
	//console.log(props);
	
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	const [mapIcon01_01, setMapIcon01_01] = useState(false)
	const [mapIcon01_02, setMapIcon01_02] = useState(false)
	const [mapIcon01_03, setMapIcon01_03] = useState(false)
	const [mapIcon01_04, setMapIcon01_04] = useState(false)
	const [mapIcon01_05, setMapIcon01_05] = useState(false)

	const [mapIcon02_01, setMapIcon02_01] = useState(false)
	const [mapIcon02_02, setMapIcon02_02] = useState(false)
	const [mapIcon02_03, setMapIcon02_03] = useState(false)
	const [mapIcon02_04, setMapIcon02_04] = useState(false)

	const [mapIcon03_01, setMapIcon03_01] = useState(false)
	const [mapIcon03_02, setMapIcon03_02] = useState(false)
	const [mapIcon03_03, setMapIcon03_03] = useState(false)
	const [mapIcon03_04, setMapIcon03_04] = useState(false)
	const [mapIcon03_05, setMapIcon03_05] = useState(false)

	const [active, setActive] = useState(false)
	const [activeTab, setActiveTab] = useState(0)
	
	useEffect(()=>{
		const handleEffect = async (props) => {
			//...

		}
		handleEffect()
	},[])

	const [mapInfo, setMapInfo] = useState("");
	useEffect(()=>{
		console.log(API_URL+`/map?lat=${props.lat}&lng=${props.lng}&type=${mapInfo}`);

	},[mapInfo])
	useEffect(()=>{

		if (mapIcon01_01 == true) {
			setMapInfo("subway_station");		
		}
		if(mapIcon01_02 == true) {
			// 편의점
			setMapInfo("convenience_store");
		}
		if(mapIcon01_03 == true) {
			// 카페
			setMapInfo("cafe");
		}
		if(mapIcon01_04 == true) {
			// 은행
			setMapInfo("bank");
		}
		if(mapIcon01_05 == true) {
			// 관공서
			setMapInfo("local_government_office");
		} 
		if(mapIcon02_01 == true) {
			// 치안
			setMapInfo("police");
		} 
		if(mapIcon02_02 == true) {
			// 소방서
			setMapInfo("fire_station");
		} 
		if(mapIcon02_03 == true) {
			// 병원
			setMapInfo("hospital");
		} 
		if(mapIcon02_04 == true) {
			// 약국
			setMapInfo("pharmacy");
		}


		
		if(mapIcon02_01 == true) {
			// CCTV
			setMapInfo("cctv");
		}
		
		if(mapIcon03_03 == true) {
			// 초등학교
			setMapInfo("primary_school");
		}
		if(mapIcon03_04 == true) {
			// 중학교
			setMapInfo("secondary_school")
		}
		if(mapIcon03_05 == true) {
			// 고등학교
			setMapInfo("school")
		}

	},[mapIcon01_01, mapIcon01_02, mapIcon01_03, mapIcon01_04, mapIcon01_05, mapIcon02_01, mapIcon02_03, mapIcon02_04, mapIcon03_01, mapIcon03_02, mapIcon03_03, mapIcon03_04, mapIcon03_05 ])

	const onSelectMapInfo = (setSelect) => {

		setMapIcon01_01(false);
		setMapIcon01_02(false);
		setMapIcon01_03(false);
		setMapIcon01_04(false);
		setMapIcon01_05(false);

		setMapIcon02_01(false);
		setMapIcon02_02(false);
		setMapIcon02_03(false);
		setMapIcon02_04(false);
		
		setMapIcon03_01(false);
		setMapIcon03_02(false);
		setMapIcon03_03(false);
		setMapIcon03_04(false);
		setMapIcon03_05(false);
		setSelect(true);
	}

	//map header icons
	const MapIcon01_01 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_subway_b.png')} />);
	const MapIcon01_02 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_convenience_b.png')} />);
	const MapIcon01_03 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_coffee_b.png')} />);
	const MapIcon01_04 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_bank_b.png')} />);
	const MapIcon01_05 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_offices_b.png')}/>);
	const MapIcon01_01Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_subway_w.png')} />);
	const MapIcon01_02Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_convenience_w.png')} />);
	const MapIcon01_03Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_coffee_w.png')} />);
	const MapIcon01_04Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_bank_w.png')} />);
	const MapIcon01_05Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_offices_w.png')}/>);

	const MapIcon02_01 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_safety_b.png')} />);
	const MapIcon02_01Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_safety_w.png')} />);

	const MapIcon02_02 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon-map-icon-firehouse-non.png')} />);
	const MapIcon02_02Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon-firehouse.png')} />);

	const MapIcon02_03 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/bt-map-icon-hospital-non.png')} />);
	const MapIcon02_03Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/bt-hopital.png')} />);

	const MapIcon02_04 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon-map-icon-pharmacy-non.png')} />);
	const MapIcon02_04Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon-pharmacy.png')} />);






	const MapIcon03_01 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_day_care_center_b.png')} />);
	const MapIcon03_02 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_kindergarden_b.png')} />);
	const MapIcon03_03 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_elementary_school_b.png')} />);
	const MapIcon03_04 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_middle_school_b.png')} />);
	const MapIcon03_05 = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_high_school_b.png')}/>);
	const MapIcon03_01Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_day_care_center_w.png')} />);
	const MapIcon03_02Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_kindergarden_w.png')} />);
	const MapIcon03_03Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_elementary_school_w.png')} />);
	const MapIcon03_04Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_middle_school_w.png')} />);
	const MapIcon03_05Active = () => (<Common.Image size={48} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_high_school_w.png')}/>);

	// map

	const MapPicker = () => (<MapPickerImg source={require('./../../../assets/img/drawable-xhdpi/icon_map_point.png')} />);
	const MapIcon01_02Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_convenience_w.png')} />);
	const MapIcon01_01Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_subway_w.png')} />);
	const MapIcon01_03Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_coffee_w.png')} />);
	const MapIcon01_04Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_bank_w.png')} />);
	const MapIcon01_05Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_offices_w.png')}/>);

	const MapIcon02_01Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_safety_w.png')} />);
	const MapIcon02_02Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_cctv_w.png')} />);

	const MapIcon03_01Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_day_care_center_w.png')} />);
	const MapIcon03_02Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_kindergarden_w.png')} />);
	const MapIcon03_03Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_elementary_school_w.png')} />);
	const MapIcon03_04Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_middle_school_w.png')} />);
	const MapIcon03_05Active28 = () => (<Common.Image size={28} source={require('./../../../assets/img/drawable-xhdpi/SaleDetails/icon_map_high_school_w.png')}/>);

	const INITIAL_REGION = {
		latitude: 37.56437606841911,
  		longitude: 126.98122110332228,
		latitudeDelta: 1,
		longitudeDelta: 8.5
	  };

	
	  
	return(
		<Common.View>
			<MapBtnBox>
				
				<MapBtn tabIndex={0} activeTab={activeTab} onPress={ ()=>{ setActiveTab(0)}}>
					<MapBtnText tabIndex={0} activeTab={activeTab}>편의시설</MapBtnText>
				</MapBtn>
				<MapBtn tabIndex={1} activeTab={activeTab} onPress={ ()=>{ setActiveTab(1)}}>
					<MapBtnText tabIndex={1} activeTab={activeTab}>안전시설</MapBtnText>
				</MapBtn>
				<MapBtn tabIndex={2} activeTab={activeTab} onPress={ ()=>{ setActiveTab(2)}}>
					<MapBtnText tabIndex={2} activeTab={activeTab}>학군정보</MapBtnText>
				</MapBtn>

			</MapBtnBox>
			
			<MapContBox>
				{// 편의시설
				}
				
				<SaleInfoListBox tabIndex={0} activeTab={activeTab}>
					<SaleInfoList>
						<SaleIconN onPress={() => { console.log("on press"); onSelectMapInfo(setMapIcon01_01); } }>{mapIcon01_01 ? <MapIcon01_01Active/> : <MapIcon01_01/>}</SaleIconN>
						<Common.TextLight13>지하철</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon01_02)}}>{mapIcon01_02 ? <MapIcon01_02Active/> : <MapIcon01_02/>}</SaleIconN>
						<Common.TextLight13>편의점</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon01_03) }}>{mapIcon01_03 ? <MapIcon01_03Active/> : <MapIcon01_03/>}</SaleIconN>
						<Common.TextLight13>카페</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon01_04); }}>{mapIcon01_04 ? <MapIcon01_04Active/> : <MapIcon01_04/>}</SaleIconN>
						<Common.TextLight13>은행</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList Inactive>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon01_05); }}>{mapIcon01_05 ? <MapIcon01_05Active/> : <MapIcon01_05/>}</SaleIconN>
						<Common.TextLight13>관공서</Common.TextLight13>
					</SaleInfoList>
				</SaleInfoListBox>
				{// 안전시설 
				}
				<SaleInfoListBox tabIndex={1} activeTab={activeTab}>
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon02_01); }}>{mapIcon02_01 ? <MapIcon02_01Active/> : <MapIcon02_01/>}</SaleIconN>
						<Common.TextLight13>치안</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon02_02); }}>{mapIcon02_02 ? <MapIcon02_02Active/> : <MapIcon02_02/>}</SaleIconN>
						<Common.TextLight13>소방서</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon02_03); }}>{mapIcon02_03 ? <MapIcon02_03Active/> : <MapIcon02_03/>}</SaleIconN>
						<Common.TextLight13>병원</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon02_04); }}>{mapIcon02_04 ? <MapIcon02_04Active/> : <MapIcon02_04/>}</SaleIconN>
						<Common.TextLight13>약국</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList></SaleInfoList>

				</SaleInfoListBox>
				{// 학군정보 
				}
				<SaleInfoListBox tabIndex={2} activeTab={activeTab}>
					{/*
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon03_01) }}>{mapIcon03_01 ? <MapIcon03_01Active/> : <MapIcon03_01/>}</SaleIconN>
						<Common.TextLight13>어린이집</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon03_02); }}>{mapIcon03_02 ? <MapIcon03_02Active/> : <MapIcon03_02/>}</SaleIconN>
						<Common.TextLight13>유치원</Common.TextLight13>
					</SaleInfoList>
					*/}
					<SaleInfoList Inactive>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon03_03) }}>{mapIcon03_03 ? <MapIcon03_03Active/> : <MapIcon03_03/>}</SaleIconN>
						<Common.TextLight13>초등학교</Common.TextLight13>
					</SaleInfoList>
					{/*
						<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon03_04); }}>{mapIcon03_04 ? <MapIcon03_04Active/> : <MapIcon03_04/>}</SaleIconN>
						<Common.TextLight13>중학교</Common.TextLight13>
					</SaleInfoList>
					*/}
					<SaleInfoList>
						<SaleIconN onPress={() => { onSelectMapInfo(setMapIcon03_05); }}>{mapIcon03_05 ? <MapIcon03_05Active/> : <MapIcon03_05/>}</SaleIconN>
						<Common.TextLight13>중고등학교</Common.TextLight13>
					</SaleInfoList>
					<SaleInfoList></SaleInfoList>
					<SaleInfoList></SaleInfoList>
					<SaleInfoList></SaleInfoList>
				</SaleInfoListBox>
			</MapContBox> 
			<MapAdress>
				<Common.Image size={17} marginR={4} source={require('./../../../assets/img/drawable-xhdpi/icon_map_navi.png')} />
				<Common.TextLight16 color={Colors.whiteColor}>{props.address1}</Common.TextLight16>
			</MapAdress>
			<Map>
				
				<WebView
					onLoad={()=>{console.log("on load=---");}}
					key={ mapInfo }
					style={ {flex:1, width:'100%', height:'100%' } }
					source={ {uri:API_URL+`/map?lat=${props.lat}&lng=${props.lng}&type=${mapInfo}`} }
					javaScriptEnabled={true}
				/>
				
				{/*}
				<MapView
			    	provider={PROVIDER_GOOGLE}
					region={INITIAL_REGION}
					zoomEnabled = {false}
					minZoomLevel={14}
					rotateEnabled={false}
					scrollEnabled={false}
					pitchEnabled={false}

					style={{flex:1, width:'100%', height:'100%' }}
    			>
				    <Marker coordinate={INITIAL_REGION} image={require("./../../../assets/img/drawable-xhdpi/icon_map_point.png")} />

				</MapView>
			{*/}
					{/*
				<MapPicker/>
				<MapIcon01_01Active28/>
				<MapIcon01_04Active28/>
				<MapIcon01_05Active28/>
					*/}
			</Map>
		</Common.View>
			
	)
}



export default SalesMapContainer;
