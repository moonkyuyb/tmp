import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

/* COMMON COMPONENTS */
import * as Common from './../../styled/commonStyle';
import Colors from '../../../assets/colors';
import { PlacesInputWrap, SearchBtn, SearchHeader, SearchListWrap, SearchList, SearchAD, Dot, SavingPrice } from './../../styled/sales/SaleSearchStyle'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const SaleSearch = ({handleSetSelectedLocation, handleSetFilterComplete, }) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	},[])

	const MapIcon01 = () => (<Common.Image size={26} marginR={8} source={require('./../../../assets/img/drawable-xhdpi/icon_text_search_title_buiding.png')} />)
	const MapIcon02 = () => (<Common.Image size={26} marginR={8} source={require('./../../../assets/img/drawable-xhdpi/icon_text_search_title_map.png')} />)
	const MapIcon03 = () => (<Common.Image size={26} marginR={8} source={require('./../../../assets/img/drawable-xhdpi/icon_text_search_title_train.png')} />)
    
	const [searchHistory, setSearchHistory] = useState([]);
    
    const GooglePlacesInput = () => {
		
		return (
			<PlacesInputWrap >
				<GooglePlacesAutocomplete 
					placeholder='검색'
					onPress={(data, details=null) => {
						//'details' is provided when fetchDetails = true
						//console.log(data);
						//econsole.log(data.structured_formatting.main_text_matched_substrings)
						//console.log(details);
						//console.log(details.address_components);
						

						var resultData = {
							mainText: data.structured_formatting.main_text,
							formattedAddress: details.formatted_address,
							lat: details.geometry.location.lat,
							lng: details.geometry.location.lng,
							types: data.types
						}

						
						AsyncStorage.getItem('searchKeyword')
						.then((result)=>{
							//console.log("========================================================")
							//console.log(result);
							//console.log("========================================================")
							//console.log("            ");



							if (result != null ){
								var prevData = JSON.parse(result);
								
								prevData.push(resultData)
								

								AsyncStorage.removeItem("searchKeyword")
								.then(() =>{
									AsyncStorage.setItem('searchKeyword', JSON.stringify(prevData) );
								})
								.catch((err)=>{
									console.log(err);
								})
								setSearchHistory(prevData);
							}else {
								AsyncStorage.setItem('searchKeyword', JSON.stringify([resultData]) );
								setSearchHistory([resultData]);
							}

						})
						.catch((err)=>{
							console.log(err);
						})
						
						
						
						//AsyncStorage.removeItem("searchKeyword")
						

						
						handleSetSelectedLocation({lat: details.geometry.location.lat,lng: details.geometry.location.lng});
						navigation.navigate('salesList', {mainText:data.structured_formatting.main_text});
					
					}}
					fetchDetails={true}
					currentLocation={true}
					onFail={(el)=>{
						console.log("on fail=====================");
						console.log(el);
					}}
					onNotFound={(el)=>{
						console.log("on not found=====================");
						console.log(el);
					}}
					query={{
					key: GOOGLE_PLACES_API_KEY,
					language: 'ko',
					types:['geocode'],
					}}
					textInputProps={{
						InputComp: Common.TextInput,
						leftIcon: { type: 'font-awesome', name: 'chevron-left' },
						errorStyle: { color: Colors.redColors },
					}}
					GoogleReverseGeocodingQuery={{
						
					}

						// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
					}
					GooglePlacesSearchQuery={{
						// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
						rankby: 'distance',
						types: 'food',
					}}
					
					filterReverseGeocodingByTypes={[
						'locality',
						'administrative_area_level_3',
						'geocode',
					]} 

				/>
				<SearchBtn onPress={()=>{ console.log("searchKeyword"); }}>
					<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_search_b.png')}/>
				</SearchBtn> 
			</PlacesInputWrap>
			
		);
		
	};

	useEffect(()=>{

		AsyncStorage.getItem('searchKeyword')
		.then((result)=>{
			
			result = JSON.parse(result);
			
			  if (result != null) {
				  if (result.length > 0) {
			
					setSearchHistory(result);				
				}
			  }
			  
		})
		.catch((err) =>{
			  console.log(err)
		})
	
	},[])
		

	const BuildingType =(props) =>{
		console.log(props);
		if (props.mapIcon.indexOf("subway_station")>=0 ) {
			return(<MapIcon03 />)
		}
		else if (props.mapIcon.indexOf("transit_station")>=0 ) {
			return(<MapIcon03 />)
		}
		else if (props.mapIcon.indexOf("bus_station")>=0 ) {
			return(<MapIcon03 />)
		}
		else  if  (props.mapIcon.indexOf ("lodging") >=0 ){
			return(<MapIcon01 />)
		}else {
			return(<MapIcon02 />)

		}
	}

	
	return(
		<Common.ZipandaSafeView>
            <GooglePlacesInput/>
            
			<SearchHeader>
				<Common.TextBold14>최근 검색</Common.TextBold14>
				<Common.TouchableOpacity onPress={() => {AsyncStorage.removeItem("searchKeyword").then((result)=>{setSearchHistory([])});}}>
					<Common.FlexRowBox>
						<Common.TextLight14>검색기록 전체삭제</Common.TextLight14>
						<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_search_cencel_w.png')} />
					</Common.FlexRowBox>
				</Common.TouchableOpacity>
			</SearchHeader>
            
			<Common.ScrollContainer>
				<SearchListWrap>
				{
					searchHistory.map((el, index) => {
						console.log(el)
						console.log("==============================================================================================");
						return(
							<Common.TouchableOpacity onPress={() => {
								handleSetSelectedLocation({lat: el.lat,lng: el.lng});
								navigation.navigate('salesList', {mainText:el.mainText});
                        		}} 
								>
								<SearchList key={index}>
									<BuildingType mapIcon={el.types} key={"type"+index} />
									<Common.View>
										<Common.TextMedium16 marginB={4}>{el.mainText}</Common.TextMedium16>
										<Common.TextLight12>{el.formattedAddress}</Common.TextLight12>
									</Common.View>
								</SearchList>
							</Common.TouchableOpacity>
						)
					})
					/*
					searchHistory &&
					searchHistory.map((el)=>{
						console.log(el)
						return(
								<View style={styles.searchList}>
									<View style={styles.infoBox}>
										<MapIcon01 />
										<View style={styles.infoTitBox}>
											<View style={{fontSize: 14}}>대동레미안(도시형)</View>
											<Text style={styles.subTit}>부산광역시 서하구 장림동</Text>
										</View>
									</View>
								</View>
						)

					})
					*/
				}
				</SearchListWrap>
			</Common.ScrollContainer>
			<SearchAD>
				<Common.FlexCenter marginB={6}>
					<Common.TextBold11 color={Colors.whiteColor}>
						최근 거래된 중개수수료 <Common.TextUltraLight11 color={Colors.whiteColor}>(21.2.26 거래완료)</Common.TextUltraLight11>
					</Common.TextBold11><Dot/>
					<Common.TextUltraLight11 color={Colors.whiteColor}>서울시 송파구 문정동</Common.TextUltraLight11>
				</Common.FlexCenter>
				<Common.FlexCenter>
					<Common.TextBold24 color={Colors.whiteColor}>전세 1억 8000</Common.TextBold24>
					<Common.FlexBetweenBox>
						<SavingPrice><Common.TextBold14>72만원</Common.TextBold14></SavingPrice>
						<Common.Image size={12} marginR={4} source={require('./../../../assets/img/drawable-xhdpi/img_arrow.png')} />
						<Common.TextBold24 color={Colors.mainColor}>8만원</Common.TextBold24>
					</Common.FlexBetweenBox>
				</Common.FlexCenter>
			</SearchAD>
		</Common.ZipandaSafeView>
	)
}

export default SaleSearch;