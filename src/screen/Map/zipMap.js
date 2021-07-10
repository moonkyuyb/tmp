import React,{useEffect, useState} from 'react';
//import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";

//import { circle } from 'react-native/Libraries/Animated/src/Easing';

import { Platform,StyleSheet } from 'react-native';
import * as Common from './../../styled/commonStyle';
import { MapViewWrap, MapSearchBtn, MapBottonWrap } from './../../styled/mainStyle/mainScreenStyle'; 


import Colors from './../../../assets/colors';
import RNPermissions, { requestMultiple, PERMISSIONS, checkMultiple, RESULTS, check, request} from 'react-native-permissions';
import { useNavigation, useRoute } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { Marker, PROVIDER_GOOGLE, Circle ,Callout } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from 'react-native-elements';

import Geocoder from 'react-native-geocoding';
import { GOOGLE_PLACES_API_KEY } from "@env"

let permissionList = null
if (Platform.OS == "android") {
  permissionList = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
}
else if (Platform.OS == "ios") {
  permissionList = PERMISSIONS.IOS.LOCATION_ALWAYS;
}



const ZipMap = ({props, handleMapClick, handleGetSalesList, handleSetFilterComplete}) => {
  const getLeftTop = (locationData) => {
    return {latitude: ( locationData.latitude -  ( (locationData.latitudeDelta)/2 ) ), longitude:( locationData.longitude + ( (locationData.longitudeDelta)/2 )) }; 
  }
  const getRightTop = (locationData) => {
    return {latitude: ( locationData.latitude +  ( (locationData.latitudeDelta)/2 ) ), longitude:( locationData.longitude + ( (locationData.longitudeDelta)/2 )) }; 
  }
  const getLeftBottom =(locationData) => {
    return {latitude: ( locationData.latitude -  ( (locationData.latitudeDelta)/2 ) ), longitude:( locationData.longitude - ( (locationData.longitudeDelta)/2 )) };
  }
  const getRightBottom = (locationData) => {
    return {latitude: ( locationData.latitude +  ( (locationData.latitudeDelta)/2 ) ), longitude:( locationData.longitude - ( (locationData.longitudeDelta)/2 )) }
  }

  var initialRegion = {
    tabIndex        : props.tabIndex,
    latitude        : props.filter.geoLocation.lat,
    longitude       : props.filter.geoLocation.lng,
    latitudeDelta   : props.filter.geoLocation.latitudeDelta,
    longitudeDelta  : props.filter.geoLocation.longitudeDelta,
    leftTop         : getLeftTop({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta}),
    rightTop        : getRightTop({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta}),
    rightBottom     : getRightBottom({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta}),
    leftBottom       : getLeftBottom({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta})
  }
  const [reload, setReload] = useState("");
  
  
  const reloaction=(el) => {
    console.log("reloacation");

    props.filter['tabIndex']      = props.tabIndex;
    props.filter['leftTop']       = getLeftTop(el);
    props.filter['rightTop']      = getRightTop(el);
    props.filter['rightBottom']   = getRightBottom(el);
    props.filter['leftBottom']    = getLeftBottom(el); 
    props.filter.geoLocation.lat  = el.latitude;
    props.filter.geoLocation.lng  = el.longitude;
    props.filter.geoLocation.latitudeDelta  = el.latitudeDelta;
    props.filter.geoLocation.longitudeDelta = el.longitudeDelta;

    initialRegion = {
      latitude:       el.latitude,
      longitude:      el.longitude,
      latitudeDelta:  el.latitudeDelta,
      longitudeDelta: el.longitudeDelta,
      leftTop:        getLeftTop(el),
      rightTop:       getRightTop(el),
      rightBottom:    getRightBottom(el),
      leftBottom:     getLeftBottom(el)
    }

    AsyncStorage.getItem("mID")
    .then((result)=>{
      props.filter['mID']      = result;
      handleGetSalesList(props.filter);
    })
    .catch((er)=>{
      handleGetSalesList(props.filter);
    })
  
  }

  
  useEffect(()=> {
    reloaction({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta});
  },[props.tabIndex])

  useEffect(()=>{
    reloaction({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta});
    setReload( `geo_${(Math.floor(Math.random() * 100) + 1)}`);

  },[props.filter.geoLocation])
  

  
  useEffect(()=>{

    // console.log("===========================================================================================================================");
   reload.toString().includes("filter")
   
    if (reload != undefined && reload.toString() != "") { 
      if (reload.toString().startsWith("filter")) {          
        handleGetSalesList(props.filter);
      }
    }
  },[reload])
  

  useEffect(()=>{
    if (props.filter.filterComplete == true) {
      props.filter['tabIndex']      = props.tabIndex;
      props.filter['leftTop']       = getLeftTop({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta});
      props.filter['rightTop']      = getRightTop({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta});
      props.filter['rightBottom']   = getRightBottom({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta});
      props.filter['leftBottom']    = getLeftBottom({latitude:props.filter.geoLocation.lat,longitude:props.filter.geoLocation.lng, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta}); 
    
      handleGetSalesList(props.filter);
      handleSetFilterComplete(false);
    }
  },[props.filter])


  const getMyLocation = () => {
    check(permissionList)
        .then((result) => {
          request(permissionList)
           .then( (result)=> {
             switch(result) {
               case RESULTS.UNAVAILABLE:
                 // 사용 불가
               break;
               case RESULTS.DENIED:
                 // 퍼미션 허용되지 않은 상태
                  break;
               case RESULTS.LIMITED:     
                 break;
               case RESULTS.GRANTED:
                  Geolocation.getCurrentPosition(
                   (position) => {
                      //console.log(locationData)
                      const latitude = position.coords.latitude;
                      const longitude = position.coords.longitude;
                      //console.log("getMyLocation================================================")
                      reloaction({latitude:37.521569,longitude:127.0216062, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta});
                      //reloaction({latitude:latitude,longitude:longitude, latitudeDelta:props.filter.geoLocation.latitudeDelta, longitudeDelta:props.filter.geoLocation.longitudeDelta});
                      setReload(Math.floor(Math.random() * 100) + 1);
                    
                    },
                    (error) => {
                      // See error code charts below.
                      // dispatch({type: actionType.MY_LOCATION, payload: {latitude: 37.565383, longitude: 126.976292, zoom: 13} });
                      // indexAction.fetchZipDetailList(indexActionType.ZIP_DETAIL_LIST,dispatch);
                      console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                 );
                 break;
               case RESULTS.BLOCKED:
                 // 거부된 퍼미션이 있을 경우 세팅앱에서 허용 하도록 세팅앱으로 이동
                 Linking.openSettings();  
                 break;
             }
           });
           
       })
       .catch((err)=> {
           console.log("permission error");
           console.log(err)
       })
  }

  
  useEffect(()=>{
    getMyLocation();
  },[])
  

const [locationAddr, setLocationAddr] = useState("");
const [locationSi, setLocationSi] = useState("");


Geocoder.init(GOOGLE_PLACES_API_KEY, {language : "ko"}); // use a valid API key
Geocoder.from(props.filter.geoLocation, props.filter.geoLocation.lat)
.then(json => {
  var addressComponent = json.results[0].address_components[2].long_name+" "+json.results[0].address_components[1].long_name;
  var formatted_address = json.results[0].address_components[3].long_name;

  setLocationSi(formatted_address);
  setLocationAddr(addressComponent);
})
.catch(error => console.warn(error));


  var  totlaZipCnt = 0;
  let totalDanjiCnt = 0 ;
  var circles;
  if (props.tabIndex == 0) {
       circles = props.salesList.map((el, index) => {
      const point = { latitude: Number(el.s_lat), longitude: Number(el.s_lng) };
        //totlaZipCnt += el.cnt;
        totlaZipCnt = totlaZipCnt+1;
        return (
          <Marker key={index} coordinate={point} caption={{ text: "1", textSize: 18, color: '#000000', align: 0, haloColor: '#ffe800', width: 14, height: 14 }} image={require("./../../../assets/img/drawable-xhdpi/icon_map_point.png")} onPress={() => { console.warn('onClick! circle'); }}>
          </Marker>
        )
      })
    } else {
      circles = props.danjiList.map((el, index) => {
        const point = { latitude: Number(el.d_lat), longitude: Number(el.d_lng) };
        totalDanjiCnt += el.cnt;
        return (
          <Marker key={index} coordinate={point} caption={{ text: "1", textSize: 18, color: '#000000', align: 0, haloColor: '#ffe800', width: 14, height: 14 }} image={require("./../../../assets/img/drawable-xhdpi/icon_apartment.png")} onPress={() => { console.warn('onClick! circle'); }}>
          </Marker>
        )
      })
    }
  var isMovingEnd = false;

  

    return(        
    <>
        <MapViewWrap>

          {/*
            props.filter.geoLocation &&
            <CusMapView/>
          */}
          {/* <Common.TouchableOpacity onPress={() => { console.log("onpress");  getMyLocation(); }} style={{zIndex:999 }} >
      		  <Image style={[styles.lacationBtn]} onPress={() => { getMyLocation();}} source={require('./../../../assets/img/drawable-xhdpi/bt-location-w.png')} />
      	  </Common.TouchableOpacity> */}

          {
            <MapView
              key={reload}
              animationEnabled={false}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              initialRegion={initialRegion}
              style={{ position:'absolute', alignSelf:'center', width:'100%', height:'100%' }}
              clusterColor={"#ffe800"}
              clusterTextColor={"#000000"}
              spiderLineColor={"#ffe800"}
              clusteringEnabled={ (props.tabIndex==0) }
              maxZoomLevel={18}
              minZoomLevel={6}
              zoomTapEnabled={true}
              zoomEnabled={true}
              zoomControlEnabled={true}
              onTouchStart={(el)=>{isMovingEnd=false; }}
              onTouchEnd={(el)=>{isMovingEnd=true; }}
              onRegionChangeComplete={(el) => {
                  //console.log(el);
                
                if (Platform.OS == "android") {
                  if (isMovingEnd) {
                    reloaction(el);
                  }
                }
                else if (Platform.OS == "ios") {
                  if (el.latitude != props.filter.geoLocation.lat && el.longitude != props.filter.geoLocation.lng) {
                    reloaction(el);
                  }
                }

              }}

              >
                {circles}
            </MapView>
          }

        
	      </MapViewWrap>


      {props.page != "search" &&
      		<MapSearchBtn onPress={()=>navigation.navigate('map')} >
      			<Common.TextSemiBold14 color={Colors.mainColor}>지도에서 찾기</Common.TextSemiBold14>
      			<Common.Image size={20} source={require('./../../../assets/img/drawable-xhdpi/icon_search_y.png')}/>
      		</MapSearchBtn>
      }

      {props.page != "search" &&
          <MapBottonWrap>
      			<Common.FlexRowBox>
      				<Common.TouchableOpacity onPress={() => {getMyLocation(); }} >
      					<Common.Image size={30} marginR={10} source={require('./../../../assets/img/drawable-xhdpi/bt_location_b.png')} />
      				</Common.TouchableOpacity>
      				<Common.View>
      					<Common.TextUltraLight11 color={Colors.whiteColor}>서울시</Common.TextUltraLight11>
      					<Common.TextMedium16 color={Colors.whiteColor} marginT={4}>강남구 논현동</Common.TextMedium16>
      				</Common.View>
      			</Common.FlexRowBox>
      			<Common.FlexRowBox>
      				<Common.Image size={26} marginR={6} source={require('./../../../assets/img/drawable-xhdpi/icon_bilding.png')} />
      				<Common.TextBold28 color={Colors.mainColor}>{totlaZipCnt}</Common.TextBold28>
      			</Common.FlexRowBox>
      		</MapBottonWrap>
      }
   </>
   )
}

export default ZipMap;

