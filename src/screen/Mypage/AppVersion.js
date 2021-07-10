import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import DeviceInfo from 'react-native-device-info';
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";

import * as Common from '../../styled/commonStyle';
import {AppLogoImg,AppVersionBox} from '../../styled/mypageStyle/AppVersionStyle';
import { Platform } from 'react-native';
	
const PwAccount = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	},[])


	getAppstoreAppMetadata(Platform.OS=="ios"?"1569748223":"com.zipanda") //put any apps packageId here
	.then(metadata => {
	  console.log(
		"clashofclans android app version on playstore",
		metadata.version,
		"published on",
		metadata.currentVersionReleaseDate
	  );
	})
	.catch(err => {
	  console.log("error occurred", err);
	});
  
	return(
		<Common.ZipandaSafeView>
			<Common.VerticalCenter>
				<AppLogoImg source={require('./../../../assets/img/drawable-xhdpi/img_logo_en.png')}/>
				<Common.TextMedium14>현재버전 {DeviceInfo.getVersion() }</Common.TextMedium14>
				<AppVersionBox>
					<Common.TextSemiBold16>현재 최신 버전입니다</Common.TextSemiBold16>
				</AppVersionBox>
			</Common.VerticalCenter>
		</Common.ZipandaSafeView>
	)
}
export default PwAccount;